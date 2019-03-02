---
title: Les scénarios dans Gladys
description: Comment mettre en place des scénarios poussés dans Gladys ?
layout: documentation
lang: fr
image: /assets/images/presentation/gladys-og-image.png
permalink: /fr/installation/scenario/
---

# Les scénarios dans Gladys

Les scénarios dans Gladys sont faciles à aborder. Ils sont basés sur un concept simple :

- D'abord, il y a un Déclencheur (un événement). Par exemple : "**SI** je vais me coucher".
- Ensuite, il y a des Conditions. Par exemple : "**ET** qu'il est plus de 21h".
- Enfin, il y a des Actions. Par exemple : "**ALORS** éteins toutes les lumières **ET** exécute ce script."

Les différents types de déclencheurs ('triggers'), de conditions et d'actions sont définis dans un [repo Git à part](https://github.com/gladysassistant/Gladys-data) via un ensemble de fichiers JSON, et peuvent être mis à jour directement depuis Gladys.
Vous pourrez ensuite créer vos scénarios à partir de ces différents types directement depuis l'interface de Gladys.

### Étendre les possibilités des scénarios

Rendez-vous sur l'interface de Gladys, allez dans `Paramètres` puis cliquez sur `Mettre à jour les données Gladys`. Tous les fichiers JSON seront téléchargés, vous permettant d'étendre les possibilités de vos scénarios.

Vous pouvez effectuer cette mise à jour quand bon vous semble. Essayez !

### Créer un scénario

Afin de créer un scénario, rendez-vous dans l'onglet `Scénarios`.

#### Cliquer sur `Nouveau`

Vous devriez voir apparaître cette fenêtre, vous proposant différentes catégories de déclencheurs. Sélectionnez `Alarme`.

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-1.png" class="img-responsive" />

#### Sélectionner un déclencheur

Sélectionnez le seul déclencheur disponible, à savoir "Quand une alarme se déclenche". Vous pouvez alors choisir une alarme spécifique ou bien ne rien sélectionner, ce qui aura pour effet d'activer le scénario pour toutes les alarmes.

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-2.png" class="img-responsive" />

#### Conditions

Pour cet exemple, nous n'ajouterons pas de conditions. Passez cette étape en cliquant sur `Suivant`.

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-3.png" class="img-responsive" />

### Actions

Vous pouvez désormais choisir les actions que vous souhaitez réaliser lorsque le scénario est déclenché. Pour notre exemple, choisissez `Nouvelle notification`.

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-5.png" class="img-responsive" />

### Paramètres des actions

Une notification vide n'ayant que peu d'intérêt, faites défiler la fenêtre vers le bas pour voir apparaître les différents paramètres possibles.
En l'occurrence, Gladys nous propose de spécifier le titre et le contenu de notre notification, ainsi que sa couleur, son icône et l'utilisateur qui la recevra.

#### Quelques précisions sur les notifications :
- La priorité définit la façon dont la notification sera transmise. Par exemple, on peut imaginer qu'une notification de priorité 1 sera communiquée à la fois par SMS, par retour vocal via une enceinte et par un message affiché sur l'écran, tandis qu'une notification de priorité 3 ne sera rien de plus que ce message sur l'écran (fonctionnement en cascade). Par défaut, Gladys ne propose que cette dernière possibilité, mais divers modules permettent de prendre en charge d'autres moyens de communication. Les priorités peuvent être paramétrées via l'onglet `Paramètres` > `Notifications`.
- Les couleurs s'expriment sous la forme `bg-couleur` (par exemple : bg-blue, bg-red, etc).
- Les icônes disponibles correspondent à celles de la catégorie Font Awesome listées sur [cette page](http://www.w3schools.com/icons/icons_reference.asp).

<img alt="Scenario Gladys" src="/assets/images/documentation/scenarios/scenario-6.png" class="img-responsive" />

### Félicitations !

Cliquez sur `Enregistrer scénario`. Voilà, vous avez créé votre premier scénario !

Pour le tester, vous n'avez plus qu'à créer une alarme qui correspond à la définition de votre scénario (se référer en cas de besoin au tutoriel [Comment créer une alarme dans Gladys](https://developer.gladysassistant.com/fr/documentation/alarm)) !