#ifndef _LIGHTINGMANAGER_H_
#define _LIGHTINGMANAGER_H_

#include "lighting/lighting_base.h"

class LightingManager {
public:
	LightingManager(LightingManager const&) = delete;
	void operator=(LightingManager const&)  = delete;
    static LightingManager& getInstance() {// Thread-safe storage ensures cross-thread talk
		static LightingManager instance; // Guaranteed to be destroyed. // Instantiated on first use.
		return instance;
	}

	void setup();

void LightingManager::loop() {
}

private:
    LightingManager() {
    }
	LightingBase lightingBase;
};

#endif