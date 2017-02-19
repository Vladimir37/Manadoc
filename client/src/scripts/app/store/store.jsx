import {createStore} from 'redux';
import tabReducer from './reducers/tabs.jsx';

let mainTab = {
    ID: 1,
    type: 'main',
    addr: null,
    title: 'Main',
    focus: 0
}

let initialState = {
    tabs: {
        tabsList: [mainTab],
        activeTab: 0
    }
}

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'tab':
            return tabReducer(state, action);
        default:
            return state;
    }
}

export let store = createStore(mainReducer);