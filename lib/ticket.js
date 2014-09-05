var utils = require('./utils');

var ticket = function (client, xml) {
	this.client = client;
	if (xml) {
		utils.parse_xml(this, xml);
	}
};
ticket.prototype.get = function (id, callback) {
	this.client.get_item('/Tickets/Ticket/' + id, ticket, callback);
};

module.exports = ticket;
