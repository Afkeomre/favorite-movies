export const getYear = (movie) => {
  return movie.release_date ? movie.release_date.slice(0, 4) : 'release date missing';
};

export const getCountry = (movie) => {
  if (movie.production_countries && movie.production_countries.length !== 0) {
    return movie.production_countries[0].name;
  } else {
    return 'No country data';
  }
};

export const getPoster = (movie) => {
  return movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/img/default-poster.jpg';
};

export const getBackdrop = (movie) => {
  return movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/img/default-backdrop.jpg';
};

export const getRating = (movie) => {
  return movie.rating === 0 ? 'Not set yet(' : movie.rating;
};
