#include "PhSensor.h"
#include <Arduino.h>

PhSensor::PhSensor() {}

PhSensor::PhSensor(int pin) {
    this->pin = pin;
    read();
}

float PhSensor::read(){
    measure = analogRead(pin);

    voltage = (5 / 1024.0 * measure); 

    ph = 7 + ((2.5 - voltage) / 0.18);

    delay(valueOfDelay);
    return ph;
}
