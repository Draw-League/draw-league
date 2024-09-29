
const currentGame = (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_CURRENT_GAME':
        return action.payload;
      default:
        return state;
    }
  };

  export default currentGame;