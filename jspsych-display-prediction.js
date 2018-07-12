
function definePlugin (){
var plugin = {};

plugin.info= {
	name: 'display-prediction',
	description:'This plugin displays a prediction in a visually apealing way!',
	parameters: {
  prompt1: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        description: 'This is the prompt for the first column of predictions to be displayed'
      },
  prompt2: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: undefined,
        description: 'This is the prompt for the second column of predictions to be displayed'
      },
	prediction1: {
        type: [jsPsych.plugins.parameterType.ARRAY],
        default: undefined,
        description: 'This is the first prediction to be displayed, in the example case this is the participant\'s native language'
      },
  prediction2: {
        type: [jsPsych.plugins.parameterType.ARRAY],
        default: undefined,
        description: 'This is the second prediction to be displayed, in the example case this is the participant\'s dialect'
      },
      quizURL: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: null,
        description: 'URL to be used with social media post'
      },
      subjectLine: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: null,
        description: 'Subject line for an email (something to do with the quiz the participant just took)'
      },
      teaserPart1: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: '',
        description: 'teaser about your results part 1'
      },
      teaserPart2: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: '',
        description: 'teaser about your results part 2'
      },
      teaserPart3: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: '',
        description: 'teaser about your results part 3'
      },
 buttonText: {
        type: [jsPsych.plugins.parameterType.STRING],
        default: 'Finish',
        description: 'Button label'
      },
  socialSharing: {
        type: [jsPsych.plugins.parameterType.BOOL],
        default: undefined,
        description: 'Whether the plugin will lead to demographic questions or show social media sharing buttons...'
      },
  encourageDemographics:{
        type: [jsPsych.plugins.parameterType.STRING],
        default: '',
        description: 'Text to encourage participants to answer demographic questions.'
      },
	}

}

plugin.trial= function (display_element, trial) {
  var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }



if (trial.teaserPart1 != '' || trial.teaserPart2 != '' || trial.teaserPart3!= ''){

//assembling the trial
var teaserDiv = document.createElement("div")
display_element.appendChild(teaserDiv)

teaserDiv.innerHTML +='<p style="font-family:Arial;">'+trial.teaserPart1+''+trial.prediction1[0]+''+trial.teaserPart2+''+trial.prediction2[0]+''+trial.teaserPart3+'</p>';
}

var teaser = ''+trial.teaserPart1+''+trial.prediction1[0]+''+trial.teaserPart2+''+trial.prediction2[0]+''+trial.teaserPart3+'';
 //trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial); (this is only useful for jsPsych 5, if you wanted to use this plugin with it)
var prediction1 = trial.prediction1
var prediction2 = trial.prediction2


var mainDiv = document.createElement("div")
display_element.appendChild(mainDiv)

var table = document.createElement("table")
table.setAttribute("style", "border-collapse:separate;border-spacing:25px;margin: 0 auto;")

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
table.innerHTML += '<tr><td id="language" style="padding:8px;text-align:left;font-size:17px;margin: 0 auto;">'+(i+1)+'. '+prediction1[i]+'</td><td id="dialect" style="padding:8px;text-align:left;font-size:17px">'+(i+1)+'. '+prediction2[i]+'</td></tr>'
} else if (prediction1[i] && !prediction2[i])
{
  table.innerHTML += '<tr><td id="language" style="padding:8px;text-align:left;font-size:17px">'+(i+1)+'. '+prediction1[i]+'</td></tr>'

} else if (!prediction1[i] && prediction2[i]){
  table.innerHTML += '<tr><td id="dialect" style="padding:8px;text-align:left;font-size:17px">'+(i+1)+'. '+prediction2[i]+'</td></tr>'
}
}

if (trial.socialSharing){


///create mail button
var mailDiv = document.createElement('div');
mailDiv.setAttribute("height", "50");
mailDiv.setAttribute("width", "50");

var mailTo = 'mailto:?body='+teaser+'&subject='+trial.subjectLine+''

mailDiv.innerHTML+='<a href="mailto:?body='+teaser+'&subject='+trial.subjectLine+'" class="button">Email your results!</a>'

display_element.appendChild(mailDiv)
} else {


var encourageDemographics = document.createElement('div')
encourageDemographics.innerHTML  += '<p style="text-align:center"> <strong>'+trial.encourageDemographics+'</strong></p> '
display_element.appendChild(encourageDemographics)


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




// ///create Facebook link
// var fbDiv = document.createElement('div');
// fbDiv.setAttribute("height", "50");
// fbDiv.setAttribute("width", "50");
// var fbimg = document.createElement('img')
// fbimg.src = 'fb.png' //for quick install, will want to do something better with URLs
// fbimg.setAttribute("height", "50");
// fbimg.setAttribute("width", "50");
// var fblink = document.createElement('a');
// fblink.href = 'https://www.facebook.com/sharer.php?u='+quizURL
// fblink.appendChild(fbimg);
// fbDiv.appendChild(fblink);

// ///create twitter link
// var twitterDiv = document.createElement('div');
// twitterDiv.setAttribute("height", "50");
// twitterDiv.setAttribute("width", "50");
// var twitterimg = document.createElement('img')
// twitterimg.src = 'twitter.png' //for quick install, will want to do something better with URLs
// twitterimg.setAttribute("height", "50");
// twitterimg.setAttribute("width", "50");
// var twitterlink = document.createElement('a');
// twitterlink.href = 'https://twitter.com/intent/tweet?url=' + quizURL + '&text=' + teaser(prediction1, prediction2);
// twitterlink.appendChild(twitterimg);
// twitterDiv.appendChild(twitterlink);

// ///create weibo link
// var weiboDiv = document.createElement('div');
// weiboDiv.setAttribute("height", "50");
// weiboDiv.setAttribute("width", "50");
// var weiboimg = document.createElement('img')
// weiboimg.src = 'weibo.png' //for quick install, will want to do something better with URLs
// weiboimg.setAttribute("height", "50");
// weiboimg.setAttribute("width", "50");
// var weibolink = document.createElement('a');
// weibolink.href = 'http://service.weibo.com/share/share.php?text=%E6%B5%8B%E8%AF%95&title=' teaser(prediction1, prediction2) + '&url=' + quizURL;
// weibolink.appendChild(weiboimg);
// weiboDiv.appendChild(weibolink);


}
return plugin;
}

jsPsych.plugins['display-prediction'] = definePlugin() ;


