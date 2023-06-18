import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import MovieServices from '../../services/MovieServices';
import {
  MoviesList,
  MovieTitle,
  ImgMovie,
  Item,
} from '../TrendingListMovie/TrendingList.styled';
import notFoundImg from '../../img/page_not_found.png';

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const movieServices = new MovieServices();

  useEffect(() => {
    if (!query) return;

    async function onRequest(query) {
      const res = await movieServices.getMovieSearch(query);

      setMovies(res);
    }
    onRequest(query);
  }, [query, location.state]);

  return (
    <MoviesList>
      {movies &&
        movies.map(({ id, title, image }) => {
          return (
            <Item key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {image ? (
                  <ImgMovie width={300} src={image} alt="" />
                ) : (
                  <ImgMovie
                    style={{ objectFit: 'cover', height: '450px' }}
                    src={notFoundImg}
                    alt=""
                  />
                )}

                <MovieTitle>{title}</MovieTitle>
              </Link>
            </Item>
          );
        })}
    </MoviesList>
  );
};

MovieList.propTypes = {
  query: PropTypes.string,
};

export default MovieList;