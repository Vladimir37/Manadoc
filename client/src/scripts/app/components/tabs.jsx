import * as React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {store} from '../store/store.jsx';

export class Tabs extends React.Component {
    render() {
        console.log(store);
        console.log(store.getState());
        let tabs = store.getState().tabs.tabsList;
        let tabsHTML = tabs.map((tab, index) => {
            return <NavItem key={{index}}>{tab.title}</NavItem>
        })
        return (
            <Nav bsStyle="tabs" activeKey="0">
                {tabsHTML}
            </Nav>
        );
    }
}
