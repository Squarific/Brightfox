function SitePluginsStore (gui) {
    this.gui = gui;
}

SitePluginsStore.prototype.openMainMenu = function openMainMenu () {
    var pluginStoreWindow = this.gui.createWindow({
        title: "Plugin store",
        close: true
    })

    var content = pluginStoreWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Pluginstore"));

    var button = content.appendChild(document.createElement("div"));
	button.classList = "pluginstore-button";
	button.appendChild(document.createTextNode("List all plugins"));
	button.addEventListener("click", function () {
		this.openPluginList();
	}.bind(this));
};

SitePluginsStore.prototype.openPluginList = function openPluginList () {
    var pluginStoreWindow = this.gui.createWindow({
        title: "Plugin list",
        close: true
    })

    var content = pluginStoreWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Plugin list"));

    fetch('http://localhost:8755/plugins/list').then(function (res) { return res.json() }).then(function (data) {
        console.log(data);
    });
};