---
title: Scenarios in Gladys
description: Learn how to setup scenarios in Gladys
layout: documentation
lang: fr
permalink: /en/installation/scenario/
---

# Scenarios in Gladys

Scenarios in Gladys are really easy. It's based on a single concept : 

- First, there is a Trigger ( an "event" ). Like "**IF** I'm going to sleep".
- Then, there are conditions "**AND** current time is more than 9PM" 
- Finally, there are actions "**THEN** turn off the lights everywhere **AND** execute this script."

All these types of triggers, conditions, and actions are defined in a special [Git repository](https://github.com/gladysassistant/Gladys-data) via a set of JSON files, and can be updated remotely in Gladys.

Then, you can create scenarios based on these types of triggers/conditions/actions directly in Gladys on the dashboard.

### Updating scenario possibilities

Go to your Gladys dashboard, then go to `Parameters`, and click on `Update Gladys data`. It will download all JSON and update scenario possibilities. 

You can update them whenever you want. Try to update 

### Creating a scenario

To create a scenario, first go the the `Scenario` panel. 

#### Click on `Create`.

You should arrive on this view. You have differents categories of triggers. Select `Alarms` here.

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-1.png" class="img-responsive" />

#### Select a trigger

Select the only trigger here "When an alarm fire". You can then either select a specific alarm, or leave it blank so it will fire on any alarm.

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-2.png" class="img-responsive" />

#### Conditions

For this example, we won't add conditions. Skip this step.

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-3.png" class="img-responsive" />

### Actions

You can now select actions you want to start when the event is triggered. Here, I will show you an example with the "Create Notification" action. Select `New Notification`.

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-5.png" class="img-responsive" />

### Actions Params

You probably want to enter manually the text of the notification, the title, the color of the notification, the icon, and which gladys user will receive the notificatioN. Scroll down and enter the informations you want to provide the action :

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-6.png" class="img-responsive" />

### Congrats !

Now save your scenario, and boom, your first scenario is created !

Just try to create an alarm ( see our tutorial on [How to create a Gladys Alarm](https://developer.gladysassistant.com/en/documentation/alarm) ), and try the scenario ! 

