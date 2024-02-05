import './Filters.css'
import { filters, orderBy, orderDirection, searchTemperament } from '../../redux/actions';
import { orderByOptions, filterOptions, sourceOptions } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

export default function Filters() {
  const isAscending = useSelector((state) => state.isAscending);
  const selectedOrder = useSelector((state) => state.selectedOrder);
  const filterMinLifeSpan = useSelector((state) => state.filterMinLifeSpan);
  const filterMaxLifeSpan = useSelector((state) => state.filterMaxLifeSpan);
  const filterMinWeight = useSelector((state) => state.filterMinWeight);
  const filterMaxWeight = useSelector((state) => state.filterMaxWeight);
  const filterMinHeight = useSelector((state) => state.filterMinHeight);
  const filterMaxHeight = useSelector((state) => state.filterMaxHeight);
  const homeTemperamentSearch = useSelector((state) => state.homeTemperamentSearch);
  const homeSearchedTemperaments = useSelector((state) => state.homeSearchedTemperaments);
  const homeFilteredTemperaments = useSelector((state) => state.homeFilteredTemperaments);
  const homeFilteredSources = useSelector((state) => state.homeFilteredSources);
  const minValues = [filterMinLifeSpan, filterMinWeight, filterMinHeight];
  const maxValues = [filterMaxLifeSpan, filterMaxWeight, filterMaxHeight];
  const [isOrderFocused, setIsOrderFocused] = useState(false);
  const dispatch = useDispatch();

  const handleOrderDirection = () => {
    dispatch(orderDirection());
  }
  const handleOrderFocus = () => {
    setIsOrderFocused(true);
  }
  const handleOrderBlur = () => {
    setIsOrderFocused(false);
  }
  const handleOrderChange = (event) => {
    const { id } = event.target;
    dispatch(orderBy({ order: id, isAscending: isAscending }));
    setIsOrderFocused(false);
  }
  const handleSearch = (value) => {
    dispatch(searchTemperament(value, true));
  }
  const handleFilterChange = (event) => {
    const { id, value } = event.target;
    dispatch(filters({ name: id, value: value }));
    dispatch(orderBy({ order: selectedOrder, isAscending: isAscending }));
  }


  return (
    <div className='filters-container'>
      <label
        tabIndex={0}
        onBlur={() => setTimeout(handleOrderBlur, 100)}
        onClick={handleOrderFocus} >
        {orderByOptions.title}
      </label>
      <div className='order-by-button-container' key='selectedOrder' >
        <button
          className='order-by-button'
          key='selectedOrder'
          id='selectedOrder'
          onBlur={() => setTimeout(handleOrderBlur, 100)}
          onClick={handleOrderFocus} >
          {selectedOrder}
        </button>
        <button
          className='order-button'
          id='orderButton'
          onClick={handleOrderDirection} >
          {isAscending ? '🔼' : '🔽'}
        </button>
      </div>
      <div className={`order-by-options-container ${isOrderFocused ? '' : 'invisible'}`} key='order-list-container' >
        {orderByOptions.options.map((order) => {
          const orderByClassname = `order-by-options-button ${order === selectedOrder ? 'selected' : ''}`;
          return (
            <div className='order-by-options-button-div' key={order} >
              <button
                key={order}
                id={order}
                className={orderByClassname}
                onClick={handleOrderChange} >
                {order}
              </button>
            </div>
          );
        })}
      </div>
      <div className='number-filters-container' >
        {filterOptions.labels.map((label, i) => {
          return (
            <React.Fragment key={i}>
              <label
                className='filter-titles'
                htmlFor={filterOptions.minIds[i]} >
                {label}
              </label>
              <div className='filter-row'>
                <input
                  type='number'
                  key={filterOptions.minIds[i]}
                  id={filterOptions.minIds[i]}
                  placeholder={filterOptions.minPlaceholder}
                  value={minValues[i]}
                  onChange={handleFilterChange} />
                <label>-</label>
                <input
                  type='number'
                  key={filterOptions.maxIds[i]}
                  id={filterOptions.maxIds[i]}
                  placeholder={filterOptions.maxPlaceholder}
                  value={maxValues[i]}
                  onChange={handleFilterChange} />
                <button
                  id={filterOptions.clearIds[i]}
                  onClick={handleFilterChange} >
                  Clear
                </button>
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <label htmlFor='temperamentSearch' >Temperament</label>
      <div className='temperament-filter-list-div' >
        <input
          type='search'
          className='temperament-filter-list-button home-temperament-search'
          key='temperamentSearch'
          id='temperamentSearch'
          placeholder='Search'
          value={homeTemperamentSearch}
          onChange={(event) => handleSearch(event.target.value)} />
      </div>
      <div className='temperament-filter-list-container' key='temperament-filter-list-container' >
        <div className='temperament-filter-list-div' key={'temperament-filter-list-div'} >
          <button
            key='clearTemperaments'
            className='temperament-filter-list-button'
            id='clearTemperaments'
            onClick={handleFilterChange} >
            Any
          </button>
        </div>
        {homeSearchedTemperaments.map((temperament) => {
          const buttonClassName = `temperament-filter-list-button ${homeFilteredTemperaments.includes(temperament.name) ? 'selected' : ''}`;
          return (
            <div className='temperament-filter-list-div' key={temperament.id} >
              <button
                key={temperament.id}
                id='filterTemperaments'
                className={buttonClassName}
                value={temperament.name}
                onClick={handleFilterChange} >
                {temperament.name}
              </button>
            </div>
          );
        })}
      </div>
      <label htmlFor="clearSource">{sourceOptions.title}</label>
      <div className='temperament-filter-list-container' key='source-filter-list-container' >
        <div className='temperament-filter-list-div' >
          <button
            key='clearSource'
            className='temperament-filter-list-button'
            id='clearSource'
            onClick={handleFilterChange} >
            Any
          </button>
        </div>
        {sourceOptions.options.map((option, i) => {
          const buttonClassName = `temperament-filter-list-button ${homeFilteredSources.includes(option) ? 'selected' : ''}`;
          return (
            <div className='temperament-filter-list-div' key={sourceOptions.ids[i]} >
              <button
                key={sourceOptions.ids[i] + i}
                id='filterSources'
                className={buttonClassName}
                value={option}
                onClick={handleFilterChange} >
                {option}
              </button>
            </div>
          );
        })}
      </div>
      <button
        id='clearAll'
        className='clear-all-button'
        onClick={handleFilterChange} >
        Clear All
      </button>
    </div>
  )
}