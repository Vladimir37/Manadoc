export default function tabReducer(state, action) {
    switch (action.act) {
        case 'add':
            let newTab = generateTab(state, action);
            state.tabs.tabsList.push(newTab);
            return state;
    }
}

function generateTab(state, action) {
    let newTab = {
        ID: 0,
        type: action.detail.type,
        addr: action.detail.addr,
        title: action.detail.title,
        focus: 0
    }
    return newTab;
}