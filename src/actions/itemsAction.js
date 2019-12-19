import * as types from '../constants/actionTypes';

export const get_all_items = () => {
  return dispatch => {
    dispatch(get_items_successful());
  }
}

const get_items_successful = () => {
  return { type: types.GET_ALL_ITEMS_SUCCESS };
}

export const edit_item = (data) => {
  return { type: types.EDIT_ITEM, data: data };
}

export const remove_item = (data) => {
  return { type: types.REMOVE_ITEM, data: data};
}
