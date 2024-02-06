// STAIT-5 (Zsido, 2020) ========================================================================
var stai5_items = [
    "I feel that difficulties are piling up so that I cannot overcome them",
    "I worry too much over something that really doesn't matter",
    "Some unimportant thoughts run through my mind and bothers me",
    "I take disappointments so keenly that I can't put them out of my mind",
    "I get in a state of tension or turmoil as I think over my recent concerns and interests",
]

var stai5_dimensions = ["STAI5_1", "STAI5_2", "STAI5_3", "STAI5_4", "STAI5_5"]

stai5_questions = []
for (const [index, element] of stai5_items.entries()) {
    stai5_questions.push({
        prompt: "<b>" + element + "</b>",
        name: stai5_dimensions[index],
        labels: [
            "<br>Not at all",
            "<br>Somewhat",
            "<br>Moderately so",
            "<br>Very much so",
        ],
        required: true,
    })
}

var stai5 = {
    type: jsPsychSurveyLikert,
    css_classes: ["narrow-text"],
    questions: stai5_questions,
    randomize_question_order: false,
    preamble:
        "<p style='text-align: left;'>A number of statements which people have used to describe themselves are given below. Read each statement and then circle the number at the end of the statement that indicates " +
        // "HOW YOU FEEL RIGHT NOW. " +
        "how you have been feeling <b>during the past two weeks</b>. " +
        "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</p> ",
    data: {
        screen: "questionnaire_stai5",
    },
}

// BFI-10 (Rammstedt & John 2007)
// Scoring the BFI-10 scales: Extraversion: 1R, 6; Agreeableness: 2, 7R; Conscientiousness: 3R, 8; Neuroticism: 4R, 9; Openness: 5R; 10 (R = item is reversed-scored).

var BFI10_items = [
    "I see myself as someone who is reserved", //reverse scored
    "I see myself as someone who is generally trusting", 
    "I see myself as someone who tends to be lazy", //reverse scored
    "I see myself as someone who is relaxed, handles stress well", //reverse scored
    "I see myself as someone who has few artistic interests", //reverse scored
    "I see myself as someone who is outgoing, sociable", 
    "I see myself as someone who tends to find fault with others", //reverse scored
    "I see myself as someone who does a thorough job", 
    "I see myself as someone who gets nervous easily", 
    "I see myself as someone who has an active imagination", 
]

var BFI10_dimensions = [
    "BFI10_1",
    "BFI10_2",
    "BFI10_3",
    "BFI10_4",
    "BFI10_5",
    "BFI10_6",
    "BFI10_7",
    "BFI10_8",
    "BFI10_9",
    "BFI10_10",
]

BFI10_questions = []
for (const [index, element] of BFI10_items.entries()) {
    BFI10_questions.push({
        prompt: "<b>" + element + "</b>",
        name: BFI10_dimensions[index],
        labels: [
            "<br>Disagree strongly",
            "<br>Disagree a little",
            "<br>Neither agree or disagree",
            "<br>Agree a little",
            "<br>Agree Strongly",
        ],
        required: true,
    })
}

var BFI10 = {
    type: jsPsychSurveyLikert,
    css_classes: ["narrow-text"],
    questions: BFI10_questions,
    randomize_question_order: false,
    preamble:
        "<p style='text-align: left;'>How well do the following statements describe your personality?" +
        // "HOW YOU FEEL RIGHT NOW. " +
        // "how you have been feeling <b>during the past two weeks</b>. " +
        // "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</p> ",
    data: {
        screen: "questionnaire_BFI10",
    },
}


// VSA (Very Short Authoritarianism) Scale (Bizuimic & Duckitt 2018)
var VSA_items = [
    "It’s great that many young people today are prepared to defy authority.", // reverse scored
    "What our country needs most is discipline, with everyone following our leaders in unity.", 
    "God’s laws about abortion, pornography, and marriage must be strictly followed before it is too late.",
    "There is nothing wrong with premarital sexual intercourse.", // reverse scored
    "Our society does NOT need tougher government and stricter laws.", //reverse scored
    "The facts on crime and the recent public disorders show we have to crack down harder on troublemakers if we are going to preserve law and order.",
    
]

