#ifndef MY_PH_SENSOR_H
#define MY_PH_SENSOR_H
#include <Arduino.h>

class PhSensor {
  private:
    double voltage; 
    int pin;
    int measure;
    int valueOfDelay = 1000;

  public:
    float ph;
    PhSensor();
    PhSensor(int pin);
    float read();
};

#endif
