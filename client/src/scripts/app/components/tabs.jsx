import * as React from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem} from 'react-bootstrap';

class TabsComponent extends React.Component {
    render() {
        let tabs = this.props.tabs.map((tab) => {
            return <NavItem key={tab.ID} eventKey={tab.ID}>{tab.title}</NavItem>;
        });
        return (
            <Nav bsStyle="tabs" activeKey="1">
                {tabs}
            </Nav>
        );
    }
}

function ConnectTabs(state) {
    return {
        tabs: state.tabs.tabsList
    };
}

export default connect(ConnectTabs)(TabsComponent); 