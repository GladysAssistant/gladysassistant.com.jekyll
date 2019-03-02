---
title: Mettre à jour Gladys
description: Découvrez comment mettre à jour Gladys.
layout: documentation
lang: fr
image: /assets/images/presentation/gladys-og-image.png
permalink: /fr/installation/upgrading-gladys/
---

# Mettre à jour Gladys

## Sur l'image Raspbian

Si vous avez installé Gladys via l'image Raspbian, il faut que vous vous connectiez en ligne de commande au Raspberry Pi. Soit directement en connectant un écran au Raspberry Pi, soit en vous connectant en SSH.

Ressource: [Contrôlez votre Raspberry Pi avec SSH depuis votre ordinateur](https://raspbian-france.fr/controlez-raspberry-pi-ssh-ordinateur/).

Dès que vous êtes connecté, tapez la commande:

```
/home/pi/rpi-update.sh
```

Et pressez "Entrée". 

Gardez le terminal ouvert pendant le process de mise à jour.

## Sur une installation manuelle

Si vous avez installé Gladys manuellement en clonant le repository GitHub, vous pouvez mettre à jour Gladys de la façon suivante.

1/ Allez chercher la dernière version du code:

```
git pull origin master
```

2/ Installez les dépendances via Yarn

```
yarn
```

3/ Faites un build du frontend

```
grunt buildProd
```

4/ Redémarrez Gladys!

Suivant la façon dont vous avez lancé Gladys, relancez le process pour voir la dernière version de Gladys tourner.

## Sur une installation Docker

C'est probablement la façon la plus simple de mettre à jour Gladys (et nous allons d'ailleurs passer à Docker commme moyen de distibution principal pour Gladys 4).

1/ Téléchargez la dernière image Docker

```
docker pull gladysassistant/gladys
```

2/ Stoppez & supprimez votre ancien container

```
docker stop ID_CONTAINER && docker rm ID_CONTAINER
```

(Pas de panique vos données sont stockées dans la base de donnée MariaDB que vous avez configuré)

3/ Relancez un nouveau container Docker


