#include "Peripherals/inc/SPIInterface.h"

SPIInterface::SPIInterface(SPI_HandleTypeDef *hspi) : m_hspi(hspi){}

HAL_StatusTypeDef SPIInterface::Transmit(uint8_t* data, uint16_t size, uint32_t timeout)
{
    return HAL_SPI_Transmit(m_hspi, data, size, timeout);
}

HAL_StatusTypeDef SPIInterface::Receive(uint16_t size, uint32_t timeout)
{
    return HAL_SPI_Receive(m_hspi, m_dataReceived, size, timeout);
}

HAL_StatusTypeDef SPIInterface::TransmitReceive(uint8_t* dataOut, uint16_t size, uint32_t timeout)
{
    return HAL_SPI_TransmitReceive(m_hspi, dataOut, m_dataReceived, size, timeout);
}

HAL_StatusTypeDef SPIInterface::Transmit_IT(uint8_t* data, uint16_t size)
{
    return HAL_SPI_Transmit_IT(m_hspi, data, size);
}

HAL_StatusTypeDef SPIInterface::Receive_IT(uint16_t size)
{
    return HAL_SPI_Receive_IT(m_hspi, m_dataReceived, size);
}

HAL_StatusTypeDef SPIInterface::TransmitReceive_IT(uint8_t* dataOut, uint16_t size)
{
    return HAL_SPI_TransmitReceive_IT(m_hspi, dataOut, m_dataReceived, size);
}

HAL_StatusTypeDef SPIInterface::Transmit_DMA(uint8_t* data, uint16_t size)
{
    return HAL_SPI_Transmit_DMA(m_hspi, data, size);
}

HAL_StatusTypeDef SPIInterface::Receive_DMA(uint16_t size)
{
    return HAL_SPI_Receive_DMA(m_hspi, m_dataReceived, size);
}

HAL_StatusTypeDef SPIInterface::TransmitReceive_DMA(uint8_t* dataOut, uint16_t size)
{
    return HAL_SPI_TransmitReceive_DMA(m_hspi, dataOut, m_dataReceived, size);
}

HAL_StatusTypeDef SPIInterface::DMAPause()
{
    return HAL_SPI_DMAPause(m_hspi);
}

HAL_StatusTypeDef SPIInterface::DMAResume()
{
    return HAL_SPI_DMAResume(m_hspi);
}

HAL_StatusTypeDef SPIInterface::DMAStop()
{
    return HAL_SPI_DMAStop(m_hspi);
}

HAL_StatusTypeDef SPIInterface::Abort()
{
    return HAL_SPI_Abort(m_hspi);
}

HAL_StatusTypeDef SPIInterface::Abort_IT()
{
    return HAL_SPI_Abort_IT(m_hspi);
}

void SPIInterface::IRQHandler()
{
    return HAL_SPI_IRQHandler(m_hspi);
}

void SPIInterface::TxCpltCallback()
{
    HAL_SPI_TxCpltCallback(m_hspi);
}

void SPIInterface::RxCpltCallback()
{
    HAL_SPI_RxCpltCallback(m_hspi);
}

void SPIInterface::TxRxCpltCallback()
{
    HAL_SPI_TxRxCpltCallback(m_hspi);
}

void SPIInterface::TxHalfCpltCallback()
{
    HAL_SPI_TxHalfCpltCallback(m_hspi);
}

void SPIInterface::RxHalfCpltCallback()
{
    HAL_SPI_RxHalfCpltCallback(m_hspi);
}

void SPIInterface::TxRxHalfCpltCallback()
{
    HAL_SPI_TxRxHalfCpltCallback(m_hspi);
}

void SPIInterface::ErrorCallback()
{
    HAL_SPI_ErrorCallback(m_hspi);
}

void SPIInterface::AbortCpltCallback()
{
    HAL_SPI_AbortCpltCallback(m_hspi);
}
