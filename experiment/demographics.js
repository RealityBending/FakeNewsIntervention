// Retrieve and save browser info ========================================================
var demographics_browser_info = {
    type: jsPsychBrowserCheck,
    data: {
        screen: "browser_info",
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
    },
    on_finish: function () {
        data = jsPsych.data.get().filter({ screen: "browser_info" }).values()[0]
        jsPsych.data.addProperties({
            ["screen_height"]: data["height"],
            ["screen_width"]: data["width"],
        })
        for (var key in data) {
            if (
                [
                    "vsync_rate",
                    "os",
                    "mobile",
                    "browser",
                    "browser_version",
                ].includes(key)
            ) {
                jsPsych.data.addProperties({
                    [key]: data[key],
                })
            }
        }
        jsPsych.data.addProperties()
    },
}

// Participant ID ========================================================================
var demographics_participant_id = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: "Enter participant ID:",
            placeholder: "001",
            name: "Participant_ID",
        },
    ],
    data: {
        screen: "participant_id",
    },
    on_finish: function () {
        // Store `participant_id` so that it can be reused later
        jsPsych.data.addProperties({
            participant_id: jsPsych.data.get().last().values()[0]["response"][
                "Participant_ID"
            ],
        })
    },
}

// Consent form ========================================================================
function demographics_consent(experimenter = "DEFAULT") {
    return {
        type: jsPsychHtmlButtonResponse,
        css_classes: ["narrow-text"],
        stimulus:
            // Logo and title
            "<img src='https://blogs.brighton.ac.uk/sussexwrites/files/2019/06/University-of-Sussex-logo-transparent.png' width='150px' align='right'/><br><br><br><br><br>" +
            "<h1>Informed Consent</h1>" +
            // Overview
            "<p align='left'><b>Invitation to Take Part</b><br>" +
            "You are being invited to take part in a research study to further our understanding of Human psychology. Thank you for carefully reading this information sheet. This study is being conducted by PhD candidate Robert Dickinson from the School of Psychology, University of Sussex, who is happy to be contacted (r.dickinson@sussex.ac.uk) if you have any questions.</p>" +
            // Description
            "<p align='left'><b>Why have I been invited and what will I do?</b><br>" +
            "We are surveying adults to understand how personality traits and political ideology impact effectiveness of an intervention against misinformation. This study contains various questionnaires about your personality, beliefs and ability to judge accuracy of news headlines. The whole experiment will take you <b>about 20 min</b> to complete. Please make you sure that you are in a quiet environment, and that you have time to complete it in one go.</p>" +
            // Results and personal information
            "<p align='left'><b>What will happen to the results and my personal information?</b><br>" +
            "The results of this research may be written into a scientific publication and/or PhD Thesis. Your anonymity will be ensured in the way described in the consent information below. Please read this information carefully and then, if you wish to take part, please acknowledge that you have fully understood this sheet, and that you consent to take part in the study as it is described here.</p>" +
            "<p align='left'><b>Consent</b><br></p>" +
            // Bullet points
            "<li align='left'>I understand that by signing below I am agreeing to take part in the University of Sussex research described here, and that I have read and understood this information sheet</li>" +
            "<li align='left'>I understand that my participation is entirely voluntary, that I can choose not to participate in part or all of the study, and that I can withdraw at any stage by closing the browser without having to give a reason and without being penalised in any way (e.g., if I am a student, my decision whether or not to take part will not affect my grades).</li>" +
            "<li align='left'>I understand that since the study is anonymous, it will be impossible to withdraw my data once I have completed and submitted the test/questionnaire.</li>" +
            "<li align='left'>I understand that my personal data will be used for the purposes of this research study and will be handled in accordance with Data Protection legislation. I understand that the University's Privacy Notice provides further information on how the University uses personal data in its research.</li>" +
            "<li align='left'>I understand that my collected data will be stored in a de-identified way. De-identified data may be made publically available through secured scientific online data repositories.</li>" +
            "</p>" +
            // "<p align='left'>Your participation in this research will be kept completely confidential. Your responses are entirely anonymous, and no IP address or any identifiers is collected.</p>" +
            // "<p align='left'><b>By participating, you agree to follow the instructions and provide honest answers.</b> If you do not wish to participate this survey, simply close your browser.</p>" +
            // "<p>Please note that various checks will be performed to ensure the validity of the data.<br>We reserve the right to return your participation or prorate reimbursement should we detect non-valid responses (e.g., random pattern of answers, instructions not read, ...).</p>"
            "<p align='left'><br><sub><sup>For further information about this research, or if you have any concerns, please contact Robert Dickinson (r.dickinson@sussex.ac.uk). This research has been approved (*****BLANK*******) by the ethics board of the School of Psychology. The University of Sussex has insurance in place to cover its legal liabilities in respect of this study.</sup></sub></p>",

        choices: ["I read, understood, and I consent"],
        data: { screen: "consent" },
        on_finish: function () {
            jsPsych.data.addProperties({
                experimenter: experimenter,
            })
        },
    }
}

