#include "Peripherals/Inc/can_manager.h"


CANManager::CANManager(CANInterface* can_interface)
    : m_can_interface(can_interface)
{}

#ifdef UNIT_TEST
void CANManager::setRxBuffer(uint8_t* buffer, int len)
{
    memset(m_rx_buffer, 0, 8);
    for (int i = 0; i < len; ++i)
    {
        m_rx_buffer[i] = buffer[i];
    }
}
#endif // UNIT_TEST

/// TRANSMIT ///
bool CANManager::transmit()
{
    if (m_can_interface->getNumEmptyTxMailboxes() == 0)
    {
        return false;
    }

    if (!m_can_interface->isTxMessagePendingMailbox(CanTxMailbox::MAILBOX0))
    {
        m_can_interface->setTxMailbox(CanTxMailbox::MAILBOX0);
    }
    else if (!m_can_interface->isTxMessagePendingMailbox(CanTxMailbox::MAILBOX1))
    {
        m_can_interface->setTxMailbox(CanTxMailbox::MAILBOX1);
    }
    else if (!m_can_interface->isTxMessagePendingMailbox(CanTxMailbox::MAILBOX2))
    {
        m_can_interface->setTxMailbox(CanTxMailbox::MAILBOX2);
    }

    return m_can_interface->transmit(m_tx_buffer);
}

bool CANManager::receive()
{
    return m_can_interface->receive(m_rx_buffer);
}

void CANManager::setTxId(uint16_t can_id)
{
    m_can_interface->setTxCanId(can_id);
}
