import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import store from './app/store/store.jsx';
import {Main} from './app/pages/main.jsx';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='*' component={Main}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
