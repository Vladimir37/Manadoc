import {createStore} from 'redux';

import ConfigUtility from '../utility/config.jsx';

import configReducer from './reducers/config.jsx';
import projectsReducer from './reducers/projects.jsx';
import editReducer from './reducers/edit.jsx';
import tabReducer from './reducers/tabs.jsx';

let mainTab = {
    ID: 1,
    type: 'main',
    addr: null,
    title: 'Main',
    focus: 0
}

let initialState = {
    config: ConfigUtility.readConfig(),
    projects: {},
    tabs: {
        tabsList: [mainTab],
        activeTab: 1
    }
}

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'tab':
            return tabReducer(state, action);
        case 'config':
            return configReducer(state, action);
        case 'projects':
            return projectsReducer(state, action);
        case 'edit':
            return editReducer(state, action);
        default:
            return state;
    }
}

let store = createStore(mainReducer);

export default store;