cmake_minimum_required(VERSION 3.13)
project(FlightComputer)

set(CMAKE_CXX_STANDARD 17)

include_directories(vendors/asio-1.18.0/include)
include_directories(vendors/EasyLogger)
include_directories(include)
include_directories(src)

set(HEADERS
    include/FlightComputer.h
    include/Message.h
    include/NetClient.h
    include/catch.hpp
)

set(SOURCES
    src/test.pb.cc
    src/test.pb.h
    vendors/EasyLogger/easylogging++.cc
)

include_directories(${CMAKE_CURRENT_BINARY_DIR})

if (WIN32)
    add_executable(FlightComputer ${SOURCES} ${HEADERS})
else ()
    add_executable(FlightComputer ${SOURCES})
endif (WIN32)
