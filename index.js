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

    _request(method, path, options) {
        return request({
            method: method,
            uri: this.endpoint + path + '?' + querystring.stringify(options),
            headers: [
                'Accept: application/json',
                'Content-Type: application/json'
            ],
            'auth': {
                'user': this.apiKey
            },
            json: true,
            body: JSON.stringify(options)
        });
    }
}
