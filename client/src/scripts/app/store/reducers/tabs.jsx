export default function tabReducer(state, action) {
    switch (action.act) {
        case 'select':
            let tabsSelected = Object.assign({}, state.tabs, {activeTab: action.num});
            return Object.assign({}, state, {tabs: tabsSelected});
        case 'add':
            let newTab = generateTab(state, action);
            let tabsList = [
                ...state.tabs.tabsList,
                newTab
            ];
            let activeTab = tabsList.length;
            let tabsAdded = Object.assign({}, state.tabs, {tabsList, activeTab});
            return Object.assign({}, state, {tabs: tabsAdded});
        default:
            return state;
    }
}

function generateTab(state, action) {
    let newTab = {
        ID: state.tabs.tabsList[state.tabs.tabsList.length - 1].ID + 1,
        type: action.detail.type,
        addr: action.detail.addr,
        title: action.detail.title,
        focus: 0
    }
    return newTab;
}