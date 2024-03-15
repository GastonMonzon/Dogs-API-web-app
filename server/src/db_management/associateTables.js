const { Dog, Temperament } = require('./createTables.js');

async function associateDogTemperaments() {
  console.log('Associating dogs');
  const dogs = await Dog.findAll();
  const dogCheck = await Dog.findByPk(dogs[0].id);
  const associatedDogs = await dogCheck.getTemperaments();
  if (associatedDogs.length > 0) {
    console.log('Dog associations already made. Skipping associations.');
    return;
  }
  for (const dog of dogs) {
    for (const temperament of dog.temperament) {
      const temp = await Temperament.findOne({
        where: { name: temperament },
      });
      await dog.addTemperament(temp);
    }
  }
  console.log('Associations Completed');
}

module.exports = associateDogTemperaments;