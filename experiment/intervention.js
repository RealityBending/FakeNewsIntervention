// Assignement
function assign_condition() {
    condition = jsPsych.randomization.sampleWithoutReplacement(
        ["BadNews", "Tetris"],
        1
    )[0]
    return condition
}

intervention_prompt =
    // Logo and title
    "<img src='https://www.medialiteracyireland.ie/wp-content/uploads/2023/04/bad-news-2.png' width='150px' align='right'/><br><br><br><br><br>" +
    "<h1>Let's play the game!</h1>" +
    // Overview
    "<p align='left'><b>Playing the Game</b><br>" +
    "After carefully reading the instructions on this page, please leave this page open and click on the link below to the Bad News Game. Please play the game for 15 minutes while leaving this tab open.</p>" +
    // Description
    "<p align='left'><b>What will I do?</b><br>" +
    "Please play the game for 15 minutes, then return to this page and hit 'continue'.</p>" +
    // Modified link with bold, larger, and centered
    "<p align='center'><br><sub><sup><a href='https://www.getbadnews.com/books/english/' target='_blank' style='font-size: 24px; font-weight: bold;'>https://www.getbadnews.com/books/english/</a></sup></sub></p>" +
    // Next steps
    "<p align='left'><b>*Please Note*</b><br>" +
    "We will ask you some basic questions about your gameplay to ensure you actually play the game.</p>"

intervention_button =
    "I have played the Bad News Game for 15 minutes and am ready to continue"

control_prompt =
    // Logo and title
    "<img src='https://upload.wikimedia.org/wikipedia/en/b/b0/The_Tetris_Company_logo.png' width='150px' align='right'/><br><br><br><br><br>" +
    "<h1>Let's play the game!</h1>" +
    // Overview
    "<p align='left'><b>Playing the Game</b><br>" +
    "After carefully reading the instructions on this page, please leave this page open and click on the link below to Tetris. Please play the game for 15 minutes while leaving this tab open.</p>" +
    // Description
    "<p align='left'><b>What will I do?</b><br>" +
    "Please play the game for 15 minutes, then return to this page and hit 'continue'.</p>" +
    // Modified link with bold, larger, and centered
    "<p align='center'><br><sub><sup><a href='https://tetris.com/play-tetris' target='_blank' style='font-size: 24px; font-weight: bold;'>https://tetris.com/play-tetris</a></sup></sub></p>" +
    // Next steps
    "<p align='left'><b>*Please Note*</b><br>" +
    "We will ask you some basic questions about your gameplay to ensure you actually play the game.</p>"

control_button = "I have played Tetris for 15 minutes and am ready to continue"

intervention_screen = function (condition) {
    if (condition == "BadNews") {
        return {
            type: jsPsychHtmlButtonResponse,
            css_classes: ["narrow-text"],
            stimulus: intervention_prompt,
            choices: [intervention_button],
            data: { screen: "intervention" },
        }
    } else {
        return {
            type: jsPsychHtmlButtonResponse,
            css_classes: ["narrow-text"],
            stimulus: control_prompt,
            choices: [control_button],
            data: { screen: "intervention" },
        }
    }
}
