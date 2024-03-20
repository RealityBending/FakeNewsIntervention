var mist_fake_covid = [
    "fake covid 1",
    "fake covid 2",
    "fake covid 3",
    "fake covid 4",
]

var mist_real_covid = [
    "real covid 1",
    "real covid 2",
    "real covid 3",
    "real covid 4",
]

var mist_fake_general = [
    "fake general 1",
    "fake general 2",
    "fake general 3",
    "fake general 4",
]

var mist_real_general = [
    "real general 1",
    "real general 2",
    "real general 3",
    "real general 4",
]

function mist_randomize(
    mist_fake_covid,
    mist_real_covid,
    mist_fake_general,
    mist_real_general
) {
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

    pre = pre_fake_covid.concat(
        pre_real_covid,
        pre_fake_general,
        pre_real_general
    )
    post = post_fake_covid.concat(
        post_real_covid,
        post_fake_general,
        post_real_general
    )

    pre = jsPsych.randomization.shuffle(pre)
    post = jsPsych.randomization.shuffle(post)

    return { pre: pre, post: post }
}

// Make Mist Items
function make_mist_questionnaire_pre(
    mist_fake_covid,
    mist_real_covid,
    mist_fake_general,
    mist_real_general
) {
    var mist_questions_pre = []
    items = mist_randomize(
        mist_fake_covid,
        mist_real_covid,
        mist_fake_general,
        mist_real_general
    )["pre"]
    for (const [index, element] of items.entries()) {
        mist_questions_pre.push({
            prompt: "<b>" + element + "</b>",
            // name: element,
            // ticks: ["Strongly Disagree", "Strongly Agree"],
            // required: true,
            // min: 0,
            // max: 1,
            // step: 0.01,
            // slider_start: 0.5,
        })
    }
    return mist_questions_pre
}

function mist_questionnaire_pre() {
    return {
        type: jsPsychSurveySlider,
        questions: function () {
            return make_mist_questionnaire_pre()
        },
        // questions: [{ prompt: "blabla" }],
        preamble: "Something somethign isntrctions",
        require_movement: false,
        slider_width: 700,
        data: {
            screen: "questionnaire_mist_pre",
        },
    }
}
