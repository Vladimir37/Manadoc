import * as React from 'react';
import {Tabs} from './tabs.jsx';

export class Header extends React.Component {
    render() {
        return (
            <header>
                <Tabs/>
                <h1>Main title</h1>
            </header>
        );
    }
}
