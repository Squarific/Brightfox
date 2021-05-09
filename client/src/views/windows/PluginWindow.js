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

    var description = content.appendChild(document.createElement("div"));
	description.appendChild(document.createTextNode(pluginData.description));

    this._addVersions(content);
}

PluginWindow.prototype._addVersions = function _addVersions (content) {
    var title = content.appendChild(document.createElement("h3"));
	title.appendChild(document.createTextNode("Versions"));

    fetch('http://localhost:8755/versions/list/' + this._pluginData.uuid).then(function (res) { return res.json() }).then(function (data) {
        for (var k = 0; k < data.versions.length; k++) {
            content.appendChild(new VersionCard(this._gui, data.versions[k]).toDOM());
        }
    }.bind(this));
};

