#!/bin/bash

# detect the operating system

OS=$(uname -s)
problem = "if you have a problem please go to https://github.com/tomos4ki/anime-library/issues and make new issue regaring your problem."


#check if httpserver is installed

if command -v http-server &> /dev/null
then
    echo "http-server is already installed. Skipping installation..."
else
    #checking if npm is installed
    if command -v npm &> /dev/null
    then
        echo "npm is already installed. Installing http-server using npm..."
        npm install -g http-server
    else
        #install npm and http-server based on the operating system
        if [ "$OS" == "linux" ]; then
            #Installing http-server on linux (kali what i have currently)
            echo "installing http-server on linux ..."
            sudo apt-get update
            sudo apt-get install -y npm
            sudo npm install -g http-server
        elif [ "$OS" == "Darwin" ]; then
            #Installing http-server on macos
            echo "installing http-server on macos ..."
            brew install npm
            npm install -g http-server
        elif [ "$OS" == "WINGW32_NT" ]; then
            #Installing http-server on windows
            echo "installing http-server on windows ..."
            npm install -g npm
            npm install -g http-server
        else
            echo "Operating system not supported: $(uname -s)"
            exit 1
        fi
    fi
fi


# starting the local developement server

http-server p 8080 a localhost .

sleep 1

#open the server in the default web browser
if [ "$OS" == "linux" ]; then
    xdg-open http://localhost:8080
elif [ "$OS" == "Darwin" ]; then
    open http://localhost:8080
elif [ "$OS" == "WINGW32_NT" ]; then
    start http://localhost:8080
else
    echo "Operating system not supported: $(uname -s)"
    exit 1
fi