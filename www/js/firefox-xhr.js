var id = 0;

var ffXHR = function() {
    console.log("creating new ff obj");

    var self = this;

    this.readyState = 1;
    this.status = 500;
    this.statusText = "";
    this.request = {};
    this.id = id++;

    this.open = function(type, url, async, username, password) {
        console.log("opening a new request");
        self.request = {
            id: self.id,
            type: type,
            url: url,
            async: async,
            username: username,
            password: password,
            headers: []
        };
    };
    this.abort = function() {

    };
    this.setRequestHeader = function(key, value) {
        self.request.headers.push({
            key: key,
            value: value
        });
    };
    this.getAllResponseHeaders = function() {
        return "";
    };
    this.send = function(payload) {
        //console.log("send request to " + self.request.url);
        if (payload)
            self.request.payload = payload;
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent("xhr-request", true, true, self.request);
        document.documentElement.dispatchEvent(event);
    };
    this.onreadystatechange = function() {
        //console.log("state changed");
    };
    window.addEventListener("xhr-reply", function(event) {
        //console.log("xhr-reply! " + self.request.url);
        var xhr = event.detail;
        if (xhr.id == self.id) {
            self.readyState = xhr.readyState;
            self.status = xhr.status;
            self.statusText = xhr.statusText;
            self.responseText = xhr.responseText;
            self.onreadystatechange();
        }
    }, false);
    return self;
};

var firefoxXHR = function() {
    return new ffXHR();
};