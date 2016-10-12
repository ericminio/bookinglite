var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();
var chai = require('chai')
var expect = chai.expect;

var script = require('fs').readFileSync('./app/template/js/event.display.js').toString()
var style = require('fs').readFileSync('./app/template/css/calendar.css').toString();

describe('Event display', function() {
  before(function(done) {
    this.server = require('http').createServer(function(request, response) {
      if (request.url == '/') {
        var index = '' + '<html>' +
          '   <head><title>hello</title>' +
          '<link rel="stylesheet" type="text/css" href="/css">' +
          '</head>' +
          '   <body>' +
          '   <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>' +
          '   <script src="/js_script"> </script>' +
          '   <script>$(document).ready(function(){reposition();}) </script>' +
          '       <table id=calendar cellspacing=0 cellpadding=0>' +
          '       <tr>' +
          '           <td width=30px><div class="event previous_month" id="event-1" days=6><span>Mathieu</span></div></td>' +
          '           <td width=30px></td>' +
          '           <td width=30px></td>' +
          '           <td width=30px></td>' +
          '           <td width=30px></td>' +
          '           <td width=30px></td>' +
          '           <td width=30px></td>' +
          '           <td width=30px></td>' +
          '       </table>' +
          '   </body>' +
          '</html>';

        response.writeHead(200, {
          'content-type': 'text/html'
        });

        response.end(index);
      }

      if (request.url == '/js_script') {
        response.writeHead(200, {
          'content-type': 'text/html'
        });
        response.end(script);
      }


      if (request.url == '/css') {
        response.writeHead(200, {
          'content-type': 'text/css'
        });
        response.end(style);
      }

    }).listen(5001, done);
  });

  after(function() {
    this.timeout(10000);
    this.server.close();
    return driver.quit();

  });


  beforeEach(function() {
    this.timeout(10000);
    return driver.get('http://localhost:5001');
  });


  it('show events width expected width', function(done) {
    this.timeout(10000);
    driver.manage().window().setSize(1024, 768).then(function() {
      var element = driver.findElement(By.id('event-1'));
      element.getCssValue('width').then(
        function(value) {
          //6 days x 30px - 1px = 179px
          expect(value).to.be.equal('179px');
          done();
        });
    });
  });

});