// MIST20 (Maertens et al. 2023)

// ***NOTE*** it appears that some headlines in the MIST20 differ from the MIST16, meaning there are more than 20 total validated headlines
// there appears to be a total of 31 headlines across the MIST20 and MIST16
// this means we could perhaps split that 31 into two questionnaires for pre-post, with 15 in each or 16/15

// We recommend to calculate and report all five scores of the Verification done framework:
// - V (Veracity Discernment): V can be calculated by scoring each of the responses on a binary 0 (incorrect) or 1 (correct) metric and taking the sum of the score.
// - r (Real News Detection): The sum of all scores for the real news items results in the r score.
// - f (Fake News Detection): The sum of all scores for the fake news items results in the f score.
// - d (Distrust): To calculate d, all responses must be scored on a binary 0 (not fake news) or 1 (fake news) metric, independent of whether the response is correct or incorrect. The sum of this amount of fake news judgements should then be subtracted by 10 (MIST-20), 8 (MIST-16), or 4 (MIST-8), and this results in the distrust score. If the resulting score is below 0, the score should be corrected to 0.
// - n (Naïvité): To calculate n, all responses must be scored on a binary 0 (not real news) or 1 (real news), independent of whether the response is correct or incorrect. The sum of this amount of real news judgements should then be subtracted by 10 (MIST-20), 8 (MIST-16), or 4 (MIST-8), and this results in the naïvité score. If the resulting score is below 0, the score should be corrected to 0.

// additional MIST questions noted here
//     "US Hispanic Population Reached New High in 2018, But Growth Has Slowed", //real
//    "Taiwan Seeks to Join Fight Against Global Warming", //real
//    "About a Quarter of Large US Newspapers Laid off Staff in 2018", //real
//    "Majority in US Still Want Abortion Legal, with Limits", //real
//    "Most Americans Say It's OK for Professional Athletes to Speak out Publicly about Politics", //real
//    "United Nations Gets Mostly Positive Marks from People Around the World", //real
//     "The Government Is Actively Destroying Evidence Related to the JFK Assassination", //fake
//    "A Small Group of People Control the World Economy by Manipulating the Price of Gold and Oil", //fake
//    "The Government Is Conducting a Massive Cover-Up of Their Involvement in 9/11", //fake
//     "Climate Scientists' Work Is 'Unreliable', a 'Deceptive Method of Communication'", //fake
//    "Left-Wingers Are More Likely to Lie to Get a Good Grade", //fake

var mist_items = [
    "Democrats More Supportive than Republicans of Federal Spending for Scientific Research", //real
    "International Relations Experts and US Public Agree: America Is Less Respected Globally", //real
    "Reflecting a Demographic Shift, 109 US Counties Have Become Majority Nonwhite Since 2000", //real
    "Government Officials Have Illegally Manipulated the Weather to Cause Devastating Storms", //fake
    "Morocco's King Appoints Committee Chief to Fight Poverty and Inequality", //real
    "Hyatt Will Remove Small Bottles from Hotel Bathrooms", //real
    "The Government Is Knowingly Spreading Disease Through the Airwaves and Food Supply", //fake
    "Government Officials Have Manipulated Stock Prices to Hide Scandals", //fake
    "New Study: Left-Wingers Are More Likely to Lie to Get a Higher Salary", //fake
    "US Support for Legal Marijuana Steady in Past Year", //real
    "One-in-Three Worldwide Lack Confidence in Non-Governmental Organizations", //real
    "New Study: Clear Relationship Between Eye Color and Intelligence", //fake
    "The Corporate Media Is Controlled by the Military-Industrial Complex: The Major Oil Companies Own the Media and Control Their Agenda", //fake
    "The Government Is Manipulating the Public's Perception of Genetic Engineering in Order to Make People More Accepting of Such Techniques", //fake
    "Global Warming Age Gap: Younger Americans Most Worried", //real
    "Ebola Virus 'Caused by US Nuclear Weapons Testing', New Study Says", //fake
    "Republicans Divided in Views of Trump's Conduct, Democrats Are Broadly Critical", //real
    "Certain Vaccines Are Loaded with Dangerous Chemicals and Toxins", //fake
    "Attitudes Toward EU Are Largely Positive, Both Within Europe and Outside It", //real
    "Left-Wing Extremism Causes 'More Damage' to World Than Terrorism, Says UN Report", //fake
]

let mist_dimensions = [
    //this will need to be changed to reflect the dimensions of the MIST20, not sure how it's currently split into ABCD. May also need to extend to 31 and split
    "MIST_Real_A_1",
    "MIST_Real_A_2",
    "MIST_Real_A_3",
    "MIST_Real_A_4",
    "MIST_Real_A_5",
    "MIST_Real_B_6",
    "MIST_Real_B_7",
    "MIST_Real_B_8",
    "MIST_Fake_C_9",
    "MIST_Fake_C_10",
    "MIST_Fake_C_11",
    "MIST_Fake_C_12",
    "MIST_Fake_C_13",
    "MIST_Fake_D_14",
    "MIST_Fake_D_15",
    "MIST_Fake_D_16",
    "MIST_Fake_C_17",
    "MIST_Fake_D_18",
    "MIST_Fake_D_19",
    "MIST_Fake_D_20",
]

var mist_questions = []
for (const [index, element] of mist_items.entries()) {
    mist_questions.push({
        prompt: element,
        name: mist_dimensions[index],
    })
}

