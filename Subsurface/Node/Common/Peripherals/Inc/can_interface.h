#ifndef NODE_CAN_INTERFACE_H
#define NODE_CAN_INTERFACE_H

#include "stm32f3xx_hal.h"

enum class CanTxMailbox : uint32_t
{
    MAILBOX0 = CAN_TX_MAILBOX0,
    MAILBOX1 = CAN_TX_MAILBOX1,
    MAILBOX2 = CAN_TX_MAILBOX2
};

enum class CanRxFifo : uint32_t
{
    FIFO0 = CAN_RX_FIFO0,
    FIFO1 = CAN_RX_FIFO1
};

class CANInterface
{
private:
    CAN_HandleTypeDef *m_can_handle;

    CAN_TxHeaderTypeDef m_tx_header;
    CanTxMailbox m_tx_mailbox = CanTxMailbox::MAILBOX0;
    CAN_RxHeaderTypeDef m_rx_header;
    CanRxFifo m_rx_fifo = CanRxFifo::FIFO0;

public:
    // Constructor
    CANInterface(CAN_HandleTypeDef *can_handle);

    // Start CAN peripheral - returns true if successful
    bool start();

    // Stop CAN peripheral - returns true if successful
    bool stop();

    // Returns number of empty transmit mailboxes
    uint8_t getNumEmptyTxMailboxes();

    // Set transmit mailbox to CAN_TX_MAILBOX0,1,2
    void setTxMailbox(CanTxMailbox mailbox);

    // Check if a tx message is pending in CAN_TX_MAILBOX0,1,2
    bool isTxMessagePendingMailbox(CanTxMailbox mailbox);

    // Copy message to transmit mailbox - returns true if successful
    bool transmit(uint8_t *txData);

    // Set transmit CAN ID
    void setTxCanId(uint16_t can_id);

    // Get number of messages in recieve fifo 0
    uint8_t getNumMessagesFifo0();

    // Get number of messages in recieve fifo 1
    uint8_t getNumMessagesFifo1();

    // Set recieve fifo to CAN_RX_FIFO0,1
    void setRxFifo(CanRxFifo fifo);

    // Copy message from receive fifo - returns true if successful
    bool receive(uint8_t *rxData);
};

#endif