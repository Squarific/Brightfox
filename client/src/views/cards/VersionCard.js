function VersionCard (gui, network, plugindata, versionData) {
    this._gui = gui;
    this._network = network;
    this._versionData = versionData;
    this._pluginData = plugindata;
}

VersionCard.prototype.toDOM = function toDOM () {
    var button = document.createElement("div");
	button.classList = "pluginstore-button";
	button.appendChild(document.createTextNode("v" + this._versionData.version));

	button.addEventListener("click", function () {
		const versionWindow = new VersionWindow(this._gui, this._network, this._pluginData, this._versionData);
	}.bind(this));

    return button;
};