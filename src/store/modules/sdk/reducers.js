import produce from 'immer';

const INITIAL_STATE = {
  sdk: null,
};

export default function sdk(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      default:
    }
  });
}
