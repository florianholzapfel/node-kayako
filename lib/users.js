/**
 * users.js
 *
 * Copyright (C) 2014 by Florian Holzapfel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
**/
var querystring = require('querystring');
var crypto = require('crypto');

var users = function (client) {
	this.client = client;
};
users.prototype.get = function (callback) {
	this.client.get_items('/Base/User/Filter', require('./user'), callback);
};
users.prototype.search = function (query, callback) {
	var client = this.client;
	var salt = crypto.randomBytes(20).toString('base64');
	var options = {
		e: '/Base/UserSearch',
		apikey: this.client.get_apikey(),
		salt: salt,
		signature: this.client.generate_signature(salt)
	};

	for (var k in query) {
		options.query = query[k];
		options[k] = 1;
	}

	var postdata = querystring.stringify(options);
	var opts = {
		path: '/api/index.php',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postdata.length
		}
	};
	
	this.client.request(opts, postdata, function (err, res) {
		if (err) {
			callback(err);
		} else {
			client.parse_items(res.data, client, require('./user'), callback);
		}
	});
};

module.exports = users;
