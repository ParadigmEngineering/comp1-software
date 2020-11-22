import eventlet
import socketio

# Create a socketio server
sio = socketio.Server()

# Wrap with a WSGI application - can also use 
app = socketio.WSGIApp(sio)

# Define eve
# nt callbacks - special events
# sid - unique client id
# environ - dictionary containing request info like HTTP header
@sio.event
def connect(sid, environ):
    print('connect', sid)
 
 
@sio.event
def disconenct(sid, environ):
    print('disconnect', sid)


# User defined event handlers
@sio.on("telemetry_log")
def telemetry_log(sid, data):
    print("TELEMETRY FORWARDED TO LOGGER")
    sio.emit("telemetry_log", data)
  
    
if __name__=="__main__":
    # I dont understant this, our angular app will act as the server in production
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app) 