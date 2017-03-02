import ProjectsUtility from '../../utility/projects.jsx';

export default function editReducer(state, action) {
    switch (action.act) {
        case 'add_sheet':
            let newSheet = {
                ID: state.projects[action.addr].currentListID + 1,
                name: action.name,
                currentBlockID: 0,
                hash: null,
                blocks: []
            };
            let newSheetList = [...state.projects[action.addr].lists, newSheet];
            let newCurrentID = state.projects[action.addr].currentListID + 1;
            let newProject = Object.assign({}, state.projects[action.addr], {lists: newSheetList}, {currentListID: newCurrentID});
            let newProjectsList = Object.assign({}, newProject, {[action.addr]: newProject});
            let newState = Object.assign({}, state, {projects: newProjectsList});
            ProjectsUtility.WriteProject(action.addr, newProject);
            return newState;
        default:
            return state;
    }
}