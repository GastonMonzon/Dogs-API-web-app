const { Dog, Temperament } = require('./db.js');

(async function associateDogTemperaments() {
  const dogs = await Dog.findAll();
  for (const dog of dogs) {
    for (const temperament of dog.temperament) {
      const temp = await Temperament.findOne({
        where: { name: temperament },
      });
      await dog.addTemperament(temp);
    }
  }
  console.log('Associations Completed');
})();