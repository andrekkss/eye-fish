#include <Servo.h>
#include "Serials.h"
#include "PhSensor.h"

int solenoide_pin = 9;
int ph_pin = A1; 

Servo motor;
Serials serials;

const int threeHoursInSeconds = 10800;
int timerInSeconds = 0;
boolean isActived = false;

float ph_min = 1.0;
float ph_med = 0.0;
float ph_max = 9.2;
float ph_atual = 0.0;

void setup() {
    Serial.begin(9600);
    serials = Serials();
    pinMode(solenoide_pin, OUTPUT);
    down();
}

void loop() {
    valueOfPh();
}

void valueOfPh(){
    int measure = analogRead(ph_pin);

    double voltage = 5 / 1024.0 * measure; //classic digital to voltage conversion

    float Po = 7 + ((2.5 - voltage) / 0.18);
 
    delay(1000);
    Serial.println(Po);
    paraconsistente(Po);
}

void valuesFromApp(){
    serials.loop(&ph_min, &ph_med, &ph_max);
    if(serials.hasData == true){
        serials.setHasData(false);
    }
}


void paraconsistente(float ph){
  float dMinimo = ph_min / 10.0;
  float dMaximo = ph_max / 10.0;
  float dAtual = ph / 10.0;

  float grauDeIncertezaMinimo = dAtual + dMinimo - 1;
  float grauDeCertezaMinimo = dMinimo - dAtual;

  float grauDeIncertezaMaximo = dAtual + dMaximo - 1;
  float grauDeCertezaMaximo = dMaximo - dAtual;

  float validadoMinimo = valida(dMinimo, dAtual, grauDeCertezaMinimo, grauDeIncertezaMinimo);
  float validadoMaximo = valida(dMaximo, dAtual, grauDeCertezaMaximo, grauDeIncertezaMaximo);

  if (((validadoMinimo && validadoMaximo) || (ph < ph_min || ph > ph_max))) {
    up();
    down();
  } else {
    timerInSeconds = timerInSeconds + 1;
    if(timerInSeconds == threeHoursInSeconds){
      paraconsistente(ph);
      timerInSeconds = 0;
      isActived = false;
    }
  }
}

//objetivo entrar em um range
//ef == evidencia favoravel == minimo ou maximo
//ec == evidencia contraria == ph atual
//ctmenos == grau de certeza == grauDeCertezaMinimo
//ctmais == grau de inceteza == grauDeIncertezaMinimo
boolean valida(float ef, float ec, float ctmenos, float ctmais){
   if (ef != ec) {
      if (ctmenos >= 0.5 && ef >= 0.5 && ec <= 0.5) {
          return true;
      } if (ctmenos <= -0.5 && ef <= 0.5 && ec >= 0.5) {
          return false;
      } if (ctmais >= 0.5 && ef >= 0.5 && ec >= 0.5 && ec > ef) {
          return true;
      } if (ctmenos <= 0.5 && ctmais >= 0 && ef >= 0 && ef > ec) {
          return false;
      } if (ctmenos <= 0.5 && ctmais <= 0 && ef >= 0.5 && ef > ec) {
          return true;
      } if (ctmais <= 0.5 && ctmenos >= 0 && ec >= 0.5 && ef > ec) {
          return false;
      } if (ctmais <= 0.5 && ctmenos <= 0 && ef >= 0.5 && ec > ef) {
          return true;
      } else return false;
  } else {
      if (ef == 1) {
          return true;
      } else {
          if (ef == 0) {
              return false;
          } else {
              return false;
          }
      }
  }
}

void up(){
   digitalWrite(solenoide_pin, LOW);              
   delay(2000);  
}

void down(){
    digitalWrite(solenoide_pin, HIGH);              
    delay(1000);                      
}
