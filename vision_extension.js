(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getImageDescription = function(image, callback) {
      var imgUri = "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13001003/Beagle-MP.jpg"
      var str = '{"requests":[{"image":{"source":{"imageUri":"' + imgUri + '"}},"features":[{"type":"LABEL_DETECTION","maxResults":3}]}]}'
      var request = new XMLHttpRequest();
      request.onreadystatechange= function () {
          if (request.readyState==4) {
              //handle response
              callback(this.responseText);
          }
      }
      request.open("POST", "https://vision.googleapis.com/v1/images:annotate?alt=json&key=AIzaSyABsbANarp6Svn1xjrSxlLSahMrz-DbEtY", true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(str);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['R', 'image : %s', 'getImageDescription', 'image'],
        ],
        displayName: 'google Vision API Block'
    };

    // Register the extension
    ScratchExtensions.register('google Vision API sample', descriptor, ext);
})({});
