function VersionWindow (gui, pluginData, versionData) {
    this._gui = gui;
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
	description.appendChild(document.createTextNode(pluginData.releasenotes));

    this._gui.createButton("Run this version", () => {
        this._runVersion();
    });
}

VersionWindow.prototype._runVersion = function _runVersion () {
    fetch('http://localhost:8755/versions/source/' + this._pluginData.uuid + "/" + this._versionData.version).then(res => res.json).then((data) => {
        eval(data.source);
    });
};
