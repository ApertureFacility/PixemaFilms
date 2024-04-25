import React, { useContext } from 'react';
import Pagination from '../Pagination/PaginationComp';
import MoviesList from '../MovieList/MoveList';
import { ThemeContext } from '../../themes/themeContext'; 
import './HomePage.css';

const HomePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className='home-page' style={{ background: theme.background, color: theme.foreground }}>
      <div className='containerСards' style={{ background: theme.background, color: theme.foreground }}>
        <div className='home-page__container'>
          <div className='home-page__main'>
            <div className='home-page__cards'>
              <div className='home-page__filters'>
              </div>
              <div className='CardsWrapper'style={{ background: theme.background, color: theme.foreground }}><MoviesList/>
              </div>
              <div className='home-page__pagination'>
                <Pagination 
                  itemsPerPage={1} 
                  totalItems={5} 
                  paginate={function (pageNumber: number): void {
                    throw new Error('Function not implemented.');
                  } }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
