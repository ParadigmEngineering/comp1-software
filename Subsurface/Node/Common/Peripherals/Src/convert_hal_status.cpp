#include "Peripherals/Inc/convert_hal_status.h"

bool halStatusToBool(HAL_StatusTypeDef status)
{
    return status == 0x00U;
}
