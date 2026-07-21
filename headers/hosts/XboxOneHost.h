/*
 * SPDX-License-Identifier: MIT
 * SPDX-FileCopyrightText: Copyright (c) 2026 OpenStickCommunity (gp2040-ce.info)
 */

#ifndef _XBOXONEHOST_H_
#define _XBOXONEHOST_H_

#include <gphost.h>

#include "drivers/xbone/XBOneDescriptors.h"

//
// Xbox One Controller Host
//
class XboxOneHost : public GPHost {
public:
    static bool match(uint8_t dev_addr, uint8_t instance, uint16_t vendor_id, uint16_t product_id, uint8_t controller_type);
    virtual void initialize(uint8_t dev_addr, uint8_t instance, uint16_t vendor_id, uint16_t product_id, uint8_t const* desc_report, uint16_t desc_len);
    virtual void gamepad(Gamepad * gamepad);
    virtual void report_received(uint8_t dev_addr, uint8_t instance, uint8_t const* report, uint16_t len);
    virtual void report_sent(uint8_t dev_addr, uint8_t instance, uint8_t const* report, uint16_t len);
    virtual void update();
    virtual void shutdown() {}
    virtual void set_report_complete(uint8_t dev_addr, uint8_t instance, uint8_t report_id, uint8_t report_type, uint16_t len) {}
    virtual void get_report_complete(uint8_t dev_addr, uint8_t instance, uint8_t report_id, uint8_t report_type, uint16_t len) {}
private:
    void process_setup();

    int setup_stage;
    uint8_t last_left_rumble;
    uint8_t last_right_rumble;
    XboxOneGamepad_Data_t prev_report;
};

#endif // _XBOXONEHOST_H_
