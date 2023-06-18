import axios from 'axios';

class MovieServices {
  API_KEY = '8dbbaf50b58201a2d3381e6f92e0ca1f';
  BASE_URL = 'https://api.themoviedb.org/3/';
  BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500';

  getTrendingMovies = async () => {
    try {
      const res = await axios.get(
        `${this.BASE_URL}trending/movie/day?api_key=${this.API_KEY}`
      );

      return this._transformTrendingMovies(res.data.results);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  getMovieDetalis = async id => {
    try {
      const res = await axios.get(
        `${this.BASE_URL}movie/${id}?api_key=${this.API_KEY}&language=en-US`
      );

      return this._transformMovieDetalis(res.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getCastOrReviewsMovie = async (id, categorie) => {
    try {
      const res = await axios.get(
        `${this.BASE_URL}movie/${id}/${categorie}?api_key=${this.API_KEY}&language=en-US`
      );
      if (categorie === 'credits') {
        return this._transformCastMovie(res.data.cast);
      }
      if (categorie === 'reviews') {
        if (!res.data.results.length) {
          return null;
        } else {
          return this._transformReviewsMovie(res.data.results);
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getMovieSearch = async query => {
    try {
      const res = await axios.get(
        `${this.BASE_URL}search/movie?api_key=${this.API_KEY}&language=en-US&include_adult=false&query=${query}`
      );

      return this._transformMovie(res.data.results);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  _transformMovie = movies => {
    return movies.map(({ id, title, poster_path }) => {
      if (!poster_path) {
        return {
          title,
          image: null,
          id,
        };
      }
      return {
        id,
        title,
        image: `${this.BASE_URL_IMG}${poster_path}`,
      };
    });
  };

  _transformMovieDetalis = ({
    title,
    poster_path,
    overview,
    genres,
    vote_average,
  }) => {
    if (!poster_path) {
      return {
        title,
        image: null,
        overview,
        genres,
        userScore: vote_average,
      };
    }
    return {
      title,
      image: `${this.BASE_URL_IMG}${poster_path}`,
      overview,
      genres,
      userScore: vote_average,
    };
  };

  _transformCastMovie = cast => {
    return cast.map(({ character, name, profile_path, id }) => {
      if (!profile_path) {
        return {
          character,
          name,
          id,
          image: null,
        };
      }
      return {
        character,
        name,
        id,
        image: `${this.BASE_URL_IMG}${profile_path}`,
      };
    });
  };

  _transformReviewsMovie = reviews => {
    return reviews.map(({ author, id, content }) => {
      return { author, id, content };
    });
  };

  _transformTrendingMovies = movies => {
    return movies.map(({ id, title, poster_path }) => {
      return {
        id,
        title,
        images: `${this.BASE_URL_IMG}${poster_path}`,
      };
    });
  };
}

export default MovieServices;