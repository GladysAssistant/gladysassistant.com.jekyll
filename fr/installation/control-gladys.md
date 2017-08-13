Controler Gladys avec son smartphone
----------------------

Suite à plusieurs essais et quelques difficultés liées aux très nombreuses évolutions et changements rapides de **Gladys**, j'ai décidé de reprendre le tutoriel fait à l'époque par @Molkobain (et je l'en remercie, ça m'a bien aidé) pour le mettre à jour ! J'ai pris l'initiative et j'espère que @Molkobain tu ne m'en voudras pas, d'épurer un peu certains passages pour être plus générique, l'article devant finir sa vie dans la section **Installation** du site [gladysproject.com](https://gladysproject.com/fr/installation/)
 
Nous allon donc voir comment paramétrer votre téléphone pour déclencher des actions dans Gladys de manière automatique ou assistée selon le cas. Tout ca va rejoindre par moment le tuto de Pierre-Gilles sur l'utilisation de tags NFC ==> [Des tags NFC pour contrôler Gladys](https://gladysproject.com/fr/article/gladys-and-nfc)

Voici donc les différentes tâches que l'on va mettre en place :

 - Prévenir Gladys automatiquement quand on revient à la maison (event back-at-home) 
 - Prévenir Gladys automatiquement quand on quitte la maison (event left-home)
 - Prévenir Gladys manuellement qu'on va se coucher (event going-to-sleep)

**Note** : Attention tout ceci ne concerne que les smartphones Android, je n'ai plus de périphériques iOS donc je ne peux vous dire s'il existe des alternatives.

**Note 2** : L'ensemble des automatisations sont prévues pour mon contexte personnel (Appartement, pas de capteurs), il se peut que vous ayez à les modifier pour les adapter au vôtre.

**Pré-requis :**
 - Un token Gladys
 - Tasker

**Création d'un token Gladys :**
 - Allez dans l'interface de Gladys
 - Menu Paramètres (1)
 - Dans Sécurité (2)
 - Donnez un nom à votre token, par exemple 'Tasker' (3)
 - Créez un token et notez sa valeur (4)

![enter image description here](https://i.imgur.com/gbKtWCB.png)

L'application Tasker
------------------

Ce tutoriel s'appui sur l'application [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=fr) comme pour l'article de Pierre-Gilles. installez-la et ouvrez-la.

**Initialisation de variables globales**
Nous allons créer des variables dans Tasker pour pouvoir les ré-utiliser un peu partout. Notamment le nom du réseau Wifi du domicile, le token utilisé par le téléphone, et l'adresse web de **Gladys**.

- Ouvrir Tasker et aller dans les Préférences
- Dans l'onglet "UI" décocher "Mode débutant" et sortir des Préférences

![debutant mode](https://i.imgur.com/fnGbkeA.png)

- Aller dans l'onglet "Variables"
- Créer une nouvelle variable en cliquant sur le "+" en bas à droite de l'écran
- La nommer %GladysToken et mettre le token précédemment créé comme valeur (pas de copier/coller possible T_T)

![variable](https://i.imgur.com/ykR45Vo.png)

- Répéter l'opération pour créer la variable %GladysIdMaison et y mettre l'id de votre domicile (Disponible sur l'interface de Gladys dans Paramètres ⇒ Logement)
- Répéter l'opération pour créer la variable %GladysIdPieceChambre et y mettre l'id de votre chambre (Disponible sur l'interface de Gladys dans Paramètres ⇒ Logement)
- Répéter l'opération pour créer la variable %GladysUrlServeurLocale et y mettre l'adresse ip locale du raspberry (ex : http://192.168.0.10 ou https://192.168.0.10 si vous avez activé le SSL)
- Répéter l'opération pour créer la variable %GladysUrlServeurWeb et y mettre l'adresse ip publique (ou nom de domaine) de votre box internet (ex : http://domaine.dyndns.org ou https://domaine.dynsdns.org)
- Répéter l'opération pour créer la variable %WifiMaison et y mettre le SSID de votre Wifi (attention aux majuscules)

Voilà qui est fait, vous devriez avoir ceci :

![variables](https://i.imgur.com/NBOqdDK.png)

On peut passer à la création des taches !

**Note** : La distinction entre l'url du serveur locale et web est nécessaire pour la plupart des boxs internet car rares sont celles qui permettent d'accéder à son ip publique depuis le réseau interne. Il faut donc utiliser l'ip locale quand on est sur le wifi du réseau où est le serveur Gladys et l'ip publique quand on est à l'exterieur.

Détecter l'arrivée au domicile
------------------------------

Pour détecter si je suis dans l'appartement ou non, je me base sur la connexion au réseau wifi de chez moi. Ça marche parce que j'habite en appartement et que le wifi couvre la totalité du domicile, pour ceux qui habiteraient en maison / château, ça peut ne pas être le bon moyen de détection. 

Nous somme maintenant prêts à créer notre premier scénario pour la détection de l'arrivée au domicile :

- Ouvrir Tasker et aller dans l'onglet Profils
- Cliquer sur le "+" en bas à droite de l'écran
- Choisir Etat > Réseau > Wifi connecté
- Dans le champ "SSID", cliquer sur l'icone d'étiquette et choisir la variable %WifiMaison
- Revenir en arrière
- Tasker vous demande de choisir la tache à exécuter quand le téléphone se connecte au réseau de votre maison, choisir "Créer une nouvelle tache"
- La nommer "Gladys - Trigger BackAtHome"
- Ajouter une action en cliquant sur le "+"
- Choisir Réseau > Get HTTP
- Dans le champ Serveur:Port cliquer sur l'étiquette pour mettre la variable **%GladysUrlServeurLocale**
- Dans le champ Chemin taper : /event/create?code=back-at-home&token=%GladysToken&house=1&user=1 (ici les ID user et house sont à remplacer par les vôtres, si vous venez d'installer Gladys, il y a de grandes chance que ce soit les mêmes)
- **A faire uniquement si vous utilisez le SSL** : cocher la case "*Faire confiance à tout certificat*" tout en bas (⇒ [Aperçu de l'écran](https://i.imgur.com/ucLENbZ.png))
- Valider en revenant en arrière

C'est terminé pour ce cas d'utilisation ! Pour tester la tache, vous pouvez cliquer sur l'icone de lecture en bas à gauche. Vous verrez dans les logs `pm2 logs gladys` (ou dans dashboard ⇒ Moi) si ça a marché.
Pour tester le profil, il vous suffit d'être chez vous et de désactiver/activer le Wifi sur le téléphone (Tasker peut mettre quelques secondes à détecter l’événement)

Détecter le départ du domicile
------------------------------

Comme pour l'arrivée au domicile, je me base sur la connexion au réseau wifi. On part donc sur le même principe et on créer un nouveau scénario :

- Ouvrir Tasker et aller dans l'onglet Profils
- Cliquer le Profil créé précédemment "Wifi connecté %Wifimaison"
- Laisser appuyer longuement sur la tache à droite, Tasker vous propose de "Choisir la tache de sortie"
- Choisir de créer une nouvelle tache
- La nommer "Gladys - Trigger LeftHome"
- Ajouter une action en cliquant sur le "+"
- Choisir Réseau > Get HTTP
- Dans le champ Serveur:Port cliquer sur l'étiquette pour mettre la variable **%GladysUrlServeurWeb**
- Dans le champ Chemin taper : /event/create?code=left-home&token=%GladysToken&house=1&user=1
- **A faire uniquement si vous utilisez le SSL** : cocher la case "*Faire confiance à tout certificat*" tout en bas (⇒ [Aperçu de l'écran](https://i.imgur.com/ucLENbZ.png))
- Valider en revenant en arrière

Et voila ! Si vous activez/désactivez le wifi de votre téléphone vous verrez les différentes notifications sur le dashboard de Gladys. 

![timeline](https://i.imgur.com/uQglM1H.png)

![pm2 logs gladys](https://i.imgur.com/TZDTOi3.png)

**Note** : Si vous constatez que les notifications s’enchaînent lorsque le téléphone est en veille, c'est que votre wifi (du téléphone) n'est pas configuré pour rester actif en veille.

Prévenir que je vais me coucher
-------------------------------

Pour cet événement, sans tags NFC il n'y a pas de façon simple et sûre de prévenir automatiquement Gladys que vous allez vous coucher, donc on déclenchera manuellement l’événement. 

- Ouvrir Tasker et aller dans l'onglet Tache
- Créer une tache en cliquant sur le "+"
- La nommer "Gladys - Trigger GoingToSleep"
- Ajouter une action en cliquant sur le "+"
- Choisir Réseau > Get HTTP
- Dans le champ Serveur:Port cliquer sur l'étiquette pour mettre la variable **%GladysUrlServeurLocale** 
- Dans le champ Chemin taper :
     /event/create?code=going-to-sleep&token=%GladysToken&room=%GladysIdPieceChambre
- Ajouter une action en cliquant sur le "+"
- Valider en revenant en arrière
- Il ne reste plus qu'à mettre cette tache en raccourci sur l'écran d'accueil du téléphone en sélectionnant le widget "Tasker - Raccourci de tache"

PS : Si vous souhaitez faire cette action de manière partiellement automatique combinez ces explications avec celles du tutoriel de @Pierre-Gilles cité au début de cet article.

