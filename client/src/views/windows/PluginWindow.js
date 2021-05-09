function PluginWindow (gui, pluginData) {
    this._gui = gui;
    this._pluginData = pluginData;

    var pluginWindow = gui.createWindow({
        title: "Plugin " + pluginData.name,
        close: true
    })

    var content = pluginWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Plugin " + pluginData.name + " by " + pluginData.useruuid));

    this._addVersions(content);

    content.appendChild(gui.createButton("Run plugin", () => {
        
    }));
}

PluginWindow.prototype._addVersions = function _addVersions (content) {
    fetch('http://localhost:8755/versions/list/' + this._pluginData.uuid).then(function (res) { return res.json() }).then(function (data) {
        
    }.bind(this));
};

