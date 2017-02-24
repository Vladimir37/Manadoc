import * as React from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';
import MainEmpty from '../subcomponents/mainEmpty.jsx';
import Config from '../../utility/config.jsx';

class MainPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: Config.readConfig().projects
        };
    }

    render() {
        if (this.state.history.length) {
            return null;
        } else {
            return <MainEmpty/>;
        }
    }
}

function ConnectMainPage(state) {
    return {
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectMainPage)(MainPageComponent); 