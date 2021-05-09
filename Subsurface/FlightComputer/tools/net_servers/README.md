# Net Test Servers for Protobuf
This folder contains a TCP and UDP server for testing the functionality of Protobuf.

## Setup and Utilization
1. Ensure you have a python install on your machine. Invoke the command `python -m venv .env`. This will create a virtual environment where protobuf can be installed
2. Activate the virtual environment with the following command:
   - Windows: `.\.env\Scripts\activate`
   - MacOS/Linux: `source /.env/bin/activate`
3. Run the UpdateProtos.bat/.sh script in the root of the repository. This will add the compiled protobuf python module required to run the scripts to this directory
4. Run either tcp_server.py or udp_server.py with the virtual environment active. This will receive a basic protobuf Person message, attempt to deserialize it, and then reserialize and echo it back.
