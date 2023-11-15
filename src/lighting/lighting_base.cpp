#include "lighting/lighting_base.h"

#include "storagemanager.h"

void LightingBase::setup(){
    const LEDOptions& ledOptions = Storage::getInstance().getLedOptions();

    if ( !ledOptions.has_dataPin ) {
       // set as non-functional
       return;
    }

    ledFormat = ledOptions.ledFormat;
    maxBrightness = ledOptions.brightnessMaximum;
    brightnessSteps = ledOptions.brightnessSteps;
    turnOffWhenSuspended = ledOptions.turnOffWhenSuspended;

    // Setup Player LEDs
	if ( ledOptions.pledType == PLED_TYPE_RGB ) {
        // Player LED = RGB
	} else if (ledOptions.pledType == PLED_TYPE_PWM ) {
        // Player LED = PWM
    }

    // Setup Turbo LED

    // Create NeoPico with pin number and LED count
    if ( isValidPin(ledOptions.dataPin) )
        neopico = new NeoPico(ledOptions.dataPin, 32);
    else
        neopico = nullptr;
}

void LightingBase::process() {
    
}