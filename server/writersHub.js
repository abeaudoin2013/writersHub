Meteor.methods({

  makeDoc: function (storyContent, currentUserId, currentUsername) {
    allDocs.insert({
        storyContent: storyContent,
        createdBy: currentUserId,
        createdAt: new Date(),
        username: currentUsername
    });
  },

  makeVersionsTable: function (storyId) {

  },

  deleteDoc: function (docId) {

    allDocs.remove(docId);

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

  insertVersion: function (storyId, editorId, storyContent) {

    s = allDocVersions.findOne({originalStoryId: storyId});

    console.log(s);
    // allDocVersions.insert({
    //   originalStoryId: storyId,
    //   storyVersions: [{
    //     versionAddedAt: new Date(),
    //     story: storyContent,
    //     editorId: editorId
    //   }]
    // })

  }

});