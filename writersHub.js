allDocs = new Mongo.Collection('documents');

if (Meteor.isClient) {


  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  //body helpers and events

  Template.body.helpers({

    allUserDocs: function () {

      return allDocs.find({}, {sort: {createdAt: -1}});

    }

  });




  // Create Doc Template Helpers

  Template.makeDoc.helpers({

    test: function () {

      console.log('doc helper test');

    }

  });

  // Create Doc Template events 

  Template.makeDoc.events({

    'submit form': function (event) {

      event.preventDefault();

      var storyContent = event.target.storyContent.value,
          currentUserId = Meteor.userId(),
          currentUsername = Meteor.user().username;
      
      allDocs.insert({
        storyContent: storyContent,
        createdBy: currentUserId,
        createdAt: new Date(),
        username: currentUsername
      });

      //temporary. Once we have a User's full document, we don't want to clear the form obviously

      event.target.storyContent.value = "";


    }

  });




  //User's documents helpers

  Template.userDoc.helpers({

    isOwner: function () {

      return this.owner === Meteor.userId();

    }

  });

  Template.userDoc.events({

    'click #delete': function () {

      //this._id is the id of the item that this event is being called on

      Meteor.call('deleteDoc', this._id);

    },

    'dblclick .storyContent': function () {

      var objectText = allDocs.findOne(this._id).storyContent;

      //set session keys
      Session.keys = {
        originalStoryContent: objectText,
        storyId: this._id,
        editorId: Meteor.userId()
      };
      
      //replace button
      var deleteButton = document.getElementById('delete');
      var goBackButton = document.createElement("button");
      goBackButton.id = 'goBack';
      goBackButton.innerHTML = 'Nevermind';
      deleteButton.parentNode.replaceChild(goBackButton, deleteButton);

      //show form and set it's value to the paragraph content
      document.getElementById('edited').style.visibility = 'visible'
      var editedContent = document.getElementById('editedContent');
      editedContent.value = objectText;

      //hide paragraph 
      document.getElementById(this._id).style.visibility = 'hidden';

    },

    'click #goBack': function () {

      var goBackButton = document.getElementById('goBack');
      var deleteButton = document.createElement("button");
      deleteButton.id = 'delete';
      deleteButton.innerHTML = 'delete';
      goBackButton.parentNode.replaceChild(deleteButton, goBackButton);

      document.getElementById('edited').style.visibility = 'hidden';

      delete Session.keys.storyId;
      delete Session.keys.originalStoryContent;
      delete Session.keys.editorId;
    
    },

    'submit #edited': function (event) {
      
      event.preventDefault();

      Meteor.call('updateDoc', Session.keys.storyId, Session.keys.editorId, event.target.editedContent.value);

    }

  });

}







if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({

  deleteDoc: function (docId) {

    allDocs.remove(docId);

  },

  updateDoc: function (storyId, editorId, editedContent) {

    console.log(storyId, editorId, editedContent);
    
    allDocs.update({
      _id: storyId,
      storyContent: editedContent,
      editorId: editorId
    });

  }

});



























