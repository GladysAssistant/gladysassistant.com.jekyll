---
title: Controler Gladys avec Tasker 
description: Découvrez comment controler Gladys avec Tasker !
layout: documentation
lang: fr
image: /assets/images/presentation/facebook_share_gladys.png
permalink: /fr/installation/control-gladys/
---

# Controler Gladys avec son smartphone


Maintenant que **Gladys** est installé chez vous, nous allons voir comment paramétrer votre téléphone pour déclencher des actions de manière automatique ou assistée selon le cas. Cet article peut être associé au tutoriel l'utilisation de tags NFC ==> [Des tags NFC pour contrôler Gladys](https://gladysproject.com/fr/article/gladys-and-nfc)

Voici donc les différentes tâches que l'on va mettre en place :

 - Prévenir Gladys automatiquement quand on revient à la maison (event back-at-home) 
 - Prévenir Gladys automatiquement quand on quitte la maison (event left-home)
 - Prévenir Gladys manuellement qu'on va se coucher (event going-to-sleep)

**Note** : Attention tout ceci ne concerne que les smartphones Android

**Note 2** : L'ensemble des automatisations sont prévues pour un contexte particulier, il se peut que vous ayez à les modifier pour les adapter au vôtre.

**Pré-requis :**
 - Un token Gladys
 - Tasker

**Création d'un token Gladys :**
 - Allez dans l'interface de Gladys
 - Menu Paramètres (1)
 - Dans Sécurité (2)
 - Donnez un nom à votre token, par exemple 'Tasker' (3)
 - Créez un token et notez sa valeur (4)

