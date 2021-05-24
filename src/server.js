'use strict';

/**
 * 3rd Party Resources
 * -------------------------------------------------
 * */ 

const express = require('express');

const cors = require('cors');

const morgan = require('morgan');

const routesHandler = require('./auth/router.js')




/**
 * errorHandlers
 * -------------------------------------------------
 */

const error500Handler = require('./middleware/500');

const error404Handler = require('./middleware/404');


/**
 * Prepare the express app
 * -------------------------------------------------
 */
const app = express();



/**
 * Process JSON input and put the data on req.body
 * -------------------------------------------------
 */
app.use(express.json());



/**
 * Process FORM input and put the data on req.body
 * -------------------------------------------------
 */

app.use(express.urlencoded({ extended: true }));




/**
 * Middleware
 * -------------------------------------------------
 */

app.use(morgan('dev'));

app.use(cors());



/**
 * Routes
 * -------------------------------------------------
 */

app.get('/', (req, res)=>{
  res.status(200).render('pages/home.ejs');
});

app.use('/api', routesHandler);

app.use('*', error404Handler);

app.use(error500Handler);





/**
 * Check the connection
 * -------------------------------------------------
 */
function start(port) {
  app.listen(port, () => {
    console.log(`🚀 ~ file: server.js ~ line 35 ~ app.listen ~ we are launching 🔥 on port ➡️ ${port}`);
  });
}


/**
 * Export module
 * -------------------------------------------------
 */

module.exports = {
  server: app,
  start: start,
};