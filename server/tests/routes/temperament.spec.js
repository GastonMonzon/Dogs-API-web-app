const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app.js');
const session = require('supertest-session');
const sinon = require('sinon');
const { Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const temperament = {
  id: 1000,
  name: 'Slow',
};

describe('Temperament routes', () => {
  before(() => conn.authenticate()
    .then(() => Temperament.sync({ alter: true }))
    .then(() => Temperament.create(temperament))
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('GET /temperaments', () => {
    it('should get all temperaments with status 200', async () => {
      const response = await agent.get('/temperaments').expect(200);
    });

    it('should handle errors and return 404', async () => {
      // Mock the findAll method to simulate an error
      const findAllStub = sinon.stub(Temperament, 'findAll').rejects(new Error('Database error'));
      const response = await agent.get('/temperaments').expect(404);
      sinon.assert.calledOnce(findAllStub);
      findAllStub.restore(); // Restore the original findAll method
    });
  });
  describe('GET /temperaments/query', () => {
    it('should get temperaments with a name match', async () => {
      const response = await agent.get('/temperaments/query?name=P').expect(200);
      expect(response.body).to.be.an('array');
    });

    it('should return an empty array if no temperaments are found with the specified name', async () => {
      const response = await agent.get('/temperaments/query?name=Nonexistent').expect(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(0);
    });

    it('should return 404 if an error occurs', async () => {
      const response = await agent.get('/temperaments/queryInvalidParameter').expect(404);
    });
  });
  describe('DELETE /temperaments/queryExact', () => {
    it('should delete temperaments with a name match', async () => {
      const response = await request(app).delete(`/temperaments/queryExact?name=${temperament.name}`).expect(200);
      expect(response.body).to.be.an('object');

      it('should return 404 if no temperaments found with the specified name', async () => {
        const response = await agent.get('/temperaments/queryExact?name=Nonexistent').expect(404);
      });
  
      it('should return 500 if an error occurs', async () => {
        const response = await agent.get('/temperaments/queryExactInvalidParameter').expect(500);
      });
    });
  });
});