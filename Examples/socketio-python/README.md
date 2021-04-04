## Python Socketio Example

This example illustrates one way to utilize socketio for data transmittal.

There are 3 files:

`client_logger.py`
- python-socketio client that listens for event "log_telemetry" and logs
the data packet to console

`client_telemetry.py`
- python-socketio client that generates telem (simulates receiving from the TBM) and emits a "log_telemetry" event containing the data packet

`server.py`
- Standard flask-socketio server, handles event routing between clients  

The primary difference between this implementation and the actual implementation is the packet type. We are looking to use protobuf, while this initial example uses json for simplicity. In the future, this example can be duplicated using protobuf. 

### Running the Example
1. Ensure python environment is activated 
2. Open you terminal, and navigate to /OnLand directory, then run `pip install -r requirements.txt`
3. Navigate back to /Examples/socketio-python directory, and run:
    `python3 server.py`
    `python3 client_telemetry.py`
    `python3 client_logger.py`  