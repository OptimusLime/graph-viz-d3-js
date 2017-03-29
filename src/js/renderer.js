define(["stage", "worker!layout-worker.js"], function(stageFactory, worker) {


  var stage_count = 0;
  var stage_map = {}
  var pending = []
   worker.onmessage = function (event) {
        switch (event.data.type) {
          case "ready":
            initialized = true;
            if (pending) {
              for(var i=0; i< pending.length; i++)
                worker.postMessage(pending[i]);
            }
            pending = []
            break;
          case "stage":
            stage_map[event.data.id].draw(event.data.body)
            stage_map[event.data.id].renderCallback && stage_map[event.data.id].renderCallback()
            // stage.draw(event.data.body);
            // renderCallback && renderCallback();
            break;
          case "error":
            errorCallback = stage_map[event.data.id].errorCallback
            if (errorCallback) {
              errorCallback(event.data.body);
            }
        }
      };


  return { create: function()
    {
      var stage = stageFactory.create()
      stage.stage_id = stage_count++;
      stage_map[stage.stage_id] = {draw: stage.draw}

      var initialized = false, errorCallback, renderCallback;


      return {
        init: function(element)
        {
          return stage.init(element);
        },
        render: function(source) {
          var msg = {id: stage.stage_id, source: source}

          if (initialized) {
            worker.postMessage(msg);
          } else {
            pending.push(msg);
          }
        },
        stage: stage,
        errorHandler: function(handler) {
          errorCallback = handler;
          stage_map[stage.id].errorCallback = handler
        },
        renderHandler: function(handler) {
          renderCallback = handler;
          stage_map[stage.id].renderCallback = handler
        }
      };
    }
  }
});