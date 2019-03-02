---
title: Développer un module Gladys
description: Apprennez à développer un module Gladys !
layout: documentation
lang: fr
image: /assets/images/presentation/gladys-og-image.png
permalink: /fr/installation/develop-module/
---

# Développer un module Gladys

## Les quatres piliers du développement Gladys

Avant de vous commencer à vous expliquer ce qu'est un module Gladys, je voudrais définir ici les quatres valeurs qui me tiennent à coeur en développant Gladys, et que vous devez aussi prendre en compte dans le développement de modules pour que l'ensemble soit harmonieux !

Voyez ça comme des "guidelines" de développement ;) 

### Design

A mon sens, le design est un des aspects le plus important d'un produit. Si vous concevez une Porsche extrêmement puissante, mais que vous la designez comme une Twingo, elle n'attirera personne, qu'importe sa performance. 

L'interface de Gladys, le site du projet, les mockups d'interface présent dans la communication Gladys sur internet sont des éléments sur lesquels je passe du temps. C'est ce qui attire beaucoup de gens sur le projet, et c'est ce qui fait que Gladys est Gladys et pas une simple box domotique !

Ainsi, en développant des modules, pensez à cet aspect, travaillez l'UI et faites en sorte que l'expérience utilisateur soit top :) Car vos modules deviendront la vitrine de Gladys.

Si vous avez besoin d'aide pour faire l'icône de votre module, pour travailler le design de celui-ci, n'hésitez surtout pas à venir vers moi, je préfère passer un peu de temps avec chacun pour qu'on construise ensemble un produit qui ressemble à quelque chose plutôt que certains soient bloqués par des simples questions de design ! 

### Performance

Prenons l'exemple inverse, mettez un moteur de Twingo dans une Porsche : Moins cool d'un coup non ? :D

Dans Gladys, j'ai essayé d'optimiser au maximum les performances afin que tout soit le plus rapide possible pour l'utilisateur. 

De nombreux mécanismes ont été mis en place : 

- Les scénarios, actions, appels API, absolument tout est effectué en parallèle dans Gladys ( grâce au caractère asynchrone de Node.js et au Promise d'ES6 ). Si vous allumez dix lampes en même temps, les dix lampes seront contactées en même temps, et non pas les unes à la suite des autres, ce qui fait la différence niveau fluidité !
- Un maximum de cache est mis en place à tous niveaux. La table paramètres par exemple, qui sert à sauver des associations clé-valeurs ( pour enregistrer des clés d'API de l'utilisateur par exemple ) est entièrement gardée en cache en RAM lors de l'exécution de Gladys ( il y a très peu d'entrée dans cette table ) pour garantir des performances maximales lors de l'accès aux valeurs.
- Les appels à la base de données doivent être minimisés au maximum dans les modules de compatibilités. Pensez bien qu'ici on ne créé pas un back-end d'un serveur classique, on travaille sur un produit qui contrôle des appareils physiques. Alors si vous ne voulez pas que votre lampe mette 500ms de délai à s'allumer, ne faites pas de modules nécessitant 10 requêtes SQL juste pour pouvoir allumer une lampe ! Pour des modules de compatibilités, généralement toutes les informations sont transmises par Gladys à la fonction du module, ainsi vous n'avez normalement aucunes requêtes SQL à faire, et les performances sont maximales :)
- Les assets ( js, css ) sont naturellement concaténés et minimifiés dans un fichier unique, pour éviter de faire 200 appels HTTP dans le front web.

Et pleins d'autres choses que je ne détaillerais pas ici !
 
### Minimalisme

Cela va avec le design et les performances, dans vos modules, n'essayez pas d'en faire trop, essayez de vous concentrer sur quelques features clés bien travaillées. 

Essayez de garder une interface claire, et sans superflue. Les paramètres de configurations ne doivent pas apparaître sur le dashboard, mais seulement dans la vue de configuration du module.

### Ouverture

Gladys expose ses fonctions afin de permettre à l'utilisateur de s'en servir dans les scénarios. Vous devez faire de même, pensez à déclarer toute fonction qui pourrait être utile à l'utilisateur dans un scénario. 

L'objectif est d'avoir une bibliothèque très riche d'actions/déclencheurs/conditions qui permettent à l'utilisateur de faire des scénarios les plus complets possibles.

De plus, Gladys étant open-source, vos modules doivent l'être aussi !

## Qu’est ce qu’un module Gladys ?

Un module Gladys est un petit morceau de code qui va apporter des fonctionnalités à Gladys. Il y a plusieurs types de modules Gladys :

