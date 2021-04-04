#ifndef A60022A_H
#define A60022A_H

#include <cstdint>
#include "ADCInterface.h"
#include "EADCInterface.h"

class A60022A
{
    public:
        A60022A::A60022A(uint32_t resVal, ADC* ADC);
        A60022A::A60022A(uint32_t resVal, EADC* EADC);
        int A60022A::Read();
    private:
        uint32_t m_resVal;
        ADC* m_ADC;
        EADC* m_EADC;
};

#endif
