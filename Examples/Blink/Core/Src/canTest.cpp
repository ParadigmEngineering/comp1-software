#include "Peripherals/Inc/can_manager.h"
#include "can.h"


class CanTest
{
public:
    void main()
    {
        MX_CAN_Init(); 
        CANInterface interface(&hcan);
        CANManager manager(&interface);

        manager.setTxId(0x16);
        uint32_t data = 62378;
        manager.txMsgSet(data);

        while (true)
        {
            manager.transmit();

            // Wait for a response message
            while (!manager.receive()){};
            auto u32Data = manager.getRxMsg<uint32_t>();
            ++u32Data;
            manager.txMsgSet(u32Data);
        }
    }
};
