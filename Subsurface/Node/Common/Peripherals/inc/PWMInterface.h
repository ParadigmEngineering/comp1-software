#include "stm32f3xx_hal.h"
#include <cstdint>

#ifndef PWMINTERFACE_H
#define PWMINTERFACE_H

class PWMInterface
{
public:
    // Constructor
    PWMInterface(uint64_t clockSpeed, 
                 uint32_t preScaler, 
                 uint32_t period, 
                 uint32_t pulse, 
                 TIM_HandleTypeDef* timer, 
                 uint32_t channel);

    // Start and stop
    void PWMStart();
    void PWMStop();

    // Set parameters
    void setParameters(uint64_t clockspeed, 
                       uint32_t preScaler, 
                       uint32_t period,
                       uint32_t pulse, 
                       TIM_HandleTypeDef* timer, 
                       uint32_t channel);

    // Set Prescaler
    void setPrescaler();

    // Set Autoreload
    void setAutoreload();

    // Set Compare
    void setCompare();

    // Set Period and Pulse
    void setPeriod(uint32_t period);
    void setPulse(uint32_t pulse);

private:

    uint64_t m_clockSpeed;
    uint32_t m_preScaler;
    uint32_t m_period;
    uint32_t m_pulse;
    TIM_HandleTypeDef* m_timer;
    uint32_t m_channel;

};
#endif // PWMINTERFACE_H
