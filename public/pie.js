//import echarts from 'echarts/lib/echarts';
//import 'echarts/lib/chart/pie';

define(function (require) {


   // var VislibVisType = Private(require('ui/vislib_vis_type/VislibVisType'));
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    // Describe our visualization
    return new TemplateVisType({
      name: 'echarts_pie', // The internal id of the visualization (must be unique)
      title: 'Echarts Pie', // The title of the visualization, shown to the user
      description: 'Echarts Pie visualization', // The description of this vis
      icon: 'fa-cloud', // The font awesome icon of this visualization
      template: require('plugins/kibana-plugin-echarts/template/pie.html'), // The template, that will be rendered for this visualization
      // Define the aggregation your visualization accepts
      schemas: new Schemas([
          {
            group: 'metrics',
            name: 'tagsize',
            title: 'Tagsize',
            min: 1,
            max: 1,
            aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
          },
          {
            group: 'buckets',
            name: 'tags',
            title: 'Tags',
            min: 1,
            max: 1,
            aggFilter: '!geohash_grid'
          }
        ])
    });

});
