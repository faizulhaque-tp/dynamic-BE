var supertest = require("supertest");
var should = require("should");
var rand = require("random-key")

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

var token;
var collectionId;

describe("Collection workflow tests",function(){

  // #1

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
      .end(function(err,res){
        // HTTP status should be 200
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
    });


  // #2

  it("should return _id on collection create",function(done){
    // calling home page api
    var randName = rand.generate(3);
    var data = {
      token: token,
      name: "CollectionFromTest"+randName,
      rules: {
        create: "",
        update: "",
        delete: ""
      }
    };
    server
    .post("/api/app/145804015821350/collection")
    .send(data)
    .expect("Content-type",/json/)
    .expect(201) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(201);
      res.body.should.have.property('_id');
      collectionId = res.body._id;
      done();
    });
  });

  // #3

  it("should update collection name",function(done){
    // calling home page api
    var randName = rand.generate(3);
    var data = {
      token: token,
      name: "CollectionFromTest"+randName+"Updated",
      rules: {
        create: "",
        update: "",
        delete: ""
      }
    };
    server
    .put("/api/app/145804015821350/collection/"+collectionId)
    .send(data)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  // #4

  it("should delete the collection",function(done){
    // calling home page api
    var data = {
      token: token
    };
    server
    .post("/api/app/145804015821350/collection/"+collectionId+"/delete")
    .send(data)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });


  // #3 should logout

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
