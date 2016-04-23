Array.prototype.eachRecursive = function $Array$$eachRecursive$($fieldName$$, $filterOrDoFun$$, $doFun$$) {
  var $filter$$ = $doFun$$ ? $filterOrDoFun$$ : null;
  $doFun$$ = $doFun$$ || $filterOrDoFun$$;
  var $doArrayRecursive$$ = function $$doArrayRecursive$$$($arr$$) {
    if ($arr$$ && $arr$$ instanceof Array) {
      for (var $i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
        var $children_item$$ = $arr$$[$i$$];
        $filter$$ && !$filter$$($children_item$$) || $doFun$$($children_item$$);
        ($children_item$$ = $children_item$$[$fieldName$$]) && $children_item$$ instanceof Array && $doArrayRecursive$$($children_item$$);
      }
    }
  };
  $doArrayRecursive$$(this);
};
var isFunction = function $isFunction$($obj$$) {
  return $obj$$ && "[object Function]" === {}.toString.call($obj$$);
}, getObjectPath = function $getObjectPath$($obj$$, $path$$) {
  for (var $fullPath$$ = _($path$$.split(".")).filter(function($v$$) {
    return $v$$;
  }), $cursor$$ = $obj$$;$cursor$$ && $fullPath$$.length;) {
    $cursor$$ = $cursor$$[$fullPath$$.shift()];
  }
  return $cursor$$;
}, setObjectPath = function $setObjectPath$($obj$$, $path$$, $val$$) {
  if ($obj$$) {
    var $fullPath$$ = _($path$$.split(".")).filter(function($v$$) {
      return $v$$;
    });
    if (0 !== $fullPath$$.length) {
      for (var $cursor$$ = $obj$$;$fullPath$$.length && 1 < $fullPath$$.length;) {
        var $lastElem_pathPart$$ = $fullPath$$.shift();
        $cursor$$[$lastElem_pathPart$$] = $cursor$$[$lastElem_pathPart$$] || {};
        $cursor$$ = $cursor$$[$lastElem_pathPart$$];
      }
      $fullPath$$ = $fullPath$$.shift();
      $lastElem_pathPart$$ = $cursor$$[$fullPath$$];
      return isFunction($lastElem_pathPart$$) ? $val$$ instanceof Array ? $lastElem_pathPart$$.apply($cursor$$, $val$$) : $lastElem_pathPart$$.apply($cursor$$, Array.prototype.slice.call(arguments, 2)) : $cursor$$[$fullPath$$] = $val$$;
    }
  }
};
var isEmpty = function $isEmpty$($str$$) {
  return $str$$ && 0 < $str$$.length;
}, isBlank = function $isBlank$($str$$) {
  return !$str$$ || /^\s*$/.test($str$$);
};
String.prototype.toPascalCase = function $String$$toPascalCase$() {
  return this.replace(/\w\S*/g, function($txt$$) {
    return $txt$$.charAt(0).toUpperCase() + $txt$$.substr(1).toLowerCase();
  });
};
String.prototype.capitalizeFirstLetter = function $String$$capitalizeFirstLetter$() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
var newGuid = newUuid = function $newUuid$() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function($c$$) {
    var $r$$ = 16 * Math.random() | 0;
    return ("x" == $c$$ ? $r$$ : $r$$ & 3 | 8).toString(16);
  });
}, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", ID_LENGTH = 16, newShortGuid = newShortUuid = function $newShortUuid$() {
  for (var $rtn$$ = "", $i$$ = 0;$i$$ < ID_LENGTH;$i$$++) {
    $rtn$$ += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return $rtn$$;
};
var forgeApp = angular.module("app");
forgeApp.controller("hmmController", ["$rootScope", "$scope", "$location", "$mdDialog", "$mdToast", "$timeout", function($$rootScope$$, $$scope$$, $$location$$, $$mdDialog$$, $$mdToast$$, $$timeout$$) {
}]);
forgeApp = angular.module("app");
forgeApp.controller("homeController", ["$rootScope", "$scope", "$location", "$mdDialog", "$mdToast", "$timeout", "$compile", function($$rootScope$$, $$scope$$, $$location$$, $$mdDialog$$, $$mdToast$$, $$timeout$$, $$compile$$) {
}]);

