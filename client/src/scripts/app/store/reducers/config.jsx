import ConfigUtility from '../../utility/config.jsx';

export default function configReducer(state, action) {
    switch (action.act) {
        case 'delete_project':
            let projects = [...state.config.projects.slice(0, action.num), ...state.config.projects.slice(action.num + 1)];
            let config = Object.assign({}, state.config, {projects});
            ConfigUtility.writeConfig(config);
            return Object.assign({}, state, {config});;
    }
}