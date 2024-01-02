import { SET_ALL_DOGS, SET_ALL_TEMPERAMENTS, SEARCH_DOG_BY_NAME, SELECT_DOGS_PER_PAGE, TOGGLE_METRIC, HOME_SEARCH_TEMPERAMENT, ORDER_BY, ORDER, FILTER, FORM_SEARCH_TEMPERAMENT, } from "./action-types"
import { orderByOptions, dogsPerPageOptions } from '../config';

const initialState = {
  allDogs: [],
  allTemperaments: [],
  homeNameSearch: '',
  searchedDogs: [],
  filteredDogs: [],
  selectedDogsPerPage: dogsPerPageOptions.default,
  selectedOrder: orderByOptions.default,
  isAscending: true,
  homeTemperamentSearch: '',
  homeSearchedTemperaments: [],
  homeFilteredTemperaments: [],
  metric: true,
  filterMinLifeSpan: '',
  filterMaxLifeSpan: '',
  filterMinWeight: '',
  filterMaxWeight: '',
  filterMinHeight: '',
  filterMaxHeight: '',
  homeFilteredSources: [],
  formTemperamentSearch: '',
  formFilteredTemperaments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_DOGS: {
      const orderedDogs = action.payload.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        allDogs: orderedDogs,
        searchedDogs: orderedDogs,
        filteredDogs: orderedDogs
      }
    }
    case SET_ALL_TEMPERAMENTS: {
      const orderedTemperaments = action.payload.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        allTemperaments: orderedTemperaments,
        homeSearchedTemperaments: orderedTemperaments,
      }
    }
    case SEARCH_DOG_BY_NAME:
      return {
        ...state,
        searchedDogs: action.payload.dogs,
        filteredDogs: action.payload.dogs,
        homeNameSearch: action.payload.search
      }
    case SELECT_DOGS_PER_PAGE:
      return {
        ...state,
        selectedDogsPerPage: action.payload
      }
    case TOGGLE_METRIC:
      state.metric = !state.metric;
      return {
        ...state
      }
    case HOME_SEARCH_TEMPERAMENT: {
      return {
        ...state,
        homeTemperamentSearch: action.payload.search,
        homeSearchedTemperaments: action.payload.temperaments,
      }
    }
    case ORDER: {
      state.isAscending = !state.isAscending;
      return {
        ...state,
        filteredDogs: [...state.filteredDogs].reverse()
      }
    }
    case ORDER_BY: {
      state.selectedOrder = action.payload.order;
      let orderByTemp = [...state.filteredDogs];
      switch (state.selectedOrder) {
        case 'Name':
          orderByTemp = orderByTemp.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'Minimum Life Span':
          orderByTemp = orderByTemp.sort((a, b) => a.minlifeSpan - b.minlifeSpan);
          break;
        case 'Maximum Life Span':
          orderByTemp = orderByTemp.sort((a, b) => a.maxlifeSpan - b.maxlifeSpan);
          break;
        case 'Minimum Weight':
          orderByTemp = orderByTemp.sort((a, b) => a.minMetricWeight - b.minMetricWeight);
          break;
        case 'Maximum Weight':
          orderByTemp = orderByTemp.sort((a, b) => a.maxMetricWeight - b.maxMetricWeight);
          break;
        case 'Minimum Height':
          orderByTemp = orderByTemp.sort((a, b) => a.minMetricHeight - b.minMetricHeight);
          break;
        case 'Maximum Height':
          orderByTemp = orderByTemp.sort((a, b) => a.maxMetricHeight - b.maxMetricHeight);
          break;
        default:
          break;
      }
      if (!action.payload.isAscending) {
        orderByTemp.reverse();
      }
      return {
        ...state,
        filteredDogs: [...orderByTemp]
      }
    }
    case FILTER: {
      const filterName = action.payload.name;
      const filterValue = action.payload.value;
      switch (filterName) {
        case 'filterMinLifeSpan':
          state.filterMinLifeSpan = filterValue;
          break;
        case 'filterMaxLifeSpan':
          state.filterMaxLifeSpan = filterValue;
          break;
        case 'filterMinWeight':
          state.filterMinWeight = filterValue;
          break;
        case 'filterMaxWeight':
          state.filterMaxWeight = filterValue;
          break;
        case 'filterMinHeight':
          state.filterMinHeight = filterValue;
          break;
        case 'filterMaxHeight':
          state.filterMaxHeight = filterValue;
          break;
        case 'filterTemperaments':
          if (state.homeFilteredTemperaments.includes(filterValue)) {
            state.homeFilteredTemperaments = state.homeFilteredTemperaments.filter((el) => el !== filterValue);
          } else {
            state.homeFilteredTemperaments.push(filterValue);
          }
          break;
        case 'filterSources':
          if (state.homeFilteredSources.includes(filterValue)) {
            state.homeFilteredSources = state.homeFilteredSources.filter((el) => el !== filterValue);
          } else {
            state.homeFilteredSources.push(filterValue);
          }
          break;
        case 'clearLifeSpan':
          state.filterMinLifeSpan = filterValue;
          state.filterMaxLifeSpan = filterValue;
          break;
        case 'clearWeight':
          state.filterMinWeight = filterValue;
          state.filterMaxWeight = filterValue;
          break;
        case 'clearHeight':
          state.filterMinHeight = filterValue;
          state.filterMaxHeight = filterValue;
          break;
        case 'clearTemperaments':
          state.homeFilteredTemperaments = [];
          break;
        case 'clearSource':
          state.homeFilteredSources = [];
          break;
        case 'clearAll':
          state.selectedOrder = orderByOptions.default;
          state.isAscending = true;
          state.filterMinLifeSpan = filterValue;
          state.filterMaxLifeSpan = filterValue;
          state.filterMinWeight = filterValue;
          state.filterMaxWeight = filterValue;
          state.filterMinHeight = filterValue;
          state.filterMaxHeight = filterValue;
          state.homeFilteredTemperaments = [];
          state.homeFilteredSources = [];
          break;
        default:
          break;
      }
      let filterTemp = [...state.searchedDogs];
      if (state.homeFilteredTemperaments.length > 0) {
        console.log(state.homeFilteredTemperaments);
        filterTemp = filterTemp.filter((dog) => {
          return dog.temperament.some((temperament) =>
            state.homeFilteredTemperaments.includes(temperament)
          );
        });
      }
      if (state.homeFilteredSources.length > 0) {
        filterTemp = filterTemp.filter((dog) => {
          if (state.homeFilteredSources.includes(dog.source)) {
            return dog;
          }
        });
      }
      if (state.filterMinLifeSpan > 0) {
        filterTemp = filterTemp.filter((dog) => dog.minlifeSpan >= state.filterMinLifeSpan);
      }
      if (state.filterMaxLifeSpan > 0) {
        filterTemp = filterTemp.filter((dog) => dog.maxlifeSpan <= state.filterMaxLifeSpan);
      }
      if (state.metric) {
        if (state.filterMinWeight > 0) {
          filterTemp = filterTemp.filter((dog) => dog.minMetricWeight >= state.filterMinWeight);
        }
        if (state.filterMaxWeight > 0) {
          filterTemp = filterTemp.filter((dog) => dog.maxMetricWeight <= state.filterMaxWeight);
        }
        if (state.filterMinHeight > 0) {
          filterTemp = filterTemp.filter((dog) => dog.minMetricHeight >= state.filterMinHeight);
        }
        if (state.filterMaxHeight > 0) {
          filterTemp = filterTemp.filter((dog) => dog.maxMetricHeight <= state.filterMaxHeight);
        }
      } else {
        if (state.filterMinWeight > 0) {
          filterTemp = filterTemp.filter((dog) => dog.minImperialWeight >= state.filterMinWeight);
        }
        if (state.filterMaxWeight > 0) {
          filterTemp = filterTemp.filter((dog) => dog.maxImperialWeight <= state.filterMaxWeight);
        }
        if (state.filterMinHeight > 0) {
          filterTemp = filterTemp.filter((dog) => dog.minImperialHeight >= state.filterMinHeight);
        }
        if (state.filterMaxHeight > 0) {
          filterTemp = filterTemp.filter((dog) => dog.maxImperialHeight <= state.filterMaxHeight);
        }
      }
      return {
        ...state,
        filteredDogs: [...filterTemp]
      }
    }
    case FORM_SEARCH_TEMPERAMENT: {
      let temperamentList;
      if (action.payload.search === '') {
        temperamentList = [];
      } else {
        temperamentList = action.payload.temperaments;
        const newInput = {
          id: 200,
          name: action.payload.search
        }
        temperamentList.unshift(newInput);
      }
      return {
        ...state,
        formFilteredTemperaments: temperamentList,
        formTemperamentSearch: action.payload.search
      }
    }
    default:
      return state;
  }
};
export default reducer;