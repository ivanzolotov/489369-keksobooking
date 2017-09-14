'use strict';

(function () {

  function syncValues(element, value) {
    element.value = value;
  }

  function synchronizeFields(source, target, sourceData, targetData, cb) {
    var index = sourceData.indexOf(source.value);
    var value = targetData[index];
    cb = cb || syncValues;
    cb(target, value);
  }

  window.synchronizeFields = synchronizeFields;

})();
