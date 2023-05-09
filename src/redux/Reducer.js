const initialState = {
  layout: false,
  labelData: [],
  toggle: false,
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
    case 'Toggle': {
      return {...state, toggle: !state.toggle};
    }
    default:
      return state;
  }
};
