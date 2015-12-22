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

    'click .delete': function () {

      //this._id is the id of the item that this event is being called on

      Meteor.call('deleteDoc', this._id);

    },

    'dblclick .storyContent': function () {

      var objectText = allDocs.findOne(this._id).storyContent

      var objectAsParagraph = document.getElementById(this._id);

      var objectAsInputElement = document.createElement("input");

      objectAsInputElement.name = 'editable'

      objectAsInputElement.value = objectText;

      objectAsParagraph.parentNode.replaceChild(objectAsInputElement, objectAsParagraph);



       
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

  }

});



























