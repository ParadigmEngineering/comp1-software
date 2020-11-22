import socketio
import random
import time
import logging as log

# Standard python client
sio = socketio.Client()
SOCKET_SERVER = 'http://127.0.0.1:5000'

@sio.event
def connect():
    print("Connected to server")

@sio.event
def connect_error():
    print("Connection to server failed!")

@sio.event
def disconnect():
    print("Disconnected from server")

def main():
    print("Telemetry Thread Started")
    connected = False
    
    # Cycle trying to connect to the server
    while not connected:
        try:
            sio.connect(SOCKET_SERVER) # Default namespace only
        except:
            log.warning("Telemetry thread cannot connect to SocketIO")
            time.sleep(2)
        else:
            connected = True
            time.sleep(1)
            
    while 1:
        packet = random.randrange(0,100)
        print(f"PACKET SENT - {packet}")
        sio.emit("telemetry_log", packet)
        time.sleep(1)
    
    print("Connection with server lost")
        

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Killed by user")
        exit(0)