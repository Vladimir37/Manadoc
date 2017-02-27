import * as React from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem} from 'react-bootstrap';

import store from '../store/store.jsx';

class TabsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(num) {
        let storeAction = {
            type: 'tab',
            act: 'select',
            num: num
        };
        store.dispatch(storeAction);
    }

    render() {
        let tabs = this.props.tabs.map((tab, index) => {
            return <NavItem key={index + 1} eventKey={index + 1}>
                {tab.title}
            </NavItem>;
        });
        return (
            <Nav bsStyle="tabs" activeKey={this.props.activeTab} onSelect={this.changeTab}>
                {tabs}
            </Nav>
        );
    }
}

function ConnectTabs(state) {
    return {
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectTabs)(TabsComponent); 