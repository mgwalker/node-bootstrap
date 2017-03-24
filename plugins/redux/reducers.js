import { Action } from '../actions';

const stateShape = { };

export default function reducer(state = stateShape, action) {
  let newState = state;

  switch (action.type) {
    case Action.actions.ACTION_1:
      newState = Object.assign(newState, { hello: 'world' });
      break;

    default:
      break;
  }

  return newState;
}
