function PluginCard (gui, network, pluginData) {
    this._gui = gui;
	this._network = network;
    this._pluginData = pluginData;
}

PluginCard.prototype.toDOM = function toDOM () {
    var button = document.createElement("div");
	button.classList = "pluginstore-button";
	button.appendChild(document.createTextNode(this._pluginData.name + " by " + this._pluginData.useruuid));

	button.addEventListener("click", function () {
		const pluginWindow = new PluginWindow(this._gui, this._network, this._pluginData);
	}.bind(this));

    return button;
};