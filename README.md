# PillMate  ~  Meds on Time
<kbd> **Figure 1** <br><br>*Pill Mate Logo*<br><br> <kbd>![PILMATELOGO](https://github.com/user-attachments/assets/5be71aa7-7ffe-4869-b3bf-4390758cdfbf)</kbd></kbd>
## Table of Contents : 
1. [Introduction](#Introduction)
1. [Esp32](#Esp32)
   - [Circuit Components](#Circuit-Components)
   - [Circuit Wiring](#Circuit-Wiring)
   - [Arduino Code](#Arduino-Code)
   - [Code simulation](#Code-simulation)
1. [References](#References)

## Introduction
The first task of the Internet of Things Department is to control 5 LEDs using an esp32. The five LEDs will be controlled with the web page and database that was created in the first task of the Software Department.<br><br>
<kbd> **Figure 1** <br><br>*Web Page*<br><br> <kbd>![image](https://github.com/Rawnaa-19/IOT-Esp32/assets/106926557/221cbc67-ceef-421d-b7e5-54117d50bfe2)</kbd></kbd>
## Esp32
Esp32 is a microcontroller that has a builtin proccessor in it.[^2] The esp32 used in this task is esp - wroom 32.<br><br>
<kbd> **Figure 2** <br><br>*Esp32-Wroom Pinout*<br><br> <kbd>![image](https://github.com/Rawnaa-19/IOT-Esp32/assets/106926557/bb9bb6e7-34e4-4725-987d-e2150b5aa1e5)(arduino-projekte.info, 2023)[^1]</kbd></kbd>
### Circuit Components
1. Esp32 wroom.
2. 4 Red LEDs.
3. Green LED.
4. 5 220 ohm resistors.
5. Breadboard.
6. Male Wires.
### Circuit Wiring
All LEDs cathode legs are connected to the GND pin of the esp32.The anode leg of the green LED (stop button) is connected to pin 26 of esp32. The anode legs of the red LEDs (right , left , forward , backward) are connected to pins (27 , 25 , 12 , 14) respectively.<br><br>
<kbd> **Figure 3** <br><br>*Circuit Wiring*<br><br> <kbd>![image](https://github.com/Rawnaa-19/IOT-Esp32/assets/106926557/38d45730-16c8-4d5a-bee5-ac7ada8e9680)</kbd></kbd><br><br>
<kbd> **Figure 4** <br><br>*Circuit Wiring*<br><br> <kbd>![IMG-7737](https://github.com/Rawnaa-19/IOT-Esp32/assets/106926557/ebf4ec77-d6a7-4bd3-9ef5-ac9bc59aff77)
</kbd></kbd>

### Arduino Code
```
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Mobily_Fiber_2.4G";
const char* password = "C91777A3";
const String url = "http://192.168.100.44/web1/lastV.php";
String payload = "";
int leftPin = 25;
int rightPin = 27;
int forwardPin = 12;
int backwardPin = 14;
int stopPin = 26;
void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  pinMode(leftPin, OUTPUT);
  pinMode(rightPin, OUTPUT);
  pinMode(forwardPin, OUTPUT);
  pinMode(backwardPin, OUTPUT);
  pinMode(stopPin, OUTPUT);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("OK! IP=");
  Serial.println(WiFi.localIP());

  Serial.print("Fetching " + url + "... ");


}

void loop() {
  HTTPClient http;
  http.begin(url);
  int httpResponseCode = http.GET();
  if (httpResponseCode > 0) {
    Serial.print("HTTP ");
    Serial.println(httpResponseCode);
    payload = http.getString();
    Serial.println();
    Serial.println(payload);
    if(payload == "Forward"){
      digitalWrite(forwardPin, HIGH);
      digitalWrite(backwardPin, LOW);
      digitalWrite(rightPin, LOW);
      digitalWrite(leftPin, LOW);
      digitalWrite(stopPin, LOW);
    }
    else if(payload == "Stop"){
      digitalWrite(forwardPin, LOW);
      digitalWrite(backwardPin, LOW);
      digitalWrite(rightPin, LOW);
      digitalWrite(leftPin, LOW);
      digitalWrite(stopPin, HIGH);
    }
    else if(payload == "Right"){
      digitalWrite(forwardPin, LOW);
      digitalWrite(backwardPin, LOW);
      digitalWrite(rightPin, HIGH);
      digitalWrite(leftPin, LOW);
      digitalWrite(stopPin, LOW);
    }
    else if(payload == "Left"){
      digitalWrite(forwardPin, LOW);
      digitalWrite(backwardPin, LOW);
      digitalWrite(rightPin, LOW);
      digitalWrite(leftPin, HIGH);
      digitalWrite(stopPin, LOW);
    }
    else if(payload == "Backward"){
      digitalWrite(forwardPin, LOW);
      digitalWrite(backwardPin, HIGH);
      digitalWrite(rightPin, LOW);
      digitalWrite(leftPin, LOW);
      digitalWrite(stopPin, LOW);
    }
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
    Serial.println(":-(");
  }
  delay(100);
}
```
### Code Simulation



https://github.com/Rawnaa-19/IOT-Esp32/assets/106926557/0c81c2c2-42a3-42cc-96fb-86f2ec639479



## References
 [^1]: arduino-projekte.info. (2023, August 2). Node MCU ESP32 38Pin USB Type-C. https://arduino-projekte.info/produkt/node-mcu-esp32-38pin-usb-type-c/
 [^2]: Overview of ESP32 features. What do they practically mean? (n.d.). Tutorials. https://www.exploreembedded.com/wiki/Overview_of_ESP32_features._What_do_they_practically_mean%3F
