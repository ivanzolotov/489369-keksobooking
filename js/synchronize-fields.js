'use strict';

(function () {

  function syncValues(element, value) {
    element.value = value;
  }

  function synchronizeFields(source, target, sourceData, targetData, cb) {
    var i = sourceData.indexOf(source.value);
    var value = targetData[i];
    cb = cb || syncValues;
    cb(target, value);
  }

  window.synchronizeFields = synchronizeFields;

})();
