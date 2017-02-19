import * as React from 'react';
import {connect} from 'react-redux';

class PanelComponent extends React.Component {
    render() {
        return (
            <div className="side-panel"></div>
        );
    }
}

function ConnectPanels(state) {
    return {
        tabs: state.tabs.tabsList
    };
}

export default connect(ConnectPanels)(PanelComponent); 