var VSA_dimensions = ["VSA_1", "VSA_2", "VSA_3", "VSA_4", "VSA_5", "VSA_6"]

VSA_questions = []
for (const [index, element] of VSA_items.entries()) {
    VSA_questions.push({
        prompt: "<b>" + element + "</b>",
        name: VSA_dimensions[index],
        labels: [
            "<br>Very strongly disagree",
            "<br>Strongly disagree",
            "<br>Somewhat disagree",
            "<br>Slightly disagree",
            "<br>Unsure or neutral",
            "<br>Slightly agree",
            "<br>Somewhat agree",
            "<br>Strongly agree",
            "<br>Very strongly agree",
        ],
        required: true,
    })
}

var VSA = {
    type: jsPsychSurveyLikert,
    css_classes: ["narrow-text"],
    questions: VSA_questions,
    randomize_question_order: false,
    preamble:
        "<p style='text-align: left;'>Please read each statement in the following list and mark your agreement or disagreement with each statement" +
        // "HOW YOU FEEL RIGHT NOW. " +
        // "how you have been feeling <b>during the past two weeks</b>. " +
        "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</p> ",
    data: {
        screen: "questionnaire_VSA",
    },
}

// RWAS (Right-Wing Authoritarianism Scale) (Altemeyer 2007)
var RWAS_items = [
    'The established authorities generally turn out to be right about things, while the radicals and protestors are usually just "loud mouths" showing off their ignorance.',
    "Women should have to promise to obey their husbands when they get married.",
    "Our country desperately needs a mighty leader who will do what has to be done to destroy the radical new ways and sinfulness that are ruining us.",
    "Gays and lesbians are just as healthy and moral as anybody else.", //reverse scored
    "It is always better to trust the judgement of the proper authorities in government and religion than to listen to the noisy rabble-rousers in our society who are trying to create doubt in people's minds.",
    "Atheists and others who have rebelled against the established religions are no doubt every bit as good and virtuous as those who attend church regularly.", //reverse scored
    "The only way our country can get through the crisis ahead is to get back to our traditional values, put some tough leaders in power, and silence the troublemakers spreading bad ideas.",
    "There is absolutely nothing wrong with nudist camps.", //reverse scored
    "Our country needs free thinkers who have the courage to defy traditional ways, even if this upsets many people.", //reverse scored
    "Our country will be destroyed someday if we do not smash the perversions eating away at our moral fiber and traditional beliefs.",
    "Everyone should have their own lifestyle, religious beliefs, and sexual preferences, even if it makes them different from everyone else.", //reverse scored
    'The "old-fashioned ways" and the "old-fashioned values" still show the best way to live.',
    "You have to admire those who challenged the law and the majority's view by protesting for women's abortion rights, for animal rights, or to abolish school prayer.", //reverse scored
    "What our country really needs is a strong, determined leader who will crush evil, and take us back to our true path.",
    'Some of the best people in our country are those who are challenging our government, criticizing religion, and ignoring the "normal way things are supposed to be done."', //reverse scored
    "God's laws about abortion, pornography and marriage must be strictly followed before it is too late, and those who break them must be strongly punished.",
    "There are many radical, immoral people in our country today, who are trying to ruin it for their own godless purposes, whom the authorities should put out of action.",
    'A "woman\'s place" should be wherever she wants to be. The days when women are submissive to their husbands and social conventions belong strictly in the past.', //reverse scored
    "Our country will be great if we honor the ways of our forefathers, do what the authorities tell us to do, and get rid of the \"rotten apples\" who are ruining everything.",
    "There is no \"one right way\" to live life; everybody has to create their own way.", //reverse scored
    "Homosexuals and feminists should be praised for being brave enough to defy \"traditional family values.\"", //reverse scored
    "This country would work a lot better if certain groups of troublemakers would just shut up and accept their group's traditional place in society.",
]

