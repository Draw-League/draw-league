
const currentGame = (state = {}, action) => {
  if (action.type === 'UPDATE_CURRENT_GAME') {
    return action.payload;
  } else if (action.type === 'ADD_WINNERS_TO_CURRENT_GAME') {
    return {...state, ...action.payload};
  } else if (action.type === 'EDIT_CURRENT_GAME') {
      return {...state, ...action.payload};
  }
  return state;
}

// switch (action.type) {
//     case 'UPDATE_CURRENT_GAME':
//       return action.payload;
//     default:
//       return state;
//   }
// };

export default currentGame;
