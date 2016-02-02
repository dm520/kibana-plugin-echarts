import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';

var module = require('ui/modules').get('kibana-plugin-echarts');

module.controller('EchartsPieController', function($scope, $element, $rootScope, Private, Notifier) {
  var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));
  var notify = new Notifier({ location: 'kibana-plugin-echarts/EchartsPieController'});
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
      var data=[],legendData=[];
      tableGroups.tables.forEach(function (table) {
        var cols = table.columns;
        data= [] ; 
        table.rows.forEach(function (row,i) {

         // for (var i = 1; i < row.length; i++) {
            var item = {};
            item.name = row[0];//cols[i].aggConfig.params.field.displayName;
            item.value = row[i];
            data.push(item);
            legendData.push(row[0]);
         // }

          //data.push(group);
        });
      });
      
      
      let mychart = echarts.init($element.get(0));
      option.legend.data=legendData;
      option.series.data=data;
      mychart.setOption(option);
      
      return  notify.timed('Echarts Pie Controller', resp);
    });
  });