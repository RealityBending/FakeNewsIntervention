// https://github.com/jspsych/jsPsych/discussions/1690

var countdown_trial = {
    type: 'html-button-response',
    stimulus: '<p>The next part of the experiment will start in <span id="clock">1:00</span>.',
    choices: ['Continue'],
    on_load: function(){
      var wait_time = 1 * 60 * 1000; // in milliseconds
      var start_time = performance.now();
      document.querySelector('button').disabled = true;
      var interval = setInterval(function(){
        var time_left = wait_time - (performance.now() - start_time);
        var minutes = Math.floor(time_left / 1000 / 60);
        var seconds = Math.floor((time_left - minutes*1000*60)/1000);
        var seconds_str = seconds.toString().padStart(2,'0');
        document.querySelector('#clock').innerHTML = minutes + ':' + seconds_str
        if(time_left <= 0){
          document.querySelector('#clock').innerHTML = "0:00";
          document.querySelector('button').disabled = false;
          clearInterval(interval);
        }
      }, 250)
    }
  }
  
  jsPsych.init({
    timeline: [countdown_trial]
  })


// below this is a second example
// https://github.com/jspsych/jsPsych/discussions/2673

  var animal = {
    type: jsPsychSurveyText,
    questions: [
    {prompt: '<p style="font-size:40px;">List all the ANIMALS you can in 3 minutes.</p>'}
  ]
  }

var animal_loop = {
    on_load: countDown,
    timeline: [animal],
    loop_function: function(data){
      var getTime = new Date().getTime();
      var timePassedCounter = getTime - startTime;

        if(timePassedCounter < 15000){
          console.log("timePassed: " + timePassedCounter);
            return true;
        } else {
          console.log("timePassed: " + timePassedCounter);
            startTime = new Date().getTime();
            return false;
        }
    }
}