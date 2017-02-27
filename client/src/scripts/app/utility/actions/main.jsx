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
        this.openProjectFile = this.openProjectFile.bind(this);
    }

    CreateNewProject() {
        let createData = {
            title: 'Create new Manadoc project',
            buttonLabel: 'Create',
            filter: [{
                name: 'Custom File Type',
                extensions: ['mndc']
            }]
        };
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
        let openData = {
            title: 'Open Manadoc project',
            buttonLabel: 'Open',
             properties: ['openFile'],
            filter: [{
                name: 'Custom File Type',
                extensions: ['mndc']
            }]
        };
        remote.dialog.showOpenDialog(openData, (entered) => {
            if (!entered) {
                return false;
            }
            entered = entered[0];
            
            if (entered.slice(-5) != '.mndc') {
                ErrUtility.throwUncriticalError('Incorrect file!');
            } else {
                this.openProjectFile(entered);
            }
        });
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
            let storeActionHistory = {
                type: 'config',
                act: 'add_project',
                name: projectName,
                addr: addr
            };
            store.dispatch(storeActionHistory);
            // Create new tab
            let storeActionTab = {
                type: 'tab',
                act: 'add',
                detail: {
                    type: 'project',
                    addr: addr,
                    title: projectName
                }
            };
            store.dispatch(storeActionTab);
        });
    }

    openProjectFile(addr) {
        let project;
        try {
            project = fs.readFileSync(addr, 'utf8');
            project = JSON.parse(project);
            let storeActionTab = {
                type: 'tab',
                act: 'add',
                detail: {
                    type: 'project',
                    addr: addr,
                    title: project.name
                }
            };
            store.dispatch(storeActionTab);
        } catch (err) {
            ErrUtility.throwUncriticalErrorGen(err);
        }
    }
}

let MainActionsApp = new MainActions();

export default MainActionsApp;