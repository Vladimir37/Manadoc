import * as React from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';

import MainPage from './pages/main.jsx';
import ProjectPage from './pages/project.jsx';
import SheetPage from './pages/sheet.jsx';

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
            if (this.props.activeTab == index + 1) {
                classes = 'page page-active';
            }
            let tabContent;

            switch (tab.type) {
                case 'main':
                    tabContent = <MainPage/>;
                    break;
                case 'project':
                    tabContent = <ProjectPage/>;
                    break;
                case 'sheet':
                    tabContent = <SheetPage/>;
                    break;
                default:
                    break;
            }

            let page = (
                <section key={index + 1} className={classes}>
                    {tabContent}
                </section>
                );
            
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