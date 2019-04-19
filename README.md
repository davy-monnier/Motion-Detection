# Motion-AND-Light-Intensity-Detection


## The Project and goals :


Motion and light intensity detection, is a group school project that aims to introduce students to the IOT domain by developing a small connected device to internet in order to fulfill a daily need. The device that we will build, is composed of a motion detector, and a light sensor that can be used for domestic, or commercial ends. Our project is made available to anyone who wants to try it and build himself.


### Equipements :


- Wemos d1 mini

- PIR sensor

- LDR light sensor

- Breadboard


### Architecture :


<img width="538" alt="device_archi" src="https://user-images.githubusercontent.com/36882252/56425920-7f404880-62b6-11e9-96c0-18470c863162.png" >


## Arduino installation :


- Download link : https://arduino.cc/en/main/software

- Link for the drivers if you are not using a LINUX : https://wiki.wemos.cc/downloads

- Follow the steps (installing with Boards Manager) in the link if you have never user ESP8266 with ARDUINO IDE : (https://github.com/esp8266/Arduino#installing-with-boards-manager).

- Don't forget to put your Wifi credentials in the arduino code


## Required Libraries :


From your Arduino IDE -> tools -> libraries manager

- **ntpCLient** by fabrice weinberg

- **Blynk** by volodymyr shymanskyy


## Blynk steps :


- Download Blynk application on Android or IOS

- Create an account with your email or facebook

- Create a new project on the app

- Get your Blynk authentication token received by email 

- Put your token in the **web** code (blynkUrl in js/iot.js) and in the **arduino** code (auth[])

- Launch your Blynk application and add widgets that you want in the application (timer V3...)

- **Important :** add email widget with the destination email and twitter with your twitter account for alerts

## You can now enjoy the project by compiling arduino code on the Wemos card and launch the web by clicking on web/index.html
