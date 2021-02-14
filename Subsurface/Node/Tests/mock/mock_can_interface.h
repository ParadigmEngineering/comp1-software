#ifndef NODE_CAN_INTERFACE_H
#define NODE_CAN_INTERFACE_H

#include <cstdint>

enum class CanTxMailbox : uint32_t
{
    MAILBOX0,
    MAILBOX1,
    MAILBOX2
};

enum class CanRxFifo
{
    FIFO0,
    FIFO1,
};

class CANInterface
{
private:
    uint32_t m_tx_mailbox = static_cast<uint32_t>(CanTxMailbox::MAILBOX0);
    uint32_t m_rx_fifo = static_cast<uint32_t>(CanRxFifo::FIFO0);

    uint8_t m_nEmptyMailboxes;
    bool m_bTxMessagePendingMailbox0;
    bool m_bTxMessagePendingMailbox1;
    bool m_bTxMessagePendingMailbox2;

public:
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
    // Get number of messages in recieve fifo 0
    uint8_t getNumMessagesFifo1();
    // Set recieve fifo to CAN_RX_FIFO0,1
    void setRxFifo(CanRxFifo fifo);
    // Copy message from receive fifo - returns true if successful
    bool receive(uint8_t *rxData);

    // Methods to help with unit testing
    void allMailBoxesFull()
    {
        m_nEmptyMailboxes = 0;
        m_bTxMessagePendingMailbox0 = true;
        m_bTxMessagePendingMailbox1 = true;
        m_bTxMessagePendingMailbox2 = true;
    }

    void mailBoxesEmpty()
    {
        m_nEmptyMailboxes = 1;
    }

    void mailbox0Free()
    {
        m_bTxMessagePendingMailbox0 = false;
        m_bTxMessagePendingMailbox1 = true;
        m_bTxMessagePendingMailbox2 = true;
    }

    void mailbox1Free()
    {
        m_bTxMessagePendingMailbox0 = true;
        m_bTxMessagePendingMailbox1 = false;
        m_bTxMessagePendingMailbox2 = true;
    }

    void mailbox2Free()
    {
        m_bTxMessagePendingMailbox0 = true;
        m_bTxMessagePendingMailbox1 = true;
        m_bTxMessagePendingMailbox2 = false;
    }
};

#endif