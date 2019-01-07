---
title: L'API Node.js Gladys
description: La documentation de l'API Node.js de Gladys 
layout: documentation
lang: fr
image: /assets/images/presentation/gladys-og-image.png
permalink: /fr/installation/nodejs-api/
---

# L'API Node.js Gladys

Que vous soyez dans des scripts, ou dans un module Gladys, vous pouvez accéder à toutes les fonctions de l'API Gladys.

Ces fonctions sont regroupés sous la variable `gladys` accessible partout.

La documentation de l'API Node.js Gladys est disponible ici => [https://documentation.gladysassistant.com/jsdoc/](https://documentation.gladysassistant.com/jsdoc/)

### Core

Ces fonctions font partie du `core` de Gladys, ce sont des fonctions qui intéragissent avec des concepts clés du système. 

Pour voir toutes les catégories du core, voir [sur le github](https://github.com/gladysassistant/Gladys/tree/master/api/core).

Prenons un exemple, dans le core vous avez un dossier `alarm`, il contient tout le code relatif aux alarmes.

Rentrons dans ce dossier, nous voyons plusieurs fichiers, dont un `index.js`. Ce fichier expose les fonctions du module d'alarme du core.

Comme on peut le voir, le module alarm expose 6 fonctions : 

```javascript
module.exports.cancel = require('./alarm.cancel.js');
module.exports.create = require('./alarm.create.js');
module.exports.delete = require('./alarm.delete.js');
module.exports.init = require('./alarm.init.js');
module.exports.update = require('./alarm.update.js');
module.exports.schedule = require('./alarm.schedule.js');
```

Ainsi, dans un script/module, on pourra faire : 

```javascript
gladys.alarm.cancel(...)
gladys.alarm.create(...)
etc..
```

Et cette logique est la même pour chaque petit module du core !