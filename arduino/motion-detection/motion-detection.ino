#define BLYNK_PRINT Serial

// Librairies to include
#include <BlynkSimpleEsp8266.h>
#include <ESP8266WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// Auth Token Blynk
char auth[] = "26d5fb1bc7514e218718f94a868d8a6f";

// WiFi credentials.
char ssid[] = "iPhone de Wiz";
char pass[] = "batard2.0";

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "europe.pool.ntp.org", 7200);

int pirPin = D4;              // Define pin of PIR sensor
int pirValue = 0;             // Initialize value of PIR sensor
int lightPin = A0;            // Define pin of light sensor           
int lightVal = 0;             // Initialize value of light sensor
int timer = 0;                // Timer
int alarm = 0;                // Alarm (0=non active)
int alarmTimer = 0;           // Store value after sensing an email
int delayBetween2mails = 300; // Minimum delay in seconds between 2 emails

/*
// Function to manage alarm status
BLYNK_WRITE(V4) {
  int alarmValue = param[0].asInt();
  if (alarmValue == 2) {
    Blynk.email("ali.boutaleb.p@gmail.com", "Motion detection project - Manual Alarm detected", "A motion has been detected, this message is coming from Arduino Wemos D1 mini.");
  }else {
    alarm = alarmValue;
  }
}*/

void setup() {
  // Debug console
  Serial.begin(115200);

  // Initiate Blynk connection
  Blynk.begin(auth, ssid, pass);

  Blynk.email("ali.boutaleb.p@gmail.com", "Motion detection project - Manual Alarm detected", "A motion has been detected, this message is coming from Arduino Wemos D1 mini.");
  Blynk.tweet("Hey, Blynkers! My Arduino can tweet now!");
}

void loop() {
  // Get value from PIR sensor
  pirValue = digitalRead(pirPin);

  // Get value from light sensor
  lightVal = analogRead(lightPin);

  // Manage motions
  if (pirValue == 1) {
    // Send motion detected to Blynk
    Blynk.virtualWrite(V1, true);

    // Update timeClient and send date to Blynk
    timeClient.update();
    Blynk.virtualWrite(V0, timeClient.getFormattedTime());
/*
    // If alarm activated send email
    if( (alarm == 1) && (timer > alarmTimer+delayBetween2mails) ) {
      Blynk.email("ali.boutaleb.p@gmail.com", "Motion detection project - Alarm detected", "A motion has been detected, this message is coming from Arduino Wemos D1 mini.");
      alarmTimer = timer;
    }*/
  } else {
    // Send no motion detected to Blynk
    Blynk.virtualWrite(V1, false);
  }

  // Manage light
  if (lightVal < 100) {
   Blynk.virtualWrite(V2, 10);
  } else if (lightVal < 200) {
   Blynk.virtualWrite(V2, 9);
  } else if (lightVal < 300) {
   Blynk.virtualWrite(V2, 8);
  }else if (lightVal < 400) {
   Blynk.virtualWrite(V2, 7);
  } else if (lightVal < 500) {
   Blynk.virtualWrite(V2, 6);
  } else if (lightVal < 600) {
   Blynk.virtualWrite(V2, 5);
  } else if (lightVal < 700) {
   Blynk.virtualWrite(V2, 4);
  } else if (lightVal < 800) {
   Blynk.virtualWrite(V2, 3);
  } else if (lightVal < 900) {
   Blynk.virtualWrite(V2, 2);
  } else if (lightVal < 100) {
   Blynk.virtualWrite(V2, 1);
  }

  // Run Blynk and timer
  Blynk.run();

  // Send timer
  Blynk.virtualWrite(V3, timer);
  timer+=1;

  // Delay of 1 sec
  delay(1000);
}
