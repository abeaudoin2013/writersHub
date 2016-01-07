//Save edited copy. 
//Update current copy
//Push version to array of versions

Template.Edit.events({

  "submit .Edit--form": function (event) {

    //don"t send me to a new page
    event.preventDefault();

    var text = $(".Edit--form-input-content").val();

    Meteor.call("updateDoc", 
    	          Session.keys.storyId, 
    	          Session.keys.editorId, 
    	          text);
    
    Meteor.call("insertVersion", 
    	          Session.keys.storyId, 
    	          Session.keys.editorId, 
    	          text);

    $(".Edit--form-input-content").val("");

  }

 });

    //call the update functiom
    // Meteor.call("updateDoc", Session.keys.storyId, Session.keys.editorId, text);
    // Meteor.call("insertVersion", Session.keys.storyId, Session.keys.editorId, text);

      // //clear value attr
      // $("Edit--form-input-content").text("");

      // //change nevermind back to delete
      // var goBackButton = document.getElementById("goBack");
      // var deleteButton = document.createElement("button");
      // deleteButton.id = "delete";
      // deleteButton.innerHTML = "delete";
      // goBackButton.parentNode.replaceChild(deleteButton, goBackButton);

      // //hide the edit form
      // document.getElementById("edited").style.visibility = "hidden";

      // //show the new paragraph
      // document.getElementById(Session.keys.storyId).style.visibility = "visible";

      // //clear Session keys
      // delete Session.keys.storyId;
      // delete Session.keys.originalStoryContent;
      // delete Session.keys.editorId;


  



