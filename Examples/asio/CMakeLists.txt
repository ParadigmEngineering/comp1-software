cmake_minimum_required(VERSION 3.13)
project(Asio-Example)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_BUILD_TYPE Debug)

include_directories(src)

find_package(Threads QUIET)

set(HEADERS
)

set(SOURCES
)

add_library(asio INTERFACE)
set_target_properties(asio PROPERTIES
	INTERFACE_COMPILE_DEFINITIONS "ASIO_STANDALONE"
)
target_include_directories(asio INTERFACE ../../Subsurface/FlightComputer/vendors/asio-1.18.0/include)
target_link_libraries(asio INTERFACE Threads::Threads)

include_directories(${CMAKE_CURRENT_BINARY_DIR})

add_executable(server src/combinedServer.cpp ${SOURCES})
add_executable(client src/udpclient.cpp ${SOURCES})

target_link_libraries(server PRIVATE asio)
target_link_libraries(client PRIVATE asio)
