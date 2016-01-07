Meteor.methods({

  createDoc: function (storyContent, currentUserId, currentUsername) {
    allDocs.insert({
        storyContent: storyContent,
        createdBy: currentUserId,
        createdAt: new Date(),
        username: currentUsername
    });
  },

  createVersion: function (storyId, storyContent) {
    
    allDocVersions.insert({

        originalStoryId: storyId,
        storyVersions: [{
          versionAddedAt: new Date(),
          story: storyContent,
          editorId: ""
        }]

      });

  },

  deleteDoc: function (docId) {

    //remove the document
    allDocs.remove(docId);

    //remove the document's versions
    x = allDocVersions.findOne({originalStoryId: docId});
    allDocVersions.remove(x._id);

  },

  updateDoc: function (storyId, editorId, editedContent) {

    //updates the doc--same as the newest version of the story's version table.
    allDocs.update(storyId, {
      $set: {
        storyContent: editedContent, 
        editorId: editorId,
        updatedAt: new Date()
      }
    });

  },

  updateVersion: function (storyId, editorId, storyContent) {

    //find the version object using storyId
    var x = allDocVersions.findOne({originalStoryId: storyId});

    //save version parameters to var
    var version = {
      versionAddedAt: new Date(),
      story: storyContent,
      editorId: editorId
    };

    //update the specific version
    allDocVersions.update(
      { _id: x._id},
      { $push: {storyVersions: version}}
    );

  }

});