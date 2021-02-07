cmake_minimum_required(VERSION 3.13)
project(FlightComputer)

set(CMAKE_CXX_STANDARD 17)

include_directories(vendors/EasyLogger)
include_directories(include)
include_directories(src)

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
else ()
    add_executable(FlightComputer ${SOURCES})
endif (WIN32)
