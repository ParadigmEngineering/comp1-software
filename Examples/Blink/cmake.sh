#!/bin/bash

[ -d "build" ] && echo "Build folder already exists!" && cd build
[ ! -d "build" ] && echo "Build folder does not exist. Creating now." &&  mkdir build && cd build

cmake -DCMAKE_TOOLCHAIN_FILE=../arm-none-eabi-gcc.cmake -DCMAKE_BUILD_TYPE=Debug ..
make