import * as React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import moment from 'moment';
import Config from '../../utility/config.jsx';

class MainPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: Config.readConfig().projects
        };

        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject(num) {
        return () => {
            let newHistory = this.state.history;
            newHistory.splice(num, 1);
            let config = Config.readConfig();
            config.projects = newHistory;
            Config.writeConfig(config);
            this.setState({
                history: Config.readConfig().projects
            });
        }
    }

    render() {
        let projects = this.state.history.map((project, index) => {
            var projectElem = {};
            projectElem.name = project.name.length < 13 ? project.name : project.name.slice(0, 13) + '...';
            projectElem.addr = project.addr.length < 13 ? project.addr : '...' + project.addr.slice(-13);
            projectElem.time = moment().startOf('hour').from(project.time);
            return (<Col sm={3} md={3} key={index}>
                <article className="main-project">
                    <span className="main-project-text main-project-name">{projectElem.name}</span>
                    <span className="main-project-text main-project-addr">{projectElem.addr}</span>
                    <span className="main-project-text main-project-time">{projectElem.time}</span>
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
                                <div className="main-top-button">
                                    <Glyphicon className="main-top-glyph" glyph="plus"/><br/>
                                    <span className="main-top-text">New project</span>
                                </div>
                            </Col>
                            <Col sm={4} md={4}>
                                <div className="main-top-button">
                                    <Glyphicon className="main-top-glyph" glyph="folder-open"/><br/>
                                    <span className="main-top-text">Open project</span>
                                </div>
                            </Col>
                            <Col sm={4} md={4}>
                                <div className="main-top-button">
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
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectMainPage)(MainPageComponent); 