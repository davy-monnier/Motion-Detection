int pirPin = D4;  // Define pin of PIR sensor
int pirValue = 0; // Initialize value of pir sensor

void setup() {
  // Debug console
  Serial.begin(115200);

}

void loop() {
  // Get value from PIR sensor
  pirValue = digitalRead(pirPin);

  // Print value of PIR sensor
  Serial.println(piravlue);

  // Delay of 1 sec
  delay(1000);
}
