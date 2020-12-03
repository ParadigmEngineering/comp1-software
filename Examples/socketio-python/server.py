from flask import Flask, render_template
from flask_socketio import SocketIO
    
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
sio = SocketIO(app)

# Standard Flask route
@app.route('/')
def index():
    return render_template('index.html')

# Sio event handlers
@sio.on('connect')
def connect():
    print("Client connected!")
    sio.emit('Connected to socketio server!')
    
@sio.on('disconnect')
def disconnect():
    print("Client disconnected!")
    sio.emit('Disconnected from socketio server!')

@sio.on('telemetry')
def telemetry(msg):
    print(f"Message received: {msg}")
    sio.emit('telemetry_callback', {'data': 'got it!'})

if __name__ == '__main__':
    sio.run(app,'127.0.0.1', 8080, debug=True)
    