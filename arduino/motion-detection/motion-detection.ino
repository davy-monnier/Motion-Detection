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

int pirPin = D4;    // Define pin of PIR sensor
int pirValue = 0;   // Initialize value of PIR sensor
int lightPin = A0;  // Define pin of light sensor           
int lightVal = 0;   // Initialize value of light sensor
int timer = 0;      // Timer 

void setup() {
  // Debug console
  Serial.begin(115200);

  // Initiate Blynk connection
  Blynk.begin(auth, ssid, pass);

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
