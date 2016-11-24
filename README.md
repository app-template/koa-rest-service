# koa-rest-service

## Description & Features

Rest Web Server template, with sample rest endpoint `users`, configured with common middlewares, include security, log, timeout, body parser etc.
Without static pages, without database.

## Install
node version 7.0.0+

      git clone git@github.com:app-template/koa-rest-service.git

      cd koa-rest-service

      npm install

      npm start
      
Or

      node --harmony app.js
      
Now access the sample resource(users) with:
      
      http://yourhost:3000/api

Run test

      npm test


## How to start your work

Write resource in /lib/resources/xxxx.rs.js

Write resource schema in /lib/resources/xxxx.schm.js

Write service in /lib/services/xxxx.svc.js, note context in constructor and wrap with servie function like sample

Register resource in app.js


## Component list
web :   `koa`

router: `koa-router`

db:  `mocked in memory`

log : `koa-morgan` for access log, `winston` for application log

test: `supertest`, api test

others: `helmet`, `etag`, `xTime` ,`bodyParser` ,`compress`, `timeout-v2`


#### TODO

rate control

performance log




