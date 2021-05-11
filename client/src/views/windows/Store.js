function SitePluginsStore (gui, network) {
    this._gui = gui;
    this._network = network;
}

/* Main menu */

SitePluginsStore.prototype.openMainMenu = function openMainMenu () {
    var pluginStoreWindow = this._gui.createWindow({
        title: "Plugin store",
        close: true
    })

    var content = pluginStoreWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Pluginstore"));

    var button = content.appendChild(document.createElement("div"));
	button.classList = "pluginstore-button";
	button.appendChild(document.createTextNode("List all plugins"));
	button.addEventListener("click", function () {
		this.openPluginList();
	}.bind(this));

    var button = content.appendChild(document.createElement("div"));
	button.classList = "pluginstore-button";
	button.appendChild(document.createTextNode("Add new plugin"));
	button.addEventListener("click", function () {
		const newPluginWindow = new NewPluginWindow(this._gui, this._network);
	}.bind(this));

    var button = content.appendChild(document.createElement("div"));
	button.classList = "pluginstore-button";
	button.appendChild(document.createTextNode("My plugins"));
	button.addEventListener("click", function () {
		const myPluginWindow = new MyPluginsWindow(this._gui, this._network);
	}.bind(this));
};

/* Plugin list window */

SitePluginsStore.prototype.openPluginList = function openPluginList () {
    var pluginListWindow = this._gui.createWindow({
        title: "Plugin list",
        close: true
    })

    var content = pluginListWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Plugin list (verified only)"));

    this._network.getPluginList((err, list) => {
        for (var k = 0; k < list.length; k++) {
            content.appendChild(new PluginCard(this._gui, this._network, list[k]).toDOM());
        }
    });
};


/* 
    Plugin window
*/

SitePluginsStore.prototype.openPluginWindow = function openPluginWindow (uuid) {
    throw new Error("Not implemented");

    fetch('http://localhost:8755/plugins/retrieve').then(function (res) { return res.json() }).then(function (data) {
        
    }.bind(this));

    this.openPluginWindowWithData();
};

SitePluginsStore.prototype.openPluginWindowWithData = function openPluginWindowWithData (pluginData) {
    const pluginWindow = new PluginWindow(this._gui, this._network, pluginData);
};