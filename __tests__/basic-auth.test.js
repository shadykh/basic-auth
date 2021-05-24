'use strict';


/**
 * 3rd Party Resources
 * -------------------------------------------------
 * */ 

const { server } = require('../src/server.js');

const superGoose = require('@code-fellows/supergoose');

const { it, expect } = require('@jest/globals');

const request = superGoose(server); 


/**
 * ------------------------------------------------------
 * Testing 
 * - Should sign up a new user
 * - Should sign in as a user
 * - Should throw an error when use an unsigned user
 * - Should throw an error when use an invalid password
 * ------------------------------------------------------
 */

describe('Basic Auth Test', () => {

  it('Should sign up a new user by [POST to /signup to create a new user]', async () => {

    let testUser = {username: 'Test',password: 'ShouldWork'};

    const response =  await request.post('/api/signup').send(testUser);

    expect(response.status).toEqual(201);

    expect(response.body.username).toEqual('Test');

    expect(response.body.password.length).toBeGreaterThan(0);

  });


  it('Should sign in as a user by [POST to /signin to login as a user (use basic auth)]', async () => {

    let testUser = {username: 'Test',password: 'ShouldWork'};

    const response = await request.post('/api/signin').auth(testUser.username, testUser.password);

    expect(response.status).toEqual(200);

    expect(response.body.username).toEqual(testUser.username);

    expect(response.body.password.length).toBeGreaterThan(0);

  });

  it('Should throw an error when use an unsigned user "Invalid Login: Invalid username or password"', async () => {

    try {
      let testUser = {username: 'TestFail',password: 'ShouldWork'};

      const response = await request.post('/api/signin').auth(testUser.username, testUser.password);
    } catch (error) {
      expect(error.status).toEqual(403);
      expect(error.message).toBe('Invalid Login: Invalid username or password');
    } 

  });

  it('Should throw an error when use an invalid password "Invalid Login: Invalid username or password"', async () => {

    try {
      let testUser = {username: 'TestFail',password: 'ShouldWork'};

      const response = await request.post('/api/signin').auth(testUser.username, testUser.password);
    } catch (error) {
      expect(error.status).toEqual(500);
      expect(error.message).toBe('Invalid Login: Invalid username or password');
    } 

  });

});
