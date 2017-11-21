#!/bin/bash

export JWT_SECRET=dskjfhgjkfsdghjkfsd
export BLOG_PORT=80
export MONGODB_URL=mongodb://localhost:27017/

cd /home/ec2-user/blog-api
npm install
npm run build

cd /home/ec2-user/blog-api/dist
sudo -E node server.js

service httpd start



