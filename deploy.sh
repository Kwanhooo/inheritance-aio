#!/bin/bash

# cd to target directory
cd /root/inheritance-aio/ 2>>/dev/null || mkdir -p /root/inheritance-aio/log/ && (cd /root/inheritance-aio/ 2>>/dev/null || echo 'Failed to create target directory' && exit)

# remove previous src
rm -rf ./inheritance-aio/

# clone the repo
git clone git@github.com:zxg-zxxk/inheritance-aio.git

# cd to src directory
cd ./inheritance-aio/ 2>>/dev/null || (echo 'Faild when Clone the Repository, By the way, the Password you input should be your personal github token (read)' && exit)

# delete lock file
rm -f ./package.lock.json

# install dependencies
npm install

# build production
npm run build:prod

# check Dockerfile
if [ ! -f ./Dockerfile ]; then
    if [ -f ../Dockerfile ]; then
        cp ../Dockerfile ./
    else
        echo 'Dockerfile not found! Deploy FAILED!' && exit
    fi
fi

# check default.conf
if [ ! -f ./default.conf ]; then
    if [ -f ../default.conf ]; then
        cp ../default.conf ./
    else
        echo 'default.conf not found! Deploy FAILED!' && exit
    fi
fi

# stop previous docker container
docker stop inheritance-aio

# remove previous docker container
docker rm inheritance-aio

# remove previous docker image
docker image rm inheritance-aio

# build new docker image
docker build -t inheritance-aio .

# start new image
 docker run -p 11111:80 \
 -v /root/inheritance-aio/log/:/usr/share/nginx/log/ \
 --name inheritance-aio \
 -d inheritance-aio
