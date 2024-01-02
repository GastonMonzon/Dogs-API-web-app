/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: 1000,
  name: 'Piug',
  source: 'User'
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
    .then(() => Dog.sync({ alter: true }))
    .then(() => Dog.create(dog))
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('GET /dogs', () => {
    it('should get all dogs with status 200', async () => {
      const response = await agent.get('/dogs').expect(200);
    });

    it('should handle errors and return 404', async () => {
      // Mock the findAll method to simulate an error
      const findAllStub = sinon.stub(Dog, 'findAll').rejects(new Error('Database error'));
      const response = await agent.get('/dogs').expect(404);
      sinon.assert.calledOnce(findAllStub);
      findAllStub.restore(); // Restore the original findAll method
    });
  });
  describe('GET /dogs/queryExact', () => {
    it('should get a dog with exact name match', async () => {
      const response = await agent.get(`/dogs/queryExact?name=${dog.name}`).expect(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0].name).to.equal(`${dog.name}`);
    });

    it('should return 404 if no dogs found with the specified name', async () => {
      const response = await agent.get('/dogs/queryExact?name=Nonexistent').expect(404);
    });

    it('should return 500 if an error occurs', async () => {
      const response = await agent.get('/dogs/queryExactInvalidParameter').expect(500);
    });
  });
  describe('GET /dogs/query', () => {
    it('should get dogs with a name match', async () => {
      const response = await agent.get('/dogs/query?name=P').expect(200);
      expect(response.body).to.be.an('array');
    });

    it('should return an empty array if no dogs are found with the specified name', async () => {
      const response = await agent.get('/dogs/query?name=Nonexistent').expect(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(0);
    });

    it('should return 500 if an error occurs', async () => {
      const response = await agent.get('/dogs/queryInvalidParameter').expect(500);
    });
  });
  describe('GET /dogs/:id', () => {
    it('should get dogs with an id match', async () => {
      const response = await agent.get(`/dogs/1`).expect(200);
      expect(response.body).to.be.an('object');

      it('should return 404 if no dogs found with the specified id', async () => {
        const response = await agent.get('/dogs/215649').expect(404);
      });

      it('should return 500 if an error occurs', async () => {
        const response = await agent.get('/dogs/InvalidParameter').expect(500);
      });
    });
  });
  describe('DELETE /dogs/queryExact', () => {
    it('should delete dogs with a name match', async () => {
      const response = await request(app).delete(`/dogs/queryExact?name=${dog.name}`).expect(200);
      expect(response.body).to.be.an('object');

      it('should return 404 if no dogs found with the specified name', async () => {
        const response = await agent.get('/dogs/queryExact?name=Nonexistent').expect(404);
      });

      it('should return 500 if an error occurs', async () => {
        const response = await agent.get('/dogs/queryExactInvalidParameter').expect(500);
      });
    });
  });
});
