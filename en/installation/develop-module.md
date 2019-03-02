---
title: How to develop a Gladys module
description: Learn how to develop a Gladys module with Node.js !
layout: documentation
lang: en
permalink: /en/installation/develop-module/
---

# How to develop a Gladys module

## The Four Pillars of Gladys development 

Before teaching you how to write a Gladys module, I would like to begin with a quick introduction of four important points you should focus on when developing for Gladys.

See this as "Guidelines" ! 

### Design

In my opinion, design is an important part of a product. If you are working on a very powerful Porsche, but the car is ugly, nobody will buy it, even if performance are mind blowing ! 

Gladys front-end, ux are things I'm constantly trying to improve. That's most people love in the project, you find Gladys cool because it looks like a cool project.

Then, when you are working on a module, try to be as clear, as design as Gladys is ! Because by releasing your module, you will become the showcase of Gladys, and we want that the experience in these modules should be as good, if not better, as in Gladys.

If you need help when working on your icons, mockups for the Gladys module repository, don't hesitate to ping me on Twitter to ask for help !

### Performance

Take the opposite example of a gorgeous Porsche, but with the motor of a motorcycle : That's not sexy anymore !

In Gladys, I've tried to make the core as powerful as possible. 

- Scenarios, actions, API calls, everything is executed in parallel in Gladys ( because Node.js is asynchronous, and we are using ES6 Promises ). If you want to turn on 10 lights at the same time in your house, Gladys will call the 10 lights in parallel, not sequentially. This means your scenario can call plenty of devices, without needing to wait for each device to answer.
- I'm trying to cache everything that can be cached in Gladys. For example, the "Param" table, which is used to save key-value associations ( to store API key for example ) is entirely cached in RAM, because this table has not much data in it, and we need to have these values the faster we can.
- Database calls should be minimized in a "compatibility module" ( a module which add a compatibility with a device ). Remember that we are not working here on a classical back-end. We are working on a product which is controlling "real life devices". So if your module needs 10 SQL requests to turn on a light, and call the light after 500ms, that's not a good experience for the user. Gladys is making one SQL request to get all the informations to turn on a device, and then calls the associated module with all the informations, so most of the time your compatibility module does not need to make any SQL request.
- Assets ( js, css ) are compiled ( concat + minimify ) so that the front-end does not need to ask for 200 files.
 
And a lot more that I will not talk about here ! ;)
 
### Minimalism

It comes with design and performance. In your modules, try to work on a few key features, and do them well.

Always remember :

> “Quality is much better than quantity. One home run is much better than two doubles.” - Steve Jobs

Keep a clear UI, without useless informations. Keep configurations views in configurations dashboard, do not show them on the main dashboard ! 

### Open

Gladys expose all the functions of its API so that you can use them in scenarios. You should too in your module ! The goal is to have a rich library of triggers/conditions/actions to build the most complete scenario possible ! 

Gladys is fully open-source, your module should too.

## What's a Gladys module ?

A Gladys module is a small program loaded by Gladys which will add features to Gladys. There are several types of Gladys modules :

- Compatibility modules : These modules add supports to a specific type of devices ( lights, outlets, sensors ). They don't handle the UI, they don't offer a way for the user to control these device. The only thing these modules can do, is declaring theses devices to Gladys, and offering a function so Gladys can control them. That's all. The goal is to centralize all the devices in one view, and to be "device agnostic". For sensors, your module should simply save the values in the generic table "DeviceState", so that Gladys can display the data in the same view for each sensor.

- Notification module : These modules add a way for Gladys to communicate with the user. For example, the module which allows Gladys to speak is a notification module, and the PushBullet module is a notification module too. In Gladys UI, you can then order all notification modules, so Gladys can try different way of talking with you. For example : First, talking in your house (if your are at home), then sending you a desktop notification (if you are connected on your laptop), and finally sending you a notification on your smartphone.

- Les modules widgets: Ces modules ont juste à déclarer à Gladys le widget HTML qu’ils veulent afficher, et fournir les assets dont ils ont besoin ( css, js, images ). Par exemple un widget de météo simple sans backend est un module widget.

- Widget modules : These modules only add widgets to Gladys, to display everything you want on the main dashboard.

All theses modules are sharing the same architecture ! Let's see how to build a Gladys module.

## How to build a Gladys module ?

A Gladys module is simply a folder inside the `api/hooks` folder. The name of the module is defined by the name of the folder.

### Hello world

You can create a very simple module with just one file at the root of the folder, `index.js`, for example for a `test` module :

```
hooks
--- test
------ index.js
```

With the `index.js` file :

