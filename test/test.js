/**
 * test.js
 *
 * Copyright (C) 2014 by Florian Holzapfel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
**/
var highrise = require('..');
var assert = require('chai').assert;

var client = new highrise({
	host: process.env.HOST,
	apikey: process.env.APIKEY,
	secret: process.env.SECRET
});

describe('General', function () {
	it('Test environment should be defined', function () {
		assert.isDefined(process.env.HOST, 'HOST is defined');
		assert.isDefined(process.env.APIKEY, 'APIKEY is defined');
		assert.isDefined(process.env.SECRET, 'SECRET is defined');
	});
});

describe('User Organizations', function () {
	it('Get user organizations', function (done) {
		client.userorganizations.get(function (err, organizations) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get user organization ID 1', function (done) {
		client.userorganization.get(1, function (err, organization) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('User Groups', function () {
	it('Get user groups', function (done) {
		client.usergroups.get(function (err, groups) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get user group ID 1', function (done) {
		client.usergroup.get(1, function (err, group) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Users', function () {
	it('Get users', function (done) {
		client.users.get(function (err, users) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get user ID 1', function (done) {
		client.user.get(1, function (err, user) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});
