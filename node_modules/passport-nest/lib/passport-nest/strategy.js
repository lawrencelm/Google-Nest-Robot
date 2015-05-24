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

/**
 * Module dependencies.
 */
var util = require('util'),
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

/**
 * `Strategy` constructor.
 *
 * The Nest authentication strategy authenticates with the Nest OAuth server to
 * get an access_token for the Nest API
 *
 * Options:
 *   - `clientID`      Nest client ID
 *   - `clientSecret`  Nest secret
 *
 * Examples:
 *
 *     passport.use(new NestStrategy({
 *       clientID: NEST_ID,
 *       clientSecret: NEST_SECRET,
 *     }));
 *
 * @param {Object} options
 * @param {Funciton} verify (optional)
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://home.nest.com/login/oauth2';
  options.tokenURL = options.tokenURL || 'https://api.home.nest.com/oauth2/access_token';

  // Nest requires the state parameter for increased security
  options.state = true;

  // The only data returned is an accessToken, no profile data is available
  // so we handle creating a sparse profile of the user
  verify = verify || function(accessToken, refreshToken, profile, done) {
    done(null, { accessToken: accessToken });
  };

  OAuth2Strategy.call(this, options, verify);

  this.name = 'nest';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

/**
 * Export Strategy constructor.
 */
module.exports = Strategy;
