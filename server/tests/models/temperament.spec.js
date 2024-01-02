const { Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Temperament model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  describe('Validators', () => {
    beforeEach(() => Temperament.sync({ alter: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Temperament.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when it has a valid name', () => {
        return Temperament.create({ name: 'Friendly' });
      });
    });
  });
});