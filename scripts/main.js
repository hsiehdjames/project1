(function(window) {
    'use strict';
    var FORM_SELECTOR = '[name=main-form]';
    var CONTENT_SELECTOR = '[class="post-container"]';
    var SERVER_URL = 'http://localhost:3002/post';
    var App = window.App;
    var Boss = App.Boss;
    var RemoteDataStore = App.RemoteDS;
    var FormHandler = App.FormHandler;
    var PostBoxes = App.PostBoxes;
    var $ = window.jQuery;

    var remoteDS = new RemoteDataStore(SERVER_URL);
    var newBoss = new Boss(remoteDS);
    var content = new PostBoxes(CONTENT_SELECTOR);
    //var user = 'na';

    window.newBoss = newBoss;

    var formHandler = new FormHandler(FORM_SELECTOR);
    /*formHandler.addSubmitHandler(function(data) {
        return newBoss.createPosts.call(newBoss, data).then(function() {
            console.log(data);
            content.addRow.call(content, data);
            formHandler.addBumpHandler(function(postID) {
                console.log(postID);
            });
        });
    });*/

    formHandler.addSubmitHandler(function(data) {
        return newBoss.createPosts.call(newBoss, data);
    });

    newBoss.printPosts(content.addRow.bind(content)).then(function() {
        formHandler.addBumpHandler(function(data) {
            return newBoss.getPosts.call(newBoss, data);
            //newBoss.removePosts(data);
            //original['bumps'] += 1;
            //sconsole.log(original);
            //  newBoss.createPosts(newBoss, data);
        });
    });

    $(document).scrollTop();

})(window);
