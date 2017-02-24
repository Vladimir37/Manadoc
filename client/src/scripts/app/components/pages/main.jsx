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
    }

    render() {
        let projects = this.state.history.map((project, index) => {
            project.name = project.name.length < 13 ? project.name : project.name.slice(0, 13) + '...';
            project.addr = project.addr.length < 13 ? project.addr : '...' + project.addr.slice(-13);
            project.time = moment().startOf('hour').from(project.time);
            return (<Col sm={3} md={3} key={index}>
                <article className="main-project">
                    <span className="main-project-text main-project-name">{project.name}</span>
                    <span className="main-project-text main-project-addr">{project.addr}</span>
                    <span className="main-project-text main-project-time">{project.time}</span>
                    <Glyphicon className="main-project-remove" glyph="remove"/><br/>
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