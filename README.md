# comp1-software
Software for Competition 1 of the "Not-A-Boring" Competition

## General Setup
### Python Virtual Environment 

Linux
- Ensure you have python3 installed
- `python3 -m venv .venv` 
- `source .venv/bin/activate`

## Control Laptop - Front-end (Angular) setup Guide
Prerequisite: [Node.js(LTS version will be fine) and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-node-js-and-npm)

1. First, open your terminal. Navigate to `/comp1-software` directory.
2. Run `npm install -g @angular/cli`
3. Navigate to `/OnLand/ControlLaptop/angular-UI`. 
    If you are in the root of the 'comp1-software' folder, then just run:
        Windows: `cd OnLand\ControlLaptop\angular-UI`
        Linux/Mac: `cd OnLand/ControlLaptop/angular-UI`
4. When you in the angular-UI folder, run `npm install`
5. To build and serves the app locally, run `ng serve`. If it's build successfully, there should be a link that look like this: http://localhost:4200/. 
6. Navigate to the link in your browser, and your should be able to see the app.

## Node (embedded) setup Guide
Prerequisites:
 - [STM32CubeMx](https://www.st.com/en/development-tools/stm32cubemx.html) (Version 6.1.0)
 - Windows Users will need [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
 - The following packages (should be able to install from package manager):
   - build-essential (`sudo apt install build-essential`)
   - gcc-arm-none-eabi (`sudo apt install gcc-arm-none-eabi`)
   - CMake (see below instructions)

CMake
 - Execute CMake --version, if your version is below 3.15.3 - perform the following
    1. Remove your current version of cmake with: `sudo apt-get remove --auto-remove cmake && sudo apt-get purge --auto-remove cmake` 
    2. **Ensure you are in the project python environment** and execute `pip install cmake` 

Setup
1. Open STM32CubeMx, select "File -> Load Project...", and open to `/comp1-software/Examples/Blink/Blink.ioc`
2. Navigate to the Project Manager tab, ensure that the "Toolchain/IDE" is set to "Makefile", and hit the "GENERATE CODE" button. This will create all the required HAL code in to allow for the project to be built
3. In a terminal window, navigate to `comp1-software/Examples/Blink`
4. First, cd into `Core/Src`, and remove `main.c`
5. Cd back to the root of the project, and issue the following commands:
   - `mkdir build && cd build`
   - `cmake -DCMAKE_TOOLCHAIN_FILE=../arm-none-eabi-gcc.cmake -DCMAKE_BUILD_TYPE=Debug ..`
   - `make`

   There should now be `nucleo-f303re.out`, plus some other files with the same name, and different file extension. This confirms that you have build the project successfully.
