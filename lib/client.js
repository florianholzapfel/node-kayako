/**
 * client.js
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
var xml2js = require('xml2js');
var crypto = require('crypto');
var querystring = require('querystring');

var client = function (config) {
	function generate_signature(salt) {
		var mac = crypto.createHmac('sha256', config.secret);
		mac.update(salt);
		return mac.digest('base64');
	}
	function parse_item(data, client, item_factory, callback) {
		xml2js.parseString(data, function (err, res) {
			if (err) {
				callback(err);
			} else {
				var data = null;

				for (var k1 in res) {
					for (var k2 in res[k1]) {
						if (res[k1][k2].length === 1) {
							data = res[k1][k2][0];
						}
						break;
					}
					break;
				}
				
				if (data) {
					callback(null, new item_factory(client, data));
				} else {
					callback('invalid data', null);
				}
			}
		});
	}

	var protocol = (undefined === config.secure || config.secure) ?
						'https' : 'http';
						
	return {
		send: function (method, command, options, xmlbody, cb) {
			var callback = typeof xmlbody === 'function' ? xmlbody : cb;
			var postdata = typeof xmlbody === 'string' ? xmlbody : null;
			
			options = options || { };
			options.e = command;
			options.apikey = config.apikey;
			options.salt = crypto.randomBytes(20).toString('base64');
			options.signature = generate_signature(options.salt);

			var opts = {
				rejectUnauthorized: false,
				host: config.host,
				path: '/api/index.php?' + querystring.stringify(options),
				method: method
			};
			
			if (postdata) {
				opts.headers['Content-Length'] = postdata.length;
				opts.headers['Content-Type'] = 'application/xml';
			}

			var req = require(protocol).request(opts, function (res) {
				var data = '';
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
					if (res.statusCode >= 400 && res.statusCode < 600 ||
						res.statusCode < 10) {
						callback(res.statusCode);
					} else {
						res.data = data;
						callback(null, res);
					}
				});
			});
			req.on('error', function (e) {
				callback(e.message);
			});
			req.end(postdata);
		},
		get_items: function (command, item_factory, callback) {
			var client = this;

			this.send('GET', command, null, function (err, res) {
				if (err) {
					callback(err);
				} else {
					xml2js.parseString(res.data, function (err, res) {
						if (err) {
							callback(err);
						} else {
							var items = [];

							for (var k1 in res) {
								for (var k2 in res[k1]) {
									for (var i = 0; i < res[k1][k2].length;
										++i) {
										var p = new item_factory(client,
														res[k1][k2][i]);
										items.push(p);
									}
									break;
								}
								break;
							}
							
							callback(null, items);
						}
					});
				}
			});
		},
		create_item: function (command, data, item_factory, callback) {
			var client = this;

			this.send('POST', command, null, data, function (err, res) {
				if (err) {
					callback(err);
				} else {
					parse_item(res.data, client, item_factory, callback);
				}
			});
		},
		get_item: function (command, item_factory, callback) {
			var client = this;

			this.send('GET', command, null, function (err, res) {
				if (err) {
					callback(err);
				} else {
					parse_item(res.data, client, item_factory, callback);
				}
			});
		}
	};
};

var kayako = function (config) {
	this.client = new client(config);
	this.department = new (require('./department'))(this.client);
	this.departments = new (require('./departments'))(this.client);
	this.newscategory = new (require('./newscategory'))(this.client);
	this.newscategories = new (require('./newscategories'))(this.client);
	this.newsitem = new (require('./newsitem'))(this.client);
	this.newsitems = new (require('./newsitems'))(this.client);
	this.staff = new (require('./staff'))(this.client);
	this.staffgroup = new (require('./staffgroup'))(this.client);
	this.staffgroups = new (require('./staffgroups'))(this.client);
	this.staffusers = new (require('./staffusers'))(this.client);
	this.user = new (require('./user'))(this.client);
	this.users = new (require('./users'))(this.client);
	this.usergroup = new (require('./usergroup'))(this.client);
	this.usergroups = new (require('./usergroups'))(this.client);
	this.userorganization = new (require('./userorganization'))(this.client);
	this.userorganizations = new (require('./userorganizations'))(this.client);
};

module.exports = kayako;
