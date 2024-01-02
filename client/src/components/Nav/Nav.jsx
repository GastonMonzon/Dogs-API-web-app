import './Nav.css';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogsPerPage, filters, searchByName, toggleMetric } from "../../redux/actions";
import { dogsPerPageOptions } from '../../config';
import React, { useState } from 'react';
import axios from 'axios';

export default function Nav() {
  const homeSearchInput = useSelector((state) => state.homeSearchInput);
  const selectedDogsPerPage = useSelector((state) => state.selectedDogsPerPage);
  const metric = useSelector((state) => state.metric);
  const [isDogsPerPageFocused, setIsDogsPerPageFocused] = useState(false);
  const [idSearchInput, setIdSearchInput] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (value) => {
    dispatch(searchByName(value));
  }
  const handleIDChange = (value) => {
    setIdSearchInput(value);
  }
  const handleIDSearch = async (dogId) => {
    if (dogId !== '') {
    try {
      const { data } = await axios(`http://localhost:3001/dogs/${dogId}`);
      if (data.name) {
        navigate(`detail/${dogId}`);
      }
    } catch (error) {
        window.alert('¡No hay personajes con este ID!');
        console.error(error);
    }
  }
}

  const handleDogsPerPageFocus = () => {
    setIsDogsPerPageFocused(true);
  }
  const handleDogsPerPageBlur = () => {
    setIsDogsPerPageFocused(false);
  }
  const handleDogsPerPage = (event) => {
    const { value } = event.target;
    dispatch(dogsPerPage(value));
    setIsDogsPerPageFocused(false);
  }
  const handleToggleMetric = () => {
    dispatch(toggleMetric());
    dispatch(filters({ name: '', value: '' }));
  }

  return (
    <>
      {location.pathname !== '/' && (
        <nav className="nav-bar" >
          <NavLink to='/home'>
            <button className='home-button' >Home</button>
          </NavLink>
          {location.pathname !== '/createdog' && (
            <NavLink to='/createdog'>
              <button className='menu-button' >Create Dog Breed</button>
            </NavLink>
          )}
          {location.pathname === '/home' && (
            <>
              <input className='homeSearch' type="search" name="search" placeholder="Search Name" value={homeSearchInput} onChange={(event) => handleSearch(event.target.value)} />
              <input className='homeIdSearch' type="number" name="search" placeholder="ID" value={idSearchInput}
                onChange={(event) => handleIDChange(event.target.value)} />
              <button  className='search-id-button' onClick={() => handleIDSearch(idSearchInput)} >Search</button>
            </>
          )}
          <div className='nav-right-buttons-container' >
            {location.pathname === '/home' && (
              <div className='dogs-per-page-container'
                tabIndex={0}
                onBlur={() => setTimeout(handleDogsPerPageBlur, 150)}
                onClick={handleDogsPerPageFocus}>
                <label>
                  {dogsPerPageOptions.title}
                </label>
                <button
                  className='dogs-per-page-button'
                  key='selectedDogsPerPage'
                  id='selectedDogsPerPage'
                  onBlur={() => setTimeout(handleDogsPerPageBlur, 150)}
                  onClick={handleDogsPerPageFocus} >
                  {selectedDogsPerPage}
                </button>
              </div>)}
            <div className={`dogs-per-page-options-container ${isDogsPerPageFocused ? '' : 'invisible'}`} key='dogs-per-page-options-container' >
              {dogsPerPageOptions.options.map((perPage) => {
                const dogsPerPageClassName = `dogs-per-page-options-button ${perPage === selectedDogsPerPage ? 'selected-dogs-per-page' : ''}`;
                return (
                  <React.Fragment key={perPage}>
                    <div>
                      <button
                        key={perPage}
                        id={perPage}
                        className={dogsPerPageClassName}
                        value={perPage}
                        onClick={handleDogsPerPage} >
                        {perPage}
                      </button>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
            {(location.pathname === '/home' || (/^\/detail\/\d+$/).test(location.pathname) || location.pathname === '/createdog') && (<button
              className='toggle-metric-button'
              onClick={handleToggleMetric} >
              Toggle To {metric ? 'Imperial' : 'Metric'}
            </button>)}
          </div>
        </nav>
      )}
    </>
  );
}