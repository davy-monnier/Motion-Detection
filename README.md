# Motion-And-Light-Intensity-Detection


## The Project and goals :


Motion and Light Intensity Detection, is a group school project that aims students to introduce them to the IOT domain by developing a small connected device to internet in order to fulfill a daily need. The device that we built is composed of a motion detector and a light sensor that can be used for domestic, or commercial used. Our project is available to anyone who wants to try it and build himself.

<img width="1440" alt="Capture d’écran 2019-04-19 à 16 53 29" src="https://user-images.githubusercontent.com/17027835/56429666-08aa4780-62c4-11e9-94cb-c22e2ebe6091.png">

A local web application is provided to see the issues of sensors and allows you to activate an alarm which will send you an email and post a tweet if a motion is detected. The delay between two alerts is 5 minutes (300 seconds) when the alarm is activated, you can change that in the arduino code like below.

```
int delayBetween2mails = 300; // Minimum delay in seconds between 2 emails
```

### Equipements :


- Wemos d1 mini

- PIR sensor

- LDR light sensor

- Breadboard


### Architecture :

- Don't forget to plug your Wemos card to an external battery or your computer


<img width="538" alt="device_archi" src="https://user-images.githubusercontent.com/36882252/56425920-7f404880-62b6-11e9-96c0-18470c863162.png" >

## Arduino installation :


- Download link : https://arduino.cc/en/main/software

- Link for the drivers if you are not using a LINUX : https://wiki.wemos.cc/downloads

- Follow the steps (installing with Boards Manager) in the link if you have never user ESP8266 with ARDUINO IDE : (https://github.com/esp8266/Arduino#installing-with-boards-manager).

- Don't forget to put your Wifi credentials in the arduino code

```
char ssid[] = "Wifi";
char pass[] = "Password";
```


## Required Libraries :


From your Arduino IDE -> tools -> libraries manager

- **ntpCLient** by fabrice weinberg

- **Blynk** by volodymyr shymanskyy


## Blynk steps :


- Download Blynk application on Android or IOS

- Create an account with your email or facebook

- Create a new project on the app

- Get your Blynk authentication token received by email 

- Put your token in the **web** code (web/js/iot.js) and in the **arduino** code

**web**

```
blynkUrl : 'http://blynk-cloud.com/BlynkAuthToken/',
```

**arduino**

```
char auth[] = "BlynkAuthToken";
```

- Launch your Blynk application and add widgets that you want in the application (timer V3...)

<img width="538" alt="device_archi" src="https://user-images.githubusercontent.com/17027835/56429600-ce40aa80-62c3-11e9-9482-749d388a9dff.JPG" >

- **Important :** add email widget with the destination email and twitter with your twitter account for alerts

- Optionnal : you can host your blynk server on local if you want --> http://help.blynk.cc/blynk-local-server/local-server

## You can now enjoy the project by compiling arduino code on the Wemos card and launch the web by clicking on web/index.html
