import socket
import sys
import time
import json


class Message:
    def __init__(self, data):
        self.data = data

    def to_string(self) -> str:
        return "%s \n" % str(self.data)


def create_messages(raw_messages):
    msgs = []
    for message in raw_messages:
        msgs.append(Message(data=message["data"]))
    return msgs


def send_with_udp(msgconfig, host, port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    except socket.error:
        print('Failed to create socket')
        sys.exit()
    msgs = create_messages(msgconfig["config"]["messages"])
    msg_frequency = msgconfig["config"]["messageFrequency"]
    for message in msgs:
        time.sleep(1.0 / msg_frequency)
        try:
            # Set the whole string
            s.sendto(bytes(message.to_string(), 'utf-8'), (host, port))
            print("message sent: %s" % message.to_string())
            # receive data from client (data, addr)
            if msgconfig["config"]["sendContinuous"] is False:
                d = s.recvfrom(1024)
                reply = d[0]
                print('Server reply : %s' % reply.decode('utf-8'))
        except socket.error as msg:
            print('Error Code : %s Message : %s ' % (str(msg[0]), msg[1]))
            sys.exit()


def send_with_tcp(msgconfig, host, port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, port))
    except socket.error:
        print('Failed to create socket')
        sys.exit()
    msgs = create_messages(msgconfig["config"]["messages"])
    msg_frequency = msgconfig["config"]["messageFrequency"]
    for message in msgs:
        time.sleep(1.0 / msg_frequency)
        try:
            # Set the whole string
            s.sendall(bytes(message.to_string(), 'utf-8'))
            print("message sent: %s" % message.to_string())
            # receive data from client (data, addr)
            d = s.recv(1024)
            print('Server reply : %s' % d.decode('utf-8'))
        except socket.error as msg:
            print('Error Code : %s Message : %s ' % (str(msg[0]), msg[1]))
            s.close()
            sys.exit()
    s.close()


if __name__ == "__main__":
    with open('sending_config.json', mode='r') as json_config:
        msg_config = json.load(json_config)
        host = msg_config["config"]["ip"]
        port = msg_config["config"]["port"]
        useTCP = msg_config["config"]["useTCP"]
        sendContinuous = msg_config["config"]["sendContinuous"]
        print("Using TCP: %s" % str(useTCP))
        print("Waiting for response: %s" % str(sendContinuous))
        if useTCP:
            send_with_tcp(msg_config, host, port)
        else:
            send_with_udp(msg_config, host, port)
