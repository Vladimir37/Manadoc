import * as React from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem, Button, FormControl, InputGroup} from 'react-bootstrap';

import store from '../../store/store.jsx';
import MainActions from '../../utility/actions/main.jsx';
import ProjectsUtility from '../../utility/projects.jsx';

class ProjectPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            added: false,
            addedName: ''
        };

        this.changeName = this.changeName.bind(this);
        this.createInput = this.createInput.bind(this);
        this.deleteInput = this.deleteInput.bind(this);
        this.createSheet = this.createSheet.bind(this);

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
        let projectSheets = this.props.projects[projectAddr];
        let sheets = projectSheets.lists.map((sheet, index) => {
            return <ListGroupItem key={index} onClick={this.openSheet(index, sheet.name)}>{sheet.name}</ListGroupItem>;
        });

        let added;
        if (this.state.added) {
            added = <ListGroupItem>
                <InputGroup onBlur={this.deleteInput}>
                    <FormControl
                        type="text"
                        value={this.state.addedName}
                        placeholder="Enter sheet name"
                        onChange={this.changeName}
                    />
                    <InputGroup.Button>
                        <Button bsStyle="success" onClick={this.createSheet}>Create</Button>
                    </InputGroup.Button>
                </InputGroup>
            </ListGroupItem>;
        }

        return <section>
            <ListGroup>
                {sheets}
                {added}
            </ListGroup>
            <Button bsStyle="success" bsSize="small" onClick={this.createInput}>Add sheet</Button>
        </section>;
    }

    // Service

    changeName(e) {
        this.setState({
            addedName: e.target.value
        });
    }

    createInput() {
        this.setState({
            added: true
        });
    }

    deleteInput() {
        setTimeout(() => {
            this.setState({
                added: false,
                addedName: ''
            });
        }, 100);
    }

    createSheet() {
        if (!this.state.addedName) {
            return false;
        }
        let storeAddSheetAction = {
            type: 'edit',
            act: 'add_sheet',
            addr: this.props.tabs[this.props.activeTab - 1].addr,
            name: this.state.addedName
        };
        store.dispatch(storeAddSheetAction);
    }
}

function ConnectProjectPage(state) {
    return {
        projects: state.projects,
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectProjectPage)(ProjectPageComponent); 