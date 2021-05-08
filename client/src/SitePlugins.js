/*
  
*/
function SitePlugins (container) {
  this.gui = new Gui(container);
  this.sitePluginsStore = new SitePluginsStore(this.gui);
}

SitePlugins.prototype.setJWT = function setJWT () {

};

SitePlugins.prototype.openStore = function openStore () {
    this.sitePluginsStore.openMainMenu();
};