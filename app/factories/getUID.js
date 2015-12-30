app.factory("getUID", function() {
  var bucket = '';
  return {
    addUID: function(value) {
      bucket = value;
      console.log("uidBucket :", bucket);
      return bucket;
    },
    getUID: function() {
      console.log("uidBucket :", bucket);
      return bucket;
    }
  };
});