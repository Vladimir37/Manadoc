import {createStore} from 'redux';

import ConfigUtility from '../utility/config.jsx';

import configReducer from './reducers/config.jsx';
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
    tabs: {
        tabsList: [mainTab],
        activeTab: 0
    }
}

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'tab':
            return tabReducer(state, action);
        case 'config':
            return configReducer(state, action);
        default:
            return state;
    }
}

let store = createStore(mainReducer);

export default store;