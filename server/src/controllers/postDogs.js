const { Dog, Temperament } = require('../db.js');

async function postDogs(request, response) {
  try {
    const { name, bredFor, breedGroup, lifeSpanString, minlifeSpan, maxlifeSpan, temperament, origin, metricWeightString,
      minMetricWeight, maxMetricWeight, imperialWeightString, minImperialWeight, maxImperialWeight, metricHeightString,
      minMetricHeight, maxMetricHeight, imperialHeightString, minImperialHeight, maxImperialHeight, image } = request.body;
    if (!name || !temperament) {
      return response.status(404).send('Obligatory data missing');
    }
    const lastDog = await Dog.findOne({
      order: [['id', 'DESC']]
    });
    const dog = await Dog.create({
      id: lastDog.id + 1,
      name: name,
      bredFor: bredFor || null,
      breedGroup: breedGroup || null,
      lifeSpanString: lifeSpanString || null,
      minlifeSpan: minlifeSpan || null,
      maxlifeSpan: maxlifeSpan || null,
      temperament: temperament || null,
      origin: origin || null,
      metricWeightString: metricWeightString || null,
      minMetricWeight: minMetricWeight || null,
      maxMetricWeight: maxMetricWeight || null,
      imperialWeightString: imperialWeightString || null,
      minImperialWeight: minImperialWeight || null,
      maxImperialWeight: maxImperialWeight || null,
      metricHeightString: metricHeightString || null,
      minMetricHeight: minMetricHeight || null,
      maxMetricHeight: maxMetricHeight || null,
      imperialHeightString: imperialHeightString || null,
      minImperialHeight: minImperialHeight || null,
      maxImperialHeight: maxImperialHeight || null,
      image: image || null,
      source: 'User'
    });
    if (Array.isArray(temperament) && temperament.length > 0) {
      const existingTemperaments = await Temperament.findAll({
        where: {
          name: temperament
        }
      });
      const existingTemperamentNames = existingTemperaments.map(temp => temp.name);
      const temperamentsToCreate = temperament.filter(temp => !existingTemperamentNames.includes(temp));
      const newTemperaments = temperamentsToCreate.length > 0 ?
        await Promise.all(temperamentsToCreate.map(temp => Temperament.create({ name: temp }))) : [];
      const allTemperaments = [...existingTemperaments, ...newTemperaments];
      await dog.setTemperaments(allTemperaments);
    }
    const updatedDog = await Dog.findByPk(dog.id, { include: Temperament });
    response.status(201).json({ updatedDog, message: 'Dog created succesfully' });
  } catch (error) {
    console.error(error);
    response.status(404).send({ error, message: 'Error at posting a new dog' });
  }
}

module.exports = postDogs;
