/*
  
*/
function Brightfox (gui, settings) {
  this._gui = gui;
  this._network = new BrightfoxNetwork(settings.url);
  this.brightfoxStore = new BrightfoxStore(this._gui, this._network);
}

Brightfox.prototype.setJWT = function setJWT (token) {
  this._network.setJWT(token);
};

Brightfox.prototype.openStore = function openStore () {
    this.brightfoxStore.openMainMenu();
};