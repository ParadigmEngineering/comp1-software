#ifndef NODE_SPIINTERFACE_H
#define NODE_SPIINTERFACE_H

#include "stm32f3xx_hal.h"

class SPIInterface
{
private:

    SPI_HandleTypeDef *m_hspi;
    uint8_t m_dataReceived[32]; // Set to max size of I2C packet (32 bytes)

public:

    // Constructor
    SPIInterface(SPI_HandleTypeDef *hspi);

    // Returns a pointer to the data recieved buffer
    uint8_t* getReceivedData() { return m_dataReceived; }

    // Get state, and error methods
    HAL_SPI_StateTypeDef getState() { return HAL_SPI_GetState(m_hspi); }
    uint32_t getError() { return HAL_SPI_GetError(m_hspi); }

    // Master transmit and receive functions
    HAL_StatusTypeDef Transmit(uint8_t* data, uint16_t size, uint32_t timeout);
    HAL_StatusTypeDef Receive(uint16_t size, uint32_t timeout);
    HAL_StatusTypeDef TransmitReceive(uint8_t* dataOut, uint16_t size, uint32_t timeout);

    // Master transmit and receive functions using interrupts
    HAL_StatusTypeDef Transmit_IT(uint8_t* data, uint16_t size);
    HAL_StatusTypeDef Receive_IT(uint16_t size);
    HAL_StatusTypeDef TransmitReceive_IT(uint8_t* dataTransmit, uint16_t size);

    // Master transmit and receive functions using DMA
    HAL_StatusTypeDef Transmit_DMA(uint8_t* data, uint16_t size);
    HAL_StatusTypeDef Receive_DMA(uint16_t size);
    HAL_StatusTypeDef TransmitReceive_DMA(uint8_t* dataOut, uint16_t size);

    // DMA control functions
    HAL_StatusTypeDef DMAPause();
    HAL_StatusTypeDef DMAResume();
    HAL_StatusTypeDef DMAStop();

    // Abort functions
    HAL_StatusTypeDef Abort();
    HAL_StatusTypeDef Abort_IT();

    // Interrupt request handler function
    void IRQHandler();

    // Callback functions
    void TxCpltCallback();
    void RxCpltCallback();
    void TxRxCpltCallback();
    void TxHalfCpltCallback();
    void RxHalfCpltCallback();
    void TxRxHalfCpltCallback();
    void ErrorCallback();
    void AbortCpltCallback();
};
#endif
