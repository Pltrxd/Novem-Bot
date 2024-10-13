const { Schema, model } = require('mongoose');

let ticketSchema = new Schema({
    Guild: String,
    ChannelGeneral: String,
    ChannelService: String,
    ChannelConflict: String,
    ChannelPartner: String,
    Log: String,
    Ticket: String,
});

module.exports = model('tickSchema', ticketSchema);