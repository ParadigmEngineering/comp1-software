#include "pwmTest.h"

void PwmTest::main()
{
    MX_TIM1_Init();

    uint64_t clockSpeed = 72;
    uint32_t preScaler = 0;
    uint32_t period = 0;
    uint32_t pulse = 0;
    uint32_t channel = 1;

    PWMInterface interface(clockSpeed, 
                           preScaler,
                           period,
                           pulse,
                           &htim1,
                           channel);
                           
    PWMManager manager(clockSpeed,
                       preScaler,
                       period,
                       pulse,
                       &interface,
                       &htim1,
                       channel);

    uint8_t percent = 30;
    manager.setDutyCyclePercent(percent);
    while (true)
    {
        manager.updateInterface();
    }
}
