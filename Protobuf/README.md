## Protobuf Compile Script
To generate all the required python and cpp protobuf files, simply execute the `updateProtos.sh` script **from this directory** . A folder called Paradigm will be created, with subfolders
cpp and py. Inside each folder will be the corresponding generated proto files.
The files are copied around the repo to the locations where they are needed by
the script.  


### Note
Only tested on WSL, should work on unix systems though.