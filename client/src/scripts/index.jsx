import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import {Main} from './app/pages/main.jsx';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='*' component={Main}/>
    </Router>,
    document.getElementById('root')
);
