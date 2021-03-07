cmake_minimum_required(VERSION 3.15)
project(FlightComputer)

set(CMAKE_CXX_STANDARD 17)

include_directories(vendors/EasyLogger)
include_directories(vendors/proto/include)
include_directories(include)
include_directories(src)

set(Proto_Root ${CMAKE_SOURCE_DIR}/vendors/proto)

set(HEADERS
    include/FlightComputer.h
)

set(SOURCES
    src/FlightComputer.cpp
    vendors/EasyLogger/easylogging++.cc
)

include_directories(${CMAKE_CURRENT_BINARY_DIR})

if (WIN32)
    add_executable(FlightComputer ${SOURCES} ${HEADERS})
    if (CMAKE_BUILD_TYPE STREQUAL "Debug")
        set_property(TARGET FlightComputer PROPERTY MSVC_RUNTIME_LIBRARY "MultiThreadedDebug")
        target_link_libraries(FlightComputer ${Proto_Root}/windows/Debug/libprotobuf-lited.lib)
    else ()
        set_property(TARGET FlightComputer PROPERTY MSVC_RUNTIME_LIBRARY "MultiThreaded")
        target_link_libraries(FlightComputer ${Proto_Root}/windows/Release/libprotobuf-lite.lib)
    endif ()
else ()
    add_executable(FlightComputer ${SOURCES})
    target_link_libraries(FlightComputer ${Proto_Root}/linux/libprotobuf-lite.a)
endif (WIN32)
