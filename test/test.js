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
      index.get(base_url, function(error, response, body) {
        expect(body).to.not.be.null;
        done();
      });
    });
    
describe("Testing home page", function() {
    it("Home page should not be null", function(done) {
      restaurant.get(base_url, function(error, response, body) {
        expect(body).to.not.be.null;
        done();
      });
    });
    
describe("Testing restaurant page", function() {
    it("Restaurant page should not be null", function(done) {
      restaurantSetUp.get(base_url, function(error, response, body) {
        expect(body).to.not.be.null;
        done();
      });
    });
    
    });
    });
});
    