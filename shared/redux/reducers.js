const _ = require('lodash');

export default function mainReducer(state, action) {
  switch (action.type) {
    case 'ADD_ALERT':
      let alerts = state.alerts || [];
      // add alert after removing duplicates
      alerts = alerts
        .filter(({ message }) => message !== action.alert.message)
        .concat(action.alert);
      return { ...state, alerts: (state.alerts || []).concat(action.alert) };

    case 'DISMISS_ALERT': {
      const alerts = state.alerts.filter(
        (a) => a.message !== action.alert.message,
      );
      return { ...state, alerts };
    }

    case 'isFetching':
      return {
        ...state,
        isFetching: { ...state.isFetching, ...action.payloaad },
      };

    case 'isRemoving':
      return {
        ...state,
        isRemoving: { ...state.isRemoving, ...action.payloaad },
      };

    case 'isUpdating':
      return {
        ...state,
        isUpdating: { ...state.isUpdating, ...action.payloaad },
      };

    case 'fetch': {
      if (!action.payload.append) return { ...state, [action.payload.dataType]: action.payload.value };
      const { dataType, value } = action.payload;
      let oldValues;
      if (dataType === "feed" || dataType === "news" || dataType === "project") {
        oldValues = state[dataType] || { count: 0, data: [] };
        return { ...state, [dataType]: { count: oldValues.count, data: oldValues.data?.concat(value.data) } };
      } else {
        oldValues = state[dataType] || [];
        return { ...state, [dataType]: oldValues.concat(value) };
      }

    }
    case 'update':
    case 'insert': {
      const { dataType, value } = action.payload;

      if (!value || !value._id) return state;
      let oldValues;

      if (dataType !== "feed" && dataType !== "news" && dataType !== "project") {
        oldValues = state[dataType] || [];
        const newValues = [value].concat(
          oldValues.filter((oldValue) => oldValue._id !== value._id),
        );
        return { ...state, [dataType]: newValues };
      } else {

        oldValues = state[dataType] || { count: 0, data: [] };
        const newValues = [value].concat(
          oldValues.data?.filter((oldValue) => oldValue._id !== value._id),
        );
        return { ...state, [dataType]: { count: oldValues.count, data: newValues } };
      }


    }

    case 'remove': {
      const { dataType, value } = action.payload;


      if (!value || !value._id) return state;
      let oldValues;
      if (dataType !== "feed" && dataType !== "news" && dataType !== "project") {
        oldValues = state[dataType] || [];
        return { ...state, [dataType]: oldValues.filter((oldValue) => oldValue._id !== value._id) };
      } else {
        oldValues = state[dataType] || { count: 0, data: [] };
        return { ...state, [dataType]: { count: oldValues.count, data: oldValues.data?.filter((oldValue) => oldValue._id !== value._id) } };
      }


    }
    default:
      if (action.error) {
        return _.merge(state, { error: action.payload });
      }
      return { ...state, ...action };
  }
}