- Les modules de compatibilités : Ces modules apportent la compatibilité avec un certain type de périphériques ( lampes, prises, capteurs, télévisions ). Ils ne gèrent pas l’affichage, et n’offrent aucuns moyens direct à l’utilisateur de contrôler le périphérique. Ces modules vont juste déclarer à Gladys les périphériques présents dans le logement, et c’est Gladys ensuite qui s’occupe d’offrir à l’utilisateur une interface de gestion. Ces modules vont aussi remonter de l’information, qui sera ensuite affichée par Gladys. Par exemple, un module de gestion de la consommation va déclarer un capteur de consommation d’énergie, et va remonter périodiquement les informations à Gladys qui va les enregistrer en base, et va gérer l’affichage des données.

- Les modules de notifications: Ces modules vont ajouter des moyens de communiquer avec l’utilisateur à Gladys. Par exemple, le module de voix Gladys est un module de communication, un module PushBullet pour envoyer des notifications sur le smartphone est aussi un module de notifications. Ces modules de notifications doivent se déclarer à Gladys pour qu’ensuite l’utilisateur puisse hiérarchiser les différents moyens de communications possibles selon ses préférences. Par exemple: 1) Parler dans mon logement si je suis chez moi 2) M’envoyer une notification desktop si je suis sur PC. 3) sinon, m’envoyer une notification smartphone

- Les modules widgets: Ces modules ont juste à déclarer à Gladys le widget HTML qu’ils veulent afficher, et fournir les assets dont ils ont besoin ( css, js, images ). Par exemple un widget de météo simple sans backend est un module widget.

Tout ces modules partagent la même architecture, et un module peut bien entendu être de plusieurs types ! C’était surtout ici pour vous montrer ce qu’il est possible de faire.

## En pratique

Alors, en pratique, c'est quoi un module Gladys ?

Un module est un simple dossier qui se place dans le dossier `api/hooks` du dossier contenant Gladys.

### Un module minimal

Un module minimal ne contient qu'un fichier, `index.js`, par exemple si l'on créé un module test :

```
hooks
--- test
------ index.js
```

Avec comme fichier index.js :

```javascript
module.exports = function(sails) {
	
	return {
	
	};
};
```

Voilà, nous avons notre premier module ! 

Le return à la fin de la fonction retourne les fonctions qu'il va exposer dans Gladys.


Par exemple, imaginons que je créé une fonction `getWeather()`, je peux l'exposer de la sorte :

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

Ainsi, dans gladys je peux désormais appeler cette fonction dans un script de la sorte : 

```
gladys.modules.test.getWeather()
```

### Une architecture de fichiers

Vous vous en doutez, nous n'allons pas écrire toutes nos fonctions dans le fichier `index.js`, surtout si votre module est imposant.

Je vous conseille de créer un dossier lib dans le dossier de votre module, qui contiendra toutes les fonctions de notre modules : 

```
hooks
--- test
------ lib
--------- getWeather.js
------ index.js
```

Le fichier `getWeather.js` ressemblera à ça :

```javascript
module.exports = function getWeather() {
 // do something here
};
```

Et notre fichier index.js ressemblera à ça :

```javascript
module.exports = function(sails) {
	
	var getWeather = require('./lib/getWeather.js');
	
	return {
		getWeather: getWeather
	};
};
```

### Une API 100% Promise based

#### C'est quoi une Promise ?

Si vous ne connaissez pas la dernière spécification de Javascript, l'ES6, je vous conseille d'aller lire quelques articles sur le sujet, ce n'est pas compliqué mais ça vaut vraiment le coup ! ( Par exemple: [Top 10 ES6 Features Every Busy JavaScript Developer Must Know](http://webapplog.com/es6/) )

Une des grandes reproches que l'on faisait aux Javascript, du fait de son caractère asynchrone, c'était la saleté du code lorsqu'on commençait à imbriquer de nombreuses callback les unes dans les autres ( le fameux "callback hell" ).

Une solution aux callback hell s'appelle les Promise, c'est une nouvelle façon de retourner des valeurs d'une fonction de façon asynchrone, qui permet de nombreuses choses.

Et cela ressemble à ça : 

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

Comme vous pouvez le voir, on a pu chaîner les promises et faire plusieurs opérations asynchrone à la suite sans avoir des promises à plusieurs niveaux.

Alors, comment retourner une Promise dans nos fonctions ?

#### Des promises dans vos modules