![dashboard](https://i.imgur.com/gbKtWCB.png)

L'application Tasker
------------------

Cet article s'appui sur l'application [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=fr) installez-la et ouvrez-la.

**Initialisation de variables globales**
Pour vous faciliter la création des tâches, vous pouvez créer des variables dans Tasker pour pouvoir les ré-utiliser un peu partout. Notamment le nom du réseau Wifi du domicile, le token utilisé par le téléphone, et l'adresse web de **Gladys**.

- Ouvrir Tasker et aller dans les Préférences
- Dans l'onglet "UI" décocher "Mode débutant" et sortir des Préférences

![debutant mode](https://i.imgur.com/fnGbkeA.png)

- Allez dans l'onglet "Variables"
- Créez une nouvelle variable en cliquant sur le "+" en bas à droite de l'écran
- Donnez-lui un nom, par exemple : %GladysToken et mettez le token précédemment créé comme valeur (pas de copier/coller possible T_T)

![variable](https://i.imgur.com/ykR45Vo.png)

- Répétez l'opération pour créer la variable %GladysIdMaison et mettez-y l'id de votre domicile (Disponible sur l'interface de Gladys dans Paramètres ⇒ Logement)
- Répétez l'opération pour créer la variable %GladysIdPieceChambre et mettez-y l'id de votre chambre (Disponible sur l'interface de Gladys dans Paramètres ⇒ Logement)
- Répétez l'opération pour créer la variable %GladysUrlServeurLocale et mettez-y l'adresse ip locale du raspberry (ex : http://192.168.0.10 ou https://192.168.0.10 si vous avez activé le SSL)
- Répétez l'opération pour créer la variable %GladysUrlServeurWeb et mettez-y l'adresse ip publique (ou nom de domaine) de votre box internet (ex : http://domaine.dyndns.org ou https://domaine.dynsdns.org)
- Répétez l'opération pour créer la variable %WifiMaison et mettez-y le SSID de votre Wifi (attention aux majuscules)

Voilà qui est fait, vous devriez avoir ceci :

![variables](https://i.imgur.com/NBOqdDK.png)

On peut passer à la création des taches !

**Note** : La distinction entre l'url du serveur locale et web est nécessaire pour la plupart des boxs internet car rares sont celles qui permettent d'accéder à son ip publique depuis le réseau interne. Il faut donc utiliser l'ip locale quand on est sur le wifi du réseau où est le serveur Gladys et l'ip publique quand on est à l'exterieur.

Détecter l'arrivée au domicile
------------------------------

Pour détecter si vous êtes chez vous ou non, nous nous baserons sur la connexion au réseau wifi de chez vous. Ça marche si votre wifi couvre la totalité du domicile, pour ceux qui habiteraient en maison / château, ça peut ne pas être le bon moyen de détection. (Les tags NFC entrent alors en jeu)

Vous êtes maintenant prêts à créer votre premier scénario pour la détection de l'arrivée au domicile :

- Ouvrez Tasker et allez dans l'onglet Profils
- Cliquez sur le "+" en bas à droite de l'écran
- Choisissez Etat > Réseau > Wifi connecté
- Dans le champ "SSID", cliquez sur l'icone d'étiquette et choisissez la variable %WifiMaison
- Revenez en arrière
- Tasker vous demande de choisir la tache à exécuter quand le téléphone se connecte au réseau de votre maison, choisissez "Créer une nouvelle tache"
- Nommez-la, par exemple : "Gladys - Trigger BackAtHome"
- Ajoutez une action en cliquant sur le "+"
- Choisissez Réseau > Get HTTP
- Dans le champ Serveur:Port cliquez sur l'étiquette pour mettre la variable **%GladysUrlServeurLocale**
- Dans le champ Chemin tapez : /event/create?code=back-at-home&token=%GladysToken&house=1&user=1 (ici les ID user et house sont à remplacer par les vôtres, si vous venez d'installer Gladys, il y a de grandes chance pour que ce soit les mêmes)
- **A faire uniquement si vous utilisez le SSL** : cochez la case "*Faire confiance à tout certificat*" tout en bas (⇒ [Aperçu de l'écran](https://i.imgur.com/ucLENbZ.png))
- Validez en revenant en arrière

C'est terminé pour ce cas d'utilisation ! Pour tester la tâche, vous pouvez cliquer sur l'icone de lecture en bas à gauche. Vous verrez dans les logs `pm2 logs gladys` (ou dans dashboard ⇒ Moi) si ça a marché.
Pour tester le profil, il vous suffit d'être chez vous et de désactiver/activer le Wifi sur le téléphone (Tasker peut mettre quelques secondes à détecter l’événement)

Détecter le départ du domicile
------------------------------

Comme pour l'arrivée au domicile, nous nous servirons de la connexion au réseau wifi. 
On créé un nouveau scénario :

- Ouvrez Tasker et allez dans l'onglet Profils
- Cliquez le Profil créé précédemment "Wifi connecté %Wifimaison"
- Laissez appuyé longuement sur la tache à droite, Tasker vous propose de "Choisir la tache de sortie"
- Choisissez Créer une nouvelle tache
- Nommez-la, par exemple : "Gladys - Trigger LeftHome"
- Ajoutez une action en cliquant sur le "+"
- Choisissez Réseau > Get HTTP
- Dans le champ Serveur:Port cliquez sur l'étiquette pour mettre la variable **%GladysUrlServeurWeb**
- Dans le champ Chemin tapez : /event/create?code=left-home&token=%GladysToken&house=1&user=1
- **A faire uniquement si vous utilisez le SSL** : cochez la case "*Faire confiance à tout certificat*" tout en bas (⇒ [Aperçu de l'écran](https://i.imgur.com/ucLENbZ.png))
- Valider en revenant en arrière

Et voila ! Si vous activez/désactivez le wifi de votre téléphone vous verrez les différentes notifications sur le dashboard de Gladys. 

![timeline](https://i.imgur.com/uQglM1H.png)

![pm2 logs gladys](https://i.imgur.com/TZDTOi3.png)

**Note** : Si vous constatez que les notifications s’enchaînent lorsque le téléphone est en veille, c'est que votre wifi (du téléphone) n'est pas configuré pour rester actif en veille.

Prévenir que je vais me coucher
-------------------------------

Pour cet événement, sans tags NFC il n'y a pas de façon simple et sûre de prévenir automatiquement Gladys que vous allez vous coucher, donc on déclenchera manuellement l’événement. 

- Ouvrez Tasker et allez dans l'onglet Tache
- Créez une tache en cliquant sur le "+"
- Nommez-la, par exemple : "Gladys - Trigger GoingToSleep"
- Ajoutez une action en cliquant sur le "+"
- Choisissez Réseau > Get HTTP
- Dans le champ Serveur:Port cliquez sur l'étiquette pour mettre la variable **%GladysUrlServeurLocale** 
- Dans le champ Chemin tapez :
     /event/create?code=going-to-sleep&token=%GladysToken&room=%GladysIdPieceChambre
- Ajoutez une action en cliquant sur le "+"
- Validez en revenant en arrière
- Il ne reste plus qu'à mettre cette tache en raccourci sur l'écran d'accueil du téléphone en sélectionnant le widget "Tasker - Raccourci de tache"


