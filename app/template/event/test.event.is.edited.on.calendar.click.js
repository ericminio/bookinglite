var chai = require('chai')
var expect = chai.expect;
var Browser = require('zombie');
var browser = new Browser();
var Server = require('../../../test/servlet/servlet.for.test');
var server = new Server();

describe('Event edit', function() {
  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  beforeEach(function() {
    this.timeout(10000);
    return browser.visit('http://localhost:5000/calendar?y=2016&m=9');
  });

  it('is forwarded to the event when user click the event and the expected information is displayed.', function() {
    this.timeout(10000);
    return browser.click('#event-2').then(function() {
      browser.assert.success;
      browser.assert.text('title', 'Évènement');
      expect(browser.field('#firstname').value).to.be.equal('Jessika');
      expect(browser.field('#lastname').value).to.be.equal('Pepin');
      expect(browser.field('#startdate').value).to.be.equal('2016-09-25');
      expect(browser.field('#enddate').value).to.be.equal('2016-09-28');
      expect(browser.field('#element').value).to.be.equal('1');
    });
  });
 
  it.only('save data when submitting the form', function() {
    this.timeout(10000);
    return browser.click('#event-2').then(function() {
      return browser.fill("#firstname", "Jess Ika")
        .fill("#lastname", "Pepinetos")
        .pressButton("Enregistrer").then(function() {
          var event = server.database.findEventByID(2);
          //expect(event.first_name).to.be.equal("Jess Ika");
        });
    });
  });

});

describe('Event url', function() {
  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  it('with no event_id parameter forward to the error page.', function() {
    browser.visit('http://localhost:5000/calendar/event/edit', function(done) {
      browser.assert.text('title', 'Erreur');
      done();
    });
  });

  it('with an unvalid event_id parameter forward to the error page.', function(done) {
    browser.visit('http://localhost:5000/calendar/event/edit?e=asdf', function() {
      browser.assert.text('title', 'Erreur');
      done();
    });
  });

  it('with a valid event_id parameter forward to the event page.', function(done) {
    browser.visit('http://localhost:5000/calendar/event/edit?e=2', function() {
      browser.assert.text('title', 'Évènement');
      done();
    });
  });

});