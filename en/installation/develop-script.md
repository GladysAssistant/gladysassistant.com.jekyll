---
title: How to write a Gladys Script
description: Learn how to develop a Gladys script with JavaScript!
layout: documentation
lang: en
permalink: /en/installation/develop-script/
---

# How to write a Gladys Script

Scripts in Gladys allows you to write little JavaScript programs with access to the full API of Gladys.

### Creating a script

To create a script, go to `Script` in Gladys dashboard, then click on `Create`. 

<img alt="Create Gladys script" src="/assets/images/documentation/develop-gladys-script/script-1.png" class="img-responsive" />

Then, you can add any JavaScript code you want (you can't require things, see the Sandbox section in this tutorial)

If you want just to log something in the logs, just write : 

```javascript
console.log('Hey, it just works !');
```

<img alt="Create Gladys script" src="/assets/images/documentation/develop-gladys-script/script-2.png" class="img-responsive" />

You can try the script by hitting the `Start Script` button !

### Sandbox

Scripts are running in a sandbox, you don't have access to the full Node.js native API ( like `require` for example ). You can only call Gladys functions. This is for security purpose.

### Available functions

You call all Gladys functions, and all function exposed by Gladys modules. Functions are listed in the [Gladys Node.js API documentation](https://developer.gladysassistant.com/en/documentation/api-nodejs-gladys). 