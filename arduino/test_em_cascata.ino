#include <Servo.h>

class Serials {
  private: 
    static boolean recvInProgress = false;
    static byte ndx = 0;
    static const byte numChars = 32;
    char receivedChars[numChars];
    char tempChars[numChars];
    char startMarker = '<';
    char endMarker = '>';
    char separetor = ',';
    char charReceivedFromApp;
  public:
    boolean hasData = false;
    Serials() {}

    void setSeparator(char separetor){
        this->separetor = separetor;
    }

    void loop(float* one, float* two, float* three){
        init();
        if (hasData == true) {
            strcpy(tempChars, receivedChars);

            parseData(one, two, three);
            hasData = false;
        }
    }

    void init() {
        while (Serial.available() > 0 && hasData == false) {
            charReceivedFromApp = Serial.read();
            if (recvInProgress == true) {
                if (charReceivedFromApp != endMarker) {
                    receivedChars[ndx] = charReceivedFromApp;
                    ndx++;
                    if (ndx >= numChars) {
                        ndx = numChars - 1;
                    }
                }
                else {
                    receivedChars[ndx] = '\0'; 
                    recvInProgress = false;
                    ndx = 0;
                    hasData = true;
                }
            } else if (charReceivedFromApp == startMarker) {
                recvInProgress = true;
            }
        }
    }

    void getThreeValuesFromData(float* one, float* two, float* three) {
        char * strtokIndx; 

        strtokIndx = strtok(tempChars, ",");      
        *one = atof(strtokIndx); 
    
        strtokIndx = strtok(NULL, ","); 
        *two = atof(strtokIndx);     

        strtokIndx = strtok(NULL, ",");
        *three = atof(strtokIndx);
    }
};

#define motor_pin 9
int ph_pin = A0; 

Servo motor;

const int threeHoursInSeconds = 10800;

float ph_min = 0.0;
float ph_med = 0.0;
float ph_max = 0.0;

int timerInSeconds = 0;
Serials serials;

void setup() {
    serials = Serials();
    motor.attach(motor_pin);
    Serial.begin(9600);
}

void loop() {
    serials.loop();
    if(asData == true){
        serials.getThreeValuesFromData(ph_min, ph_med, ph_max);
        showParsedData();
    }
}

void showParsedData() {
    Serial.print("ph_min ");
    Serial.println(ph_min);
    Serial.print("ph_med ");
    Serial.println(ph_med);
    Serial.print("ph_max ");
    Serial.println(ph_max);
}