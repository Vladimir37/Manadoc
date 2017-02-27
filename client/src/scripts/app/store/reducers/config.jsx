import ConfigUtility from '../../utility/config.jsx';

export default function configReducer(state, action) {
    switch (action.act) {
        case 'add_project':
            let newProject = {
                name: action.name,
                addr: action.addr,
                time: new Date()
            };
            let projectsAdded = [
                newProject,
                ...state.config.projects
            ];
            let configAdded = Object.assign({}, state.config, {projects: projectsAdded});
            ConfigUtility.writeConfig(configAdded);
            return Object.assign({}, state, {config: configAdded});
        case 'delete_project':
            let projectsDeleted = [
                ...state.config.projects.slice(0, action.num), 
                ...state.config.projects.slice(action.num + 1)
            ];
            let configDeleted = Object.assign({}, state.config, {projects: projectsDeleted});
            ConfigUtility.writeConfig(configDeleted);
            return Object.assign({}, state, {config: configDeleted});
        default:
            return state;
    }
}