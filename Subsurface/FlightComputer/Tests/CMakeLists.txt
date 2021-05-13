cmake_minimum_required(VERSION 3.15)
project(FlightComputerTest)

set(CMAKE_CXX_STANDARD 17)

include_directories(../vendors/asio-1.18.0/include)
include_directories(../vendors/EasyLogger)
include_directories(../vendors/proto/include)
include_directories(../include)
include_directories(../src)

set(Proto_Root ${CMAKE_SOURCE_DIR}/../vendors/proto)

set(SOURCES
    FlightComputerTest.cpp
)

include_directories(${CMAKE_CURRENT_BINARY_DIR})

add_executable(FlightComputerTest ${SOURCES})

target_compile_definitions(FlightComputerTest PUBLIC _WIN32_WINNT=0x0601)
target_compile_definitions(FlightComputerTest PUBLIC ELPP_WINSOCK2)

if (WIN32)
    if (CMAKE_BUILD_TYPE STREQUAL "Debug")
        set_property(TARGET FlightComputerTest PROPERTY MSVC_RUNTIME_LIBRARY "MultiThreadedDebug")
        target_link_libraries(FlightComputerTest ${Proto_Root}/windows/Debug/libprotobuf-lited.lib)
    else ()
        set_property(TARGET FlightComputerTest PROPERTY MSVC_RUNTIME_LIBRARY "MultiThreaded")
        target_link_libraries(FlightComputerTest ${Proto_Root}/windows/Release/libprotobuf-lite.lib)
    endif ()
else ()
    target_link_libraries(FlightComputerTest ${Proto_Root}/linux/libprotobuf-lite.a)
endif (WIN32)
