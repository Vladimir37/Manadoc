import {shell, remote} from 'electron';
import fs from 'fs';
import md5 from 'md5';

import store from '../../store/store.jsx';
import Main from '../../components/pages/main.jsx';
import ErrUtility from '../error.jsx';

class MainActions {
    constructor() {
        this.CreateNewProject = this.CreateNewProject.bind(this);
        this.OpenProject = this.OpenProject.bind(this);
        this.OpenHelp = this.OpenHelp.bind(this);

        this.createProjectFile = this.createProjectFile.bind(this);
    }

    CreateNewProject() {
        let createData = {
            title: 'Create new project',
            buttonLabel: 'Create',
            filter: {
                name: 'Manadoc project',
                extensions: ['mndc']
            }
        }
        remote.dialog.showSaveDialog(createData, (entered) => {
            if (!entered) {
                return false;
            }
            if (entered.slice(-5) != '.mndc') {
                entered += '.mndc';
            }

            this.createProjectFile(entered);
        });
    }

    OpenProject() {
        //
    }

    OpenHelp() {
        shell.openExternal('https://github.com/Vladimir37/Manadoc');
    }

    // Private methods

    createProjectFile(addr) {
        let projectName = addr.split('/');
        projectName = projectName[projectName.length - 1].slice(0, -5);

        let projectTemplate = {
            name: projectName,
            hash: null,
            lastUpdate: new Date(),
            currentListID: 1,
            lists: [{
                ID: 1,
                name: 'Header sheet',
                currentBlockID: 1,
                hash: null,
                blocks: [{
                    ID: 1,
                    hash: null,
                    type: 'h1',
                    subtype: null,
                    text: projectName,
                }]
            }]
        };
        projectTemplate.hash = md5(JSON.stringify(projectTemplate));
        projectTemplate.lists[0].hash = md5(JSON.stringify(projectTemplate.lists[0]));
        projectTemplate.lists[0].blocks[0].hash = md5(JSON.stringify(projectTemplate.lists[0].blocks[0]));
        
        fs.writeFile(addr, JSON.stringify(projectTemplate), function(err) {
            if(err) {
                ErrUtility.throwUncriticalErrorGen(err);
            }
            
            // Create new history
            let config = store.getState().config;
            let newProjectHistory = {
                name: projectName,
                addr: addr,
                time: new Date()
            };
            config.projects.unshift(newProjectHistory);
            let storeAction = {
                type: 'config',
                config: this.readConfig()
            };
            store.dispatch(config);
        });
    }
}

let MainActionsApp = new MainActions();

export default MainActionsApp;