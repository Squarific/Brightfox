function PluginWindow (gui, pluginData) {
    var pluginListWindow = this._gui.createWindow({
        title: "Plugin list",
        close: true
    })

    var content = pluginListWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Plugin list"));

    fetch('http://localhost:8755/plugins/list').then(function (res) { return res.json() }).then(function (data) {
        for (var k = 0; k < data.plugins.length; k++) {
            content.appendChild(new PluginCard(this._gui, data.plugins[k]).toDOM());
        }
    }.bind(this));
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

