import * as React from 'react';
import {Provider} from 'react-redux';
import Tabs from './tabs.jsx';
import {store} from '../store/store.jsx';

export class Header extends React.Component {
    render() {
        return (
            <header>
                <Provider store={store}>
                    <Tabs/>
                </Provider>
            </header>
        );
    }
}
