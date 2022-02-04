#!/bin/sh
set -ex

apt-get update -y && apt-get upgrade -y

apt-intstall git -y

echo "Git installed"