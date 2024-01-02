import './NotFound.css';
import computerDog from '../../assets/computerDog.png';
import crazyPug from '../../assets/crazyPug.png';
import liningDog from '../../assets/liningDog.png';
import pawDog from '../../assets/pawDog.png';
import liningGolden from '../../assets/liningGolden.png';
import swirlingArrow from '../../assets/swirlingArrow.png';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  const notFoundTitle = "It appears the page you're looking for doesn't exist";
  const notFoundFirstSentence = "Don't worry, you can click the ⬅️ arrow on your browser to go back"
  const notFoundFirstSecondSentence = "Or click this button here to go to home"
  return (
    <div className='not-found-container'>
      <h3>{notFoundTitle}</h3>
      <p>{notFoundFirstSentence}</p>
      <p>{notFoundFirstSecondSentence}</p>
      <span>⬇️</span>
      <NavLink to='/home'>
        <button >Home</button>
      </NavLink>
      <p>Or this ones</p>
      <img className='computer-dog' src={computerDog} alt='computerDog' />
      <img className='crazy-pug' src={crazyPug} alt='crazyPug' />
      <img className='lining-dog' src={liningDog} alt='liningDog' />
      <img className='lining-golden' src={liningGolden} alt='liningGolden' />
      <img className='paw-dog' src={pawDog} alt='pawDog' />
      <img className='swirling-arrow' src={swirlingArrow} alt='swirlingArrow' />
    </div>
  )
}