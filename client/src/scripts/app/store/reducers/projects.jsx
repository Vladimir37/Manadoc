import ProjectsUtility from '../../utility/projects.jsx';

export default function projectsReducer(state, action) {
    switch (action.act) {
        case 'add':
            let project = ProjectsUtility.ReadProject(action.addr);
            let stateProjectsNew = Object.assign({}, state.projects, {
                [action.addr]: project
            });
            return Object.assign({}, state, {projects: stateProjectsNew});
        case 'delete':
            let stateProjectsDeleted = state.projects.filter((obj) => Object.keys(obj)[0] != action.addr);
            return Object.assign({}, state, {projects: stateProjectsDeleted});
        default:
            return state;
    }
}