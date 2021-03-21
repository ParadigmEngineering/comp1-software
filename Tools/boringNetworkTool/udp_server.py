import socket
import sys

HOST = ''
PORT = 8888

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    print('Socket created')
except socket.error as msg:
    print('Failed to create socket. Error Code : ' + str(msg[0]) + ' Message ' + msg[1])
    sys.exit()

try:
    s.bind((HOST, PORT))
except socket.error as msg:
    print('Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1])
    sys.exit()

while 1:
    d = s.recvfrom(1024)
    data = d[0]
    addr = d[1]
    if not data:
        break

    print("Data received: " + data.decode('utf-8'))
    reply = 'OK...' + data.decode('utf-8')
    s.sendto(bytes(reply, 'utf-8'), addr)
    print('Message[' + addr[0] + ':' + str(addr[1]) + '] - ' + data.decode('utf-8').strip())

s.close()
