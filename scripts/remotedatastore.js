(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    var CONTENT_SELECTOR = '[class="post-container"]';
    var FORM_SELECTOR = '[name=main-form]';
    var FormHandler = App.FormHandler;
    var Post = App.PostBoxes;

    var formHandler = new FormHandler(FORM_SELECTOR);
    var content = new Post(CONTENT_SELECTOR);

    function RemoteDS(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }


    RemoteDS.prototype.add = function(key, val) {
        return $.post(this.serverUrl, val, function(serverResponse) {
            console.log(serverResponse);
            content.addRow.call(content, serverResponse);
            window.location.reload();
        });
    };

    RemoteDS.prototype.modify = function(key, val) {
        return $.post(this.serverUrl, val, function(serverResponse) {
            console.log(serverResponse);
            content.addRow.call(content, serverResponse);
        });
    };

    RemoteDS.prototype.getAll = function(cb) {
        // Code will go here
        return $.get(this.serverUrl, function(serverResponse) {
            console.log(serverResponse);
            if (cb) {
                cb(serverResponse);
            }
        });
    };

    RemoteDS.prototype.get = function(key, cb) {
        return $.get(this.serverUrl + '/' + key, function(serverResponse) {
            console.log(serverResponse);
            if (cb) {
                cb(serverResponse);
            }
        });
    };

    RemoteDS.prototype.getSingle = function(key) {
        var URL = this.serverUrl;
        var id = key;
        $.get(this.serverUrl + '/' + key, function(serverResponse) {
            var original = serverResponse;
            original['bumps'] = parseInt(original['bumps']) + 1;
            console.log(URL);
            $.ajax(URL + '/' + id, {
                type: 'DELETE',
                success: function(response) {
                    $.post(URL, original, function(serverResponse) {
                        console.log(serverResponse);
                        window.location.reload();
                    });
                }
            })

        });
    };

    RemoteDS.prototype.remove = function(key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };

    App.RemoteDS = RemoteDS;
    window.App = App;
})(window);
