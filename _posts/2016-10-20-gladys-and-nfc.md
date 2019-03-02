---
layout: post
title: How to control Gladys with NFC tags
description: How to control Gladys without using the web app ? In this tutorial, we'll use Tasker and NFC tags to trigger scenario in Gladys !
author: Pierre-Gilles Leymarie
lang: en
locale: en_US
image: /assets/images/presentation/nfc-cover.jpg
categories:
- blog
permalink: /en/article/gladys-and-nfc
---

<div class="alert alert-info" role="alert" style="padding: 10px;">This article works fully with Gladys v3 !</div>

How can we interact with Gladys without opening Gladys web app ? With NFC tags ! NFC tags can be sticked where we want, and by just touching them with our phone, we can trigger events and scenario in Gladys. 

We'll see in this tutorial how to configure NFC tags to use them with Gladys.

## Hardware

- A few [NFC tags like those](https://developer.gladysassistant.com/en/link/tag-nfc).
- An Android NFC compatible smartphone ( unfortunately this doesn't work on an iPhone )

## Install Tasker

[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en) is a great app that allows you execute actions based on triggers and conditions using any sensors of your phone. In this tutorial, we are going to use this app to make HTTP requests on Gladys when a NFC tag is touched by your phone. The app cost something like 2$99, but compared to what the app does, that's a great price.

- Install first Tasker
- Go to preferences, on the `Misc` tab, then tick `Allow External Access` (So that the Trigger app we'll use next will be able to execute Tasker tasks)

<img alt="Screenshot Android tasker" src="/assets/images/articles/gladys-and-nfc/screenshot-allow-access-en.jpg" width="400" class="img-responsive" />
 
## Create a task in Tasker

We are now going to create a task in Tasker.

### How to tell Gladys you are going to sleep ?

I have a simple scenario I use everyday: I have a NFC tag sticked on my nightstand, and when I'm going to sleep, I simply put my phone on it to tell Gladys it's sleep time. Then Gladys execute my "Going to Sleep" scenario (She turns off the lights, ... ).

**To create this task :** 

- Go to the `tasks` tab in Tasker, and click on `+` at the bottom of the screen to create a new task. Give it a name, for example here `Going to sleep`.
- Click again on the `+` button to add actions to this task.
- Select `Variables` then `Variable Set`. ( this will allows us to set Gladys API Token )
- Fill the name input with `%Token` and in the `To` field, copy past your Gladys API token. This token can be found in the `Parameters` => `Security` view in Gladys.

<img alt="Screenshot Gladys token" src="/assets/images/articles/gladys-and-nfc/token-gladys-v3.png" class="img-responsive" />

<img alt="Screenshot set token tasker" src="/assets/images/articles/gladys-and-nfc/screenshot-set-token-en.jpg" width="400" class="img-responsive" />

- Go back on the action list and create a new action by clicking again on the `+` button. Select `Net` then `POST HTTP`. 
- Fill the `Server:port` field with the IP and the port of your Gladys instance. Example : `YOUR_RASPBERRY_PI_IP` => `192.168.0.12`. If your Gladys is listening on a specific port, put it at the end of the IP like this: `192.168.0.12:8080`. 
- Fill the `Path` field with the API route you want to call in Gladys. Here we want to create a Gladys event, so the route will simply be : `/event`. We need to add the security token at the end, it will become : `/event?token=%Token`.
- Then, fill the `Data/File` field with the following lines : 

```
code=going-to-sleep
user=1
```

You can put any event you want in the following list : [https://github.com/gladysassistant/gladys-data/blob/master/events/en.json](https://github.com/gladysassistant/gladys-data/blob/master/events/en.json). 

The `user` field is your User ID. You can find this ID in Gladys in `Parameters` => `My Account`.


<img alt="Screenshot edit task" src="/assets/images/articles/gladys-and-nfc/screenshot-edit-task-en.jpg" width=400" class="img-responsive" />

- Go back to the task list, your task is ready ! You can test it by simply pressing the `Play` button.

**Note:** If this task gives you an error in Gladys saying that this `EventType` does not exist, it means that you don't have the last eventType list. You can update this list by going to the `Parameters` of Gladys, and by clicking on `Update Gladys data`.

## Install Trigger

[Trigger](https://play.google.com/store/apps/details?id=com.jwsoft.nfcactionlauncher) is a free Android app that allows you to execute action when an NFC tag is detected by your phone. We'll use this app to start the Tasker task we created before when a specific NFC tag is detected.

- Install Trigger
- Create a new triger by clicking on the `+` button, then select `NFC`.
- You can now define restrictions based on the hour of the day and your Wi-Fi connexion. Select what's the best for you and click on `Finish`.  
- Add now an action, select `Tasker` => `Tasker task`, and select the task you have previously created
- Select `Next`, then `Finish`, and finally put your phone on the NFC tag you want to configure.
- Your NFC tag is now ready to use !

<img alt="Screenshot write NFC" src="/assets/images/articles/gladys-and-nfc/screenshot-write-nfc.jpg" width="400" class="img-responsive" />

## To conclude

Thanks to NFC, possibilities are endless. Any zone of your house can become a physical trigger to a Gladys scenario with a simple NFC tag.

To tell you a little story on this, I have a NFC tag on the wall of my flat. When my phone touch it, it starts the `romantic` mode : Lights goes red, and a little jazzy music is played in the living room. 

And you, how are you using NFC at home ? 