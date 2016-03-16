var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

var token;

describe("User authentication workflow tests",function(){

  // #1 should return token

  it("should return token on login",function(done){

    // calling home page api
    var data = {
      userName: "hasan",
      password: "123"
    };
    server
    .post("/api/login")
    .send(data)
    .expect("Content-type",/json/)
    .expect(201) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(201);
      res.body.should.have.property('token');
      token = res.body.token;
      done();
    });
  });

  // #2 should logout

  it("should logout successfully",function(done){
    // calling home page api
    var data = {
      token: token
    };
    server
    .post("/api/logout")
    .send(data)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.should.have.property('message');
      res.body.message.should.equal('User Logged out successfully');
      done();
    });
  });

});
