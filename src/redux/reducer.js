const initialState = {
	movies:[],
	favorite:[]
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_MOVIES':
			return {
				...state,
				movies: [...action.payload]
				
			};
			case 'ADD_FAVORITE':
				const repeatID = state.favorite.find((item)=> item.imdbID === action.payload.imdbID);
				return  repeatID ? state : { ...state, favorite: [...state.favorite, action.payload]};

			case 'DELETE_FAVORITE':
			return {
				...state,
				favorite: state.favorite.filter(current => current.imdbID !== action.payload.imdbID)
			};
		
		default:
			return state;
	}
};

export default reducer;


