import './Form.css';
import { useEffect, useState } from 'react';
import validation from './validation';
import { useDispatch, useSelector } from 'react-redux';
import { searchTemperament } from '../../redux/actions';
import shepard from '../../assets/shepard.png';
import borderCollie from '../../assets/borderCollie.png';
import spot from '../../assets/spot.png';
import bulldog from '../../assets/bulldog.png';
import variousDogs from '../../assets/variousDogs.png';
import axios from 'axios';

export default function Form() {
  const allDogs = useSelector((state) => state.filteredDogs);
  const metric = useSelector((state) => state.metric);
  const formFilteredTemperaments = useSelector((state) => state.formFilteredTemperaments);
  const formTemperamentSearch = useSelector((state) => state.formTemperamentSearch);
  const [dogData, setDogData] = useState({
    dogs: allDogs, metric: metric, name: '', bredFor: '', breedGroup: '', minlifeSpan: '',
    maxlifeSpan: '', origin: '', minWeight: '', maxWeight: '', minHeight: '', maxHeight: '', image: '', temperament: []
  })
  const [errors, setErrors] = useState({
    name: '', bredFor: '', breedGroup: '', minlifeSpan: '', maxlifeSpan: '', origin: '',
    minWeight: '', maxWeight: '', minHeight: '', maxHeight: '', image: '', temperament: ''
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setErrors(
      validation({
        ...dogData
      }, metric));
  }, [metric]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setDogData({
      ...dogData,
      [id]: value
    });
    setErrors(
      validation({
        ...dogData,
        [id]: value
      }, metric));
  }
  const handleSearch = (value) => {
    dispatch(searchTemperament(value, false));
  }
  const handleTemperamentSelect = (event, temperament) => {
    event.preventDefault();
    if (!dogData.temperament.includes(temperament)) {
      const updatedTemperaments = [...dogData.temperament, temperament];
      setDogData({
        ...dogData,
        temperament: [...updatedTemperaments]
      });
      setErrors(
        validation({
          ...dogData,
          temperament: updatedTemperaments
        }));
    }
  }
  const handleTemperamentDeSelect = (value) => {
    const updatedTemperaments = dogData.temperament.filter((element) => element !== value);
    setDogData({
      ...dogData,
      temperament: updatedTemperaments
    });
    setErrors(
      validation({
        ...dogData,
        temperament: updatedTemperaments
      }));
  }
  const handleCreateDog = async (event) => {
    event.preventDefault();
    const { name, bredFor, breedGroup, minlifeSpan, maxlifeSpan, origin, minWeight, maxWeight, minHeight, maxHeight, image, temperament } = dogData;

    const lifeSpanString = `${minlifeSpan} - ${maxlifeSpan} years`;

    let minMetricWeight, maxMetricWeight, metricWeightString, minImperialWeight, maxImperialWeight, imperialWeightString,
      minMetricHeight, maxMetricHeight, metricHeightString, minImperialHeight, maxImperialHeight, imperialHeightString;

    if (metric) {
      minMetricWeight = Math.floor(minWeight * 10) % 10 === 0 ? Math.floor(minWeight) : (minWeight).toFixed(1);

      minMetricHeight = Math.floor(minHeight * 10) % 10 === 0 ? Math.floor(minHeight) : (minHeight).toFixed(1);

      let imperialTemp = minWeight * 0.453592;
      minImperialWeight = Math.floor(imperialTemp * 10) % 10 === 0 ? Math.floor(imperialTemp) : (imperialTemp).toFixed(1);

      imperialTemp = minHeight * 2.54;
      minImperialHeight = Math.floor(imperialTemp * 10) % 10 === 0 ? Math.floor(imperialTemp) : (imperialTemp).toFixed(1);
      if (!maxWeight) {
        maxMetricWeight = minMetricWeight;
        metricWeightString = `${minMetricWeight} kg`;

        maxImperialWeight = minImperialWeight;
        imperialWeightString = `${minImperialWeight} lb`;
      } else {
        maxMetricWeight = Math.floor(maxWeight * 10) % 10 === 0 ? Math.floor(maxWeight) : (maxWeight).toFixed(1);
        metricWeightString = `${minMetricWeight} - ${maxMetricWeight} kg`;

        imperialTemp = maxWeight * 0.453592;
        maxImperialWeight = Math.floor(imperialTemp * 10) % 10 === 0 ? Math.floor(imperialTemp) : (imperialTemp).toFixed(1);
        imperialWeightString = `${minImperialWeight} - ${maxImperialWeight} lb`;
      }
      if (!maxHeight) {
        maxMetricHeight = minMetricHeight;
        metricHeightString = `${minMetricHeight} cm`;

        maxImperialHeight = minImperialHeight;
        imperialHeightString = `${minImperialHeight} in`;
      } else {
        maxMetricHeight = Math.floor(maxHeight * 10) % 10 === 0 ? Math.floor(maxHeight) : (maxHeight).toFixed(1);
        metricHeightString = `${minMetricHeight} - ${maxMetricHeight} cm`;

        imperialTemp = maxHeight * 2.54;
        maxImperialHeight = Math.floor(imperialTemp * 10) % 10 === 0 ? Math.floor(imperialTemp) : (imperialTemp).toFixed(1);
        imperialHeightString = `${minImperialHeight} - ${maxImperialHeight} in`;
      }
    } else {
      minImperialWeight = Math.floor(minWeight * 10) % 10 === 0 ? Math.floor(minWeight) : (minWeight).toFixed(1);

      minImperialHeight = Math.floor(minHeight * 10) % 10 === 0 ? Math.floor(minHeight) : (minHeight).toFixed(1);

      let metricTemp = minWeight * 2.20462;
      minMetricWeight = Math.floor(metricTemp * 10) % 10 === 0 ? Math.floor(metricTemp) : (metricTemp).toFixed(1);

      metricTemp = minHeight * 2.54;
      minMetricHeight = Math.floor(metricTemp * 10) % 10 === 0 ? Math.floor(metricTemp) : (metricTemp).toFixed(1);
      if (!maxWeight) {
        maxImperialWeight = minImperialWeight;
        imperialWeightString = `${minImperialWeight} lb`;

        maxMetricWeight = minMetricWeight;
        metricWeightString = `${minMetricWeight} kg`;
      } else {
        maxImperialWeight = Math.floor(maxWeight * 10) % 10 === 0 ? Math.floor(maxWeight) : (maxWeight).toFixed(1);
        imperialWeightString = `${minImperialWeight} - ${maxImperialWeight} lb`;

        metricTemp = maxWeight * 2.20462;
        maxMetricWeight = Math.floor(metricTemp * 10) % 10 === 0 ? Math.floor(metricTemp) : (metricTemp).toFixed(1);
        metricWeightString = `${minMetricWeight} - ${maxMetricWeight} kg`;
      }
      if (!maxHeight) {
        maxImperialHeight = minImperialHeight;
        imperialHeightString = `${minImperialHeight} in`;

        maxMetricHeight = minMetricHeight;
        metricHeightString = `${minMetricHeight} cm`;
      } else {
        maxImperialHeight = Math.floor(maxHeight * 10) % 10 === 0 ? Math.floor(maxHeight) : (maxHeight).toFixed(1);
        imperialHeightString = `${minImperialHeight} - ${maxImperialHeight} in`;

        metricTemp = maxHeight * 2.54;
        maxMetricHeight = Math.floor(metricTemp * 10) % 10 === 0 ? Math.floor(metricTemp) : (metricTemp).toFixed(1);
        metricHeightString = `${minMetricHeight} - ${maxMetricHeight} cm`;
      }
    }

    try {
      await axios.post(`https://dogs-api-web-app-production.up.railway.app/dogs`, {
        name, bredFor, breedGroup, lifeSpanString, minlifeSpan, maxlifeSpan, temperament, origin, metricWeightString,
        minMetricWeight, maxMetricWeight, imperialWeightString, minImperialWeight, maxImperialWeight, metricHeightString,
        minMetricHeight, maxMetricHeight, imperialHeightString, minImperialHeight, maxImperialHeight, image
      });
      setDogData({
        name: '', bredFor: '', breedGroup: '', origin: '', minlifeSpan: '', minWeight: '', maxWeight: '', minHeight: '',
        maxHeight: '', image: '', temperament: []
      });
      setErrors({
        name: '', bredFor: '', breedGroup: '', origin: '', lifeSpan: '', minlifeSpan: '', minWeight: '', maxWeight: '',
        minHeight: '', maxHeight: '', image: '', temperament: ''
      });
      window.alert('Dog breed created succesfully');
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  }
  return (
    <div className='form-master-container' >
      <img className='shepard-image' src={shepard} alt="german shepard png" />
      <img className='bulldog-image' src={bulldog} alt="bulldog png" />
      <img className='border-collie-image' src={borderCollie} alt="border collie png" />
      <img className='spot-image' src={spot} alt="spot png" />
      <form className='form' >
        <div className='form-container' >
          <img className='various-dogs-image' src={variousDogs} alt="variousDogs png" />
          <div className='form-two-columns' >
            <div className='form-two-column-column-one' >
              <label htmlFor='name'>Name <span>*</span></label>
              <div className='form-row' >
                {(() => {
                  const nameClassName = (dogData.name !== '' && !errors.name) ? 'correct' : '';
                  return (
                    <input
                      type='text'
                      className={nameClassName}
                      key='name'
                      id='name'
                      value={dogData.name}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p className='name-errors' >{errors.name}</p>
              </div>
              <label htmlFor='breedGroup'>Breed Group</label>
              <div className='form-row'>
                {(() => {
                  const breedGroupClassName = (dogData.breedGroup !== '' && !errors.breedGroup) ? 'correct' : '';
                  return (
                    <input
                      type='text'
                      className={breedGroupClassName}
                      key='breedGroup'
                      id='breedGroup'
                      value={dogData.breedGroup}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p>{errors.breedGroup && errors.breedGroup}</p>
              </div>
            </div>
            <div className='form-two-column-column-two' >
              <label htmlFor='bredFor'>Bred For</label>
              <div className='form-row' >
                {(() => {
                  const breedForClassName = (dogData.bredFor !== '' && !errors.bredFor) ? 'correct' : '';
                  return (
                    <input
                      type='text'
                      className={breedForClassName}
                      key='bredFor'
                      id='bredFor'
                      value={dogData.bredFor}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p>{errors.bredFor && errors.bredFor}</p>
              </div>
              <label htmlFor='origin'>Origin</label>
              <div className='form-row' >
                {(() => {
                  const originClassName = (dogData.origin !== '' && !errors.origin) ? 'correct' : '';
                  return (
                    <input
                      type='text'
                      className={originClassName}
                      key='origin'
                      id='origin'
                      value={dogData.origin}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p>{errors.origin && errors.origin}</p>
              </div>
            </div>
          </div>
          <label htmlFor='image'>Image URL</label>
          <div className='form-row' >
            {(() => {
              const imageClassName = (dogData.image !== '' && !errors.image) ? 'correct' : '';
              return (
                <input
                  type='url'
                  className={imageClassName}
                  key='image'
                  id='image'
                  value={dogData.image}
                  onChange={handleInputChange}
                />
              );
            })()}
            <p>{errors.image && errors.image}</p>
          </div>
          <label className='invisible' >Invisible</label><br />
          <label className='invisible' >Invisible</label>
          <div className='form-three-columns' >
            <div className='form-three-columns-column-one' >
              <label htmlFor='minlifeSpan'>Life Span (years)<span>*</span></label>
              <div className='form-row' >
                {(() => {
                  const minLifeSpanClassName = (dogData.minlifeSpan !== '' && !errors.minlifeSpan) ? 'correct' : '';
                  return (
                    <input
                      type='number'
                      className={minLifeSpanClassName}
                      key='minlifeSpan'
                      id='minlifeSpan'
                      placeholder='From'
                      value={dogData.minlifeSpan}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p className='min-life-span-errors' >{errors.minlifeSpan && errors.minlifeSpan}</p>
                <label>-</label>
                {(() => {
                  const maxlifeSpanClassName = (dogData.maxlifeSpan !== '' && !errors.maxlifeSpan) ? 'correct' : '';
                  return (
                    <input
                      type='number'
                      className={maxlifeSpanClassName}
                      key='maxlifeSpan'
                      id='maxlifeSpan'
                      placeholder='To'
                      value={dogData.maxlifeSpan}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p className='max-life-span-errors' >{errors.maxlifeSpan && errors.maxlifeSpan}</p>
              </div>
            </div>
            <div className='form-three-columns-column-two' >
              <label htmlFor='minWeight'>Weight ({metric ? 'kg' : 'lb'})<span>*</span></label>
              <div className='form-row' >
                {(() => {
                  const minWeightClassName = (dogData.minWeight !== '' && !errors.minWeight) ? 'correct' : '';
                  return (
                    <input
                      type='number'
                      className={minWeightClassName}
                      key='minWeight'
                      id='minWeight'
                      placeholder='From'
                      value={dogData.minWeight}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p className='min-weight-errors' >{errors.minWeight && errors.minWeight}</p>
                <label>-</label>
                {(() => {
                  const maxWeightClassName = (dogData.maxWeight !== '' && !errors.maxWeight) ? 'correct' : '';
                  return (
                    <input
                      type='number'
                      className={maxWeightClassName}
                      key='maxWeight'
                      id='maxWeight'
                      placeholder='To'
                      value={dogData.maxWeight}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p className='max-weight-errors' >{errors.maxWeight && errors.maxWeight}</p>
              </div>
            </div>
            <div className='form-three-columns-column-three' >
              <label htmlFor='minHeight'>Height ({metric ? 'cm' : 'in'})<span>*</span></label>
              <div className='form-row' >
                {(() => {
                  const minHeightClassName = (dogData.minHeight !== '' && !errors.minHeight) ? 'correct' : '';
                  return (
                    <input
                      type='number'
                      className={minHeightClassName}
                      key='minHeight'
                      id='minHeight'
                      placeholder='From'
                      value={dogData.minHeight}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p className='min-height-errors' >{errors.minHeight && errors.minHeight}</p>
                <label>-</label>
                {(() => {
                  const maxHeightClassName = (dogData.maxHeight !== '' && !errors.maxHeight) ? 'correct' : '';
                  return (
                    <input
                      type='number'
                      className={maxHeightClassName}
                      key='maxHeight'
                      id='maxHeight'
                      placeholder='To'
                      value={dogData.maxHeight}
                      onChange={handleInputChange}
                    />
                  );
                })()}
                <p className='max-height-errors' >{errors.maxHeight && errors.maxHeight}</p>
              </div>
            </div>
          </div>
          <div className='form-two-columns' >
            <div className='form-two-column-column-one' >
              <label htmlFor='temperament'>Temperaments <span>*</span> </label>
              <div className='form-row form-temperament-search-div' >
                <input type='search' key='temperament' id='temperament' placeholder='Search'
                  value={formTemperamentSearch} onChange={(event) => handleSearch(event.target.value)} />
                <p className='temperament-errors' >{errors.temperament && errors.temperament}</p>
              </div>
              <div className='form-temperament-list-container' key='form-temperament-list-container' >
                {formFilteredTemperaments.map((temperament) => {
                  const buttonClassName = `form-temperament-list-button ${dogData.temperament.includes(temperament.name) ? 'selected' : ''}`;
                  return (
                    <div className='form-temperament-list-div' key={`${temperament.id}-${temperament.name}`}>
                      <button
                        className={buttonClassName}
                        value={temperament.name}
                        onClick={(event) => handleTemperamentSelect(event, temperament.name)} >
                        {temperament.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='form-two-column-column-two form-selected-temperaments-div' >
              <label>Selected Temperaments</label>
              {dogData.temperament.map((temp) => {
                return (
                  <>
                    <div className='form-temperament-close-button-div' key={temp} >
                      <button
                        className='form-temperament-list-button form-temperament-close-button'
                        value={temp}
                        onClick={() => handleTemperamentDeSelect(temp)} >
                        {temp}
                      </button>
                      <span>x</span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className='create-dog-div' >
            <button className='create-dog-button' onClick={handleCreateDog} disabled={!dogData.name || errors.name || errors.bredFor
              || errors.breedGroup || errors.origin || errors.minlifeSpan || errors.maxlifeSpan || errors.minWeight || errors.maxWeight
              || errors.minHeight || errors.maxHeight || errors.image || errors.temperament} >CREATE DOG BREED</button>
          </div>
          <div className='white-footer' ></div>
        </div>
      </form>
    </div>
  )
}