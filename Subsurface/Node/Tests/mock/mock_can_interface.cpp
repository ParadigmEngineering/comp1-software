#include "mock_can_interface.h"

bool CANInterface::start()
{
    return true;
}

bool CANInterface::stop()
{
    return false;
}

uint8_t CANInterface::getNumEmptyTxMailboxes()
{
    return m_nEmptyMailboxes;
}

void CANInterface::setTxMailbox(CanTxMailbox mailbox)
{
    m_tx_mailbox = static_cast<uint32_t>(mailbox);
}

bool CANInterface::isTxMessagePendingMailbox(CanTxMailbox mailbox)
{
    switch (mailbox)
    {
        case (CanTxMailbox::MAILBOX0):
        {
            return m_bTxMessagePendingMailbox0;
        }
        
        case (CanTxMailbox::MAILBOX1):
        {
            return m_bTxMessagePendingMailbox1;
        }
        
        case (CanTxMailbox::MAILBOX2):
        {
            return m_bTxMessagePendingMailbox2;
        }
    }
}

bool CANInterface::transmit(uint8_t* txData)
{
    return true;
}

void CANInterface::setTxCanId(uint16_t can_id){}

uint8_t CANInterface::getNumMessagesFifo0()
{
    return 0;
}

uint8_t CANInterface::getNumMessagesFifo1()
{
    return 0;
}

void CANInterface::setRxFifo(CanRxFifo fifo)
{
    m_rx_fifo = static_cast<uint32_t>(fifo);
}

bool CANInterface::receive(uint8_t* rxData)
{
    return true;
}
