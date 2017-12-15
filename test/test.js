var request = require("request");
var expect = require("chai").expect;
var helloWorld = require("../app.js")
var base_url = "http://localhost:3000/"

var index = require("../routes/index.js");
var express = require('express');

describe("Testing home page", function() {
    it("Home page should not be null", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).to.not.be.null;
        done();
      });
    });
    
// describe("testing google map", function() {
//     it("returns status code 200", function(done) {
//       request.get(base_url, function(error, response, body) {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//     });
//   });
 
// describe("testing facebook login", function() {
//     it("returns status code 200", function(done) {
//       request.get(base_url, function(error, response, body) {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//     });
//   });
  
}); 