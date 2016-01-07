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

    if (allDocVersions.findOne({originalStoryId: storyId})) {

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

      // x.storyVersions.push(version);

    } else {

      console.log("I don't exist yet");

      allDocVersions.insert({

        originalStoryId: storyId,
        storyVersions: [{
          versionAddedAt: new Date(),
          story: storyContent,
          editorId: editorId
        }]

      });

    }


  },

  test: function () {
    console.log('test');
  }

});