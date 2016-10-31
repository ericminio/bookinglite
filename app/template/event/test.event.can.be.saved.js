var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');

var Server = require('../../../test/servlet/servlet.for.test');
var server = new Server();

describe.only('Event save', function() {

  var browser = new Browser();

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  it('saves in db', function(done) {
      browser.visit('http://localhost:5000/calendar/event/edit?e=2')
             .then(function() {
                 return browser.fill("#firstname", "Jess Ika")
                                .fill("#lastname", "Pepinetos")
                                .pressButton("Enregistrer");
             })
             .then(function() {
                 var event = server.database.findEventByID(2);
                 expect(event.first_name).to.be.equal("Jess Ika");
             })
             .then(done, done);
  });
});
