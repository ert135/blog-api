#!/bin/bash
echo starting server
npm install forever -g
cd /home/ec2-user/blog-api/dist
sudo -E forever start server.js
