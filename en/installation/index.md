---
title: Installation
description: Learn how to install Gladys on a Raspberry Pi
layout: documentation
lang: en
permalink: /en/installation/
---

# Installing Gladys on a Raspberry Pi

Gladys is a small server written in Node.js. It's built to run on Linux, Windows or Mac. But I recommend running Gladys on a Raspberry Pi.

#### Why a Raspberry Pi ?

The Raspberry Pi is a small computer, which works amazingly for home control, it is :

- Affordable (35\$)
- Quiet (no fan)
- Low power consumption
- Powerful (1.2GHz 64-bit quad-core ARMv8 CPU, 1Go RAM)
- All connectivities are built-in (Wi-Fi, Bluetooth 4.1 LE, Ethernet, 40 GPIO pins, 4 ports USB, Full HDMI port)

If you don't have one, just get started with a [Raspberry Pi starter kit](https://www.amazon.com/gp/product/B01C6Q2GSY/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=gladproj-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B01C6Q2GSY&linkId=8cf1724b55f8212f6525f60ea55975af).

## Install Gladys 4 Alpha

It's been 6 months since I'm working on the next major version of Gladys, Gladys 4.

This version is not yet for beginners, but if you know what you are doing you can already try it [here](/en/article/first-alpha-gladys-4).

If you are a beginner, in the meantime you can install Gladys 3.

## Installing Gladys 3

⚠️ WARNING: This image is not compatible yet with the Raspberry Pi 4 because this image is based on Raspbian Stretch. An image on Raspbian buster will be built soon.

To install Gladys on your Raspberry Pi, you just have to use the pre-built Raspbian image.

The first step is to download Gladys Raspbian image :

[Download Gladys Raspbian Image for Raspberry Pi on GitHub](https://bit.ly/gladys-3-8-0-rev2)

If the download is slow or not working, you can use our official mirror => [Download Gladys Raspbian Image on Official mirror](https://bit.ly/gladys-3-8-0-rev2-mirror-fr2)

And unzip the downloaded zip file to get a ".img" file.

Then, you just have to clone this image on the SD card you want to use with you Raspberry Pi.

I recommend the software [Etcher](https://etcher.io/) (Linux/MacOS/Windows compatible).

Install Etcher, plug your SD card into your computer, and clone the .img file on your SD card.

<img src="/assets/images/pages/installation/etcher.png" alt="Etcher Gladys Raspberry Pi" class="img-responsive" />

Finally, all you have to do is to connect your Raspberry Pi to your local network (with an Ethernet cable for example), and to turn it on.

Last step is to expand the partition on the SD card. If you don't do it, the system won't have access to the full size of your SD card, and you will run out of disk space.

Expanding the SD card is really easy. You have to connect to your Raspberry Pi (directly or through SSH). If you don't know how SSH works, there are some great tutorials for [Windows](https://www.raspberrypi.org/documentation/remote-access/ssh/windows.md) and [Mac/Linux](https://www.raspberrypi.org/documentation/remote-access/ssh/unix.md).

Credentials are the same that the default Raspbian image (user : pi, password : raspberry).

When you are connected, you just need to execute :

    sudo raspi-config

And select option 1 => "1\. Expand Filesystem". The system will ask you to reboot, press "yes".

And that's all ! Gladys is ready :)

**NOTE:** We don't release a full Raspbian image for each little Gladys release, so your Gladys installation is probably outdated from a few version. We recommended executing the upgrade script after installing the Raspbian image. See [Upgrading Gladys](/en/installation/upgrading-gladys/).

### Accessing Gladys

To access Gladys, open your favorite browser, on any computer on the local network your Raspberry Pi is connected. Then enter the URL :

    http://gladys.local

You should arrive on Gladys web interface where you can configure your account !

**Note :** If it doesn't work, you can access Gladys directly by typing the IP of your Raspberry Pi in your browser. To find the IP, just type `ifconfig` on the Raspberry Pi shell, or you can use a network scanner app to find the IP ([Network Scanner](https://play.google.com/store/apps/details?id=com.easymobile.lan.scanner&hl=fr) on Android or [iNet](https://itunes.apple.com/fr/app/inet-network-scanner/id340793353?mt=8) on iOS)

#### Manual installation

To install Gladys, you just need to follow the instructions on [GitHub](https://github.com/gladysassistant/Gladys).
