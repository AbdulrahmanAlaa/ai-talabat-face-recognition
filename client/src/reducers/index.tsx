// src/js/reducers/index.js
import { ADD_ARTICLE } from '../constants/action-types';
const initialState: any = {
  articles: []
};
function rootReducer(state = initialState, action: any) {
  if (action.type === ADD_ARTICLE) {
    return {...initialState,...action.payload};
  }
  return state;
}
