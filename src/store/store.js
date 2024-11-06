import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

const loggerMiddleware = store => next => action => {

    console.log('loggerMiddleware works');

    if(!action.type){
        return next(action);
    }

    console.log('type ', action.type);
    console.log('payload ', action.payload);
    console.log('currentState ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
}

const persistConfig = {
    key: 'root',
    storage,
    //blacklist: ['user']
    whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleWares = [
//     process.env.NODE_ENV === 'development' && loggerMiddleware,
//     thunk
// ].filter(Boolean);

const middleWares = [
    process.env.NODE_ENV === 'development' && loggerMiddleware,
    sagaMiddleware
].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);