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

      //Get story content, userId and Username
      var storyContent = event.target.storyContent.value,
          currentUserId = Meteor.userId(),
          currentUsername = Meteor.user().username;
      
      //Call method on the server to create a doc, and pass these arguments and callback
      Meteor.call("createDoc", storyContent, currentUserId, currentUsername, function () {

        //call back function finds the most recently made document
        //finds its Id,
        //Call method to server to add this story to the versions table.
        x = allDocs.findOne({storyContent: storyContent})._id;
        Meteor.call("createVersion", x, storyContent);

      });

      //clear form
      event.target.storyContent.value = "";

    }

  });