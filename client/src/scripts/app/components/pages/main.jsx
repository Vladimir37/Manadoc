import * as React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import moment from 'moment';

import store from '../../store/store.jsx';
import MainActions from '../../utility/actions/main.jsx';

class MainPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.openProject = this.openProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    openProject(addr) {
        return () => {
            MainActions.openProjectFile(addr);
        }
    }

    deleteProject(num) {
        return (e) => {
            let storeAction = {
                type: 'config',
                act: 'delete_project',
                num: num
            };
            store.dispatch(storeAction);
            e.stopPropagation();
        }
    }

    render() {
        let project = this.props.tabs[this.props.activeTab - 1];
        if (project.type != 'main') {
            return null;
        }
        let projects = this.props.config.projects.map((project, index) => {
            var projectElem = {};
            projectElem.name = project.name.length < 13 ? project.name : project.name.slice(0, 13) + '...';
            projectElem.addr = project.addr.length < 17 ? project.addr : '...' + project.addr.slice(-17);
            projectElem.time = moment(project.time).fromNow();
            return (<Col sm={3} md={3} key={index}>
                <article className="main-project" onClick={this.openProject(project.addr)}>
                    <span className="main-project-text main-project-name" title={project.name}>
                        {projectElem.name}
                    </span>
                    <span className="main-project-text main-project-addr" title={project.addr}>
                        {projectElem.addr}
                    </span>
                    <span className="main-project-text main-project-time" title={moment(project.time).format('MMMM Do YYYY, h:mm:ss a')}>
                        {projectElem.time}
                    </span>
                    <Glyphicon className="main-project-remove" onClick={this.deleteProject(index)} glyph="remove"/><br/>
                </article>
            </Col>);
        });

        return (
            <section className="main">
                <section className="main-top-container">
                    <Grid>
                        <Row>
                            <Col sm={4} md={4}>
                                <div className="main-top-button" onClick={MainActions.CreateNewProject}>
                                    <Glyphicon className="main-top-glyph" glyph="plus"/><br/>
                                    <span className="main-top-text">New project</span>
                                </div>
                            </Col>
                            <Col sm={4} md={4}>
                                <div className="main-top-button" onClick={MainActions.OpenProject}>
                                    <Glyphicon className="main-top-glyph" glyph="folder-open"/><br/>
                                    <span className="main-top-text">Open project</span>
                                </div>
                            </Col>
                            <Col sm={4} md={4}>
                                <div className="main-top-button" onClick={MainActions.OpenHelp}>
                                    <Glyphicon className="main-top-glyph" glyph="education"/><br/>
                                    <span className="main-top-text">Help</span>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </section>
                <section className="main-bottom-container">
                    <Grid>
                        <Row>
                            {projects}
                        </Row>
                    </Grid>
                </section>
            </section>
        );
    }
}

function ConnectMainPage(state) {
    return {
        config: state.config,
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectMainPage)(MainPageComponent); 