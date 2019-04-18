int pirPin = D4;    // Define pin of PIR sensor
int pirValue = 0;   // Initialize value of PIR sensor
int lightPin = A0;  // Define pin of light sensor           
int lightVal = 0;   // Initialize value of light sensor

void setup() {
  // Debug console
  Serial.begin(115200);

}

void loop() {
  // Get value from PIR sensor
  pirValue = digitalRead(pirPin);

  // Get value from light sensor
  lightVal = analogRead(lightPin);

  // Manage motions
  if (pirValue == 1) {
    Serial.println("Motion detected");
  } else {
    Serial.println("No motion detected");
  }

  // Manage light
  Serial.println(lightVal);

  // Delay of 1 sec
  delay(1000);
}
