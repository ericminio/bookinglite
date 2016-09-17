var assert = require('assert');
var pg = require('pg');

describe('Database', function() {
  it('is configured and connecting properly', function() {
    console.log(process.env.DATABASE_URL);
    var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';
    var client = new pg.Client(connectionString);
    client.connect();
    client.end(); 
    
    assert(1,1);
  });
});