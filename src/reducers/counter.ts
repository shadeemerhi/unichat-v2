const initialState: number = 0;

const counterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

export default counterReducer;
