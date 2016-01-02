app.factory("getUID", function() {
  var bucket = '';
  var bc = "";
  var sc = "";
  var c = "";
  var lc = "";
  var tc = "";
  var all = "";

  return {
    addUID: function(value) {
      bucket = value;
      return bucket;
    },
    getUID: function() {
      return bucket;
    },
    addParams: function(bcx, scx, cx, lcx, tcx) {
      bc = bcx;
      sc = scx;
      c = cx;
      lc = lcx;
      tc = tcx;
      all = bc + "/" + sc + "/" + c + "/" + lc + "/" + tc;
      return all;
    },
    getParams: function() {
      return all;
    }
  };
});