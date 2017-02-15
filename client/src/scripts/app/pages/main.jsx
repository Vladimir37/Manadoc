import * as React from 'react';
import {Header} from '../components/header.jsx';

export class Main extends React.Component {
    generatePage() {
        return <main></main>;
    }
    
    render() {
        return (
            <div>
                <Header/>
                {this.generatePage()}
            </div>
        );
    }
}
