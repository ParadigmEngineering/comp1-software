import socket
import sys

HOST = 'localhost'
PORT = 8888

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    print('Socket created')
except socket.error as msg:
    print('Failed to create socket. Error Code : %s Message : %s' % (str(msg[0]), msg[1]))
    sys.exit()

try:
    s.bind((HOST, PORT))
except socket.error as msg:
    print('Bind failed. Error Code : %s Message : %s' % (str(msg[0]), msg[1]))
    sys.exit()

while 1:
    d = s.recvfrom(1024)
    data = d[0]
    addr = d[1]
    if not data:
        break

    print("Data received: %s" % data.decode('utf-8'))
    reply = 'OK... %s' % data.decode('utf-8')
    s.sendto(bytes(reply, 'utf-8'), addr)
    print('Message[%s:%s] - %s' % (addr[0], str(addr[1]), data.decode('utf-8').strip()))

s.close()
