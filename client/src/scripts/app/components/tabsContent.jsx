import * as React from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';

class TabsContentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.generatePages = this.generatePages.bind(this);
    }

    generatePages() {
        let pages = [];
        this.props.tabs.forEach((tab, index) => {
            let classes = 'page';
            if (this.props.activeTab == index) {
                classes = 'page page-active';
            }
            let page = <section key={index} className={classes}></section>;
            
            // Render page

            pages.push(page);
        });
        return pages;
    }

    render() {
        let pages = this.generatePages();
        return (
            <section className="page-container">
                {pages}
            </section>
        );
    }
}

function ConnectTabsContent(state) {
    return {
        tabs: state.tabs.tabsList,
        activeTab: state.tabs.activeTab
    };
}

export default connect(ConnectTabsContent)(TabsContentComponent); 