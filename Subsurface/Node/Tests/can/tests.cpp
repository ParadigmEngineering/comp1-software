#include "unity.h"
#include "mock_can_interface.h"
#include "Peripherals/Inc/can_manager.h"

// Required for Unity to run
void setUp(void) {}
void tearDown(void) {}

void testTransmitOnFullMailboxes()
{
    CANInterface interface;
    CANManager manager{ &interface };

    interface.allMailBoxesFull();
    TEST_ASSERT(manager.transmit() == false);
}

void testTransmitOnEmptyMailbox0()
{
    CANInterface interface;
    CANManager manager{ &interface };

    interface.mailBoxesEmpty();
    interface.mailbox0Free();
    TEST_ASSERT(manager.transmit() == true);
}

void testTransmitOnEmptyMailbox1()
{
    CANInterface interface;
    CANManager manager{ &interface };

    interface.mailBoxesEmpty();
    interface.mailbox1Free();
    TEST_ASSERT(manager.transmit() == true);
}

void testTransmitOnEmptyMailbox2()
{
    CANInterface interface;
    CANManager manager{ &interface };

    interface.mailBoxesEmpty();
    interface.mailbox2Free();
    TEST_ASSERT(manager.transmit() == true);
}

void testSettingTxMsg()
{
    CANInterface interface;
    CANManager manager{ &interface };

    // Setting 8 bit unsigned value
    TEST_ASSERT(manager.txMsgSet<uint8_t>(0xFF) == true);
    TEST_ASSERT_EQUAL_UINT64(0xFF, *(uint64_t*)(manager.getTxBuffer()));

    // Setting 8 bit unsigned value to position 7
    TEST_ASSERT(manager.txMsgSet<uint8_t>(0xFF, 7) == true);
    TEST_ASSERT_EQUAL_UINT64(0xFF00000000000000, *(uint64_t*)(manager.getTxBuffer()));


    // Setting 8 bit unsigned value past end
    TEST_ASSERT(manager.txMsgSet<uint8_t>(0xFF, 8) == false);

    // Setting float value
    TEST_ASSERT(manager.txMsgSet<float>(3.1415) == true);
    TEST_ASSERT_EQUAL_FLOAT(3.1415, *(float*)(manager.getTxBuffer()));

    // Setting float value from bytes 4 to 7
    TEST_ASSERT(manager.txMsgSet<float>(3.1415, 4) == true);
    TEST_ASSERT_EQUAL_FLOAT(3.1415, *(float*)(manager.getTxBuffer() + 4));

    // Setting double value
    TEST_ASSERT(manager.txMsgSet<double>(3.1415) == true);
    TEST_ASSERT_EQUAL_DOUBLE(3.1415, *(double*)(manager.getTxBuffer()));

    // Setting double value out of bounds
    TEST_ASSERT(manager.txMsgSet<double>(3.1415, 2) == false);
}

void testInterpretingRxMsg()
{
    CANInterface interface;
    CANManager manager{ &interface };

    // Interpreting normal value
    uint32_t u32Val = 0xFF00FF;
    manager.setRxBuffer((uint8_t*)(&u32Val), 4);
    TEST_ASSERT_EQUAL(0xFF00FF, manager.getRxMsg<uint32_t>());

    // Interpreting half of a buffer
    uint64_t u64Val = 0x9876543212345678;
    manager.setRxBuffer((uint8_t*)(&u64Val), 8);
    TEST_ASSERT_EQUAL(0x98765432, manager.getRxMsg<uint32_t>(4));
    TEST_ASSERT_EQUAL(0x12345678, manager.getRxMsg<uint32_t>());

    // Trying to interpret a buffer out of bounds
    TEST_ASSERT_EQUAL(0x9876543212345678, manager.getRxMsg<uint64_t>(2));
}

int main()
{
    UNITY_BEGIN();
    RUN_TEST(testTransmitOnFullMailboxes);
    RUN_TEST(testTransmitOnEmptyMailbox0);
    RUN_TEST(testTransmitOnEmptyMailbox1);
    RUN_TEST(testTransmitOnEmptyMailbox2);
    RUN_TEST(testSettingTxMsg);
    RUN_TEST(testInterpretingRxMsg);
    return UNITY_END();
}