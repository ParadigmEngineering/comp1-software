## Installing the Protobuf Compiler
Before the `updateProtos.sh` script can be run, the protobuf compiler must be installed. This can be done using a package manager on Linux/MacOS and by downloading the precompiled binaries and adding them to PATH on windows. WSl can be used to run protoc on windows as well. 

### Linux: 
```
sudo apt-get install protobuf-compiler // Install compiler
protoc --version                       // Check compiler is installed
```

### MacOS
```
brew install protobuf // Install compiler
protoc --version      // Check compiler is installed
```

### Windows
```
Download the most recent precompiled binary here: 
https://github.com/protocolbuffers/protobuf/releases

For example, on 64-bit download:
protoc-3.15.3-win64.zip

Extract the zip to a folder

Add the folder somewhere on your system, we'll add the folder to
C:\Program Files\protobuf

Add the path to the protoc binary to your system path:
- Windows search for Environment Variable, open "Edit system environment variables"
- Click "Environment Variables" on the bottom right
- Under "system variables", click Path -> Edit
- New -> paste the path to the folder containing the protoc executable

Example path:
C:\Program Files\protobuf\protoc-3.15.3-win64\bin

Open powershell and enter "protoc --version"
- You should see "libprotoc 3.15.3" or similar
```
## Protobuf Compile Script

### Linux
To generate all the required python and cpp protobuf files, simply execute the `updateProtos.sh` script **from this directory** . A folder called Paradigm will be created, with subfolders
cpp and py. Inside each folder will be the corresponding generated proto files.
The files are copied around the repo to the locations where they are needed by
the script.  


### Note
Only tested on WSL, should work on unix systems though.