Reprenons notre fonction `getWeather()`, avec du traitement asynchrone cela donne ça :

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

Et ainsi, lorsqu'on appelera notre fonction, cela va ressembler à ça :

```javascript
gladys.modules.test.getWeather()
  .then(function(value){
  	// value is equal to 12 normally !
  })
  .catch(function(err){
  
    // if something fails it goes there !
  });
```

Gladys fonctionne 100% avec des Promises, ainsi vous devez toujours retourner une promise !

### Les fonctions à implémenter

Afin que Gladys puisse communiquer avec votre module, il y a quelques fonctions à implémenter.

#### Install/uninstall

Lorsque votre module va être installé, Gladys va automatiquement appeler, si elle existe, la fonction `install()` de votre module (au prochaine démarrage de Gladys). ( `gladys.modules.VOTRE_MODULE.install()` )

Cette fonction ne sera appelée qu'une seule fois à l'installation, elle vous permet de mettre en place votre module.

La fonction uninstall est appelée à la désinstallation.

Si vous avez certaines données à insérer en base à l'installation, c'est dans cette fonction qu'il faut le faire !

#### Exec

Pour les modules de compatibilités, Gladys va appeler la fonction `exec` de votre module afin de donner des commandes à votre module. Lorsque vous cliquez sur le bouton "on" de votre lampe dans l'interface Gladys par exemple, cela va appeler la fonction exec de votre module avec en argument toutes les informations pour pouvoir allumer la lampe correspondante :

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

Dans votre fonction exec, vous n'aurez plus qu'à communiquer avec la lampe et de passer son état à 1 (On). L'identifier est un attribut que vous définissez à la création du device dans Gladys afin que votre module puisse identifier de façon unique chaque device. Par exemple, pour les Philips Hue, chaque lampe a un numéro (de 1 à 3 pour le kit de démarrage ). J'ai donc enregistré chaque lampe avec comme identifier ce numéro, pour pouvoir les contacter par la suite.

N'hésitez pas à aller voir le module Philips Hue pour comprendre comment j'ai mis en place tout ça et appliquer à votre module cette logique :)

**Remarque:** Vous ne devez jamais demander aux utilisateurs d'intéragir directement avec votre module de compatibilité, l'utilisateur doit toujours passer par gladys avec la fonction exec ! En effet, si vous ne passez pas par la fonction de gladys, les états ne seront pas mis à jour dans l'interface, vous perdez tout l'affichage temps réel de l'état sur le dashboard. 

**Exemple:** Pour le module Philips hue, pour contrôler la lampe dans un script, l'utilisateur peut utiliser la fonction `gladys.deviceType.exec({...});` et surtout pas les fonctions du module hue !

#### setup

La fonction `setup` sert à configurer le module depuis l'interface sans devoir spécifiquement créer une vue et un front pour cela. Par exemple, pour les modules qui sont capable de détecter par eux même les périphérique sur le réseau ( Philips hue, Z-wave, Wemo ), il faut à un moment pouvoir lancer cette détection ( par forcément au démarrage, car par exemple pour les hue il faut appuyer sur le bouton du bridge avant ). Cette fonction config sera appelée quand l'utilisateur cliquera sur le bouton "configurer" du module.

#### command

Si votre module n'est pas un module de compatibilité (c'est déjà géré nativement), et qu'il apporte une fonctionnalité que vous voulez ajouter à la commande textuelle, c'est possible ! Il vous suffit d'ajouter vos lots de phrases aux commandes, et de surtout créer une fonction `command` à votre module.

Cette fonction sera appelée par Gladys si une de vos phrases est classifiée par le réseau de neurones.

### Le front web

Il est possible en tant que module de créer des widgets sur le dashboard. Vous ne pouvez pas forcer l'apparition de ces widgets, c'est l'utilisateur qui choisit dans les paramètres ce qu'il veut afficher.

Vous devez créer ces types à l'installation de votre module.

Le front web est une application Angular. Vous devez créer votre module Angular, et vous pouvez importer l'application angular "gladys" pour appeler les services de Gladys.


### Internationalisation

Votre module doit, dès le début, être international. N'y pensez pas après !

Il y a plusieurs choses à prendre en compte:  le front web, et les données que vous aller insérer. 

Pour un front en plusieurs langues, je vous conseille [Angular translate](https://angular-translate.github.io/). Cela vous permet de créer des fichiers de langues avec différentes traductions suivant le pays. Gérez au minimum le français et l'anglais ! ( les deux langues par défaut dans Gladys )




