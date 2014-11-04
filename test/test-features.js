var Bolty = require('../');
require('chai').should();

describe('New features testing', function() {
  it('should generate id when not present', function(){
    var template = new Bolty({
      name: 'myTemplate',
      fields: {
        name: {
          type: 'string'
        },
        surname: {
          type: 'string'
        }
      }
    });

    var bin = template.encode({name: 'Alan', surname: 'Hoffmeister'});
    var obj = template.decode(bin);

    obj.name.should.be.equal('Alan');
    obj.surname.should.be.equal('Hoffmeister');
  });

  it('should allow string values for the fields', function(){
    var template = new Bolty({
      name: 'myTemplate',
      fields: {
        name: 'string',
        surname: 'string'
      }
    });

    var bin = template.encode({name: 'Alan', surname: 'Hoffmeister'});
    var obj = template.decode(bin);

    obj.name.should.be.equal('Alan');
    obj.surname.should.be.equal('Hoffmeister');
  });

  it('shoud allow passing fields directly', function(){
    var template = new Bolty({
      name: 'string',
      surname: 'string'
    });

    template._schema.name.should.contain('_auto-');

    var bin = template.encode({
      name: 'Alan',
      surname: 'Hoffmeister'
    });

    var obj = template.decode(bin);
    obj.name.should.be.equal('Alan');
    obj.surname.should.be.equal('Hoffmeister');
  });
});
