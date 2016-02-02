define(function(require) {

  // we also need to load the controller and used by the template
  require('plugins/kibana-plugin-echarts/echartsPieController');

  // register the provider with the visTypes registry
  // require('ui/registry/vis_types').register(EchartsHistogramVisType);

  return function EchartsHistogramVisType(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));
    return new TemplateVisType({
      name: 'echarts_pie',
      title: 'Pie chart',
      icon: 'fa-pie-chart',
      description: 'Pie charts are ideal for displaying the parts of some whole. For example, sales percentages by department.' + 'Pro Tip: Pie charts are best used sparingly, and with no more than 7 slices per pie.',
      params: {
        defaults: {
          shareYAxis: true,
          addTooltip: true,
          addLegend: true,
          isDonut: false
        }//,
        //editor: require('plugins/kibana-plugin-echarts/echarts_pie_editor.html')
      },
      responseConverter: false,
      hierarchicalData: true,
      schemas: new Schemas([{
        group: 'metrics',
        name: 'metric',
        title: 'Slice Size',
        min: 1,
        max: 1,
        aggFilter: ['sum', 'count', 'cardinality'],
        defaults: [{
          schema: 'metric',
          type: 'count'
        }]
      }, {
        group: 'buckets',
        name: 'segment',
        icon: 'fa fa-scissors',
        title: 'Split Slices',
        min: 0,
        max: Infinity,
        aggFilter: '!geohash_grid'
      }, {
        group: 'buckets',
        name: 'split',
        icon: 'fa fa-th',
        title: 'Split Chart',
        mustBeFirst: true,
        min: 0,
        max: 1,
        aggFilter: '!geohash_grid'
      }])
    });
  }
});
