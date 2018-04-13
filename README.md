<h1 align="center">
  <a href="http://ok-human.surge.sh/"><img src="https://cloud.githubusercontent.com/assets/423755/15766173/a8776e70-28f0-11e6-9a0b-c56d9d7b1e7c.png" alt="Ok Human"></a>
  <br>
  Ok Human
  <br>
  <br>
</h1>

<h4 align="center">Ok Google? Ok Human. The tables have turned. Do your job, Human!</h4>

<p align="center">
	<a href="#built-with"><img src="https://cloud.githubusercontent.com/assets/423755/15766759/029ff286-28f7-11e6-94a4-317988704d8d.png"></a>
</p>

## Introduction

**Ok Human** is a fun little app to see what it feels like to be on the other side of "Ok Google". Yeah, it's all fun and games until you too are berated when you don't give the correct answer to a question or mishear that your assistance is needed.

You can check out the latest version by visiting [ok-human.surge.sh](http://ok-human.surge.sh/) &mdash; it requires microphone access.

:warning: This is an [Angular Attack 2016 entry](https://www.angularattack.com/entries/3332-cyk) so the implementation is a bit rushed and needs some work.


## Instructions

![prompt](https://cloud.githubusercontent.com/assets/423755/15766286/b2cbe83c-28f1-11e6-80d1-5025d10a2182.gif)

1. Click the red prompt button because, *of course, your assistance was needed*, right?
2. Oh, was that ill-timed?
3. Wait for your prompt, *human*!
4. Speak your answer (via mic) to the question that was asked.

Specific questions and responses are chosen at random, so the experience can vary from session to session.

**Note:** You must grant microphone access permission the first time you are answering -- timing might be off so you may have to reload and try again.

Tested in Chrome 50 (OSX and Android OS)

View the screencast: [https://youtu.be/GyjRM4YpPOg](https://youtu.be/GyjRM4YpPOg)

## Screenshot

<p align="center">
	<img src="http://i.imgur.com/UdF1uss.gif" alt="Demo">
	
</p>

## How to Contribute

### Install dependencies

```
$ npm install
```
### Run app

```
$ npm start
```

## Built with

 Kept things simple and built on the Angular2 Quickstart project provided by Angular Attack
 
*  [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (speech recogition and synthesis)
*  [Materialize CSS](http://materializecss.com/)
*  [Material icons](https://design.google.com/icons/)
*  [Angular2](https://angular.io/)
*  [RxJS 5](https://github.com/ReactiveX/rxjs)
*  ["Ok Google" prompt sound](https://www.reddit.com/r/Nexus5/comments/3u2sne/the_sound_effect_when_i_say_ok_google/)

## License

MIT
