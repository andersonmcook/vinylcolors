app.factory("getUID", function() {
  var bucket = "";
  var all = "";

  return {
// save UID for determining where to load and push from and to firebase
    addUID: function(value) {
      bucket = value;
      return bucket;
    },
// get UID for determining where to load and push from and to firebase
    getUID: function() {
      return bucket;
    },
// add parameters for pre-saving the selection when going to the login page
    addParams: function(bc, sc, c, lc, tc) {
      all = bc + "/" + sc + "/" + c + "/" + lc + "/" + tc;
      return all;
    },
// apply parameters when coming back from login page
    getParams: function() {
      return all;
    }
  };
});