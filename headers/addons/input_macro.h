#ifndef _InputMacro_H
#define _InputMacro_H

#include "gpaddon.h"

#include "GamepadEnums.h"

#ifndef INPUT_MACRO_ENABLED
#define INPUT_MACRO_ENABLED 0
#endif

#ifndef BOARD_LED_PIN
#ifndef PICO_DEFAULT_LED_PIN
#define BOARD_LED_PIN 25
#else
#define BOARD_LED_PIN PICO_DEFAULT_LED_PIN
#endif
#endif

#ifndef INPUT_MACRO_BOARD_LED_ENABLED
#define INPUT_MACRO_BOARD_LED_ENABLED 1
#endif

#ifndef INPUT_MACRO_PIN
#define INPUT_MACRO_PIN -1
#endif

#define MAX_MACRO_INPUT_LIMIT 30
#define MAX_MACRO_LIMIT 6
#define INPUT_HOLD_US 16666

// Input Macro Module Name
#define InputMacroName "Input Macro"

class InputMacro : public GPAddon {
public:
	virtual bool available();   // GPAddon available
	virtual void setup();       // Analog Setup
	virtual void process() {};     // Analog Process
	virtual void preprocess();
    virtual std::string name() { return InputMacroName; }
private:
	void checkMacroPress();
	void checkMacroAction();
	void runCurrentMacro();
	void reset();

	bool isMacroRunning = false;
	bool isMacroTriggerHeld = false;
	int macroPosition = -1;

	uint32_t macroButtonMask = 0;
	uint32_t macroPinMasks[6] = {};

	uint64_t macroStartTime = 0;

	int pressedMacro = -1;
	int macroInputPosition = 0;
	bool macroInputPressed = false;
	uint32_t macroInputHoldTime = INPUT_HOLD_US;
	bool prevMacroInputPressed = false;
	bool boardLedEnabled = false;

	MacroOptions inputMacroOptions;
};

#endif  // _InputMacro_H_