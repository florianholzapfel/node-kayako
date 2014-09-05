var utils = require('./utils');

var tickets = function (client, xml) {
	this.client = client;
	if (xml) {
		utils.parse_xml(this, xml);
	}
};
tickets.prototype.get = function (options, callback) {
	this.client.get_items('/Tickets/Ticket/ListAll/' + (options.departmentid || 1) + '/' + (options.ticketstatusid || -1) + '/' + (options.ownerstaffid || -1) + '/' + (options.userid || -1) + '/' + (options.count || -1) + '/' + (options.start || -1) + '/' + (options.sortField || -1) + '/' + (options.sortOrder || -1) + '/', require('./ticket'), callback);
};

module.exports = tickets;
