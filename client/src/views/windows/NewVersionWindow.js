function NewVersionWindow (gui, pluginData) {
    this._gui = gui;

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

    this._sourceInput = content.appendChild(document.createElement("textarea"));
    this._sourceInput.value = this.BASE_MOD;

    content.appendChild(document.createElement("br"));
    content.appendChild(document.createElement("br"));

    this._versionSelectionInput = content.appendChild(this._gui.createSelection(["major change", "minor change", "bugfix"], 1));
    content.appendChild(document.createElement("br"));

    var patchNotesTitle = content.appendChild(document.createElement("h4"));
    patchNotesTitle.appendChild(document.createTextNode("Patch notes"));
    this._patchNotesInput = content.appendChild(document.createElement("textarea"));
    this._patchNotesInput.classList.add("patchnotes");
    content.appendChild(document.createElement("br"));

    content.appendChild(this._createButton("Test plugin", function () {
        eval(textarea.value);
    }.bind(this)));

    content.appendChild(this._createButton("Submit plugin", function () {
        //this.submitMod();
    }.bind(this)));
}

NewVersionWindow.prototype._createForm = function _createForm (content) {
    var formContainer = content.appendChild(document.createElement("div"));
    formContainer.className = "newPluginForm";

    this._status = formContainer.appendChild(document.createElement("div"));

    this._nameInput = formContainer.appendChild(document.createElement("input"));
    this._nameInput.placeholder = "My cool plugin";

    formContainer.appendChild(document.createElement("br"));
    formContainer.appendChild(document.createElement("br"));

    this._descriptionInput = formContainer.appendChild(document.createElement("textarea"));
    this._descriptionInput.placeholder = "A good description of my plugin";

    var button = formContainer.appendChild(document.createElement("div"));
	button.classList = "pluginstore-button";
	button.appendChild(document.createTextNode("Create new plugin"));
	button.addEventListener("click", this._submitData.bind(this));
};

NewVersionWindow.prototype._submitData = function _submitData () {
    const data = {
        source: this._sourceInput.value,
        changetype: this._versionSelectionInput,
        patchnotes: this._patchNotesInput
    };

    fetch('http://localhost:8755/versions/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        const newVersionWindow = new NewVersionWindow();
        this._pluginWindow.parentNode.removeChild(this._pluginWindow);
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
    this._status.className = "error";
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