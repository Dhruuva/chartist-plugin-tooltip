/**
 * Chartist.js plugin to display a data label on top of the points in a line chart.
 *
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  var defaultOptions = {
    currency: null
   
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.tooltip = function(options) {

    options = Chartist.extend({}, defaultOptions, options);

    return function tooltip(chart) {
      var tooltipSelector = '.ct-point';
      if (chart instanceof Chartist.Bar) {
        tooltipSelector = '.ct-bar';
      } else if (chart instanceof Chartist.Pie) {
        tooltipSelector = '.ct-slice';
      }

      var $chart = $(chart.container);
      var $toolTip = $chart
      .append('<div class="tooltip"></div>')
      .find('.tooltip')
      .hide();

      $chart.on('mouseenter', tooltipSelector, function() {
        var $point = Ember.$(this);
        var tooltipText = '';

        if ($point.attr('ct:meta')) {
          tooltipText += $point.attr('ct:meta') + '<br>';
        }

        var value = $point.attr('ct:value');
        if (options.currency) {
          value = options.currency + value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        }
        tooltipText += value;

        $toolTip.html(tooltipText).show();
      });

      $chart.on('mouseleave', tooltipSelector, function() {
        $toolTip.hide();
      });

      $chart.on('mousemove', function(event) {
        $toolTip.css({
          left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
          top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
        });
      });
    }
  };

}(window, document, Chartist));
