## Python Socketio Example

This example illustrates one way to utilize socketio for data transmittal.

There are 3 files:

`client_logger.py`
- Socketio client that listens for event "log_telemetry" and logs
the data packet to console

`client_telemetry.py`
- Socketio client that generates telem (simulates receiving from the TBM) and emits a "log_telemetry" event containing the data packet

`server.py`
- Standard socketio server, handles event routing between clients  

The primary difference between this implementation and the actual implementation is the packet type. We are looking to use protobuf, while this initial example uses json for simplicity. 

In the future, this example can be duplicated using protobuf.

