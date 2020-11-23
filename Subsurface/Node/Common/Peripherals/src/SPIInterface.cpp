#include "Peripherals/inc/SPIInterface.h"

SPIInterface::SPIInterface(SPI_HandleTypeDef *hspi) : m_hspi(hspi){}

HAL_StatusTypeDef SPIInterface::Transmit(uint8_t* data, uint16_t size, 
                                         uint32_t timeout)
{
    return HAL_SPI_Transmit(m_hspi, data, size, timeout);
}

HAL_StatusTypeDef SPIInterface::Receive(uint16_t size, uint32_t timeout)
{
    return HAL_SPI_Receive(m_hspi, m_dataReceived, size, timeout);
}

HAL_StatusTypeDef SPIInterface::TransmitReceive(uint8_t* dataOut, 
                                                uint16_t size, uint32_t timeout)
{
    return HAL_SPI_TransmitReceive(m_hspi, dataOut, m_dataReceived, size, 
                                    timeout);
}
