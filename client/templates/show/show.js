
//body helpers and events

Template.body.helpers({

  allUserDocs: function () {

    return allDocs.find({}, {sort: {createdAt: -1}});

  }

});

Template.Show.helpers({

    isOwner: function () {

      return this.owner === Meteor.userId();

    }

  });

Template.Show.events({

    "click #delete": function () {

      //this._id is the id of the item that this event is being called on

      Meteor.call("deleteDoc", this._id);

    },

    "dblclick .storyContent": function () {

      var objectText = allDocs.findOne(this._id).storyContent;

      //set session keys
      Session.keys = {
        originalStoryContent: objectText,
        storyId: this._id,
        editorId: Meteor.userId()
      };
      
      //replace button
      var deleteButton = document.getElementById("delete");
      var goBackButton = document.createElement("button");
      goBackButton.id = "goBack";
      goBackButton.innerHTML = "Nevermind";
      deleteButton.parentNode.replaceChild(goBackButton, deleteButton);

      //show form and set it"s value to the paragraph content
      document.getElementById("edited").style.visibility = "visible"
      var editedContent = document.getElementById("editedContent");
      editedContent.value = objectText;

      //hide paragraph 
      document.getElementById(this._id).style.visibility = "hidden";

    },

    "click #goBack": function () {


      //change nevermind button back to delete button
      var goBackButton = document.getElementById("goBack");
      var deleteButton = document.createElement("button");
      deleteButton.id = "delete";
      deleteButton.innerHTML = "delete";
      goBackButton.parentNode.replaceChild(deleteButton, goBackButton);

      //hide form
      document.getElementById("edited").style.visibility = "hidden";

      //show paragraph
      document.getElementById(Session.keys.storyId).style.visibility = "visible";      

      //delete keys
      delete Session.keys.storyId;
      delete Session.keys.originalStoryContent;
      delete Session.keys.editorId;
    
    },

    "submit #edited": function (event) {

      //don"t send me to a new page
      event.preventDefault();

      //call the update functiom
      Meteor.call("updateDoc", Session.keys.storyId, Session.keys.editorId, event.target.editedContent.value);
      Meteor.call("insertVersion", Session.keys.storyId, Session.keys.editorId, event.target.editedContent.value);

      //clear value attr
      event.target.editedContent.value = "";

      //change nevermind back to delete
      var goBackButton = document.getElementById("goBack");
      var deleteButton = document.createElement("button");
      deleteButton.id = "delete";
      deleteButton.innerHTML = "delete";
      goBackButton.parentNode.replaceChild(deleteButton, goBackButton);

      //hide the edit form
      document.getElementById("edited").style.visibility = "hidden";

      //show the new paragraph
      document.getElementById(Session.keys.storyId).style.visibility = "visible";

      //clear Session keys
      delete Session.keys.storyId;
      delete Session.keys.originalStoryContent;
      delete Session.keys.editorId;


    }

  });