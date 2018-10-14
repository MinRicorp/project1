(function(ext) {
3      // Cleanup function when the extension is unloaded
4      ext._shutdown = function() {};
5

6      // Status reporting code
7      // Use this to report missing hardware, plugin or unsupported browser
8      ext._getStatus = function() {
9          return {status: 2, msg: 'Ready'};
10      }; 
11

12      ext.getImageDescription = function(image, callback) {
13        var imgUri = "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13001003/Beagle-MP.jpg"
14        var str = '{"requests":[{"image":{"source":{"imageUri":"' + imgUri + '"}},"features":[{"type":"LABEL_DETECTION","maxResults":3}]}]}'
15        var request = new XMLHttpRequest();
16        request.onreadystatechange= function () {
17            if (request.readyState==4) {
18                //handle response
19                callback(this.responseText);
20            }
21        }
22        request.open("POST", "https://vision.googleapis.com/v1/images:annotate?alt=json&key=API_KEY", true);
23        request.setRequestHeader('Content-Type', 'application/json');
24        request.send(str);
25      };
26

27      // Block and block menu descriptions
28      var descriptor = {
29          blocks: [
30              // Block type, block name, function name, param1 default value, param2 default value
31              ['R', 'image : %s', 'getImageDescription', 'image'],
32          ],
33          displayName: 'google Vision API Block'
34      };
35

36      // Register the extension
37      ScratchExtensions.register('google Vision API sample', descriptor, ext);
38  })({});
