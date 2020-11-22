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

The primary difference between this implementation and the actual implementation is the packet type and the server web app. We are looking to use protobuf, while this initial example uses json for simplicity. In the future, this example can be duplicated using protobuf. Also, this example uses an eventlet web app - in production socketio will be served by our angular application. 

### Running the Example
1. Ensure python environment is activated 
2. `pip install -r requirements.txt`
3. `python3 server.py`
4. `python3 client_telemetry.py`
5. `python3 client_logger.py`

## Socketio

### Server
Defining an event
```
@sio.event
def my_event(sid, data):
    pass

# OR

@sio.on('my event name')
def another_event(sid, data):
    pass
```

With event, the event name is always the function name. Using 
on allows the name to be different from the function name and allows characters that are illegal in function names.

For asyncio servers, event handlers can optionally be given as coroutines:

```
@sio.event
async def my_event(sid, data):
    pass
```

The sid arguement is the socketio session id, a unique identifier of each client connection. All events sent by a given client will have the same sid value.

The server can emit to all of the connected clients or choose to emit to a specific room. This can be done using the sid of the client as the `room` arguement of the emit call. 

```
sio.emit('my event', {'data': 'foobar'}, room=user_sid)
```

Rooms
- Upon connection, a personal room for each client is created and named with the sid assigned to the connection
- The application is then free to create additional rooms and manage which clients are in them using the `socketio.Server.enter_room(`) and `socketio.Server.leave_room()` methods
-  Clients can be in as many rooms as needed and can be moved between rooms as often as necessary

Ex:
```
@sio.event
def begin_chat(sid):
   sio.enter_room(sid, 'chat_users')

 @sio.event
 def exit_chat(sid):
     sio.leave_room(sid, 'chat_users')
```

Client
The client defines event handlers for receiving events from the server. Also, the call sio.emit() inside the application loop. 


