#include <WiFi.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Stepper.h>
#include <SoftwareSerial.h>
#include <DFRobotDFPlayerMini.h>
#include <HTTPClient.h>

#define NTP_SERVER     "pool.ntp.org"
#define UTC_OFFSET     10800
#define IR_SENSOR_PIN 13

// Motor setup
#define IN1 14
#define IN2 27
#define IN3 26
#define IN4 25
const int stepsPerRevolution = 2048;
const int totalSlots = 14;
const int dispenseSteps = 512;
int currentSlot = 0;

String botToken = "7739943007:AAHpyjVE8Pekq7XlI6Qc1TI0CVFMrrkMxCk";  
String chatID = "6709635387";

const char* ssid = "HUAWEI-340C3P46_HiLink";
const char* password = "C91777A3";

// Pill names
const char* pillNames[] = {"Ibuprofen", "Melatonin", "Vitamin D"};

// Initialize the stepper library
Stepper stepper(stepsPerRevolution, IN1, IN3,IN2, IN4);
LiquidCrystal_I2C LCD(0x27, 16, 2);
SoftwareSerial mySerial(16, 17); // RX, TX for DFPlayer Mini
DFRobotDFPlayerMini myDFPlayer;

// Medication times (hour, minute)
const int medicationTimes[][2] = {
    {5, 17},   // First pill
    {5, 10},   // Second pill
    {5, 15}    // Third pill
};
const int numMedications = sizeof(medicationTimes) / sizeof(medicationTimes[0]);
bool medicationGiven[numMedications] = {false, false, false};

// Current position of the motor
long currentPosition = 0;

void setup() {
    Serial.begin(115200);
    mySerial.begin(9600);

    LCD.init();
    LCD.backlight();
    LCD.setCursor(0, 0);
    LCD.print("Connecting to ");
    LCD.setCursor(0, 1);
    LCD.print("WiFi ");

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(250);
    }

    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    LCD.clear();
    LCD.setCursor(0, 0);
    LCD.println("Online");
    LCD.setCursor(0, 1);
    LCD.println("Updating time...");
    delay(2000);
    configTime(UTC_OFFSET, 0, NTP_SERVER);

    if (!myDFPlayer.begin(mySerial)) {
        Serial.println("DFPlayer Mini not found");
        while (true);
    }

    pinMode(IR_SENSOR_PIN, INPUT);
    myDFPlayer.volume(30);
}

void loop() {
    struct tm timeinfo;
    if (getLocalTime(&timeinfo)) {
        printLocalTime(); // Call to display the time on the LCD

        for (int i = 0; i < numMedications; i++) {
            if (timeinfo.tm_hour == medicationTimes[i][0] &&
                timeinfo.tm_min == medicationTimes[i][1] &&
                !medicationGiven[i]) {

                dispenseMedication(pillNames[i]);
                medicationGiven[i] = true;
            }
        }
    } else {
        Serial.println("Failed to obtain time");
        delay(1000);
    }

    delay(1000); // Delay to avoid overwhelming the loop
}

void dispenseMedication(String pillName) {
    LCD.clear();
    LCD.print("Dispensing...");

    // Move the motor to dispense
    currentSlot = (currentSlot + 1) % totalSlots; // Cycle through slots
    int targetSteps = dispenseSteps; // Define steps to dispense

    stepper.setSpeed(15); // Set speed (RPM)
    stepper.step(targetSteps); // Move to dispense

    myDFPlayer.play(2); // Play dispense sound
    delay(5000); // Allow time for dispensing

    // Update current position after dispensing
    currentPosition += dispenseSteps;

    struct tm timeinfo;
    getLocalTime(&timeinfo);

    int attempts = 0;
    while (attempts < 3) {
        if (digitalRead(IR_SENSOR_PIN) == LOW) {
            myDFPlayer.play(1); // Confirmation sound
            LCD.clear();
            LCD.print("Meds Taken");
            delay(5000);
            LCD.clear();
            LCD.print("Ready");

            char timeStr[16];
            strftime(timeStr, sizeof(timeStr), "%H:%M:%S", &timeinfo);
            String message = "✅ " + pillName + " taken at " + String(timeStr) + "!";
            sendTelegramMessage(message);
            return;
        } else {
            myDFPlayer.play(2); // Reminder sound
            attempts++;
            delay(5000);
        }
    }

    char timeStr[16];
    strftime(timeStr, sizeof(timeStr), "%H:%M:%S", &timeinfo);
    String message = "⚠️ " + pillName + " was not taken after 3 checks at " + String(timeStr) + "!";
    sendTelegramMessage(message);

    LCD.clear();
    LCD.print("Please take meds");
    delay(10000);
}

void sendTelegramMessage(String message) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        String url = "https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + chatID + "&text=" + message;

        http.begin(url);
        int httpResponseCode = http.GET();

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("Message sent:");
            Serial.println(response);
        } else {
            Serial.print("Error code: ");
            Serial.println(httpResponseCode);
        }
        http.end();
    } else {
        Serial.println("WiFi not connected");
    }
}

void printLocalTime() {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        LCD.setCursor(0, 1);
        LCD.println("Connection Err");
        return;
    }
    char timeStr[9];
    char dateStr[17];
    strftime(timeStr, sizeof(timeStr), "%H:%M:%S", &timeinfo);
    strftime(dateStr, sizeof(dateStr), "%d/%m/%Y", &timeinfo);
    LCD.clear();
    LCD.setCursor(0, 0);
    LCD.print("Time: ");
    LCD.print(timeStr);
    LCD.setCursor(0, 1);
    LCD.print(dateStr);
}