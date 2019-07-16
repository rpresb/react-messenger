import React from 'react';
import AppRouter from './AppRouter';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

function App() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
