function NewPluginWindow (gui) {
    this.gui = gui;

    this._pluginWindow = this.gui.createWindow({
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
    const dataToSend = {
        name: this._nameInput.value,
        desciption: this._descriptionInput.value
    };

    fetch('http://localhost:8755/plugins/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
        if (!data) {
            console.log("Data error", data)
            return this.displayError("Unknown data error.");
        }
        
        if (data.errors) {
            return this.displayError(data.errors.map(el => el.msg).join("\n"));
        }

        const newVersionWindow = new NewVersionWindow(this.gui, {
            uuid: data.uuid,
            name: dataToSend.name,
            description: dataToSend.description
        });
        this._pluginWindow.parentNode.removeChild(this._pluginWindow);
    })
    .catch((error) => {
        this.displayError(error);
    });
};

NewPluginWindow.prototype.displayError = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);

    this._status.appendChild(document.createTextNode(errorText));
    this._status.className = "error";
};

NewPluginWindow.prototype.displaySuccess = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);

    this._status.appendChild(document.createTextNode(errorText));
    this._status.className = "error";
};

NewPluginWindow.prototype.clearStatus = function displayError (errorText) {
    while (this._status.firstChild) this._status.removeChild(this._status.firstChild);
    this._status.className = "";
};