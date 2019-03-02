---
title: Upgrading Gladys
description: Learn how to upgrade your Gladys installation
layout: documentation
lang: en
image: /assets/images/presentation/gladys-og-image.png
permalink: /en/installation/upgrading-gladys/
---

## Upgrading Gladys

### If you installed the Raspbian image

You first need to login to your Raspberry Pi, in SSH or directly on a screen.

Ressource: [How to SSH the Raspberry Pi](https://thepi.io/how-to-ssh-into-the-raspberry-pi/)

Then, execute the script:

```
/home/pi/rpi-update.sh
```

and press "Enter".

### If you installed Gladys manually

If you installed Gladys manually, you need to pull the most recent version of the code.

1/ Pull the code on GitHub

```
git pull origin master
```

2/ Install the dependencies

```
yarn
```

3/ Build assets

```
grunt buildProd
```

4/ Restart Gladys!

### If you installed Gladys with Docker

It's probably the easiest way!

1/ Pull the new Docker image

```
docker pull gladysassistant/gladys
```

2/ Stop and remove your old container

```
docker stop CONTAINER_ID && docker rm CONTAINER_ID
```

3/ Restart a new container