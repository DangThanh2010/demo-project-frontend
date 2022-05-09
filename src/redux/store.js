import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import sagas from './sagas';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };