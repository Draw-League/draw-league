const winnersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WINNERS':
      return action.payload;
    default:
      return state;
  }
};
  
  export default winnersReducer;
  