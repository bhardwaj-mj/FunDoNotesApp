const initialState = {
  layout: false,
  labelData: [],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LAYOUT':
      return {
        ...state,
        layout: !state.layout,
      };
    case 'LabelsData':
      return {
        ...state,
        labelData: action.payload,
      };
    default:
      return state;
  }
};
