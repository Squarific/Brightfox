function Network (url) {
    this.url = url;
    this.JWT;
}

Network.prototype.getPluginList = function getPluginList (cb) {
    fetch(this.url + '/plugins/list').then(function (res) { return res.json() }).then(function (data) {
        cb(null, data.plugins);
    });
};

Network.prototype.getVersions = function getVersions (uuid, cb) {
    fetch(this.url + '/versions/list/' + uuid).then(function (res) { return res.json() }).then(function (data) {
        cb(null, data.versions);
    });
};

Network.prototype.myPlugins = function myPlugins (cb) {
    fetch(this.url + '/plugins/my-plugins', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.JWT,
        }
    }).then(function (res) { return res.json() }).then(function (data) {
        cb(null, data.plugins);
    });
};

Network.prototype.getVersion = function getVersion (uuid, version, cb) {
    fetch(this.url + '/versions/retrieve/' + uuid + "/" + version).then(res => res.json()).then((data) => {
        cb(data.version);
    });
};

Network.prototype.newPlugin = function newPlugin (dataToSend, cb) {
    dataToSend.bearer = this.JWT;
    fetch(this.url + '/plugins/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {        
        if (data && data.errors) {
            return cb(data.errors.map(el => el.msg).join(", "));
        }

        cb(null, data);
    })
    .catch((error) => {
        console.log("Newplugin error", error);
        cb(error);
    });
};

Network.prototype.newVersion = function newVersion (uuid, dataToSend, cb) {
    dataToSend.bearer = this.JWT;
    fetch(this.url + '/versions/new/' + uuid, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.errors) {
            return cb(data.errors.map(e => e.msg ).join(", "));
        }

        cb(null, data.newversion);
    })
    .catch((error) => {
        cb(error)
    });
};