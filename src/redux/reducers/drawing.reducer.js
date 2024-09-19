const initialState = {
    images: [],
  };
  
  const drawingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPLOAD_IMAGE_SUCCESS':
        return { ...state, images: [...state.images, action.payload] };
      case 'GET_IMAGES_SUCCESS':
        return { ...state, images: action.payload };
      default:
        return state;
    }
  };
  
  export default drawingReducer;
  