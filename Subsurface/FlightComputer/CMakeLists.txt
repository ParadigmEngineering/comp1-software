cmake_minimum_required(VERSION 3.13)
project(FlightComputer)

set(CMAKE_CXX_STANDARD 17)

include_directories(vendors/EasyLogger)
include_directories(libs/ProtoBuffer)
include_directories(include)
include_directories(src)
include_directories(include/ProtoBuffer)

set(HEADERS
    include/FlightComputer.h
)

set(SOURCES
    src/FlightComputer.cpp
    vendors/EasyLogger/easylogging++.cc
)

include_directories(${CMAKE_CURRENT_BINARY_DIR})

if (${CMAKE_CXX_COMPILER} MATCHES ".arm")
    set(CMAKE_EXE_LINKER_FLAGS "-static-libgcc  -static-libstdc++")

    # Staticly link libs built for ARM
    set(Protobuf_INCLUDE_DIRS "${CMAKE_CURRENT_SOURCE_DIR}/libs/ProtoBuffer/src")
    include_directories(${Protobuf_INCLUDE_DIRS})
    set(Protobuf_LIBRARIES ${Protobuf_INCLUDE_DIRS}/.libs/libprotobuf.a)
endif ()

add_executable(FlightComputer ${SOURCES}  ${PROTO_HDRS} )

target_link_libraries(FlightComputer ${Protobuf_LIBRARIES})

if (CMAKE_THREAD_LIBS_INIT)
    SET (MYLIB -Wl,--whole-archive ${CMAKE_THREAD_LIBS_INIT} -Wl,--no-whole-archive)
    target_link_libraries(FlightComputer ${MYLIB})
endif ()
