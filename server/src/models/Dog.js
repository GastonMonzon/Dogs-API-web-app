const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bredFor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    breedGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lifeSpanString: {
      type: DataTypes.STRING,
      allowNull: true
    },
    minlifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxlifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    temperament: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metricWeightString: {
      type: DataTypes.STRING,
      allowNull: true
    },
    minMetricWeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    maxMetricWeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    imperialWeightString: {
      type: DataTypes.STRING,
      allowNull: true
    },
    minImperialWeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    maxImperialWeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    metricHeightString: {
      type: DataTypes.STRING,
      allowNull: true
    },
    minMetricHeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    maxMetricHeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    imperialHeightString: {
      type: DataTypes.STRING,
      allowNull: true
    },
    minImperialHeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    maxImperialHeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source: {
    type: DataTypes.ENUM('API', 'User'),
    allowNull: false
  }
  }, { timestamps: false }
  );
};
