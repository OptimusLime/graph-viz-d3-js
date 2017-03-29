define(["styliseur"], function(styliseur) {
  return {
    document: function(selection, attributer) {
      selection
        .transition()
        .delay(0)
        .duration(10)
        .call(attributer);
    },
    canvas: function (selection, attributer) {
      selection
        .transition()
        .delay(0)
        .duration(10)
        .call(attributer)
        .call(styliseur);
    },
    nodes: function (selection, attributer) {
      selection
        .style("opacity", 0.0)
        .transition()
        .delay(0)
        .duration(10)
        .call(attributer)
        .call(styliseur);
    },
    relations: function (selection, attributer) {
      selection
        .style("opacity", 0.0)
        .transition()
        .delay(0)
        .duration(10)
        .call(attributer)
        .call(styliseur);
    },
    exits: function (selection, attributer) {
      selection
        .transition()
        .duration(10)
        .style("opacity", 0.0)
        .call(attributer);
    },
    shapes: function (shapes, attributer) {
      shapes
        .transition()
        .delay(0)
        .duration(10)
        .call(attributer)
        .call(styliseur);
    },
    labels: function (labels, attributer) {
      labels
        .transition()
        .delay(0)
        .duration(10)
        .call(attributer)
        .call(styliseur);
    }
  };
});