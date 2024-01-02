import { useSelector } from 'react-redux';
import './Card.css';
import { NavLink } from 'react-router-dom';

export default function Card({ id, name, lifeSpan, temperament, metricWeight, imperialWeight, metricHeight, imperialHeight, image }) {
  const metric = useSelector((state) => state.metric);

  return (
    <div className='card-container-div'>
      <NavLink to={`/detail/${id}`} >
        <h2>{name}</h2>
        <h3>{lifeSpan}</h3>
        {(metric) ? (
          <>
            <h3>{metricWeight}</h3>
            <h3>{metricHeight}</h3>
          </>
        ) : (
          <>
            <h3>{imperialWeight}</h3>
            <h3>{imperialHeight}</h3>
          </>
        )}
        <h4>{temperament.join(', ')}</h4>
        <div className='image-div' >
          <img className='card-image' src={image} alt={name} />
        </div>
      </NavLink>
    </div>
  );
}
