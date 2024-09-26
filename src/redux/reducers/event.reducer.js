

const createEventReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EVENT':
        return action.payload;
      default:
        return state;
    }
  };
  
  const getEventReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EVENTS':
        return action.payload;
      default:
        return state;
    }
  };

  // user will be on the redux state at:
  // state.user
  export default createEventReducer;
  