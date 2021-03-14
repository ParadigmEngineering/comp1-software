from tkintertoy import Window
import socket
import sys
import time
import json

# try:
#     s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# except socket.error:
#     print('Failed to create socket')
#     sys.exit()

# host = 'localhost'
# port = 8888
#
# gui = Window()
# gui.setTitle('Paradigm Boring UDP Tool')
# gui.addEntry("udp_message", "UDP Message")
# gui.addButton("send_udp")
# gui.plot("udp_message", row=0)
# gui.plot("send_udp", row=1)

# while True:
#     gui.waitforUser()
#     if gui.content:
#         msg = bytes(gui.get("udp_message"), 'utf-8')
#         try:
#             # Set the whole string
#             s.sendto(msg, (host, port))
#             print("message sent:" + gui.get("udp_message"))
#             # receive data from client (data, addr)
#             d = s.recvfrom(1024)
#             reply = d[0]
#             addr = d[1]
#             print('Server reply : ' + reply.decode('utf-8'))
#         except socket.error as msg:
#             print('Error Code : ' + str(msg[0]) + ' Message ' + msg[1])
#             sys.exit()
#     else:
#         break


class Message:
    def __init__(self, msgID, isExtendedID, data):
        self.msgID = msgID
        self.isExtendedID = isExtendedID
        self.data = data
    def toString(self):
        return "" + str(self.msgID) + "\n" + str(self.isExtendedID) + "\n" + str(self.data)

def createMessages(raw_messages):
    msgs = []
    print(raw_messages)
    for message in raw_messages:
        msgs.append(Message(msgID=message["msgId"],
                            isExtendedID=message["isExtendedId"],
                            data=message["data"]
                            ))
    return msgs


def sendWithUDP(msg_config, host, port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    except socket.error:
        print('Failed to create socket')
        sys.exit()
    msgs = createMessages(msg_config["config"]["messages"])
    msg_frequency = msg_config["config"]["messageFrequency"]
    for message in msgs:
        time.sleep(1.0 / msg_frequency)
        try:
            # Set the whole string
            s.sendto(bytes(message.toString(), 'utf-8'), (host, port))
            print("message sent:" + message.toString())
            # receive data from client (data, addr)
            d = s.recvfrom(1024)
            reply = d[0]
            addr = d[1]
            print('Server reply : ' + reply.decode('utf-8'))
        except socket.error as msg:
            print('Error Code : ' + str(msg[0]) + ' Message ' + msg[1])
            sys.exit()

def sendWithTCP(msg_config, host, port):
    pass

if __name__ == "__main__":
    with open('sending_config.json', mode='r') as json_config:
        msg_config = json.load(json_config)
        host = msg_config["config"]["ip"]
        port = msg_config["config"]["port"]
        useTCP = msg_config["config"]["useTCP"]
        if useTCP:
            sendWithTCP(msg_config, host, port)
        else:
            sendWithUDP(msg_config, host, port)
