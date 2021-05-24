'use strict';

/**
 * 3rd Party Resources
 * -------------------------------------------------
 * */ 

const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const Users = require('./models/users-model.js');

const signInAuth = require('./middleware/basic.js');




/**
 * Routes
 * -------------------------------------------------
 */

router.post('/signup', signUpHandler);

router.post('/signin', signInAuth, signInHandler);



/**
 * Function
 * -------------------------------------------------
 */


async function signUpHandler(req, res){
  try {

    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new Users({ username, password: hash });

    const record = await user.save();

    res.status(201).json(record);

  } catch (error) {

    res.status(403).json({ error: error.message });

  }
}


async function signInHandler(req,res){
  res.status(200).json(req.user);
}


/**
 * Export module
 * -------------------------------------------------
 */

module.exports = router;