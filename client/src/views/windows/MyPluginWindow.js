function MyPluginsWindow (gui, network) {
    this._gui = gui;
    this._network = network;

    var pluginListWindow = this._gui.createWindow({
        title: "My plugins",
        close: true
    })

    var content = pluginListWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("My plugins"));

    this._network.myPlugins((err, list) => {
        for (var k = 0; k < list.length; k++) {
            content.appendChild(new PluginCard(this._gui, this._network, list[k]).toDOM());
        }
    });
}