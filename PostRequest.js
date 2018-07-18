PostRequest.prototype = new Object();
PostRequest.prototype.constructor = PostRequest;

/**
 * @constructor
 */
function PostRequest() {

  // Http requests management
  this.httpService = intuiface.get("httpService");
};


PostRequest.prototype.sendJson = function(url, authorization, body) {
  console.log("sendJson with " + body);
  var headers = {};
  headers["Content-Type"] = "application/json";

  if (authorization != undefined) {
    headers.Authorization = authorization;
  }

  this.httpService.post(url, headers, JSON.parse(body), {
    "success": function(result) {
      console.log("Success : " + result);
    },
    "error": function(errorMessage) {
      console.error(errorMessage);
    }
  });
};

PostRequest.prototype.sendValues = function(url, authorization, key1, value1, key2, value2, key3, value3, key4, value4, key5, value5, key6, value6, key7, value7, key8, value8, key9, value9, key10, value10) {
  var body = {};

  this._addValueToBody(body, key1, value1);
  this._addValueToBody(body, key2, value2);
  this._addValueToBody(body, key3, value3);
  this._addValueToBody(body, key4, value4);
  this._addValueToBody(body, key5, value5);
  this._addValueToBody(body, key6, value6);
  this._addValueToBody(body, key7, value7);
  this._addValueToBody(body, key8, value8);
  this._addValueToBody(body, key9, value9);
  this._addValueToBody(body, key10, value10);

  this.sendJson(url, authorization, JSON.stringify(body));
};

PostRequest.prototype._addValueToBody = function(body, key, value) {
  if (key != undefined && key != '') {
    var keyPath = key.split('.');
    var currentNode = body;
    var index = 0;
    while (index < keyPath.length - 1) {
      if (currentNode[keyPath[index]] == undefined) {
        currentNode[keyPath[index]] = {};
      }

      currentNode = currentNode[keyPath[index]];
      index++;
    }

    //currentNode[keyPath[index]] = value;
	
	 try
    {
      currentNode[keyPath[index]] = JSON.parse(value);
    }
    catch(error)
    {
      currentNode[keyPath[index]] = value;
    }
	
  }
};
