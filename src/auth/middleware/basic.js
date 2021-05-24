'use strict';

/**
 * 3rd Party Resources
 * -------------------------------------------------
 * */ 

const bcrypt = require('bcrypt');

const base64 = require('base-64');

const Users = require('../models/users-model.js');


const signIn = async (req, res, next)=>{

  let encodedString = req.headers.authorization.split(' ')[1];  // ['Basic', 'dknadbuertsdgstsf']
  
  let decodedString = base64.decode(encodedString); // "username:password"
    
  let [username, password] = decodedString.split(':'); // username, password
    
  try {
    const user = await Users.findOne({ username: username });
  
    if(!user){
      res.status(403).json({ error: 'Invalid Login: Invalid username or password' });
    }else{
      console.log('🚀 ~ file: router.js ~ line 65 ~ signInHandler ~ user', user);
    
      const isValid = await bcrypt.compare(password, user.password);
        
      if (isValid) {
        req.user=user;
        next();
      } else {
        next({message: 'Invalid Login: Invalid username or password'});
      }
    }
  
  }
    
  catch (error) {
    res.status(403).json({ error: error.message });
  }
};


/**
 * Export module
 * -------------------------------------------------
 */

module.exports = signIn;