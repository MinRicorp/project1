1  
 
2  (function(ext) { 
3      // Cleanup function when the extension is unloaded 
4      ext._shutdown = function() {}; 
5  
 
6      // Status reporting code 
7      // Use this to report missing hardware, plugin or unsupported browser 
8      ext._getStatus = function() { 
9          return {status: 2, msg: 'Ready'}; 
10      }; 
11  
 
12      ext.getKoToEnTranslation = function(str, callback) { 
13        $.ajax({ 
14            url: 'http://localhost:3000/naverAPI', // 요청 할 주소 
15            async: false, // false 일 경우 동기 요청으로 변경 
16            type: 'POST', // GET, PUT 
17            data: { 
18                str_p: str 
19            }, // 전송할 데이터 
20            dataType: 'json', // xml, json, script, html 
21            // beforeSend: function(data) {callback('aaa');}, // 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단 
22            success: function(data) { 
23              var str = ''; 
24              for(var tmp in data){ 
25                  str += data[tmp]; 
26              } 
27              var obj = JSON.parse(str); 
28  
 
29              callback(obj.message.result.translatedText); 
30  
 
31            }, // 요청 완료 시 
32            error: function(data) {callback('bbb');}, // 요청 실패. 
33            complete: function(data) {callback('ccc');} // 요청의 실패, 성공과 상관 없이 완료 될 경우 호출 
34        }); 
35  
 
36        // $.post('http://localhost:3000/naverAPI', null, function(data) { 
37        //   callback(data); 
38        // }, 'json') 
39        // .done(function(data) { 
40        //   callback('bbb'); 
41        // }) 
42        // .fail(function(data) { 
43        //   callback(data); 
44        // }) 
45        // .always(function(data) { 
46        //   callback('ddd'); 
47        // }); 
48      }; 
49  
 
50      // Block and block menu descriptions 
51      var descriptor = { 
52          blocks: [ 
53              // Block type, block name, function name, param1 default value, param2 default value 
54              ['R', '한글 : %s', 'getKoToEnTranslation', '번역할 한글을 입력하세요...'] 
55          ], 
56          displayName: 'Naver NMT 번역 구현 예제' 
57      }; 
58  
 
59      // Register the extension 
60      ScratchExtensions.register('Naver NMT 번역 구현 예제', descriptor, ext); 
61  })({}); 
