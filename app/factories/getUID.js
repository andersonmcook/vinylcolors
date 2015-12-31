app.factory("getUID", function() {
  var bucket = '';
  return {
    addUID: function(value) {
      bucket = value;
      return bucket;
    },
    getUID: function() {
      return bucket;
    }
  };
});