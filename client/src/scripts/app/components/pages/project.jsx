import * as React from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import store from '../../store/store.jsx';
import MainActions from '../../utility/actions/main.jsx';
import ProjectsUtility from '../../utility/projects.jsx';

class ProjectPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.openSheet = this.openSheet.bind(this);
    }

    openSheet(index, name) {
        return () => {
            let storeActionTab = {
                type: 'tab',
                act: 'add',
                detail: {
                    type: 'sheet',
                    addr: this.props.tabs[this.props.activeTab - 1].addr,
                    title: name
                }
            };
            store.dispatch(storeActionTab);
        }
    }

    render() {
        let project = this.props.tabs[this.props.activeTab - 1];
        if (project.type != 'project') {
            return null;
        }
        let projectAddr = project.addr;
        let projectSheets = ProjectsUtility.ReadProject(projectAddr).lists;
        let sheets = projectSheets.map((sheet, index) => {
            return <ListGroupItem key={index} onClick={this.openSheet(index, sheet.name)}>{sheet.name}</ListGroupItem>;
        });
        return <ListGroup>
            {sheets}
        </ListGroup>;
    }
}

function ConnectProjectPage(state) {
    return {
        config: state.config,
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectProjectPage)(ProjectPageComponent); 