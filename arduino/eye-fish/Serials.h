#ifndef MY_SERIALS_H
#define MY_SERIALS_H
#include <Arduino.h>

class Serials {
  
  private:
    boolean recvInProgress = false;
    byte ndx = 0;
    static const byte numChars = 32;
    char receivedChars[numChars];
    char tempChars[numChars];
    char startMarker = '<';
    char endMarker = '>';
    char separetor = ',';
    char charReceivedFromApp;
    
  public:
    boolean hasData = false;
    Serials();
    void init();
    void setHasData(boolean newValue);
    void loop(float* one, float* two, float* three);
    void setSeparator(char separetor);
    void getThreeValuesFromData(float* one, float* two, float* three);
};

#endif
