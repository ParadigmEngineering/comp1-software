#include "Common/Peripherals/Inc/A60022A.h"

A60022A::A60022A(uint32_t resVal, ADC* ADC) :
    m_resVal(resVal),
    m_ADC(ADC),
    m_EADC(nullptr) {}

A60022A::A60022A(uint32_t resVal, EADC* EADC) :
    m_resVal(resVal),
    m_ADC(nullptr),
    m_EADC(EADC) {}

int A60022A::Read()
{
    // using EADC Interface
    if (m_ADC == nullptr)
    {
        int conversionFactor = 1; // 1uA / 1°C
        int value = m_EADC->read(); // Voltage
        int converted = m_resVal / value; // 1 / uA
        if (value != 0 && m_resVal != 0)
        {
            int temp = 1 / (converted * conversionFactor); // °C!
            return temp;
        }
    }

    // using ADC Interface
    else if (m_EADC == nullptr)
    {
        int conversionFactor = 1; // 1uA / 1°C
        int value = m_ADC->read(); // Voltage
        int converted = value / m_resVal; // 1 / uA
        {
            int temp = 1 / (converted * conversionFactor); // °C!
            return temp;
        }
    }
}
   