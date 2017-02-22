import * as React from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';

class PanelComponent extends React.Component {
    render() {
        let panelElement = null;
        if (this.props.tabs[this.props.activeTab].type != 'main') {
            panelElement = <Jumbotron className="side-panel"></Jumbotron>;
        }
        return panelElement;
    }
}

function ConnectPanel(state) {
    return {
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectPanel)(PanelComponent); 