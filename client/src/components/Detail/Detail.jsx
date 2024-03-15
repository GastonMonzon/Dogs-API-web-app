import { useParams } from 'react-router-dom';
import './Detail.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Detail() {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const metric = useSelector((state) => state.metric);

  useEffect(() => {
    fetch(`https://dogs-api-web-app-production.up.railway.app/dogs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data.bredFor = data.bredFor.split(',');
        // data.temperament = data.temperament.join(', ');
        setDog(data);
      })
      .catch((error) => {
        console.error('Error fetching dog details:', error);
      });
  }, [id]);

  return (
    <div className='detail-container' >
      <h2>{dog.name}</h2>
      <div className="detail-info">
        <table>
          <tbody>
            {dog.bredFor && (
              <tr>
                <th>Bred For:</th>
                <td colSpan="2">
                  {dog.bredFor.map((bred) => (
                    <div key={bred}>{bred}</div>
                  ))}
                </td>
              </tr>
            )}
            {dog.breedGroup && (
              <tr>
                <th>Breed Group:</th>
                <td>{dog.breedGroup}</td>
              </tr>
            )}
            {dog.lifeSpanString && (
              <tr>
                <th>lifeSpan:</th>
                <td>{dog.lifeSpanString}</td>
              </tr>
            )}
            {dog.origin && (
              <tr>
                <th>Origin:</th>
                <td>{dog.origin}</td>
              </tr>
            )}
            {dog.metricWeightString && (
              <tr>
                <th>Weight:</th>
                <td>{metric ? dog.metricWeightString : dog.imperialWeightString}</td>
              </tr>
            )}
            {dog.metricHeightString && (
              <tr>
                <th>Height:</th>
                <td>{metric ? dog.metricHeightString : dog.imperialHeightString}</td>
              </tr>
            )}
            <tr>
              <th>Temperaments:</th>
              <td colSpan="2">
                {dog.temperament && dog.temperament.map((temp) => (
                  <div key={temp}>{temp}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <img className='dog-image' src={dog.image} alt={dog.name} />
    </div>
  )
}