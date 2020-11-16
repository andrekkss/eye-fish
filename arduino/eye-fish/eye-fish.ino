#include <Servo.h>
#include "Serials.h"
#include "PhSensor.h"

#define motor_pin 9
int ph_pin = A0; 

Servo motor;
Serials serials;
PhSensor ph_sensor;

const int threeHoursInSeconds = 10800;
int timerInSeconds = 0;
boolean isActived = false;

float ph_min = 0.0;
float ph_med = 0.0;
float ph_max = 0.0;
float ph_atual = 0.0;

void setup() {
    Serial.begin(9600);
    serials = Serials();
    ph_sensor = PhSensor(ph_pin);
    motor.attach(motor_pin);
    motor.write(0);
}

void loop() {
    valuesFromApp();
    if(ph_min != 0.0, ph_med != 0.0, ph_max != 0.0){
        valueOfPh();
    }
}

void valueOfPh(){
    ph_atual = ph_sensor.read();
    validatePh(ph_atual);
}

void valuesFromApp(){
    serials.loop(&ph_min, &ph_med, &ph_max);
    if(serials.hasData == true){
        serials.setHasData(false);
    }
}


void validatePh(float ph){
  if(isActived == false && !(ph >= ph_min && ph <= ph_max)){
    up(50);
    down();
    isActived = true;
  } else {
    timerInSeconds = timerInSeconds + 1;
    if(timerInSeconds == threeHoursInSeconds){
      validatePh(ph);
      timerInSeconds = 0;
      isActived = false;
    }
  }
}

void up(int grau){
   motor.write(grau);              
   delay(500);  
}

void down(){
    motor.write(0);              
    delay(1000);                      
}
