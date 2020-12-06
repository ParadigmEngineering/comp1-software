cmake_minimum_required(VERSION 3.13)
project(Node-Tests)

set(CMAKE_CXX_STANDARD 17)

include_directories(Unity/src)
include_directories(../Common)
include_directories(mock)

add_compile_definitions(UNIT_TEST)

set(HEADERS
)

set(SOURCES
    Unity/src/Unity.c
    ../Common/Peripherals/Src/can_manager.cpp
    mock/mock_can_interface.cpp
    tests.cpp
)

include_directories(${CMAKE_CURRENT_BINARY_DIR})

add_executable(Node-Tests ${SOURCES})
