import './Landing.css'
import firstLandingBackground from '../../assets/firstLandingBackground.mp4'
import secondLandingBackground from '../../assets/secondLandingBackground.mp4'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {

  useEffect(() => {
    const labelElement = document.querySelector('.titleSequence');
    const videoElement = document.querySelector('.background-video');
    const background = document.querySelector('.title-container');
    const secondVideoElement = document.querySelector('.second-background-video');
    const enterButton = document.querySelector('.enter-button');

    setTimeout(() => {
      labelElement.classList.add('first-label-transition');
      videoElement.classList.add('first-video-transition');
    }, 7000);
    setTimeout(() => {
      labelElement.classList.add('second-label-transition');
      background.classList.add('background-transition')
    }, 7500);
    setTimeout(() => {
      background.classList.add('second-background-transition')
      labelElement.classList.add('third-label-transition');
    }, 8000);
    setTimeout(() => {
      labelElement.classList.add('text-blur-out');
      secondVideoElement.classList.add('video-blur-in');
      enterButton.classList.add('enter-button-blur-in');
    }, 9000);
  }, []);

  return (
    <>
      <video className="background-video" autoPlay loop muted>
        <source src={firstLandingBackground} type="video/mp4" />
      </video>
      <div className='title-container' >
        <label className='titleSequence scale-down-center' >DOGS</label>
      </div>
      <video className="second-background-video" autoPlay loop muted>
        <source src={secondLandingBackground} type="video/mp4" />
      </video>
      <Link to={'/home'}>
        <button className='enter-button' >Enter</button>
      </Link>
    </>
  );
}