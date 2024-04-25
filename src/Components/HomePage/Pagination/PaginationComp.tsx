import React, { useContext } from 'react';
import './Pagination.css'
import { connect } from 'react-redux';
import { fetchMovies } from '../../Redux/Actions/Actions';
import { ThemeContext } from '../../themes/themeContext'; // замените на путь к вашему ThemeContext
import { useNavigate } from "react-router-dom";

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  searchTerm: string;
  fetchMovies: (searchTerm: string, year?: string, genre?: string, page?: number) => void;
  paginate: (pageNumber: number) => void; 
};

const Pagination: React.FunctionComponent<PaginationProps> = ({ itemsPerPage, totalItems, searchTerm, fetchMovies }) => {
  const { theme } = useContext(ThemeContext);
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageNumberLimit] = React.useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = React.useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = React.useState(0);

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const navigate = useNavigate();
  const paginate = (pageNumber: number) => {
    fetchMovies(searchTerm, undefined, undefined, pageNumber);
    setCurrentPage(pageNumber);
    
    // Добавьте номер страницы в URL-адрес
    navigate(`/?page=${pageNumber}`);
  };

  const renderPageNumbers = pageNumbers.map(number => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number} className='page-item'>
          <a 
            onClick={(e) => {
              e.preventDefault();
              paginate(number);
            }} 
            href='!#' 
            className='page-link'
            style={currentPage === number ? { backgroundColor: '#7b61ff', color: 'violet' } : {}}
          >
            {number}
          </a>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> … </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> … </li>;
  }

  return (
    <nav>
      <ul className='pagination' style={{ background: theme.background, color: theme.foreground }}>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
      </ul>
    </nav>
  );
};


const mapStateToProps = (state:any) => ({
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);