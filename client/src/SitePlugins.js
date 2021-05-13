/*
  
*/
function SitePlugins (gui, settings) {
  this._gui = gui;
  this._network = new SitePluginsNetwork(settings.url);
  this.sitePluginsStore = new SitePluginsStore(this._gui, this._network);
}

SitePlugins.prototype.setJWT = function setJWT (token) {
  this._network.setJWT(token);
};

SitePlugins.prototype.openStore = function openStore () {
    this.sitePluginsStore.openMainMenu();
};