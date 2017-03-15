const request = require('request-promise-native');
const querystring = require('querystring');

const Teamwork = class Teamwork {
    constructor(endpoint, apiKey) {
        this.endpoint = endpoint;
        this.apiKey = apiKey;
    }

    tasks(options = {}) {
        return this._request('GET', '/tasks.json', options);
    }

    addComment(taskId, data = {}) {
        return this._request('POST', '/tasks/'+taskId+'/comments.json', null, data);
    }

    completeTask(taskId) {
        return this._request('PUT', '/tasks/'+taskId+'/complete.json', null, null);
    }

    addTimeEntry(taskId, data = {}) {
        return this._request('POST', '/tasks/'+taskId+'/time_entries.json', null, data);
    }

    _request(method, path, query = null, data = {}) {
        var uri = this.endpoint + path;
        if(query != null) uri += '?' + querystring.stringify(query);
        return request({
            method: method,
            uri: uri,
            headers: [
                'Accept: application/json',
                'Content-Type: application/json'
            ],
            'auth': {
                'user': this.apiKey
            },
            json: data,
        });
    }
}

module.exports = Teamwork;
