#ifndef GAS_SENSOR_H
#define GAS_SENSOR_H

#include <cstdint>
#include "ADCInterface.h"
#include "EADCInterface.h

class gas_sensor
{
    public:
        gas_sensor::gas_sensor(uint32_t resVal, ADC* ADC);
        gas_sensor::gas_sensor(uint32_t resVal, EADC* EADC);
        int gas_sensor::Read();
    private:
        uint32_t m_resVal;
        ADC* m_ADC;
        EADC* m_EADC;
}