```javascript
module.exports = function(sails) {
	
	return {
	
	};
};
```

Here we are ! We have our first module in Gladys !

The return at the end is used to return all functions you want to expose in Gladys.


For example, imagine I want to expose a `getWeather()` function, I can do it like this :

```javascript
module.exports = function(sails) {
	
	function getWeather() {
		// do something here
	}
	
	return {
		getWeather: getWeather
	};
};
```

Then, in a Gladys script, I can call the function like this :

```
gladys.modules.test.getWeather()
```

### Module skeleton

We are not going to write all our functions in `index.js`.

You should create a `lib` folder where all your functions will be stored : 

```
hooks
--- test
------ lib
--------- getWeather.js
------ index.js
```

The `getWeather.js` file will looks like this :

```javascript
module.exports = function getWeather() {
 // do something here
};
```

And here is the `index.js` file :

```javascript
module.exports = function(sails) {
	
	var getWeather = require('./lib/getWeather.js');
	
	return {
		getWeather: getWeather
	};
};
```

### 100% Promise-based

#### What's a Promise ?

If you don't know ES6, it's the last specification of JavaScript, and it adds a lot of awesome features. Don't hesitate to read on it ( For example : [Top 10 ES6 Features Every Busy JavaScript Developer Must Know](http://webapplog.com/es6/) )

A big problem in JavaScript a few years ago, was the well-known "callback hell" ( when you have a lot of nested callback, your code becomes unreadable ).

A solution to this problem is called "Promise", and it looks like this:


```javascript
doSomething()
  .then(function(){
  	return doAnotherThing();
  })
  .then(function(){
  	return doSomething();
  })
  .catch(function(err){
    // something bad happened
  });
```

As you can see, we don't have any nested callback, everything is chained and the flow is easy to read.

#### How to return a Promise in your module

We can take our `getWeather()` function again :

```javascript
var Promise = require('bluebird');

module.exports = function getWeather() {
	return new Promise(function(resolve, reject) {
		// async work here
		var valueToReturn = 12;
		
		resolve(valueToReturn);
		
		// if something fails, reject(new Error('bad bad'));
	});
};
```

Then, in script we can call our function like this :

```javascript
gladys.modules.test.getWeather()
  .then(function(value){
  	// value is equal to 12 normally !
  })
  .catch(function(err){
  
    // if something fails it goes there !
  });
```

Gladys is working 100% with Promise, so always return a Promise !

### Functions to implement

Gladys need a few functions to communicate with your module. These functions are not required.

#### Install/uninstall

When your module will be installed, Gladys will call the `install()` function of your module at next boot of Gladys. It's useful if you need to setup your module only once. 

Uninstall function is called when your module is uninstalled.

#### Exec

For compatibility modules, you need to implement an `exec()` function which will be called when Gladys wants to control the device you are handling in your module.

For example, imagine you are writing a module which can control a type of lamp, when the user will press the `on` button on the UI, Glady will call the exec function of your module will this parameter : 

```json
{
   deviceType: {
      id: 1,
      identifier: 'xxx',
      type: 'binary',
      name: 'Lamp'
   },
   state: {
     value: 1
   }
}
```

In your exec function, you will just need to turn on the light identified by the `identifier` field. For example, in my Philips Hue module, each light is identified by an integer ( first lamp is number 1, second lamp 2 ... ). So I just saved the integer in the `identifier` field. Don't hesitate to look at the Philips Hue module repository on [GitHub](https://github.com/gladysassistant/Gladys-hue) to see how to do this.

**Note:** Never ask users to interact directly with your module. They need to only use `gladys.deviceType.exec(...)` function, so that Gladys can update in real time values everywhere ( in the UI, in DB )

#### setup

`setup` function is called when the user click on the 'Configure' button on the UI in the module view. This is useful if you need to automatically search for devices/refresh the configuration. For example, in the Philips Hue module, when you click on the config button, the function looks for Philips bulbs and configure everything.

#### command

If your module is not a compatibility module, and adds a feature, you probably wants the user to be able to interact with your module by speaking to Gladys. 

You need to add sentences to Gladys to train the classifier and implement the `command` function. This functions will be called when your sentence will be classified. 

### The front-end part

Gladys is using Angular 1 for the front part. If you want to add widgets on the dashboard, you can simply declare your box to Gladys, and create a angular 1 module in a `assets` folder of your module. 

All files in your `assets` folder will be injected in Gladys by a grunt tasks. JS and CSS will be minified with the rest.

### i18n

Your module should be international since the beginning! English first, french if you can.

For the front-end, you have access to [Angular translate](https://angular-translate.github.io/) in Gladys. 



