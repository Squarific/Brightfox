/*
  
*/
function SitePlugins (container, settings) {
  this._gui = new Gui(container);
  this._network = new Network(settings.url);
  this.sitePluginsStore = new SitePluginsStore(this._gui, this._network);
}

SitePlugins.prototype.setJWT = function setJWT (token) {
  this._network.JWT = token;
};

SitePlugins.prototype.openStore = function openStore () {
    this.sitePluginsStore.openMainMenu();
};