## ASIO Example Client/Server
This example contains code from the official [tutorial](https://think-async.com/Asio/asio-1.18.0/doc/asio/tutorial.html) for the asio C++ library. The CMake is configured to build a udp client, and combined tcp and udp server, which serves the current time of day when requested.

### Building
To build, create a build/ directory, run cmake, and then the required build files will be generated depending on the platform:
```shell
mkdir build && cd build
cmake ..
```

### Running
To run the program, first run the server executable, then run the client executable with a command line argument specifying the IP address of the server (This will be localhost):
```shell
./server
./client 127.0.0.1
```
Note that on linux you may have to run the programs with superuser permissions (`sudo`). When the program is run, the client will print the formatted CTime object to the console and return.
