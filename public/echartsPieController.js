define(function(require) {
  // get the kibana/metric_vis module, and make sure that it requires the
  // 'kibana' module if it
  // didn't already
  // var module = require('ui/modules').get('kibana/kibi_radar_vis',
  // ['kibana']);
  // var d3 = require('d3');
  // Create an Angular module for this plugin
  var module = require('ui/modules').get('kibana-plugin-echarts');
  var d3 = require('echarts');
  
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/chart/pie';
  
  module.controller('EchartsPieController', function($scope, $element, $rootScope, Private) {
    
    var option = {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              x: 'left',
              data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
          },
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  selectedMode: 'single',
                  radius: [0, '30%'],

                  label: {
                      normal: {
                          position: 'inner'
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:[
                      {value:335, name:'直达', selected:true},
                      {value:679, name:'营销广告'},
                      {value:1548, name:'搜索引擎'}
                  ]
              },
              {
                  name:'访问来源',
                  type:'pie',
                  radius: ['40%', '55%'],

                  data:[
                      {value:335, name:'直达'},
                      {value:310, name:'邮件营销'},
                      {value:234, name:'联盟广告'},
                      {value:135, name:'视频广告'},
                      {value:1048, name:'百度'},
                      {value:251, name:'谷歌'},
                      {value:147, name:'必应'},
                      {value:102, name:'其他'}
                  ]
              }
          ]
      };
    let mychart = echarts.init($element);
    
    mychart.setOption(option);
    

    $scope.$watch('esResponse', function(resp) {
      if (!resp) {
        $scope.tags = null;
        return;
      }
      console.log(resp);

      // Retrieve the id of the configured tags aggregation
      var tagsAggId = $scope.vis.aggs.bySchemaName['tags'][0].id;
      // Retrieve the metrics aggregation configured
      var metricsAgg = $scope.vis.aggs.bySchemaName['tagsize'][0];
      console.log(metricsAgg);
      // Get the buckets of that aggregation
      var buckets = resp.aggregations[tagsAggId].buckets;

      var min = Number.MAX_VALUE, max = -Number.MAX_VALUE;

      // Transform all buckets into tag objects
      $scope.tags = buckets.map(function(bucket) {
        // Use the getValue function of the aggregation to get the value of a
        // bucket
        var value = metricsAgg.getValue(bucket);
        // Finding the minimum and maximum value of all buckets
        min = Math.min(min, value);
        max = Math.max(max, value);
        return {
          label: bucket.key,
          value: value
        };
      });
    });
  });
});
