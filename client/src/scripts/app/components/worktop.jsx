import * as React from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';

class WorktopComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth
        };

        this.updateWindowWidth = this.updateWindowWidth.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth);
    }

    updateWindowWidth() {
        this.setState({
            windowWidth: window.innerWidth
        });
    }

    render() {
        let worktopStyle = {
            width: (this.state.windowWidth - 250) + 'px'
        };
        if (this.props.tabs[this.props.activeTab].type == 'main') {
            worktopStyle.width = this.state.windowWidth + 'px';
        }
        let worktopElement = <section className='worktop' style={worktopStyle}></section>;
        return worktopElement;
    }
}

function ConnectWorktop(state) {
    return {
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectWorktop)(WorktopComponent); 