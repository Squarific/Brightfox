function PluginWindow (gui, network, pluginData) {
    this._gui = gui;
    this._network = network;
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

    if (pluginData.useruuid === this._network.useruuid) {
        content.appendChild(this._gui.createButton("Add new version", () => {
            const newVersionWindow = new NewVersionWindow(this._gui, this._network, {
                uuid: this._pluginData.uuid,
                name: this._pluginData.name,
                description: this._pluginData.description
            });
        }));
    }

    this._addVersions(content);
}

PluginWindow.prototype._addVersions = function _addVersions (content) {
    var title = content.appendChild(document.createElement("h3"));
	title.appendChild(document.createTextNode("Versions"));

    this._network.getVersions(this._pluginData.uuid, (err, versions) => {
        for (var k = 0; k < versions.length; k++) {
            content.appendChild(new VersionCard(this._gui, this._network, this._pluginData, versions[k]).toDOM());
        }
    });
};

