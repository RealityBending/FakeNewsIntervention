library(jsonlite)
library(progress)
library(stringr)
library(dplyr)


# Define local path to participant files (modify as needed)
path <- "C:/Users/domma/Box/Data/FakeNewsIntervention/"
# path <- "C:/Users/dmm56/Box/Data/FakeNewsIntervention/"



# List all CSV files in the local directory
files <- c(
  list.files(paste0(path, "Prolific/"), full.names = TRUE, pattern = "*.csv"),
  list.files(paste0(path, "UK/"), full.names = TRUE, pattern = "*.csv")
)

# Initialize empty dataframes
alldata <- data.frame()
alldata_mist <- data.frame()
alldata_mocri <- data.frame()

# Progress bar
progbar <- progress_bar$new(total = length(files))

# Loop through files
for (file in files) {
  progbar$tick()

  # Read the CSV file
  data <- read.csv(file)

  # Browser info
  browser <- data[data$screen == "browser_info", ][1, ]

  # Skip if no valid Prolific ID
  if(is.na(browser$researcher)) {
    if(is.na(browser$prolific_id)) {
      next
    } else {
      browser$researcher <- "Prolific"
    }
  } else if(browser$researcher == "test") {
    next
  }

  # Participant dataframe
  df <- data.frame(
    Participant = gsub(".csv", "", basename(file)),
    # Prolific_ID = browser$prolific_id,
    Sample = browser$researcher,
    Experiment_Duration = max(data$time_elapsed) / 1000 / 60,
    Date = browser$date,
    Time = browser$time,
    Browser = browser$browser,
    Mobile = browser$mobile,
    Platform = browser$os,
    Screen_Width = browser$screen_width,
    Screen_Height = browser$screen_height
  )

  # Demographics 1
  demo1 <- jsonlite::fromJSON(data[data$screen == "demographics_1", "response"])
  df$Gender <- demo1$gender

  # Education cleaning
  edu <- demo1$education
  df$Education <- case_when(
    str_detect(tolower(edu), "bachelor") ~ "Bachelor",
    str_detect(tolower(edu), "master") ~ "Master",
    str_detect(tolower(edu), "doctorate") ~ "Doctorate",
    str_detect(tolower(edu), "high school") ~ "High School",
    .default = edu
  )


  # Demographics 2
  demo2 <- jsonlite::fromJSON(data[data$screen == "demographics_2", "response"])
  if(str_detect(demo2$age, "66d633|66f418c")) {
    df$Age <- NA
  } else {
    df$Age <- as.numeric(demo2$age)
  }
  if (!is.na(df$Age) && df$Age == 1964) df$Age <- 60
  df$Ethnicity <- demo2$ethnicity

  df$COVID_Vaccination <- demo1$vaccination_status
  df$FakeNews_SubjectiveDiscrimination <- demo1$belief_likelihood_status


  # BFI (Big Five Inventory)
  bfi <- data[data$screen == "questionnaire_BFI10", ]
  df$BFI_Duration <- bfi$rt / 1000 / 60
  bfi_resp <- jsonlite::fromJSON(bfi$response)
  for (item in names(bfi_resp)) {
    df[[item]] <- as.numeric(bfi_resp[[item]])
  }

  # VSA (Vulnerability to Stress Assessment)
  vsa <- data[data$screen == "questionnaire_VSA", ]
  df$VSA_Duration <- vsa$rt / 1000 / 60
  vsa_resp <- jsonlite::fromJSON(vsa$response)
  for (item in names(vsa_resp)) {
    df[[item]] <- as.numeric(vsa_resp[[item]])
  }

  # ANES (American National Election Studies)
  anes <- data[data$screen == "questionnaire_ANES", ]
  df$ANES_Duration <- anes$rt / 1000 / 60
  anes_resp <- jsonlite::fromJSON(anes$response)
  df$Political_Ideology <- str_remove(anes_resp$ANES_1, ".*\\. ")
  df$Political_Ideology <- ifelse(str_detect(df$Political_Ideology, "Moderate"), "Moderate", df$Political_Ideology)
  df$Political_Ideology <- ifelse(str_detect(df$Political_Ideology, "slightly C"), "Slightly Conservative", df$Political_Ideology)
  df$Political_Ideology <- ifelse(str_detect(df$Political_Ideology, "Don't Know"), "Don't Know", df$Political_Ideology)
  df$Political_Affiliation <- str_remove(anes_resp$ANES_2, ".*\\. ")
  df$Political_Affiliation <- ifelse(str_detect(df$Political_Affiliation, "Democratic"), "Democrat", df$Political_Affiliation)
  df$Political_Affiliation <- ifelse(str_detect(df$Political_Affiliation, "Republican"), "Republican", df$Political_Affiliation)
  df$Political_Affiliation <- ifelse(str_detect(df$Political_Affiliation, "'independent'"), "None or Independent", df$Political_Affiliation)
  df$Political_Affiliation <- ifelse(df$Political_Affiliation == "Other" & df$Sample == "Prolific", "None or Independent", df$Political_Affiliation)

  # GCBS15 (Generic Conspiracist Beliefs Scale)
  gcbs <- data[data$screen == "questionnaire_GCBS15", ][1, ]
  df$GCBS_Duration <- gcbs$rt / 1000 / 60
  gcbs_resp <- jsonlite::fromJSON(gcbs$response)
  for (item in names(gcbs_resp)) {
    df[[item]] <- as.numeric(gcbs_resp[[item]])
  }

  # Veracity confidence
  confidence <- data[data$screen == "veracity_confidence", ]
  df$Intervention_Questions_Confidence <- jsonlite::fromJSON(confidence$response)$confidence

  # Badnews/Tetris questions
  intervention <- data[data$screen == "intervention", ]
  df$Intervention <- ifelse(str_detect(intervention$stimulus, "Tetris"), "Tetris", "BadNewsGame")
  df$Intervention_Duration <- intervention$rt / 1000 / 60
  if (nrow(data[data$screen == "questionnaire_badnews", ]) == 0) {
    taskQ <- data[data$screen == "questionnaire_tetris", ][1, ]
    taskQ_resp <- jsonlite::fromJSON(taskQ$response)
    df$Intervention_Questions_Score <- taskQ_resp$high_score
    if(df$Intervention != "Tetris") stop()
  } else {
    taskQ <- data[data$screen == "questionnaire_badnews", ][1, ]
    taskQ_resp <- jsonlite::fromJSON(taskQ$response)
    df$Intervention_Questions_Score <- taskQ_resp$followers
  }
  df$Intervention_Questions_Duration <- taskQ$rt / 1000 / 60
  df$Intervention_Questions_Favorite <- taskQ_resp$favorite_part
  df$Intervention_Questions_Repeat <- taskQ_resp$play_again
  df$Intervention_Questions_Recommend <- taskQ_resp$recommend


  # MOCRI BOLD
  mocri_bold <- data[data$screen == "questionnaire_MOCRI_BOLD_12", ]
  mocri_bold_resp <- jsonlite::fromJSON(mocri_bold$response)
  for (item in names(mocri_bold_resp)) {
    df[[item]] <- as.numeric(mocri_bold_resp[[item]])
  }
  mocri_nonbold <- data[data$screen == "questionnaire_MOCRI_NONBOLD_12", ]
  # df$MOCRI_NONBOLD_Duration <- mocri_nonbold$rt / 1000 / 60
  mocri_nonbold_resp <- jsonlite::fromJSON(mocri_nonbold$response)
  for (item in names(mocri_nonbold_resp)) {
    df[[item]] <- as.numeric(mocri_nonbold_resp[[item]])
  }
  names(df) <- gsub("MOCRI_", "MOCRI_POST_", names(df))
  names(df) <- gsub("MOCRI_POST_BOLD", "MOCRI_PRE", names(df))


  # MIST (Pre and Post)
  # Pre
  mist_pre <- data[data$screen == "questionnaire_mist_pre", ]
  # df$MIST_Duration_Pre <- mist_pre$rt / 1000 / 60
  mist_pre <- jsonlite::fromJSON(mist_pre$response)
  df_mist_pre <- data.frame(
    Participant = df$Participant,
    Item = names(mist_pre),
    Realness = as.numeric(unlist(mist_pre)) / 100,
    Condition = "Pretest"
  )

  # Post
  mist_post <- data[data$screen == "questionnaire_mist_post", ]
  # df$MIST_Duration_Post <- mist_post$rt / 1000 / 60
  mist_post <- jsonlite::fromJSON(mist_post$response)
  df_mist_post <- data.frame(
    Participant = df$Participant,
    Item = names(mist_post),
    Realness = as.numeric(unlist(mist_post)) / 100,
    Condition = "Posttest"
  )

  # Combine MIST pre and post
  df_mist <- rbind(df_mist_pre, df_mist_post)
  df_mist$Nature <- tools::toTitleCase(stringr::str_split(df_mist$Item, "_", simplify = TRUE)[, 2])
  df_mist$Topic <- tools::toTitleCase(stringr::str_split(df_mist$Item, "_", simplify = TRUE)[, 3])

  # Add to alldata
  alldata <- rbind(alldata, df)
  alldata_mist <- rbind(alldata_mist, df_mist)
}

# How many
table(alldata$Sample)
alldata$Sample <- ifelse(alldata$Sample %in% c("Prolific", "snow"), "USA", "UK")


# Anonymize
alldata$Prolific_ID <- NULL
ids <- paste0("S", sprintf("%03d", 1:nrow(alldata)))
names(ids) <- alldata$Participant
alldata$Participant <- ids[alldata$Participant]
alldata_mist$Participant <- ids[alldata_mist$Participant]

# Save results
write.csv(alldata, "../data/rawdata_participants.csv", row.names = FALSE)
write.csv(alldata_mist, "../data/rawdata_mist.csv", row.names = FALSE)
