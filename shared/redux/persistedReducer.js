const _ = require("lodash");

export default function mainReducer(state, action) {
  switch (action.type) {
    case "persist/REHYDRATE":
      return state;
    case "authLogin": {
      return { ...state, ...action };
    }
    case "authUpdate": {
      return { ...state, ...action.value };
    }
    case "userSettings": {
      return { ...state, ...action.payload };
    }

    default:
      if (!state) return {};
      return state;
  }
}
