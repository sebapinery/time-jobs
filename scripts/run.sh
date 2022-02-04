#!/bin/sh
set -ex

sudo apt-get update -y && apt-get upgrade -y

sudo apt-intstall git -y

echo "Git installed"