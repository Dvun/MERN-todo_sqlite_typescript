import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import rootReducer, {RootState} from './rootState'


const store = configureStore({
  reducer: rootReducer
});

if (process.env.NODE_ENV === 'development') {
  const newRootReducer = require('./rootState').default
  store.replaceReducer(newRootReducer)
}


export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null,  Action<string>>
export default store