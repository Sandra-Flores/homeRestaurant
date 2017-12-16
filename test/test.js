var request = require("request");
var expect = require("chai").expect;
var helloWorld = require("../app.js")
var base_url = "http://localhost:3000/"

var index = require("../routes/index.js");
var restaurant = require("../routes/restaurant.js");
var restaurantSetUp = require("../routes/restaurantSetUp.js");
var express = require('express');

describe("Testing home page", function() {
    it("Home page should not be null", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).to.be.null;
        // done();
      });
    });

describe("Testing home page", function() {
    it("Home page should not be null", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).to.be.null;
        // done();
      });
    });

    });
});