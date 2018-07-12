##jspsych-display-prediction plugin

The display prediction plugin takes as input 2 arrays of "predictions" and displays those in a table with 2 columns.

###Parameters

The following table lists the parameters associated with this plugin. Parameters with the default value of *undefined* must be specified. 

| Parameter| Type| Default Value| Description|
| ---------|:---:|:------------:|:-----------|
|prediction1|array|*undefined*|An array containing the predictions you want displayed in the first column. 
|prediction3|array|*undefined*|An array containing the predictions you want displayed in the second column.|buttonText|string|*undefined*|The text you want to use for the button that allows the participant to continue to the next trial.
|prompt1|string|*undefined*|The  title of the first column of predictions.
|prompt2|string|*undefined*|The  title of the second column of predictions.
|quizURL|string|*undefined*|The quiz URL to be used for social media sharing.
|subjectLine|string|*undefined*|The subject line to be used for emails when results are shared via email.
|teaserPart1|string|*undefined*|First part of the teaser text that will appear near the top of the page.
|teaserPart2|string|*undefined*|Second part of the teaser text that will appear near the top of the page.
|teaserPart3|string|*undefined*|Third part of the teaser text that will appear near the top of the page.

###Data Generated
This plugin generates no data.

###Example

```
var test = {
  type:'display-prediction',
  prompt1:"Our top guesses for your native language:",
  prompt2:"Our top guesses for your dialect:",
  prediction1:['Some Guess 1', 'Some Guess 2', 'Some Guess 3'],
  prediction2:['Some Guess', 'Another Guess'],
  buttonText:'Finish',
  quizURL:'http://www.gameswithwords.org/WhichEnglish/',
  subjectLine: 'Mapping English grammar around the world.',
  teaserPart1: "I helped GamesWithWords.org train their algorithm to guess which English I speak (http://www.gameswithwords.org/WhichEnglish/). It guessed that I speak ",
  teaserPart2:" and that my native language is ",
  teaserPart3:". Which English do you speak?"

}


```

produces:


![alt text][logo]
[logo]: https://github.com/marielajennings/jspsych-display-prediction/raw/master/pic1.png "Logo Title Text 2"



