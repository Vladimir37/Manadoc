import fs from 'fs';

import ErrUtility from './error.jsx';

class ProjectsUtility {
    constructor() {
        this.ReadProject = this.ReadProject.bind(this);
    }

    ReadProject(addr) {
        let project;
        try {
            project = fs.readFileSync(addr, 'utf8');
            project = JSON.parse(project);
            return project;
        } catch (err) {
            ErrUtility.throwUncriticalErrorGen(err);
        }
    }
}

let ProjectsUtilityApp = new ProjectsUtility();

export default ProjectsUtilityApp;