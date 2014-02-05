# node-kayako
[![NPM version](https://badge.fury.io/js/node-kayako.png)](http://badge.fury.io/js/node-kayako) [![Dependency Status](https://david-dm.org/florianholzapfel/node-kayako.png)](https://david-dm.org/florianholzapfel/node-kayako)

As the name already implies, this project implements the API for [Kayako] [1], a helpdesk system.

The implementation currently only allows to retrieve data from Kayako. Updating records will be implemented in the future.

## Getting started

In your shell, install with npm:

```sh
npm install node-kayako
```

In your code:

```javascript
var kayako = require('node-kayako');

var client = new highrise({
	host: <kayako-host>,
	apikey: <kayako-apikey>,
	secret: <kayako-secret>
});

client.userorganizations.get(function (err, organizations) {
	if(err) {
		console.log(err);
	} else {
		console.log(organizations);
	}
});
```

### Unit test ###
You can run the automated unit test using the following command line:

```
HOST=YOUR_KAYAKO_HOST APIKEY=YOUR_APIKEY SECRET=YOUR_SECRET npm test
```

```YOUR_KAYAKO_HOST```, ```YOUR_APIKEY``` and ```YOUR_SECRET``` need to be replaced with correct values.

Although, the unit test is desgined to not modify your Kayako installation (it deletes all objects it creates and does not modify or delete already existing objects), please use it at your **OWN RISK**.

## References ##
 * [Kayako REST API] [2]

## Formalia

```
Copyright (C) 2013 by Florian Holzapfel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

[1]: http://www.kayako.com
[2]: http://wiki.kayako.com/display/DEV/Kayako+REST+API
