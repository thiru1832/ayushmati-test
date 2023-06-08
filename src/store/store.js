import { legacy_createStore as createStore } from "redux";
import userLoginReducer from "../reducers/userReducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig ={
    key :'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,userLoginReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)


export default store;
export {persistor}