var mist_questionnaire = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: "html",
                prompt:
                    "<p><b>Please categorize the following news headlines as either 'Fake News' or'Real News'.</b></p>" +
                    "<p><i>Some items may look credible or obviously false at first sight, but may actually fall in the opposite category. However, for each news headline, only one category is correct.</i></p>",
            },
            {
                type: "likert-table",
                prompt: " ",
                statements: () => jsPsych.randomization.shuffle(mist_questions),
                options: ["Real", "Fake"],

                required: true,
            },
        ],
    ],
    data: {
        screen: "questionnaire_mist",
    },
}

// GCBS15 (Brotherton et al. 2013)

var GCBS15_items = [
    "The government is involved in the murder of innocent citizens and/or well-known public figures, and keeps this a secret", 
    "The power held by heads of state is second to that of small groups who really control world politics",
    "Secret organizations communicate with extraterrestrials, but keep this fact from the public", 
    "The spread of certain viruses and/or diseases is the result of the deliberate, concealed efforts of some organization", 
    "Groups of scientists manipulate, fabricate, or suppress evidence in order to deceive the public", 
    "The government permits or perpetrates acts of terrorism on its own soil, disguising its involvement",
    "A small, secret group of people is responsible for making all major world decisions, such as going to war", 
    "Evidence of alien contact is being concealed from the public",
    "Technology with mind-control capacities is used on people without their knowledge",
    "New and advanced technology which would harm current industry is being suppressed",
    "The government uses people as patsies to hide its involvement in criminal activity",
    "Certain significant events have been the result of the activity of a small group who secretly manipulates world events",
    "Some UFO sightings and rumors are planned or staged in order to distract the public from real alien contact",
    "Experiments involving new drugs or technologies are routinely carried out on the public without their knowledge or consent",
    "A lot of important information is deliberately concealed from the public out of self-interest",

]

var GCBS15_dimensions = [
    "GCBS15_1",
    "GCBS15_2",
    "GCBS15_3",
    "GCBS15_4",
    "GCBS15_5",
    "GCBS15_6",
    "GCBS15_7",
    "GCBS15_8",
    "GCBS15_9",
    "GCBS15_10",
    "GCBS15_11",
    "GCBS15_12",
    "GCBS15_13",
    "GCBS15_14",
    "GCBS15_15",
]

GCBS15_questions = []
for (const [index, element] of GCBS15_items.entries()) {
    GCBS15_questions.push({
        prompt: "<b>" + element + "</b>",
        name: GCBS15_dimensions[index],
        labels: [
            "<br>Definitely not true",
            "<br>Probably not true",
            "<br>Not sure/cannot decide",
            "<br>Probably true",
            "<br>Definitely true",
        ],
        required: true,
    })
}

var GCBS15_questionnaire = {
    type: jsPsychSurveyLikert,
    css_classes: ["narrow-text"],
    questions: GCBS15_questions,
    randomize_question_order: true,
    preamble:
        "<p style='text-align: left;'>There is often debate about whether or not the public is told the whole truth about various important issues. This brief survey is designed to assess your beliefs about some of these subjects. Please indicate the degree to which you believe each statement is likely to be true on the following scale: Definitely not true; Probably not true; Not sure/cannot decide; Probably true; Definitely true",
    // "HOW YOU FEEL RIGHT NOW. " +
    // "how you have been feeling <b>during the past two weeks</b>. " +
    // "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</p> ",
    data: {
        screen: "questionnaire_GCBS15",
    },
}


// Political self-identification (ANES)
var ANES = {
    type: jsPsychSurveyMultiChoice,
    css_classes: ["narrow-text"],
    preamble:
        "<p style='text-align: left;'>This questionnaire consists of 2 forms of political ideology self-identification. Please read each prompt carefully, and then pick out the one identifier in each group that best describes your political ideology.</p>",
    questions: [
        {
            prompt: "<b>1. Liberal-Conservative Self-Identification</b>",
            options: [
                "0. Extremely Liberal",
                "1. Liberal",
                "2. Slightly Liberal",
                "3. Moderate, Middle of Road",
                "4. Don't Know, Haven't Thought",
                "5. slightly Convervative",
                "6. Conservative",
                "7. Extremely Conservative",
            ],
            name: "ANES_1",
            required: true,
        },
        {
            prompt: "<b>2. Political party of Registration</b>",
            options: [
                "0. Democratic Party",
                "1. Republican Party",
                "2. None or /'independent/'",
                "3. Other",
            ],
            name: "ANES_2",
            required: true,
        },
    ],
    data: {
        screen: "questionnaire_ANES",
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
        "<p style='text-align: left;'>How well do the following statements describe your personality?",
    // "HOW YOU FEEL RIGHT NOW. " +
    // "how you have been feeling <b>during the past two weeks</b>. " +
    // "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</p> ",
    data: {
        screen: "questionnaire_BFI10",
    },
}

// VSA (Very Short Authoritarianism) Scale (Bizuimic & Duckitt 2018)
var VSA_items = [
    "It's great that many young people today are prepared to defy authority.", // reverse scored
    "What our country needs most is discipline, with everyone following our leaders in unity.",
    "God's laws about abortion, pornography, and marriage must be strictly followed before it is too late.",
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
    'Our country will be great if we honor the ways of our forefathers, do what the authorities tell us to do, and get rid of the "rotten apples" who are ruining everything.',
    'There is no "one right way" to live life; everybody has to create their own way.', //reverse scored
    'Homosexuals and feminists should be praised for being brave enough to defy "traditional family values."', //reverse scored
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
        "<p style='text-align: left;'>This questionnaire consists of twenty two opinions and for each please indicate how much you agree with it.",
    // "HOW YOU FEEL RIGHT NOW. " +
    // "how you have been feeling <b>during the past two weeks</b>. " +
    // "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe your present feelings best.</p> ",
    data: {
        screen: "questionnaire_RWAS",
    },
}
