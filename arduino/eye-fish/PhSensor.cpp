#include "PhSensor.h"
#include <Arduino.h>

PhSensor::PhSensor() {}

PhSensor::PhSensor(int pin) {
    this->pin = pin;
    read();
}

float PhSensor::read(){
    int measure = analogRead(pin);

    double voltage = 5 / 1024.0 * measure; //classic digital to voltage conversion
    float Po = 7 + ((2.5 - voltage) / 0.18);
 
    delay(1000);
    return Po;
}
