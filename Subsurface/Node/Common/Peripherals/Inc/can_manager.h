#ifndef NODE_CAN_MANAGER_H
#define NODE_CAN_MANAGER_H

#include "can_interface.h"


class CANManager
{
private:
    CANInterface* m_can_interface;
    uint8_t m_tx_buffer[8] = {0};
    uint8_t m_rx_buffer[8] = {0};

public:
    CANManager (CANInterface* can_interface);

    bool transmit();

    bool receive();

    void setTxId(uint16_t can_id);

    template<typename T>
    bool txMsgSet(T data, uint8_t position = 0)
    {
        // Make sure we won't overflow
        if (sizeof(T) + position > 8) { return false; }

        uint8_t* data_as_uint8_t = (uint8_t*)(&data);
        for (uint8_t i = position; i < position + sizeof(T); i++)
        {
            m_tx_buffer[i] = data_as_uint8_t[i];
        }

        return true;
    }

    template<typename T>
    T getRxMsg(uint8_t position)
    {
        // If we would overflow, just start from 0
        if (sizeof(T) + position > 8) { return (T)m_rx_buffer[0]; }

        return (T)m_rx_buffer[position];
    }
};

#endif