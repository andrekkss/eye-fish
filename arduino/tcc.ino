//para usar digitando o ângulo


#include <Servo.h>

#define pinServo 9

Servo servo1;
int grau = 0;
int ph_pin = A0; 
int colocado = 0;
int timerLimit = 10800;
int timer = 0;
float ph_min = 5.5;
float ph_med = 6.0;
float ph_max = 9.2;

void setup() {
  servo1.attach(pinServo);
  Serial.begin(9600);
  servo1.write(0);
}

void loop() {
  phSensor();
//  if (Serial.available() > 0) {
//    grau = Serial.parseInt();
//   servo1.write(grau);              
//   delay(1000);    
//  }
}

void validatePh(float ph){
  if(colocado == 0 && !(ph >= ph_min && ph <= ph_max)){
    up(50);
    down();
    Serial.println("\tcolocado: ");
    colocado = 1;
  } else {
    timer = timer + 1;
    Serial.println("\ttimer: ");
    Serial.println(timer);
    if(timer == timerLimit){
      validatePh(ph);
      timer = 0;
      colocado = 0;
    }
  }
}

void phSensor(){
  int measure = analogRead(ph_pin);

  double voltage = 5 / 1024.0 * measure; 
  
  float ph = 7 + ((2.5 - voltage) / 0.18);

  delay(1000);
  Serial.println("\tPH: ");
  Serial.println(ph, 3);
  validatePh(ph);
}

void up(int grau){
   servo1.write(grau);              
   delay(500);  
}

void down(){
    servo1.write(0);              
    delay(1000);                      
}
