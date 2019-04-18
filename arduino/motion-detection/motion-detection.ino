int pirPin = D4;  // Define pin of PIR sensor
int pirValue = 0; // Initialize value of pir sensor

void setup() {
  // Debug console
  Serial.begin(115200);

}

void loop() {
  // Get value from PIR sensor
  pirValue = digitalRead(pirPin);

  // Manage motions
  if (pirValue == 1) {
    Serial.println("Motion detected");
  } else {
    Serial.println("No motion detected");
  }

  // Delay of 1 sec
  delay(1000);
}
