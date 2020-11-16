#include "Serials.h"
#include <Arduino.h>

Serials::Serials() {}

void Serials::setSeparator(char separetor){
    this->separetor = separetor;
}

void Serials::loop(float* one, float* two, float* three){
    init();
    if (hasData == true) {
        strcpy(tempChars, receivedChars);

        getThreeValuesFromData(one, two, three);
    }
}

void Serials::setHasData(boolean newValue){
    hasData = newValue;
}

void Serials::init() {
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

void Serials::getThreeValuesFromData(float* one, float* two, float* three) {
    char * strtokIndx; 

    strtokIndx = strtok(tempChars, ",");      
    *one = atof(strtokIndx); 

    strtokIndx = strtok(NULL, ","); 
    *two = atof(strtokIndx);     

    strtokIndx = strtok(NULL, ",");
    *three = atof(strtokIndx);
}
