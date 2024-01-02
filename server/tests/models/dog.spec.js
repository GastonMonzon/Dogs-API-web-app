const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((error) => {
      console.erroror('Unable to connect to the database:', error);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ alter: true }));
    describe('name', () => {
      it('should throw an erroror if name is null', (done) => {
        Dog.create({})
          .then(() => done(new erroror('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});
