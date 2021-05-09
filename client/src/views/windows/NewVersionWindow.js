function NewVersionWindow (gui, pluginData) {
    this._gui = gui;
    this._pluginData = pluginData;

    this._pluginWindow = this._gui.createWindow({
        title: "Adding a new version for " + pluginData.name,
        close: true
    })

    var content = this._pluginWindow.appendChild(document.createElement("div"));
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

    console.log(this._versionSelectionInput);

    fetch('http://localhost:8755/versions/new/' + this._pluginData.uuid, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.errors) {
            return this.displayError(data.errors.map(e => { e.msg }).join(", "));
        }

        this.displaySuccess("New version saved: v" + data.newversion + ". We will now review and if your plugin gets verified other users will be able to open it. For now you can find it in the 'My plugin' window.");
    })
    .catch((error) => {
        this.displayError(error);
    });
};

NewVersionWindow.prototype.displayError = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);

    this._status.appendChild(document.createTextNode(errorText));
    this._status.className = "error";
};

NewVersionWindow.prototype.displaySuccess = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);

    this._status.appendChild(document.createTextNode(errorText));
    this._status.className = "success";
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