console.log("in panel.js: start running");


//////////////////////////////////////////////////////////////////////////////////
//              declare namespace
//////////////////////////////////////////////////////////////////////////////////
// declare namespace
window.PanelWin3js = window.PanelWin3js || {}
var PanelWin3js = window.PanelWin3js

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

// Change the prefix of signals.js library. It is all low case.
var SIGNALS = signals; delete window.signals;

PanelWin3js.editor	= new Editor()

//////////////////////////////////////////////////////////////////////////////
//              connect background page
//////////////////////////////////////////////////////////////////////////////


// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
        name: "panel-page"
});

backgroundPageConnection.postMessage({
        name: 'panelPageCreated',
        tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function(message) {
        console.log( 'in panel.js: received', message );
        
        if( message.type === 'updateObject3DTreeView' ){
                PanelWin3js.editor.signals.updateObject3DTreeView.dispatch(message.data)
        }else{
                console.assert(false)
        }
});

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

/**
 * init left sidebar
 */
PanelWin3js.initLeftSideBar = function(){

	var tabContainer	= new UI.TabsHelper.createTabContainer('sceneSidebar', 0)
	document.querySelector( '#leftSidebar' ).appendChild(tabContainer.dom)
	document.querySelector( '#leftSidebar' ).style.padding = '0px'
	tabContainer.dom.style.padding = '0px'
        
	var sceneTab	= new UI.TabsHelper.createTab()
	tabContainer.addTab('SCENE', sceneTab)
	sceneTab.add( new PanelWin3js.PanelTreeView() )

	var aboutTab	= new UI.TabsHelper.createTab()
	tabContainer.addTab('ABOUT', aboutTab)
	aboutTab.add( new PanelWin3js.PanelAbout() )

}

PanelWin3js.initLeftSideBar()

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

console.log("in panel.js: stop running");