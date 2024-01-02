const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, apiKey } = require('../db.js');

async function getDogsByName(request, response) {
  try {
    const { name } = request.query;
    const userDogs = await Dog.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }, // Search for case-insensitive match
        source: 'User'
      }
    });
    const { data } = await axios(`https://api.thedogapi.com/v1/breeds/?api_key=${apiKey}`);
    const apiDogs = [];
    data.forEach((dog) => {
      if (dog.name.toLowerCase().includes(name.toLowerCase())) {
        const { id, name, bred_for, breed_group, life_span, temperament, origin, weight, height, image } = dog;
        const lifeSpanArray = life_span.match(/\d+/g);

        let metricWeightString;
        const metricWeightRange = weight.metric.match(/(\d+(\.\d+)?)/g);
        let metricWeightArray = metricWeightRange?.map(Number);
        if (metricWeightArray?.length === 1) {
          metricWeightString = toString(metricWeightArray[0]);
        } else {
          metricWeightString = weight.metric;
        }

        const imperialWeightString = weight.imperial;
        const imperialWeightRange = weight.imperial.match(/(\d+(\.\d+)?)/g);
        const imperialWeightArray = imperialWeightRange?.map(Number);

        const metricHeightString = height.metric;
        const metricHeightRange = height.metric.match(/(\d+(\.\d+)?)/g);
        const metricHeightArray = metricHeightRange?.map(Number);

        const imperialHeightString = height.imperial;
        const imperialHeightRange = height.imperial.match(/(\d+(\.\d+)?)/g);
        const imperialHeightArray = imperialHeightRange?.map(Number);

        if (!metricWeightRange) {
          metricWeightString = imperialWeightRange?.map(weight => Math.ceil(Number(weight) * 0.453592))[0];
          metricWeightArray = imperialWeightRange?.map(weight => Math.ceil(Number(weight) * 0.453592));
        }
        const imageUrl = image.url;

        let temperamentArray = temperament ? temperament.split(", ") : [];
        temperamentArray = temperamentArray.map(item => item === 'Hard-working' ? 'Hardworking' : item);
        apiDogs.push({
          id: id,
          name: name,
          bredFor: bred_for || null,
          breedGroup: breed_group || null,
          lifeSpanString: life_span || null,
          minlifeSpan: lifeSpanArray[0] || null,
          maxlifeSpan: lifeSpanArray[1] || lifeSpanArray[0] || null,
          temperament: temperamentArray || null,
          origin: origin || null,
          metricWeightString: (metricWeightString + ' kg') || null,
          minMetricWeight: metricWeightArray[0] || null,
          maxMetricWeight: metricWeightArray[1] || metricWeightArray[0] || null,
          imperialWeightString: (imperialWeightString + ' lb') || null,
          minImperialWeight: imperialWeightArray[0] || null,
          maxImperialWeight: imperialWeightArray[1] || imperialWeightArray[0] || null,
          metricHeightString: (metricHeightString + ' cm') || null,
          minMetricHeight: metricHeightArray[0] || null,
          maxMetricHeight: metricHeightArray[1] || metricHeightArray[0] || null,
          imperialHeightString: (imperialHeightString + ' in') || null,
          minImperialHeight: imperialHeightArray[0] || null,
          maxImperialHeight: imperialHeightArray[1] || imperialHeightArray[0] || null,
          image: imageUrl || null,
          source: 'API'
        });
      }
    });
    const dogs = userDogs.concat(apiDogs);
    const orderedDogs = dogs.sort((a, b) => a.name.localeCompare(b.name));
    response.status(200).json(orderedDogs);
  } catch (error) {
    response.status(500).send('Error at searching dogs by name');
  }
}

module.exports = getDogsByName;