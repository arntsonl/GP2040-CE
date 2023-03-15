#ifndef TURBO_H_
#define TURBO_H_

#include "gpaddon.h"

#ifndef TURBO_ENABLED
#define TURBO_ENABLED 0
#endif

#ifndef DEFAULT_SHOT_PER_SEC
#define DEFAULT_SHOT_PER_SEC 15
#endif  // DEFAULT_SHOT_PER_SEC

// TURBO Button Mask
#define TURBO_BUTTON_MASK (GAMEPAD_MASK_B1 | GAMEPAD_MASK_B2 | GAMEPAD_MASK_B3 | GAMEPAD_MASK_B4 | \
                            GAMEPAD_MASK_L1 | GAMEPAD_MASK_R1 | GAMEPAD_MASK_L2 | GAMEPAD_MASK_R2)

// TURBO LED
#ifndef TURBO_LED_PIN
#define TURBO_LED_PIN   -1
#endif

// TURBO SHMUP MODE
#ifndef TURBO_SHMUP_MODE
#define TURBO_SHMUP_MODE -1
#endif

enum { 
    TURBO_PRIORITY,
    CHARGE_PRIORITY
} ShmupMixMode;

#ifndef SHMUP_ALWAYS_ON1
#define SHMUP_ALWAYS_ON1 0
#endif

#ifndef SHMUP_ALWAYS_ON2
#define SHMUP_ALWAYS_ON2 0
#endif

#ifndef SHMUP_ALWAYS_ON3
#define SHMUP_ALWAYS_ON3 0
#endif

#ifndef SHMUP_ALWAYS_ON4
#define SHMUP_ALWAYS_ON4 0
#endif

#ifndef PIN_SHMUP_BUTTON1
#define PIN_SHMUP_BUTTON1 -1
#endif

#ifndef PIN_SHMUP_BUTTON2
#define PIN_SHMUP_BUTTON2 -1
#endif

#ifndef PIN_SHMUP_BUTTON3
#define PIN_SHMUP_BUTTON3 -1
#endif

#ifndef PIN_SHMUP_BUTTON4
#define PIN_SHMUP_BUTTON4 -1
#endif

#ifndef SHMUP_BUTTON1
#define SHMUP_BUTTON1 0
#endif

#ifndef SHMUP_BUTTON2
#define SHMUP_BUTTON2 0
#endif

#ifndef SHMUP_BUTTON3
#define SHMUP_BUTTON3 0
#endif

#ifndef SHMUP_BUTTON4
#define SHMUP_BUTTON4 0
#endif

#ifndef PIN_SHMUP_DIAL
#define PIN_SHMUP_DIAL -1
#endif

// Turbo Module Name
#define TurboName "Turbo"

class TurboInput : public GPAddon {
public:
    virtual bool available();
	virtual void setup();       // TURBO Button Setup
    virtual void preprocess() {}
	virtual void process();     // TURBO Setting of buttons (Enable/Disable)
    virtual std::string name() { return TurboName; }
private:
    bool read();        // Get TURBO Button State
    void debounce();    // TURBO Button Debouncer
    bool bDebState;             // Debounce TURBO Button State
    uint32_t uDebTime;          // Debounce TURBO Button Time
    uint16_t lastPressed;       // Last buttons pressed (for Turbo Enable)
    uint16_t lastDpad;          // Last d-pad pressed (for Turbo Change)
    uint16_t buttonsEnabled;    // Turbo Buttons Enabled
    uint16_t alwaysEnabled;     // Turbo SHMUP Always Enabled
    uint32_t uIntervalMS;       // Turbo Interval
    bool bTurboState;           // Turbo Buttons State
    bool bTurboFlicker;         // Turbo Enable Buttons Toggle OFF Flag ??
    uint32_t nextTimer;         // Turbo Timer
    uint8_t pinButtonTurbo;     // Turbo Button Pin
    uint8_t shmupMode;          // Turbo SHMUP Mode
    uint8_t shmupBtnPin[4];     // Turbo SHMUP Non-Turbo Pins
    uint16_t shmupBtnMask[4]; // Turbo SHMUP Non-Turbo Button Masks
};
#endif  // TURBO_H_
