@echo off
REM  Hyperloop Competition 4 Port

REM  This file compiles the .proto descriptor file for the proto packet that is sent from the pod to the PDS.
REM  It handles moving the created files to the appropriate folders for the flight computer.

REM If proto compiler is installed 

WHERE protoc
IF %ERRORLEVEL% NEQ 0 (
    echo To use this script you must have the protobuf compiler installed
    echo Please see https://developers.google.com/protocol-buffers/ for installation instructions
    echo Alternatively, see the README! 
) else (
    echo Proto compiler found! Updating protos...
)

                        


