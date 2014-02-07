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

describe('Departments', function () {
	it('Get departments', function (done) {
		client.departments.get(function (err, departments) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get department ID 1', function (done) {
		client.department.get(1, function (err, department) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('News Categories', function () {
	it('Get news categories', function (done) {
		client.newscategories.get(function (err, newscategories) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get news category ID 1', function (done) {
		client.newscategory.get(1, function (err, newscategory) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('News Items', function () {
	it('Get news items', function (done) {
		client.newsitems.get(function (err, newsitems) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get news items with news category ID 1', function (done) {
		client.newsitems.get(1, function (err, newsitems) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get news item ID 1', function (done) {
		client.newsitem.get(1, function (err, newsitem) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('News Subscribers', function () {
	it('Get news subscribers', function (done) {
		client.newssubscribers.get(function (err, newssubscribers) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get news subscriber ID 1 should return an error', function (done) {
		client.newssubscriber.get(1, function (err, newssubscriber) {
			assert.isNotNull(err, 'there was no error');
			done();
		});
	});
	it('Get news subscriber ID 6', function (done) {
		client.newssubscriber.get(6, function (err, newssubscriber) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Staff Groups', function () {
	it('Get staff groups', function (done) {
		client.staffgroups.get(function (err, staffgroups) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get staff group ID 1', function (done) {
		client.staffgroup.get(1, function (err, staffgroup) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
});

describe('Staff Users', function () {
	it('Get staff users', function (done) {
		client.staffusers.get(function (err, staffusers) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Get staff user ID 1', function (done) {
		client.staff.get(1, function (err, staff) {
			assert.isNull(err, 'there was an error');
			done();
		});
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
	it('Search users @glueckkanja.com', function (done) {
		client.users.search({ email: '@glueckkanja.com' },
			function (err, users) {
			assert.isNull(err, 'there was an error');
			done();
		});
	});
	it('Search users florian', function (done) {
		client.users.search({ fullname: 'florian' },
			function (err, users) {
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
