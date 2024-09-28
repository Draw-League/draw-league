
const getRefsReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_REFS':
        return action.payload;
      default:
        return state;
    }
  };

  export default getRefsReducer;