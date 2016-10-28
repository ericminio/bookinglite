var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();
var Server = require('../../../test/servlet/servlet.for.test');
var server = new Server();

describe('Event save', function() {
  before(function() {
    server.start();
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar/event/edit?e=2');
  });

  after(function() {
    server.stop();
  });

  describe('click submit save data', function() {
    before(function() {
      return browser.fill("#firstname", "Jess Ika")
        .fill("#lastname", "Pepinetos")
        .pressButton("Enregistrer");
    });

    it('save data when submitting the form', function() {
      setTimeout(0, function() {
        var event = server.database.findEventByID(2);
        expect(event.first_name).to.be.equal("Jess Ika");
        expect(event.last_name).to.be.equal("Pepinetos");
      });
    });
  });
});