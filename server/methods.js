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

    allDocs.remove(docId);

    x = allDocVersions.findOne({originalStoryId: docId});
    allDocVersions.remove(x._id);

  },

  updateDoc: function (storyId, editorId, editedContent) {

    allDocs.update(storyId, {
      $set: {
        storyContent: editedContent, 
        editorId: editorId,
        updatedAt: new Date()
      }
    });

  },

  updateVersion: function (storyId, editorId, storyContent) {

    console.log("I exist");

    var x = allDocVersions.findOne({originalStoryId: storyId});

    var version = {
      versionAddedAt: new Date(),
      story: storyContent,
      editorId: editorId
    };

    allDocVersions.update(
      { _id: x._id},
      { $push: {storyVersions: version}}
    );

  },

  test: function () {
    console.log('test');
  }

});