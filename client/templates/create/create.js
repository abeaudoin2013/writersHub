  // Create Doc Template Helpers

  Template.Create.helpers({

    test: function () {

      console.log("doc helper test");

    }

  });

  // Create Doc Template events 

  Template.Create.events({

    "submit form": function (event) {

      event.preventDefault();

      var storyContent = event.target.storyContent.value,
          currentUserId = Meteor.userId(),
          currentUsername = Meteor.user().username;
      
      
      Meteor.call("makeDoc", storyContent, currentUserId, currentUsername);

      console.log(this._id);

      //temporary. Once we have a User"s full document, we don"t want to clear the form obviously

      event.target.storyContent.value = "";


    }

  });