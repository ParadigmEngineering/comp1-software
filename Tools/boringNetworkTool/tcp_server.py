import socket
import sys

HOST = 'localhost'
PORT = 8888

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print('Socket created')
except socket.error as msg:
    print('Failed to create socket. Error Code : %s Message : %s' % (str(msg[0]), msg[1]))
    sys.exit()

try:
    s.bind((HOST, PORT))
except socket.error as msg:
    print('Bind failed. Error Code : %s Message : %s' % (str(msg[0]), msg[1]))
    sys.exit()


s.listen(1)
conn, addr = s.accept()
while 1:
    data = conn.recv(1024)
    print("Data received: %s" % data.decode('utf-8'))
    if not data:
        break
    conn.sendall(data)
conn.close()
