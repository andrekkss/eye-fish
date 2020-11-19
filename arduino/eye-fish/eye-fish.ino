#include <Servo.h>
#include "Serials.h"
#include "PhSensor.h"

int solenoide_pin = 9;
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
//    pinMode(solenoide_pin, OUTPUT);
}

void loop() {
//    valuesFromApp();
//    if(ph_min != 0.0 && ph_med != 0.0 && ph_max != 0.0){
        valueOfPh();
//    }
}

void valueOfPh(){
    ph_atual = ph_sensor.read();
    Serial.println(ph_atual);
//    validatePh(ph_atual);
}

void valuesFromApp(){
    serials.loop(&ph_min, &ph_med, &ph_max);
    if(serials.hasData == true){
        serials.setHasData(false);
    }
}


void validatePh(float ph){
  if(isActived == false && !(ph >= ph_min && ph <= ph_max)){
    up();
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

void up(){
   digitalWrite(solenoide_pin, HIGH);              
   delay(500);  
}

void down(){
    digitalWrite(solenoide_pin, LOW);              
    delay(1000);                      
}
