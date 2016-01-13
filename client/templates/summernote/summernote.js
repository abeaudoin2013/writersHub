Template.Summernote.rendered = function() {
     $('#summernote').summernote({
         height: 200,   // set editable area's height
         width: 400,
         focus: true    // set focus editable area after Initialize summernote
     });

     var html = $('#summernote').summernote('code');
}