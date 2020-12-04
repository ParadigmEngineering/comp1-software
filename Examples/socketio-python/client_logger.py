import random
import socketio
import time
import logging as log

# Standard python client
sio = socketio.Client()
SOCKET_SERVER = 'http://127.0.0.1:8080'

# Default events
@sio.event
def connect():
    print("Connected to server")


@sio.event
def connect_error():
    print("Connection to server failed!")


@sio.event
def disconnect():
    print("Disconnected from server")
    
    
@sio.on("telemetry")
def telemetry(data):
    print(f"TELEM RECEIVED - {data}")


def main():
    log.info("Logging Thread Started")
    connected = False
    while not connected:
        try:
            sio.connect(SOCKET_SERVER)
        except:
            time.sleep(2)
        else:
            connected = True


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Killed by user")
        exit(0)