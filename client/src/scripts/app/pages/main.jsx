import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store/store.jsx';
import {Header} from '../components/header.jsx';
import Panel from '../components/panel.jsx';

export class Main extends React.Component {
    generatePage() {
        return <main></main>;
    }
    
    render() {
        return (
            <div>
                <Header/>
                <Provider store={store}>
                    <Panel/>
                </Provider>
                {this.generatePage()}
            </div>
        );
    }
}
