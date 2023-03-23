const initialState = {
  layout: false,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LAYOUT':
      return {
        ...state,
        layout: !state.layout,
      };
    default:
      return state;
  }
};
