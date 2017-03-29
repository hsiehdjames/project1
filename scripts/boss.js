(function(window) {
    'use strict';
    var App = window.App || {};

    function Boss(db) {
        this.db = db;
    }

    Boss.prototype.createPosts = function(order) {
        //console.log('Adding order for ' + order.id);
        return this.db.add(order.id, order);
    };

    Boss.prototype.modifyPosts = function(posts) {
        return this.db.add(posts.id, posts);
    };

    Boss.prototype.getPosts = function(postsID) {
        return this.db.getSingle(postsID);
    };

    Boss.prototype.removePosts = function(id) {
        //console.log('Delivering order for ' + id);
        return this.db.remove(id);
    };

    Boss.prototype.printPosts = function(printFn) {
        return this.db.getAll()
            .then(function(orders) {
                var customerIdArray = Object.keys(orders);
                customerIdArray.reverse();
                //console.log('Truck #' + this.truckId + ' has pending orders:');
                customerIdArray.forEach(function(id) {
                    console.log(id);
                    if (printFn) {
                        printFn(orders[id],id);
                    }
                }.bind(this));
            }.bind(this));
    };

    //Need to create this function to test print order to make sure the order is enetered
    Boss.prototype.checkPosts = function() {
        return Object(this.db.getAll());
    };


    App.Boss = Boss;
    window.App = App;
})(window);
