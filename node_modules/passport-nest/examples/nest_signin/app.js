/**
 *  Copyright 2014 Nest Labs Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    app = express(),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    NestStrategy = require('passport-nest').Strategy;

passport.use(new NestStrategy({
    clientID: process.env.NEST_ID,
    clientSecret: process.env.NEST_SECRET,
    tokenURL: 'https://api.home.testc.nestlabs.com/oauth2/access_token',
    authorizationURL: 'https://home.testc.nestlabs.com/login/oauth2'
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use(cookieParser('cookie_secret_shh'));
app.use(bodyParser());
app.use(session({secret: 'session_secret_shh'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/nest', passport.authenticate('nest'));
app.get('/auth/nest/callback',
        passport.authenticate('nest', { }),
        function(req, res) {

        }
       );

app.listen(8080);
