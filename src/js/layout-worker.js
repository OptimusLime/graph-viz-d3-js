importScripts('../../lib/requirejs/require.js');
importScripts('../main.js');

require({
    baseUrl: "."
  },
  ["transformer"],
  function(transformer) {

    onmessage = function(event) {
      try {
        var result = transformer.generate(event.data.source);
        postMessage({
          type: "stage",
          id: event.data.id,
          body: result
        });
      } catch (e) {
        postMessage({
          type: "error",
          id: event.data.id,
          body: e
        });
      }
    };

    postMessage({
      type: "ready"
    });
  }
);