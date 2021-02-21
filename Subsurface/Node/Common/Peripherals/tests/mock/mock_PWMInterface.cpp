#include "mock_PWMInterface.h"

PWMInterface::PWMInterface(uint64_t clockSpeed,
                           uint32_t preScaler,
                           uint32_t period,
                           uint32_t pulse,
                           TIM_HandleTypeDef* timer,
                           uint32_t channel)
    : m_clockSpeed(),
      m_preScaler(),
      m_period(),
      m_pulse(),
      m_timer(),
      m_channel()
      {}

void PWMInterface::setPrescaler() {}

void PWMInterface::setAutoreload() {}

void PWMInterface::setCompare() {}

void PWMInterface::PWMStart()
{
    setPrescaler();
    setAutoreload();
    setCompare();
}

void PWMInterface::PWMStop() {}

void PWMInterface::setPeriod(uint32_t period)
{
    m_period = period;
    setAutoreload();
}

void PWMInterface::setPulse(uint32_t pulse)
{
    m_pulse = pulse;
    setCompare();
}

