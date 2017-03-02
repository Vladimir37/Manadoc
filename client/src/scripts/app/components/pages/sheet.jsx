import * as React from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import store from '../../store/store.jsx';
import MainActions from '../../utility/actions/main.jsx';

class SheetPageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let project = this.props.tabs[this.props.activeTab - 1];
        if (project.type != 'sheet') {
            return null;
        }

        return <h2>{project.title}</h2>;
    }
}

function ConnectSheetPage(state) {
    return {
        projects: state.projects,
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectSheetPage)(SheetPageComponent); 