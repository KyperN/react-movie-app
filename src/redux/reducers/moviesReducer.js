const init = { movies: [] };

export const moviesReducer = (state = init, action) => {
  switch (action.type) {
    case 'MOVIES_LOADED':
      return { ...state, movies: action.payload };
    case 'LOAD_MORE':
      console.log(state);
      return { ...state, movies: [...state.movies, ...action.payload] };
    case 'UPCOMING': {
      return { ...state, movies: action.payload };
    }
    case 'SEARCH': {
      return { ...state, search: action.payload };
    }
    default:
      return state;
  }
};
