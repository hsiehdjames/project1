(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function PostBoxes(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    PostBoxes.prototype.addRow = function(posts,id) {
        // Remove any existing rows that match the email address
        //this.removeRow(posts.id);
        // Create a new instance of a row, using the coffee order info
        var rowElement = new Row(posts,id);
        // Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    PostBoxes.prototype.removeRow = function(id) {
        this.$element
            .find('[id="' + id + '"]')
            .remove();
    };

    function Row(posts,id) {
        if (id % 2 == 0) {
            var $div = $('<div></div>', {
                class: 'post',
                'name': 'post-right',
                id: posts.id
            });
        } else {
            $div = $('<div></div>', {
                class: 'post',
                'name': 'post-left',
                id: posts.id
            });
        }


        var $divPostArea = $('<div></div>', {
            class: 'post-area'
        });

        var $divPostName = $('<div></div>', {
            class: 'post-name'
        });

        var $divPostContent = $('<div></div>', {
            class: 'post-content'
        });

        var $divPostBump = $('<div></div>', {
            class: 'post-bump'
        });

        var $divBumpCount = $('<div></div>', {
            class: 'bump-count',
            id: posts.id
        });

        var $divBumpBt = $('<div></div>', {
            class: 'bump-bt'
        });

        var $bumpBt = $('<button></button>', {
            type: 'Button',
            class: 'btn btn-default btn-xs',
            'name': 'btnBump',
            id: posts.id
        });

        $divPostName.append(posts['name-input']);
        $divPostContent.append(posts['complaint-input']);
        $divBumpCount.append(posts.bumps);
        $bumpBt.append('Bumps!');
        $divBumpBt.append($bumpBt);
        $divPostBump.append($divBumpCount);
        $divPostBump.append($divBumpBt);
        $divPostArea.append($divPostName);
        $divPostArea.append($divPostContent);
        $divPostArea.append($divPostBump);
        $div.append($divPostArea);

        this.$element = $div;
    }

    App.PostBoxes = PostBoxes;
    window.App = App;
})(window);
