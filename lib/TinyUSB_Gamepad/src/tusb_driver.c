/*
 * SPDX-License-Identifier: MIT
 * SPDX-FileCopyrightText: Copyright (c) 2021 Jason Skuby (mytechtoybox.com)
 */

#include <stdint.h>

#include "tusb_config.h"
#include "tusb.h"
#include "class/hid/hid.h"
#include "device/usbd_pvt.h"

#include "usb_driver.h"
#include "hid_driver.h"
#include "xinput_driver.h"

InputMode current_input_mode = XINPUT;

void initialize_driver(void)
{
	tusb_init();
}

void send_report(void *report, uint8_t report_size)
{
	static uint8_t previous_report[CFG_TUD_ENDPOINT0_SIZE] = { };

	if (tud_suspended())
		tud_remote_wakeup();

	if (memcmp(previous_report, report, report_size) != 0)
	{
		bool sent = false;
		switch (current_input_mode)
		{
			case XINPUT:
				sent = send_xinput_report(report, report_size);
				break;

			default:
				sent = send_hid_report(report, report_size);
				break;
		}

		if (sent)
			memcpy(previous_report, report, report_size);
	}

	tud_task();
}

/* USB Driver Callback (Required for XInput) */

const usbd_class_driver_t *usbd_app_driver_get_cb(uint8_t *driver_count)
{
	switch (current_input_mode)
	{
		case XINPUT:
			*driver_count = 1;
			return &xinput_driver;

		case SWITCH:
		default:
			*driver_count = 0;
			return &hid_driver;
	}
}

/* USB HID Callbacks (Required) */

// Invoked when received GET_REPORT control request
// Application must fill buffer report's content and return its length.
// Return zero will cause the stack to STALL request
uint16_t tud_hid_get_report_cb(uint8_t report_id, hid_report_type_t report_type, uint8_t *buffer, uint16_t reqlen)
{
	// TODO not Implemented
	(void)report_id;
	(void)report_type;
	(void)buffer;
	(void)reqlen;

	return 0;
}

// Invoked when received SET_REPORT control request or
// received data on OUT endpoint ( Report ID = 0, Type = 0 )
void tud_hid_set_report_cb(uint8_t report_id, hid_report_type_t report_type, uint8_t const *buffer, uint16_t bufsize)
{
	// echo back anything we received from host
	tud_hid_report(0, buffer, bufsize);
}


/* Device callbacks (Optional) */

// Invoked when device is mounted
void tud_mount_cb(void)
{
}

// Invoked when device is unmounted
void tud_umount_cb(void)
{
}

// Invoked when usb bus is suspended
// remote_wakeup_en : if host allow us  to perform remote wakeup
// Within 7ms, device must draw an average of current less than 2.5 mA from bus
void tud_suspend_cb(bool remote_wakeup_en)
{
	(void)remote_wakeup_en;
}

// Invoked when usb bus is resumed
void tud_resume_cb(void)
{
}