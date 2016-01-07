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
      
      
      Meteor.call("createDoc", storyContent, currentUserId, currentUsername, function () {

        x = allDocs.findOne({storyContent: storyContent})._id;
        Meteor.call("createVersion", x, storyContent);

      });

      event.target.storyContent.value = "";

    }

  });