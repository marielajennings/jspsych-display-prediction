var teaser = function(p1, p2){
  // edit me as needed
  return "I helped GamesWithWords.org train their algorithm to guess which English I speak (http://www.gameswithwords.org/WhichEnglish/). It guessed that I speak " + p1 + " and that my native language is " + p2 + "Which English do you speak?";
}
var subjectline = 'Mapping English grammar around the world.'
var quizURL = 'http://www.gameswithwords.org/WhichEnglish/' //URL to quiz

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
      }

	}

}

plugin.trial= function (display_element, trial) {
  var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }

 //trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial); (this is only useful for jsPsych 5, if you wanted to use this plugin with it)
var prediction1 = trial.prediction1
var prediction2 = trial.prediction2


var mainDiv = document.createElement("div")
display_element.appendChild(mainDiv)

var table = document.createElement("table")

mainDiv.appendChild(table);
table.innerHTML += '<tr><th id="language">'+trial.prompt1+'&nbsp;&nbsp;&nbsp;</th><th id="dialect">'+trial.prompt2+'</th></tr>';
var lengthToUse




var thStyleLang = document.getElementById("language")
thStyleLang.setAttribute("style", "padding:8px;text-align:left;font-size:25px")


var thStyleDial = document.getElementById("dialect")
thStyleDial.setAttribute("style", "padding:8px;text-align:left;font-size:25px")



if (prediction1.length>prediction2.length){
  lengthToUse = prediction1.length
 // for (i=prediction2.length; i<=prediction2.length + (prediction1.length-prediction2.length); i++){
 //  prediction2.push(' ')
 //  //I want matching numbers on both sides, but don't want to get undefined, so pushing an empty string
 // }

} else {lengthToUse = prediction2.length}

 for (var i = 0; i < lengthToUse; i++) {
  if (prediction1[i] && prediction2[i]){
table.innerHTML += '<tr><td id="language" style="padding:8px;text-align:left;font-size:17px">'+(i+1)+'. '+prediction1[i]+'</td><td id="dialect" style="padding:8px;text-align:left;font-size:17px">'+(i+1)+'. '+prediction2[i]+'</td></tr>'
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

///create mail button
var mailDiv = document.createElement('div');
mailDiv.setAttribute("height", "50");
mailDiv.setAttribute("width", "50");
var mailimg = document.createElement('img')
mailimg.src = 'mail.png' //for quick install, will want to do something better with URLs
mailimg.setAttribute("height", "50");
mailimg.setAttribute("width", "50");
var maillink = document.createElement('a');
maillink.href = 'mailto:?subject=' + subjectline + '&amp;body=' + teaser(prediction1, prediction2);
maillink.appendChild(mailimg);
mailDiv.appendChild(maillink);

///create Facebook link
var fbDiv = document.createElement('div');
fbDiv.setAttribute("height", "50");
fbDiv.setAttribute("width", "50");
var fbimg = document.createElement('img')
fbimg.src = 'fb.png' //for quick install, will want to do something better with URLs
fbimg.setAttribute("height", "50");
fbimg.setAttribute("width", "50");
var fblink = document.createElement('a');
fblink.href = 'https://www.facebook.com/sharer.php?u='+quizURL
fblink.appendChild(fbimg);
fbDiv.appendChild(fblink);

///create twitter link
var twitterDiv = document.createElement('div');
twitterDiv.setAttribute("height", "50");
twitterDiv.setAttribute("width", "50");
var twitterimg = document.createElement('img')
twitterimg.src = 'twitter.png' //for quick install, will want to do something better with URLs
twitterimg.setAttribute("height", "50");
twitterimg.setAttribute("width", "50");
var twitterlink = document.createElement('a');
twitterlink.href = 'https://twitter.com/intent/tweet?url=' + quizURL + '&text=' + teaser(prediction1, prediction2);
twitterlink.appendChild(twitterimg);
twitterDiv.appendChild(twitterlink);

///create weibo link
var weiboDiv = document.createElement('div');
weiboDiv.setAttribute("height", "50");
weiboDiv.setAttribute("width", "50");
var weiboimg = document.createElement('img')
weiboimg.src = 'weibo.png' //for quick install, will want to do something better with URLs
weiboimg.setAttribute("height", "50");
weiboimg.setAttribute("width", "50");
var weibolink = document.createElement('a');
weibolink.href = 'http://service.weibo.com/share/share.php?text=%E6%B5%8B%E8%AF%95&title=' teaser(prediction1, prediction2) + '&url=' + quizURL;
weibolink.appendChild(weiboimg);
weiboDiv.appendChild(weibolink);

return plugin;
}

jsPsych.plugins['display-prediction'] = definePlugin() ;


