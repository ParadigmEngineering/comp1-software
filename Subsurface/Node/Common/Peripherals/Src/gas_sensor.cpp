#include "../Inc/gas_sensor.h"
#include <cstdint>
#include "ADCInterface.h"
#include "EADCInterface.h"

gas_sensor::gas_sensor(uint32_t resVal, ADC* ADC) :
    m_resVal(resVal),
    m_ADC(ADC),
    m_EADC(nullptr) {}

gas_sensor::gas_sensor(uint32_t resVal, EADC* EADC) :
    m_resVal(resVal),
    m_ADC(nullptr),
    m_EADC(EADC) {}

gas_sensor::Read()
{
    // using EADC Interface
    if (m_ADC == nullptr)
    {
        int conversionFactor = 1;
        int value = m_EADC->read();
        int converted = m_resVal / value;
        if (value != 0 && m_resVal != 0)
        {
            int temp = 1 / (converted * conversionFactor);
            return temp;
        }
    }

    // using ADC Interface
    else if (m_EADC == nullptr)
    {
        int conversionFactor = 1;
        int value = m_ADC->read();
        int converted = value / m_resVal;
        {
            int temp = 1 / (converted * conversionFactor);
            return temp;
        }
    }
}