var RWAS_dimensions = [
    "RWAS_1",
    "RWAS_2",
    "RWAS_3",
    "RWAS_4",
    "RWAS_5",
    "RWAS_6",
    "RWAS_7",
    "RWAS_8",
    "RWAS_9",
    "RWAS_10",
    "RWAS_11",
    "RWAS_12",
    "RWAS_13",
    "RWAS_14",
    "RWAS_15",
    "RWAS_16",
    "RWAS_17",
    "RWAS_18",
    "RWAS_19",
    "RWAS_20",
    "RWAS_21",
    "RWAS_22",
]
    

RWAS_questions = []
for (const [index, element] of RWAS_items.entries()) {
    RWAS_questions.push({
        prompt: "<b>" + element + "</b>",
        name: RWAS_dimensions[index],
        labels: [
            "<br>Very strongly disagree",
            "<br>Strongly disagree",
            "<br>Moderately disagree",
            "<br>Slightly disagree",
            "<br>Feel neutral",
            "<br>Slightly agree",
            "<br>Moderately agree",
            "<br>Strongly agree",
            "<br>Very strongly agree",
        ],
        required: true,
    })
}

var RWAS = {
    type: jsPsychSurveyLikert,
    css_classes: ["narrow-text"],
    questions: RWAS_questions,
    randomize_question_order: false,
    preamble:
        "<p style='text-align: left;'>The test consists of twenty two opinions and for each you must indicate how much you agree with it. The test should take 3 - 5 minutes to complete." +
        // "HOW YOU FEEL RIGHT NOW. " +
        // "how you have been feeling <b>during the past two weeks</b>. " +
        // "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</p> ",
    data: {
        screen: "questionnaire_RWAS",
    },
}

// IAS questionnaire ========================================================================
var IAS_items = [
    "I can always accurately perceive when my heart is beating fast",
    "I can always accurately perceive when I am hungry",
    "I can always accurately perceive when I am breathing fast",
    "I can always accurately perceive when I am thirsty",
    "I can always accurately perceive when I need to urinate",
    "I can always accurately perceive when I need to defecate",
    "I can always accurately perceive when I encounter different tastes",
    "I can always accurately perceive when I am going to vomit",
    "I can always accurately perceive when I am going to sneeze",
    "I can always accurately perceive when I am going to cough",
    "I can always accurately perceive when I am hot/cold",
    "I can always accurately perceive when I am sexually aroused",
    "I can always accurately perceive when I am going to pass wind",
    "I can always accurately perceive when I am going to burp",
    "I can always accurately perceive when my muscles are tired/sore",
    "I can always accurately perceive when I am going to get a bruise",
    "I can always accurately perceive when I am in pain",
    "I can always accurately perceive when my blood sugar is low",
    "I can always accurately perceive when someone is touching me affectionately rather than non-affectionately",
    "I can always accurately perceive when something is going to be ticklish",
    "I can always accurately perceive when something is going to be itchy",
]
var IAS_dimensions = [
    "IAS_1",
    "IAS_2",
    "IAS_3",
    "IAS_4",
    "IAS_5",
    "IAS_6",
    "IAS_7",
    "IAS_8",
    "IAS_9",
    "IAS_10",
    "IAS_11",
    "IAS_12",
    "IAS_13",
    "IAS_14",
    "IAS_15",
    "IAS_16",
    "IAS_17",
    "IAS_18",
    "IAS_19",
    "IAS_20",
    "IAS_21",
]

var ias_questions = []
for (const [index, element] of IAS_items.entries()) {
    ias_questions.push({
        prompt: "<b>" + element + "</b>",
        name: IAS_dimensions[index],
        ticks: ["Strongly Disagree", "Strongly Agree"],
        required: true,
        min: 0,
        max: 1,
        step: 0.01,
        slider_start: 0.5,
    })
}

