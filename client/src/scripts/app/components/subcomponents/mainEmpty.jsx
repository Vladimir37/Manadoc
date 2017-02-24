import * as React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon} from 'react-bootstrap';

export default class MainEmptyComponent extends React.Component {
    render() {
        return (
            <section className="main-empty-container">
                <Row>
                    <Col sm={4} md={4}>
                        <div className="main-empty-button">
                            <Glyphicon className="main-empty-glyph" glyph="plus"/><br/>
                            <span>New project</span>
                        </div>
                    </Col>
                    <Col sm={4} md={4}>
                        <div className="main-empty-button">
                            <Glyphicon className="main-empty-glyph" glyph="folder-open"/><br/>
                            <span>Open project</span>
                        </div>
                    </Col>
                    <Col sm={4} md={4}>
                        <div className="main-empty-button">
                            <Glyphicon className="main-empty-glyph" glyph="education"/><br/>
                            <span>Help</span>
                        </div>
                    </Col>
                </Row>
            </section>
        );
    }
}