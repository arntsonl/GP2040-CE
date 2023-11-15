#ifndef _lighting_base_h_
#define _lighting_base_h_

#include "../helper.h"
#include "../types.h"

#ifndef LED_TOTAL_COUNT
#define LED_TOTAL_COUNT 30
#endif

#define MAX_LIGHTING_GROUPS 5

#include "lighting_group.h"
#include "lighting_effect.h"
#include "lighting_reaction.h"

#include "NeoPico.hpp"

class LightingBase {
public:
    LightingBase();
    ~LightingBase();
    void setup();
    void process();
    void pause();   // Pause current lighting
    void restart(); // Restart completely
    void addGroup(LightingGroup*);
    void addEffect(LightingEffect*);
    void addReaction(LightingReaction*);
    bool removeGroup(int32_t);
    bool removeEffect(int32_t);
    bool removeReaction(int32_t);
private:
    Pin_t dataPin;
    uint32_t ledFormat; // RGB, RGBW, WRGB
    uint32_t ledCount;
    uint32_t maxBrightness;
    uint32_t brightnessSteps;
    uint32_t turnOffWhenSuspended;

    LightingGroup * m_groups[MAX_LIGHTING_GROUPS];
    LightingEffect * m_effects[MAX_LIGHTING_GROUPS];
    LightingReaction * m_reactions[MAX_LIGHTING_GROUPS];

    NeoPico * neopico;
};

#endif