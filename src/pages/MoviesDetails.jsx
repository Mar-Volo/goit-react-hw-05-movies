import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import MovieServices from '../services/MovieServices.js';
import {
  WrapperContent,
  Content,
  GenresList,
  BtnGoBack,
  ListCastReviews,
  Item,
  StyledLink,
  Container,
  DivMain,
} from './MovieDetalis.styled';

const MoviesDetalis = () => {
  const { movieId } = useParams();
  const [movieDetalis, setMovieDetalis] = useState([]);
  const location = useLocation();
  const movieServices = new MovieServices();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    onRequest(movieId);
    // eslint-disable-next-line
  }, []);

  const onRequest = async id => {
    try {
      const res = await movieServices.getMovieDetalis(id);
      setMovieDetalis(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { title, image, overview, genres, userScore } = movieDetalis;

  return (
    <main>
      <WrapperContent>
        {image && <img width={250} src={image} alt={title} />}
        <Content>
          <h1>{title}</h1>
          <p>User score: {(userScore * 10).toFixed(0)}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres: </h2>
          <GenresList>
            {genres && genres.map(({ name, id }) => <li key={id}>{name}</li>)}
          </GenresList>
        </Content>
      </WrapperContent>
      <BtnGoBack>
        <Link to={backLinkHref}>Go back </Link>
      </BtnGoBack>
      <DivMain>
        <Container>
          <ListCastReviews>
            <Item>
              <StyledLink to="cast" state={location.state}>
                See the cast
              </StyledLink>
            </Item>
            <Item>
              <StyledLink to="reviews" state={location.state}>
                Read reviews
              </StyledLink>
            </Item>
          </ListCastReviews>
        </Container>
      </DivMain>

      <Suspense
        fallback={
          <div>
            <MutatingDots
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MoviesDetalis;