var ias = {
    type: jsPsychMultipleSlider,
    questions: ias_questions,
    randomize_question_order: true,
    preamble:
        "<h2>About your body sensations...</h2>" +
        "<p style='text-align: left;'>Below are several statements regarding how accurately you can perceive specific bodily sensations. Please rate on the scale how well you believe you can perceive each specific signal.</p>" +
        "<p style='text-align: left;'>For example, if you often feel you need to urinate and then realise you do not need to when you go to the toilet, you would rate your accuracy perceiving this bodily signal as low.</p>" +
        "<p style='text-align: left;'>Please only rate how well you can perceive these signals without using external cues. For example, if you can only perceive how fast your heart is beating when you measure it by taking your pulse, this would <i>not</i> count as accurate internal perception.</p><br /><br/> ",
    require_movement: false,
    slider_width: 700,
    data: {
        screen: "questionnaire_ias",
    },
}

// BDI-II ========================================================================
var bdi2 = {
    type: jsPsychSurveyMultiChoice,
    css_classes: ["narrow-text"],
    preamble:
        "<p style='text-align: left;'>This questionnaire consists of 21 groups of statements. Please read each group of statements carefully. And then pick out the one statement in each group that best describes the way you have been feeling <b>during the past two weeks</b>, including today. If several statements in the group seem to apply equally well, circle the highest number for that group.</p>",
    questions: [
        {
            prompt: "<b>1. Sadness</b>",
            options: [
                "0. I do not feel sad",
                "1. I feel sad much of the time",
                "2. I am sad all the time",
                "3. I am so sad or unhappy that I can't stand it",
            ],
            name: "BDI2_1",
            required: true,
        },
        {
            prompt: "<b>2. Pessimism</b>",
            options: [
                "0. I am not discouraged about my future",
                "1. I feel more discouraged about my future than I used to",
                "2. I do not expect things to work out for me",
                "3. I feel my future is hopeless and will only get worse",
            ],
            name: "BDI2_2",
            required: true,
        },
        {
            prompt: "<b>3. Past Failure</b>",
            options: [
                "0. I do not feel like a failure",
                "1. I have failed more than I should have",
                "2. As I look back, I see a lot of failures",
                "3. I feel I am a total failure as a person",
            ],
            name: "BDI2_3",
            required: true,
        },
        {
            prompt: "<b>4. Loss of Pleasure</b>",
            options: [
                "0. I get as much pleasure as I ever did from the things I enjoy",
                "1. I don't enjoy things as much as I used to",
                "2. I get very little pleasure from the things I used to enjoy",
                "3. I can't get any pleasure from the things I used to enjoy",
            ],
            name: "BDI2_4",
            required: true,
        },
        {
            prompt: "<b>5. Guilty Feelings</b>",
            options: [
                "0. I don't feel particularly guilty",
                "1. I feel guilty over many things I have done or should have done",
                "2. I feel quite guilty most of the time",
                "3. I feel guilty all of the time",
            ],
            name: "BDI2_5",
            required: true,
        },
        {
            prompt: "<b>6. Punishment Feelings</b>",
            options: [
                "0. I don't feel I am being punished",
                "1. I feel I may be punished",
                "2. I expect to be punished",
                "3. I feel I am being punished",
            ],
            name: "BDI2_6",
            required: true,
        },
        {
            prompt: "<b>7. Self-Dislike</b>",
            options: [
                "0. I feel the same about myself as ever",
                "1. I have lost confidence in myself",
                "2. I am disappointed in myself",
                "3. I dislike myself",
            ],
            name: "BDI2_7",
            required: true,
        },
        {
            prompt: "<b>8. Self-Criticalness</b>",
            options: [
                "0. I don't criticize or blame myself more than usual",
                "1. I am more critical of myself than I used to be",
                "2. I criticize myself for all of my faults",
                "3. I blame myself for everything bad that happens",
            ],
            name: "BDI2_8",
            required: true,
        },
        {
            prompt: "<b>9. Suicidal Thoughts or Wishes</b>",
            options: [
                "0. I don't have any thoughts of killing myself",
                "1. I have thoughts of killing myself, but I would not carry them out",
                "2. I would like to kill myself",
                "3. I would kill myself if I had the chance",
            ],
            name: "BDI2_9",
            required: true,
        },
        {
            prompt: "<b>10. Crying</b>",
            options: [
                "0. I don't cry anymore than I used to",
                "1. I cry more than I used to",
                "2. I cry over every little thing",
                "3. I feel like crying, but I can't",
            ],
            name: "BDI2_10",
            required: true,
        },
        {
            prompt: "<b>11. Agitation</b>",
            options: [
                "0. I am no more restless or wound up than usual",
                "1. I feel more restless or wound up than usual",
                "2. I am so restless or agitated, it's hard to stay still",
                "3. I am so restless or agitated that I have to keep moving or doing something",
            ],
            name: "BDI2_11",
            required: true,
        },
        {
            prompt: "<b>12. Loss of Interest</b>",
            options: [
                "0. I have not lost interest in other people or activities",
                "1. I am less interested in other people or things than before",
                "2. I have lost most of my interest in other people or things",
                "3. It's hard to get interested in anything",
            ],
            name: "BDI2_12",
            required: true,
        },
        {
            prompt: "<b>13. Indecisiveness</b>",
            options: [
                "0. I make decisions about as well as ever",
                "1. I find it more difficult to make decisions than usual",
                "2. I have much greater difficulty in making decisions than I used to",
                "3. I have trouble making any decisions",
            ],
            name: "BDI2_13",
            required: true,
        },
        {
            prompt: "<b>14. Worthlessness</b>",
            options: [
                "0. I do not feel I am worthless",
                "1. I don't consider myself as worthwhile and useful as I used to",
                "2. I feel more worthless as compared to others",
                "3. I feel utterly worthless",
            ],
            name: "BDI2_14",
            required: true,
        },
        {
            prompt: "<b>15. Loss of Energy</b>",
            options: [
                "0. I have as much energy as ever",
                "1. I have less energy than I used to have",
                "2. I don't have enough energy to do very much",
                "3. I don't have enough energy to do anything",
            ],
            name: "BDI2_15",
            required: true,
        },
        {
            prompt: "<b>16. Changes in Sleeping Pattern</b>",
            options: [
                "0. I have not experienced any change in my sleeping pattern",
                "1a. I sleep somewhat more than usual",
                "1b. I sleep somewhat less than usual",
                "2a. I sleep a lot more than usual",
                "2b. I sleep a lot less than usual",
                "3a. I sleep most of the day",
                "3b. I wake up 1-2 hours early and can't get back to sleep",
            ],
            name: "BDI2_16",
            required: true,
        },
        {
            prompt: "<b>17. Irritability</b>",
            options: [
                "0. I am not more irritable than usual",
                "1. I am more irritable than usual",
                "2. I am much more irritable than usual",
                "3. I am irritable all the time",
            ],
            name: "BDI2_17",
            required: true,
        },
        {
            prompt: "<b>18. Changes in Appetite</b>",
            options: [
                "0. I have not experienced any change in my appetite",
                "1a. My appetite is somewhat less than usual",
                "1b. My appetite is somewhat greater than usual",
                "2a. My appetite is much less than before",
                "2b. My appetite is much greater than usual",
                "3a. I have no appetite at all",
                "3b. I crave food all the time",
            ],
            name: "BDI2_18",
            required: true,
        },
        {
            prompt: "<b>19. Concentration Difficulty</b>",
            options: [
                "0. I can concentrate as well as ever",
                "1. I can't concentrate as well as usual",
                "2. It's hard to keep my mind on anything for very long",
                "3. I find I can't concentrate on anything",
            ],
            name: "BDI2_19",
            required: true,
        },
        {
            prompt: "<b>20. Tiredness or Fatigue</b>",
            options: [
                "0. I am no more tired or fatigued than usual",
                "1. I get more tired or fatigued more easily than usual",
                "2. I am too tired or fatigued to do a lot of the things I used to do",
                "3. I am too tired or fatigued to do most of the things I used to do",
            ],
            name: "BDI2_20",
            required: true,
        },
        {
            prompt: "<b>21. Loss of Interest in Sex</b>",
            options: [
                "0. I have not noticed any recent change in my interest in sex",
                "1. I am less interested in sex than I used to be",
                "2. I am much less interested in sex now",
                "3. I have lost interest in sex completely",
            ],
            name: "BDI2_21",
            required: true,
        },
    ],
    data: {
        screen: "questionnaire_bdi2",
    },
}
