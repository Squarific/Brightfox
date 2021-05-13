function PARSE_JWT_SITEPLUGINSNETWORK (token) {
    if (!token || !token.split) return {};
    var base64Url = token.split('.')[1];
    if (!base64Url.replace) return {};
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function SitePluginsNetwork (url) {
    this.url = url;
    this._JWT;
}

SitePluginsNetwork.prototype.setJWT = function setJWT (token) {
    this._JWT = token;
    this.useruuid = PARSE_JWT_SITEPLUGINSNETWORK(token).uuid;
};

SitePluginsNetwork.prototype.getPluginList = function getPluginList (cb) {
    fetch(this.url + '/plugins/list').then(function (res) { return res.json() }).then(function (data) {
        cb(null, data.plugins);
    });
};

SitePluginsNetwork.prototype.getVersions = function getVersions (uuid, cb) {
    fetch(this.url + '/versions/list/' + uuid).then(function (res) { return res.json() }).then(function (data) {
        cb(null, data.versions);
    });
};

SitePluginsNetwork.prototype.myPlugins = function myPlugins (cb) {
    fetch(this.url + '/plugins/my-plugins', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this._JWT,
        }
    }).then(function (res) { return res.json() }).then(function (data) {
        cb(null, data.plugins);
    });
};

SitePluginsNetwork.prototype.getVersion = function getVersion (uuid, version, cb) {
    fetch(this.url + '/versions/retrieve/' + uuid + "/" + version).then(res => res.json()).then((data) => {
        cb(null, data.version);
    });
};

SitePluginsNetwork.prototype.newPlugin = function newPlugin (dataToSend, cb) {
    dataToSend.bearer = this._JWT;
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

SitePluginsNetwork.prototype.newVersion = function newVersion (uuid, dataToSend, cb) {
    dataToSend.bearer = this._JWT;
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