function PluginWindow (gui, pluginData) {
    var pluginWindow = gui.createWindow({
        title: "Plugin " + pluginData.name,
        close: true
    })

    var content = pluginWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Plugin " + pluginData.name + " by " + pluginData.useruuid));

    
}