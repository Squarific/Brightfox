function VersionWindow (gui, network, pluginData, versionData) {
    this._gui = gui;
    this._network = network;
    this._pluginData = pluginData;
    this._versionData = versionData;

    var pluginWindow = this._gui.createWindow({
        title: "Version v" + this._versionData.version + " of " + this._pluginData.name,
        close: true
    })

    var content = pluginWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Version v" + this._versionData.version));

    var description = content.appendChild(document.createElement("div"));
	description.appendChild(document.createTextNode(this._versionData.releasenotes));

    content.appendChild(this._gui.createButton("Run this version", () => {
        this._runVersion();
    }));
}

VersionWindow.prototype._runVersion = function _runVersion () {
    this._network.getVersion(this._pluginData.uuid, this._versionData.version, (version) => {
        eval(version.source);
    });
};