// Intervention ========================================================================
function demographics_consent(experimenter = "DEFAULT") { //I can tell I need to somehow change this line, but not sure what exactly goes here. a new function named 'intervention'? a new variable for me to define like for the thank you screen?
    return {
        type: jsPsychHtmlButtonResponse,
        css_classes: ["narrow-text"],
        stimulus:
            // Logo and title
            "<img src='https://www.medialiteracyireland.ie/wp-content/uploads/2023/04/bad-news-2.png' width='150px' align='right'/><br><br><br><br><br>" +
            "<h1>Intervention: Bad News Game</h1>" +
            // Overview
            "<p align='left'><b>Playing the Game</b><br>" +
            "After carefully reading the instructions on this page, please leave this page open and click on the link below to the Bad News Game. Please play the game for 15 minutes while leaving this tab open.</p>" +
            // Description
            "<p align='left'><b>What will I do?</b><br>" +
            "Please play the game for 15 minutes, then return to this page and hit 'continue'.</p>" +
            
            "<p align='left'><br><sub><sup>https://www.getbadnews.com/books/english/</sup></sub></p>",

        choices: ["I have played the Bad News Game for 15 minutes and am ready to continue"],
        data: { screen: "intervention" },
        on_finish: function () {
            jsPsych.data.addProperties({
                experimenter: experimenter,
            })
        },
    }
}


// Thank you ========================================================================
var demographics_waitdatasaving = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
        "<p>Done! now click on 'Continue' and <b>wait until your responses have been successfully saved</b> before closing the tab.</p> ",
    choices: ["Continue"],
    data: { screen: "waitdatasaving" },
}

var demographics_endscreen = function (
    link = "https://dominiquemakowski.github.io/PHQ4R/study2/experiment/experimenter1.html"
) {
    return {
        type: jsPsychHtmlButtonResponse,
        css_classes: ["narrow-text"],
        stimulus:
            "<h1>Thank you for participating</h1>" +
            "<p>It means a lot to us. Don't hesitate to share the study by sending this link:</p>" +
            "<p><b><a href='" +
            link +
            "'>" +
            link +
            "<a/></b></p><br>" +
            "<h2>Information</h2>" +
            "<p align='left'>The purpose of this study was for us to understand how personality traits and political ideology impact effectiveness of an intervention against misinformation. Your participation in this study will be kept completely confidential.</p>" +
            "<p align='left'>If you have any questions about the project, please contact R.dickinson@sussex.ac.uk.</p>" +
            "<p><b>You can safely close the tab now.</b></p>",
        choices: ["End"],
        data: { screen: "endscreen" },
    }
}

// Demographic info ========================================================================
var demographics_multichoice = {
    type: jsPsychSurveyMultiChoice,
    preamble: "<b>Please answer the following questions:</b>",
    questions: [
        {
            prompt: "What is your gender?",
            options: ["Male", "Female", "Other"],
            name: "gender",
        },
        // {
        //     prompt: "Are you currently a student?",
        //     options: ["Yes", "No"],
        //     name: "student",
        // },
        {
            prompt: "Did you receive a COVID-19 Vaccine?",
            options: [
                "Yes",
                "No",
                "Unsure/Refuse to answer",
            ],
            name: "COVID-19 vaccination status",
        },
        {
            prompt: "What is your highest completed education level?",
            options: [
                "University (doctorate)",
                "University (master) <sub><sup>or equivalent</sup></sub>",
                "University (bachelor) <sub><sup>or equivalent</sup></sub>",
                "High school",
                "Other",
            ],
            name: "education",
        },
        // {
        //     prompt: "English level",
        //     options: ["native", "fluent", "intermediate", "beginner"],
        //     name: "english",
        // },
    ],
    data: {
        screen: "demographics_1",
    },
}

var demographics_freetext = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: "Please enter your age (in years)",
            placeholder: "e.g., '31'",
            name: "age",
        },
        {
            prompt: "Please enter your ethnicity",
            placeholder: "e.g., Caucasian",
            name: "ethnicity",
        },
    ],
    data: {
        screen: "demographics_2",
    },
}

var demographics_info = {
    timeline: [demographics_multichoice, demographics_freetext],
}

