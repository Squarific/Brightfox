function NewVersionWindow (gui, network, pluginData) {
    this._gui = gui;
    this._network = network;
    this._pluginData = pluginData;

    this._newVersionWindow = this._gui.createWindow({
        title: "Adding a new version for " + pluginData.name,
        close: true
    })

    var content = this._newVersionWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
    content.classList.add("newversion-content");
	
	var title = content.appendChild(document.createElement("h2"));
    title.appendChild(document.createTextNode("Add a new version for plugin " + pluginData.name));

    var helpText = content.appendChild(document.createElement("h3"));
    helpText.appendChild(document.createTextNode("Tip: do not use this to code, but use something like notepad++ and just paste it in here so you don't accidently lose a lot of work"));

    this._status = content.appendChild(document.createElement("div"));

    this._sourceInput = content.appendChild(document.createElement("textarea"));
    this._sourceInput.value = this.BASE_MOD;

    content.appendChild(document.createElement("br"));
    content.appendChild(document.createElement("br"));

    this._versionSelectionInput = content.appendChild(this._gui.createSelection(["Major change", "Minor change", "Bugfix/patch"], 1));
    content.appendChild(document.createElement("br"));

    var releaseNotesTitle = content.appendChild(document.createElement("h4"));
    releaseNotesTitle.appendChild(document.createTextNode("Release notes"));
    this._releaseNotesInput = content.appendChild(document.createElement("textarea"));
    this._releaseNotesInput.classList.add("releasenotes");
    content.appendChild(document.createElement("br"));

    content.appendChild(this._createButton("Test plugin", function () {
        eval(textarea.value);
    }.bind(this)));

    content.appendChild(this._createButton("Submit plugin", function () {
        this._submitData();
    }.bind(this)));
}

NewVersionWindow.prototype._submitData = function _submitData () {
    const CHANGETYPES = ["major", "minor", "patch"];
    const data = {
        source: this._sourceInput.value,
        releasenotes: this._releaseNotesInput.value,
        changetype: CHANGETYPES[this._versionSelectionInput.selectedIndex]
    };

    this._network.newVersion(this._pluginData.uuid, data, (err, newVersion) => {
        if (err) return this.displayError(err);

        this.displaySuccess("New version saved: v" + newVersion + ". We will now review and if your plugin gets verified other users will be able to open it. For now you can find it in the 'My plugin' window.");
    });
};

NewVersionWindow.prototype.displayError = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);

    this._status.appendChild(document.createTextNode(errorText));
    this._status.className = "sitepluginserror";
};

NewVersionWindow.prototype.displaySuccess = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);

    this._status.appendChild(document.createTextNode(errorText));
    this._status.className = "sitepluginssuccess";
};

NewVersionWindow.prototype.clearStatus = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);
    this._status.className = "";
};

NewVersionWindow.prototype._createButton = function _createButton (text, callback) {
    var button = document.createElement("div");
        button.classList = "pluginstore-button";
        button.appendChild(document.createTextNode(text));
    button.addEventListener("click", callback);
    return button;
};

NewVersionWindow.prototype.BASE_MOD = "// Here you can write the javascript for your mod\n";
NewVersionWindow.prototype.BASE_MOD += "\n";
NewVersionWindow.prototype.BASE_MOD += "anondraw.collab.chat.addMessage(\"Yay the mod loaded successfully!\");";