cmake_minimum_required(VERSION 3.15.3)

project(nucleo-l476)

enable_language(CXX C ASM)
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_C_EXTENSIONS OFF)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

set(STM32CUBEMX_GENERATED_FILES

               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_adc_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_adc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_can.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_comp.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_cortex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_crc_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_crc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_cryp_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_cryp.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dac_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dac.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dcmi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dfsdm_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dfsdm.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dma_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dma.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dma2d.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_dsi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_exti.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_firewall.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_flash_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_flash_ramfunc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_flash.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_gfxmmu.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_gpio.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_hash_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_hash.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_hcd.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_i2c_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_i2c.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_irda.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_iwdg.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_lcd.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_lptim.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_ltdc_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_ltdc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_mmc_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_mmc.c
#                # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_msp_template.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_nand.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_nor.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_opamp_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_opamp.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_ospi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_pcd_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_pcd.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_pka.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_pssi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_pwr_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_pwr.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_qspi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_rcc_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_rcc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_rng_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_rng.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_rtc_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_rtc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_sai_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_sai.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_sd_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_sd.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_smartcard_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_smartcard.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_smbus.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_spi_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_spi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_sram.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_swpmi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_tim_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_tim.c
#                # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_timebase_tim_template.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_tsc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_uart_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_uart.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_usart_ex.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_usart.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal_wwdg.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_hal.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_adc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_comp.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_crc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_crs.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_dac.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_dma.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_dma2d.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_exti.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_fmc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_gpio.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_i2c.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_lptim.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_lpuart.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_opamp.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_pka.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_pwr.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_rcc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_rng.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_rtc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_sdmmc.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_spi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_swpmi.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_tim.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_usart.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_usb.c
               # Drivers/STM32L4xx_HAL_Driver/Src/stm32l4xx_ll_utils.c
        # startup_stm32l476xx.s
)

        file(GLOB_RECURSE SOURCES2
        Core/Src/*.c
        Core/Src/*.cpp
        ../../Subsurface/Node/Common/Peripherals/Src/*.cpp
        # startup_stm32l476xx.s
        Drivers/STM32L4xx_HAL_Driver/Src/*.c
        startup_stm32l476xx.s
        )

        #Core/Inc/main.h
        #Core/Inc/stm32l4xx_hal_conf.h
        #Core/Inc/stm32l4xx_it.h
        

        #Core/Src/main.cpp
        #Core/Src/stm32l4xx_hal_msp.c
        #Core/Src/stm32l4xx_it.c
        #Core/Src/system_stm32l4xx.c


        

set(SOURCES
        # Add user-created source files to this variable
)

set(EXECUTABLE ${PROJECT_NAME}.out)

add_executable(${EXECUTABLE} ${STM32CUBEMX_GENERATED_FILES} ${SOURCES2})

target_compile_definitions(${EXECUTABLE} PRIVATE
        -DUSE_HAL_DRIVER
        -DSTM32L476xx
        )

target_include_directories(${EXECUTABLE} PRIVATE
        Core/Inc
        Drivers/STM32L4xx_HAL_Driver/Inc
        Drivers/STM32L4xx_HAL_Driver/Inc/Legacy
        Drivers/CMSIS/Device/ST/STM32L4xx/Include
        Drivers/CMSIS/Include
        ../../Subsurface/Node/Common
        )

target_compile_options(${EXECUTABLE} PRIVATE
        -mcpu=cortex-m4
        -mthumb
        -mfpu=fpv4-sp-d16
        -mfloat-abi=hard

        -fdata-sections
        -ffunction-sections

        -Wall

        -fno-exceptions
        $<$<COMPILE_LANGUAGE:CXX>:-fno-rtti>

        $<$<CONFIG:Debug>:-Og>
        )

target_link_options(${EXECUTABLE} PRIVATE
        -T${CMAKE_SOURCE_DIR}/STM32L476RGTx_FLASH.ld
        -mcpu=cortex-m4
        -mthumb
        -mfpu=fpv4-sp-d16
        -mfloat-abi=hard
        -specs=nano.specs
        -lc
        -lm
        -lnosys
        -Wl,-Map=${PROJECT_NAME}.map,--cref
        -Wl,--gc-sections
        )

# Print executable size
add_custom_command(TARGET ${EXECUTABLE}
        POST_BUILD
        COMMAND arm-none-eabi-size ${EXECUTABLE})

# Create hex file
add_custom_command(TARGET ${EXECUTABLE}
        POST_BUILD
        COMMAND arm-none-eabi-objcopy -O ihex ${EXECUTABLE} ${PROJECT_NAME}.hex
        COMMAND arm-none-eabi-objcopy -O binary ${EXECUTABLE} ${PROJECT_NAME}.bin)
