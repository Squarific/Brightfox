function PluginCard (gui, pluginData) {
    this.gui = gui;
    this.pluginData = pluginData;
}

PluginCard.prototype.toDOM = function toDOM () {
    var button = document.createElement("div");
	button.classList = "pluginstore-button";
	button.appendChild(document.createTextNode(this.pluginData.name + " by " + this.pluginData.useruuid));

	button.addEventListener("click", function () {
		const pluginWindow = new PluginWindow(this.gui, this.pluginData);
	}.bind(this));

    return button;
};