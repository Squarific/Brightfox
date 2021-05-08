/*
  
*/
function SitePlugins (container) {
  this.gui = new Gui(container);
}

SitePlugins.prototype.setJWT = function setJWT () {

};

SitePlugins.prototype.openStore = function openStore (container) {
    var pluginStoreWindow = this.gui.createWindow({
        title: "Plugin store",
        close: true
    })

    var content = pluginStoreWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("Pluginstore"));
};