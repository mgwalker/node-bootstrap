export const Action = {
  actions: {
    ACTION_1: 'action string'
  },
  doAction1(data) {
    return { type: Action.actions.ACTION_1, value: data };
  }
};

export default {
  Action
};
