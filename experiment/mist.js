var mist_fake_covid = [
    { item: "fake covid 1", name: "MIST_fake_covid_1" },
    { item: "fake covid 2", name: "MIST_fake_covid_2" },
    { item: "fake covid 3", name: "MIST_fake_covid_3" },
    { item: "fake covid 4", name: "MIST_fake_covid_4" },
]

var mist_real_covid = [
    { item: "real covid 1", name: "MIST_real_covid_1" },
    { item: "real covid 2", name: "MIST_real_covid_2" },
    { item: "real covid 3", name: "MIST_real_covid_3" },
    { item: "real covid 4", name: "MIST_real_covid_4" },
]

var mist_fake_general = [
    { item: "fake general 1", name: "MIST_fake_general_1" },
    { item: "fake general 2", name: "MIST_fake_general_2" },
    { item: "fake general 3", name: "MIST_fake_general_3" },
    { item: "fake general 4", name: "MIST_fake_general_4" },
]

var mist_real_general = [
    { item: "real general 1", name: "MIST_real_general_1" },
    { item: "real general 2", name: "MIST_real_general_2" },
    { item: "real general 3", name: "MIST_real_general_3" },
    { item: "real general 4", name: "MIST_real_general_4" },
]

function mist_randomize(mist_fake_covid, mist_real_covid, mist_fake_general, mist_real_general) {
    fake_covid = jsPsych.randomization.shuffle(mist_fake_covid)
    real_covid = jsPsych.randomization.shuffle(mist_real_covid)
    fake_general = jsPsych.randomization.shuffle(mist_fake_general)
    real_general = jsPsych.randomization.shuffle(mist_real_general)

    pre_fake_covid = fake_covid.slice(0, fake_covid.length / 2)
    pre_real_covid = real_covid.slice(0, real_covid.length / 2)
    pre_fake_general = fake_general.slice(0, fake_general.length / 2)
    pre_real_general = real_general.slice(0, real_general.length / 2)
    post_fake_covid = fake_covid.slice(fake_covid.length / 2)
    post_real_covid = real_covid.slice(real_covid.length / 2)
    post_fake_general = fake_general.slice(fake_general.length / 2)
    post_real_general = real_general.slice(real_general.length / 2)

    pre = pre_fake_covid.concat(pre_real_covid, pre_fake_covid, pre_real_general, post_fake_general)
    post = post_fake_covid.concat(
        post_real_covid,
        post_fake_covid,
        post_real_general,
        post_fake_general
    )

    pre = jsPsych.randomization.shuffle(pre)
    post = jsPsych.randomization.shuffle(post)

    return { pre: pre, post: post }
}

// Format MIST items
function mist_format(mist_items) {
    // Each mist_items is an object with 'item' and 'name' keys
    var mist_questions = []
    for (const [index, element] of mist_items.entries()) {
        mist_questions.push({
            prompt: "<b>" + element["item"] + "</b>",
            name: element["name"],
            labels: ["False", "True"], // Remove when slider is implemented
            // ticks: ["Strongly Disagree", "Strongly Agree"],
            // required: true,
            // min: 0,
            // max: 1,
            // step: 0.01,
            // slider_start: 0.5,
        })
    }
    return mist_questions
}

function make_mist_questionnaire(
    mist_fake_covid,
    mist_real_covid,
    mist_fake_general,
    mist_real_general
) {
    items = mist_randomize(mist_fake_covid, mist_real_covid, mist_fake_general, mist_real_general)

    mist_questions_pre = mist_format(items["pre"])
    mist_questions_post = mist_format(items["post"])

    return {
        pre: {
            // type: jsPsychSurveySlider,
            type: jsPsychSurveyLikert,
            questions: mist_questions_pre,
            preamble: "MIST PRE Instructions",
            require_movement: false,
            slider_width: 700,
            data: {
                screen: "questionnaire_mist_pre",
            },
        },
        post: {
            // type: jsPsychSurveySlider,
            type: jsPsychSurveyLikert,
            questions: mist_questions_post,
            preamble: "MIST POST Instructions",
            require_movement: false,
            slider_width: 700,
            data: {
                screen: "questionnaire_mist_post",
            },
        },
    }
}
