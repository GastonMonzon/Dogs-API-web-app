import './Home.css';
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import Filters from '../Filters/Filters';
import { useEffect, useState } from 'react';

export default function Home() {
  const allDogs = useSelector((state) => state.filteredDogs);
  const selectedDogsPerPage = useSelector((state) => state.selectedDogsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const parsedDogsPerPage = Number(selectedDogsPerPage);
  const finalIndex = currentPage * parsedDogsPerPage;
  const initialIndex = finalIndex - parsedDogsPerPage;
  const dogs = (allDogs.slice(initialIndex, finalIndex));
  const nPages = Math.ceil(allDogs.length / parsedDogsPerPage);

  useEffect(() => {
    if (currentPage > nPages) {
      setCurrentPage(1);
    }
  }, [currentPage, nPages]);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  const selectPage = (event) => {
    setCurrentPage(Number(event.target.id));
  }

  return (
    <>
      <div className='filters-container' >
        <Filters />
      </div>
      <div className='info-container' >
        <Cards dogs={selectedDogsPerPage === 'All' ? allDogs : dogs} />
        <div className='pages-selector' >
          {(() => {
            const previousClassName = (currentPage === 1 || selectedDogsPerPage === 'All') ? 'invisible' : '';
            return (
              <button className={previousClassName} onClick={previousPage} >Prev</button>
            );
          })()}
          {Array.from({ length: nPages }, (_, i) => (
            <button className={currentPage === i + 1 ? 'selected' : 'page-button'}
            key={i} id={i + 1} onClick={selectPage} >{i + 1}</button>
          ))}
          {(() => {
            const nextClassName = (currentPage === nPages || nPages === 0 || selectedDogsPerPage === 'All') ? 'invisible' : '';
            return (
              <button className={nextClassName} onClick={nextPage} >Next</button>
            );
          })()}
        </div>
      </div>
    </>
  );
}