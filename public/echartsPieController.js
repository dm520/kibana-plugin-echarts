import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';

var module = require('ui/modules').get('kibana-plugin-echarts');

module.controller('EchartsPieController', function($scope, $element, $rootScope, Private) {
  var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));
  
  var option = {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              x: 'left',
              data:[]
          },
          series: [
              {
                  name:'饼图',
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
                  data:[]
              }
          ]
      };

    $scope.$watch('esResponse', function(resp) {
      if (!resp) {
        return;
      }
      console.log("--------------resp---------------------");
      console.log(resp);
      var tableGroups = tabifyAggResponse($scope.vis, resp);
      console.log(tableGroups)
      console.log("--------------mychart---------------------");
      let mychart = echarts.init($element.get(0));
      mychart.setOption(option);
    });
  });