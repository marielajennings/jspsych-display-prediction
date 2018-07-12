
function definePlugin (){
var plugin = {};

plugin.info= {
	name: 'display-prediction',
	description:'This plugin displays a prediction in a visually apealing way!',
	parameters: {
  prompt1: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        no_function: false,
        description: 'This is the prompt for the first column of predictions to be displayed'
      },
  prompt2: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        no_function: false,
        description: 'This is the prompt for the second column of predictions to be displayed'
      },
	prediction1: {
        type: [jsPsych.plugins.parameterType.ARRAY],
        default: undefined,
        no_function: false,
        description: 'This is the first prediction to be displayed, in the example case this is the participant\'s native language'
      },
  prediction2: {
        type: [jsPsych.plugins.parameterType.ARRAY],
        default: undefined,
        no_function: false,
        description: 'This is the second prediction to be displayed, in the example case this is the participant\'s dialect'
      },
      quizURL: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        no_function: false,
        description: 'URL to be used with social media post'
      },
      subjectLine: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        no_function: false,
        description: 'Subject line for an email (something to do with the quiz the participant just took)'
      },
      teaserPart1: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        no_function: false,
        description: 'teaser about your results part 1'
      },
      teaserPart2: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        no_function: false,
        description: 'teaser about your results part 2'
      },
      teaserPart3: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        no_function: false,
        description: 'teaser about your results part 3'
      },

	}

}

plugin.trial= function (display_element, trial) {
  var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }


var teaserDiv = document.createElement("div")
display_element.appendChild(teaserDiv)
// var teaserP = document.createElement("p")
// teaserDiv.appendChild(teaserP)




// teaserDiv.innerHTML+=''+trial.teaserPart1+''+trial.prediction1[0]''+trial.teaserPart2''+trial.prediction2[0]''+trial.teaserPart3''


teaserDiv.innerHTML +='<p style="text-align:left;font-family:Open Sans;">'+trial.teaserPart1+''+trial.prediction1[0]+''+trial.teaserPart2+''+trial.prediction2[0]+''+trial.teaserPart3+'</p>';
console.log(trial.prediction1[0])

 //trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial); (this is only useful for jsPsych 5, if you wanted to use this plugin with it)
var prediction1 = trial.prediction1
var prediction2 = trial.prediction2


var mainDiv = document.createElement("div")
display_element.appendChild(mainDiv)

var table = document.createElement("table")
table.setAttribute("style", "border-collapse:separate;border-spacing:25px;")

mainDiv.appendChild(table);
table.innerHTML += '<tr><th id="language">'+trial.prompt1+'&nbsp;&nbsp;&nbsp;</th><th id="dialect">'+trial.prompt2+'</th></tr>';
var lengthToUse




var thStyleLang = document.getElementById("language")
thStyleLang.setAttribute("style", "padding:8px;text-align:left;font-size:15px")


var thStyleDial = document.getElementById("dialect")
thStyleDial.setAttribute("style", "padding:8px;text-align:left;font-size:15px")



if (prediction1.length>prediction2.length){
  lengthToUse = prediction1.length
 // for (i=prediction2.length; i<=prediction2.length + (prediction1.length-prediction2.length); i++){
 //  prediction2.push(' ')
 //  //I want matching numbers on both sides, but don't want to get undefined, so pushing an empty string
 // }

} else {lengthToUse = prediction2.length}

 for (var i = 0; i < lengthToUse; i++) {
  if (prediction1[i] && prediction2[i]){
table.innerHTML += '<tr><td id="language" style="padding:8px;text-align:left;font-size:17px; ">'+(i+1)+'. '+prediction1[i]+'</td><td id="dialect" style="padding:8px;text-align:left;font-size:17px">'+(i+1)+'. '+prediction2[i]+'</td></tr>'
} else if (prediction1[i] && !prediction2[i])
{
  table.innerHTML += '<tr><td id="language" style="padding:8px;text-align:left;font-size:17px">'+(i+1)+'. '+prediction1[i]+'</td></tr>'

} else if (!prediction1[i] && prediction2[i]){
  table.innerHTML += '<tr><td id="dialect" style="padding:8px;text-align:left;font-size:17px">'+(i+1)+'. '+prediction2[i]+'</td></tr>'
}
}

var buttonDiv = document.createElement('div')
buttonDiv.innerHTML+='<br><br><br>'
display_element.appendChild(buttonDiv)
var button = document.createElement('button');
button.setAttribute('type','button');
button.setAttribute('class', 'jspsych-btn')
buttonDiv.appendChild(button);
button.innerHTML=trial.buttonText;
button.addEventListener('click', () => {jsPsych.finishTrial({})});




var facebookDiv = document.createElement('div')
facebookDiv.innerHTML += '<div class="fb-share-button" data-href="https://gameswithwords.org/quizzes" data-layout="button" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgameswithwords.org%2Fquizzes&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>'
display_element.appendChild(facebookDiv)

}
return plugin;
}

jsPsych.plugins['display-prediction'] = definePlugin() ;


