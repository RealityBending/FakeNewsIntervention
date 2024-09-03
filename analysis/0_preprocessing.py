import json


import numpy as np
import pandas as pd


# Get files from OSF ======================================================
def osf_listfiles(data_subproject="", token="", after_date=None):
    """Function to connect and access files from an OSF project."""
    try:
        import osfclient
    except ImportError:
        raise ImportError("Please install 'osfclient' (`pip install osfclient`)")
    osf = osfclient.OSF(token=token).project(data_subproject)  # Connect to project
    storage = [s for s in osf.storages][0]  # Access storage component
    files = [
        {
            "name": file.name.replace(".csv", ""),
            "date": pd.to_datetime(file.date_created),
            "url": file._download_url,
            "size": file.size,
            "file": file,
        }
        for file in storage.files
    ]

    if after_date is not None:
        date = pd.to_datetime(after_date, format="%d/%m/%Y", utc=True)
        files = [f for f, d in zip(files, [f["date"] > date for f in files]) if d]
    return files


# Connect to OSF and get files --------------------------------------------
token = ""  # Paste OSF token here to access private repositories
files = osf_listfiles(
    token=token,
    data_subproject="maf92",  # Data subproject ID
    after_date="19/01/2024",
)

# Loop through files ======================================================
# Initialize empty dataframes
alldata = pd.DataFrame()
alldata_mist = pd.DataFrame()

for i, file in enumerate(files):
    print(f"File N°{i+1}/{len(files)}")

    if (
        "Participant" in alldata.columns
        and file["name"] in alldata["Participant"].values
    ):
        continue

    download_ok = False
    while download_ok == False:
        data = pd.read_csv(file["file"]._get(file["url"], stream=True).raw)
        if len(data) > 0:
            download_ok = True

    # Participant ----------------------------------------------------------
    data["screen"].unique()

    # Browser info -------------------------------------------------------
    browser = data[data["screen"] == "browser_info"].iloc[0]

    df = pd.DataFrame(
        {
            "Participant": file["name"],
            "Prolific_ID": browser["prolific_id"],
            "Experiment_Duration": data["time_elapsed"].max() / 1000 / 60,
            "Date_OSF": file["date"],
            "Date": browser["date"],
            "Time": browser["time"],
            "Browser": browser["browser"],
            "Mobile": browser["mobile"],
            "Platform": browser["os"],
            "Screen_Width": browser["screen_width"],
            "Screen_Height": browser["screen_height"],
        },
        index=[0],
    )

    # Demographics -------------------------------------------------------
    demo1 = data[data["screen"] == "demographics_1"].iloc[0]
    demo1 = json.loads(demo1["response"])

    df["Gender"] = demo1["gender"]

    # Education
    edu = demo1["education"]
    edu = "Bachelor" if "bachelor" in edu else edu
    edu = "Master" if "master" in edu else edu
    edu = "Doctorate" if "doctorate" in edu else edu
    edu = "High School" if "High school" in edu else edu
    df["Education"] = edu

    demo2 = data[data["screen"] == "demographics_2"].iloc[0]
    demo2 = json.loads(demo2["response"])
    df["Age"] = demo2["age"]
    df["Ethnicity"] = demo2["ethnicity"]

    # Intervention ----------------------------------------------------------------
    intervention = data[data["screen"] == "intervention"].iloc[0]
    df["Intervention_Duration"] = intervention["rt"] / 1000 / 60

    # BFI ----------------------------------------------------------------
    bfi = data[data["screen"] == "questionnaire_BFI10"].iloc[0]

    df["BFI_Duration"] = bfi["rt"] / 1000 / 60

    bfi = json.loads(bfi["response"])
    for item in bfi:
        df[item] = float(bfi[item])

    # MIST ----------------------------------------------------------------

    # Pre
    df_mist_pre = pd.DataFrame({"Participant": df["Participant"].values[0]}, index=[0])
    mist_pre = data[data["screen"] == "questionnaire_mist_pre"].iloc[0]

    df["MIST_Duration_Pre"] = mist_pre["rt"] / 1000 / 60

    mist_pre = json.loads(mist_pre["response"])
    for item in mist_pre:
        df_mist_pre[item] = float(mist_pre[item])
    df_mist_pre = df_mist_pre.T
    df_mist_pre = df_mist_pre.drop("Participant", axis=0)
    df_mist_pre.columns = ["MIST"]  # Rename column
    df_mist_pre["Condition"] = "Pretest"

    # Post
    df_mist_post = pd.DataFrame({"Participant": df["Participant"].values[0]}, index=[0])
    mist_post = data[data["screen"] == "questionnaire_mist_post"].iloc[0]

    df["MIST_Duration_Post"] = mist_post["rt"] / 1000 / 60
    mist_post = json.loads(mist_post["response"])
    for item in mist_post:
        df_mist_post[item] = float(mist_post[item])
    df_mist_post = df_mist_post.T
    df_mist_post = df_mist_post.drop("Participant", axis=0)
    df_mist_post.columns = ["MIST"]  # Rename column
    df_mist_post["Condition"] = "Posttest"

    # Concatenate
    df_mist = pd.concat([df_mist_pre, df_mist_post], axis=0, ignore_index=True)
    df_mist["Participant"] = df["Participant"].values[0]

    # Add to alldata
    alldata = pd.concat([alldata, df], axis=0, ignore_index=True)
    alldata_mist = pd.concat(
        [alldata_mist, df_mist[["Participant", "Condition", "MIST"]]],
        axis=0,
        ignore_index=True,
    )


# Quality control =========================================================
def update_log(log, prolific_id, reject=False, alldata=alldata):
    ppt = alldata.loc[
        (~alldata.Prolific_ID.isna()) & (alldata.Prolific_ID == prolific_id),
    ]["Participant"].values[0]
    if not isinstance(ppt, str):
        raise ValueError(f"Participant {prolific_id} not found.")

    ppt = pd.DataFrame(
        {"Participant": [ppt], "Paid": [not reject], "Date": pd.Timestamp.now()}
    )
    log = pd.concat([log, ppt], axis=0, ignore_index=True)
    log.to_csv("../data/payment_log.csv", index=False)
    if reject:
        print(f"X Participant {prolific_id} rejected.")
    else:
        print(f"V Participant {prolific_id} was paid.")
    return log


# Load log and data
log = pd.read_csv("../data/payment_log.csv")
new = alldata.loc[~alldata.Prolific_ID.isna(),]
new = new.loc[
    ~new.Participant.isin(log.Participant), ["Prolific_ID", "Intervention_Duration"]
]
new

# Update log manually
log = update_log(log, "5e42fc295135b5000cd20d0b", reject=True)


# Save data ==============================================================

alldata.to_csv("../data/rawdata.csv", index=False)
alldata_mist.to_csv("../data/rawdata_mist.csv", index=False)
