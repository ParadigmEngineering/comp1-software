#ifndef NODE_CAN_MANAGER_H
#define NODE_CAN_MANAGER_H

#ifndef UNIT_TEST
#include "can_interface.h"
#else
#include "mock_can_interface.h"
#endif

#include <cstring>

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

    uint8_t* getTxBuffer() { return m_tx_buffer; }
    uint8_t* getRxBuffer() { return m_rx_buffer; }

#ifdef UNIT_TEST
    void setRxBuffer(uint8_t* buffer, int len);
#endif // UNIT_TEST

    template<typename T>
    bool txMsgSet(T data, uint8_t position = 0)
    {
        // Clear the txMsg Buffer
        memset(m_tx_buffer, 0, 8);
        // Make sure we won't overflow
        if (sizeof(T) + position > 8) { return false; }
        memcpy(m_tx_buffer + position, &data, sizeof(T));

        return true;
    }

    template<typename T>
    T getRxMsg(uint8_t position = 0)
    {
        // If we would overflow, just start from 0
        if (sizeof(T) + position > 8) { return *(T*)m_rx_buffer; }

        return *(T*)(m_rx_buffer + position);
    }
};

#endif