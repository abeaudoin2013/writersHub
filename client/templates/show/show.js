Template.body.helpers({

  allUserDocs: function () {

    return allDocs.find({});

  }

});

Template.Show.helpers({


    usersDocs: function () { 

      return allDocs.find({createdBy: Meteor.userId()});

    }

  });

Template.Show.events({

    "click .delete": function () {

      //this._id is the id of the item that this event is being called on

      Meteor.call("deleteDoc", this._id);

    },

    "dblclick .storyContent": function () {

      var objectText = allDocs.findOne(this._id).storyContent;

      $(".Edit").show();

      //set session keys
      Session.keys = {
        originalStoryContent: objectText,
        storyId: this._id,
        editorId: Meteor.userId()
      };
      
      $(".Edit--form-input-content").val(objectText);
      //replace button
      // var deleteButton = document.getElementsByName("delete");
      // var goBackButton = document.createElement("button");
      // goBackButton.className = "goBack";
      // goBackButton.innerHTML = "Nevermind";
      // deleteButton.parentNode.replaceChild(goBackButton, deleteButton);

      // //show form and set it"s value to the paragraph content
      // document.getElementById("edited").style.visibility = "visible"
      // var editedContent = document.getElementById("editedContent");
      // editedContent.value = objectText;

      // //hide paragraph 
      // document.getElementById(this._id).style.visibility = "hidden";

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
    
    }

  });