function NewPluginWindow (gui, network) {
    this._gui = gui;
    this._network = network;

    this._pluginWindow = this._gui.createWindow({
        title: "New plugin",
        close: true
    })

    var content = this._pluginWindow.appendChild(document.createElement("div"));
	content.classList.add("content");
	
	var title = content.appendChild(document.createElement("h2"));
	title.appendChild(document.createTextNode("New plugin"));

    this._createForm(content);
}

NewPluginWindow.prototype._createForm = function _createForm (content) {
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

NewPluginWindow.prototype._submitData = function _submitData () {
    const newPluginData = {
        name: this._nameInput.value,
        description: this._descriptionInput.value
    };

    this._network.newPlugin(newPluginData, (err, newPlugin) => {
        if (err) return this.displayError(err);

        const newVersionWindow = new NewVersionWindow(this._gui, this._network, {
            uuid: newPlugin.uuid,
            name: newPluginData.name,
            description: newPluginData.description
        });

        this._pluginWindow.parentNode.removeChild(this._pluginWindow);
    });
};

NewPluginWindow.prototype.displayError = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);

    this._status.appendChild(document.createTextNode(errorText));
    this._status.className = "sitepluginserror";
};

NewPluginWindow.prototype.displaySuccess = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);

    this._status.appendChild(document.createTextNode(errorText));
    this._status.className = "sitepluginssuccess";
};

NewPluginWindow.prototype.clearStatus = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);
    this._status.className = "";
};