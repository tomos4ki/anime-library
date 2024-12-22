#!/bin/bash

# detect the operating system

OS=$(uname -s)

#check if httpserver is installed

if ! command -v http-server &> /dev/null
then
    #install http-server based on the operating system
    if [ "$OS" == "linux" ]; then
        #Installing http-server on linux (kali what i have currently)
        echo "installing http-server on linux ..."
        npm install -g http-server
    elif [ "$OS" == "MINGW"* ]; then
        #Installing http-server on windows(using GIT Bash)
    elif [ "$OS" == "Darwin" ]; then
        #Installing http-server on macos
        echo "installing http-server on macos ..."
        npm install -g http-server
    elif [ "$OS" == "Windows" ]; then
        #Installing http-server on windows
        echo "installing http-server on windows ..."
        npm install -g http-server
    else
        echo "Operating system not supported"
        exit 1
    fi
fi


# starting the local developement server

http-server p 8080 a localhost .

sleep 1

#open the server in the default web browser
xdg-open http://localhost:8080