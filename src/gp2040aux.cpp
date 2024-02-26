// GP2040 includes
#include "gp2040aux.h"
#include "gamepad.h"

#include "drivermanager.h"
#include "storagemanager.h"
#include "peripheralmanager.h"
#include "usbhostmanager.h"

#include "addons/board_led.h"  // Add-Ons
#include "addons/buzzerspeaker.h"
#include "addons/i2cdisplay.h"
#include "addons/inputhistory.h"
#include "addons/pleds.h"
#include "addons/neopicoleds.h"

#include <iterator>

GP2040Aux::GP2040Aux() : inputDriver(nullptr) {
}

GP2040Aux::~GP2040Aux() {
}

// GP2040Aux will always come after GP2040 setup(), so we can rely on the
// GP2040 setup function for certain setup functions.
void GP2040Aux::setup() {
	PeripheralManager::getInstance().initI2C();
	PeripheralManager::getInstance().initSPI();
	PeripheralManager::getInstance().initUSB();

	InputHistoryAddon* inputHistoryAddon = new InputHistoryAddon();
	I2CDisplayAddon* i2CDisplayAddon = new I2CDisplayAddon();

	if(inputHistoryAddon->available() && i2CDisplayAddon->available())
		i2CDisplayAddon->attachInputHistoryAddon(inputHistoryAddon);

	// Setup Add-ons
	addons.LoadAddon(inputHistoryAddon, CORE1_LOOP);
	addons.LoadAddon(i2CDisplayAddon, CORE1_LOOP);
	addons.LoadAddon(new NeoPicoLEDAddon(), CORE1_LOOP);
	addons.LoadAddon(new PlayerLEDAddon(), CORE1_LOOP);
	addons.LoadAddon(new BoardLedAddon(), CORE1_LOOP);
	addons.LoadAddon(new BuzzerSpeakerAddon(), CORE1_LOOP);

	// Initialize our input driver's auxilliary functions
	inputDriver = DriverManager::getInstance().getDriver();
	if ( inputDriver != nullptr ) {
		inputDriver->initializeAux();
	}

	// Initialize our USB manager
	USBHostManager::getInstance().start();
}

void GP2040Aux::run() {
	while (1) {
		addons.ProcessAddons(CORE1_LOOP);
		
		// Run auxiliary functions for input driver on Core1
		if ( inputDriver != nullptr ) {
			inputDriver->processAux();
		}
	}
}
