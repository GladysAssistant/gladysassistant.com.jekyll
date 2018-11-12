---
title: Accéder à Gladys à distance
description: Découvrez comment contrôler votre instance Gladys de n'importe où dans le monde
layout: documentation
lang: fr
permalink: /fr/installation/access-gladys-remotely/
---

# Accéder à Gladys à distance

Il est facile de contrôler Gladys en vous connectant à votre Raspberry Pi sur votre réseau local.

Le problème, c'est que dès lors que vous n'êtes plus chez vous, ou que vous êtes sur votre téléphone en 4G, il n'est pas possible d'accéder au Raspberry Pi.

Afin de pouvoir accéder à Gladys de partout, il y a 2 techniques :

## Rediriger les ports de la box internet

Si votre fournisseur d'accès à internet vous le permet, vous pouvez donner une adresse IP publique à votre Raspberry Pi et ainsi le rendre accessible de n'importe où dans le monde.

Le problème de cette technique, c'est que votre Raspberry Pi est ainsi disponible publiquement et peut-être sujet à des attaques de bots scannants internets.

En plus de ça, cette technique n'est pas toujours la plus simple à mettre en place.

C'est pour ça que j'ai créé le Gladys Gateway!

## Le Gladys Gateway

Le Gladys Gateway est une passerelle chiffrée de bout en bout, avec une interface web disponible à [gateway.gladysproject.com](https://gateway.gladysproject.com/login) qui vous permet d'accéder à Gladys très simplement.

Toutes les communications entre cette interface web et votre Raspberry Pi sont chiffrées de bout en bout, et ainsi votre vie privée est respectée. 

Pour avoir accès au Gladys Gateway, vous devez rejoindre le [Package Communauté Gladys](/fr/gladys-community-package/) 🙂