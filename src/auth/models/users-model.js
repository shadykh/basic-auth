'use strict';


/**
 * 3rd Party Resources
 * -------------------------------------------------
 */

const mongoose = require('mongoose');


/**
 * Create a mongoose model
 * -------------------------------------------------
 */

const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});


const Users = mongoose.model('users', usersSchema);


/**
 * Export module
 * -------------------------------------------------
 */

module.exports = Users;