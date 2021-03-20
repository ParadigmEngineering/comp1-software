Boring Network Tool

The file main.py can be used to send either 
TCP or UDP messages to a given hostname and port, specified via the config json.

This script does not require any external packages, aside from standard python 3.7 or higher.

Usage:

sending_config.json 
has a similar configuration to the json in Pidaq/Examples/CanSender, and can be used to specify the
messages to send, and whether to send them via TCP or UDP.  The frequency with which to send the
messages can also be specified.  Finally, the port and hostname are specified in the json as well.

tcp_server.py implements a simple TCP server to verify the functionality of the script

udp_server.py implements a simple UDP server to verify the functionality of the script