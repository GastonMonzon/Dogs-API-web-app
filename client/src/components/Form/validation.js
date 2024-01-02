export default function validation(input, metric) {
  const errors = {};
  if (!input.name) {
    errors.name = 'Name cannot be empty';
  }
  else {
    const foundDog = input.dogs.find(dog => dog.name === input.name);
    if (foundDog) {
      errors.name = 'Name already exists';
    }
  }
  if (input.minlifeSpan < 1) {
    errors.minlifeSpan = 'Minimum life span must be greater than 0';
  }
  if (input.minlifeSpan >= input.maxlifeSpan && input.maxlifeSpan !== '') {
    errors.maxlifeSpan = 'Maximum life span must be greater than minimum life span'
  }
  if (input.minlifeSpan > 35) {
    errors.minlifeSpan = 'Minimum life span must be less than 35'
  }
  if (input.maxlifeSpan > 35) {
    errors.maxlifeSpan = 'Maximum life span must be less than 35'
  }
  if (input.minWeight < 1) {
    errors.minWeight = 'Minimum weight must be greater than 0';
  }
  if (input.minWeight >= input.maxWeight && input.maxWeight !== '') {
    errors.maxWeight = 'Maximum weight must be greater than minimum weight'
  }
  if (input.minHeight < 1) {
    errors.minHeight = 'Minimum height must be greater than 0';
  }
  if (input.minHeight >= input.maxHeight && input.maxHeight !== '') {
    errors.maxHeight = 'Maximum height must be greater than minimum height'
  }
  if (metric) {
    if (input.minWeight > 170) {
      errors.minWeight = 'Minimum weight must be less than 200'
    }
    if (input.maxWeight > 170) {
      errors.maxWeight = 'Maximum weight must be less than 200'
    }
    if (input.minHeight > 100) {
      errors.minHeight = 'Minimum height must be less than 100'
    }
    if (input.maxHeight > 100) {
      errors.maxHeight = 'Maximum height must be less than 100'
    }
  } else {
    if (input.minWeight > 350) {
      errors.minWeight = 'Minimum weight must be less than 350'
    }
    if (input.maxWeight > 350) {
      errors.maxWeight = 'Maximum weight must be less than 350'
    }
    if (input.minHeight > 40) {
      errors.minHeight = 'Minimum height must be less than 40'
    }
    if (input.maxHeight > 40) {
      errors.maxHeight = 'Maximum height must be less than 40'
    }
  }
  if (input.temperament.length === 0) {
      errors.temperament = 'At least 1 temperment must be selected'
  }
  return errors;
}