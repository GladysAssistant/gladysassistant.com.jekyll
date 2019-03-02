---
title: Troubleshooting
description: Learn how to troubleshoot Gladys frequent issues
layout: documentation
lang: en
image: /assets/images/presentation/gladys-og-image.png
permalink: /en/installation/troubleshooting
---

# Troubleshooting

In case of trouble, check this page to help you fix Gladys.

## 502 Error Page

This page is displayed when Gladys is currently not available. 

It happens when: 
- Gladys is rebooting 
- Gladys is stopped or have crashed

Most of the time, you just have to wait until Gladys is ready, and the 502 error page will simply disappear. To see what's happening under the hood, you can log into your Raspberry Pi in SSH and type:

```
pm2 logs gladys
```

To see Gladys logs.

### If Gladys has crashed

If you see that Gladys is crashing, you may have installed a module that makes Gladys crash.

To remove a malformed module, you can log into the Raspberry Pi in SSH, and check the module folder : 

```
cd /home/pi/gladys/api/hooks
```

Here, you can list the installed module :

```
ls -l
```

Each folder you see is a Gladys module. If you want to remove a module that make Gladys crash, type: 

```
rm -rf FOLDER_NAME
```

For example, imagine you installed the module "speak", and it makes Gladys crash. When typing "ls -l", you'll see that the speak module is located in a "speak" folder. So to delete it, type in the `/home/pi/gladys/api/hooks` folder: 

```
rm -rf speak
```

You can now restart Gladys:

```
pm2 restart gladys
```

You should see Gladys live again!
