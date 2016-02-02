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
            data:["dm"]
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
                data:[{name:"dm",value:123}]
            }
        ]
    };
    var data=[],legendData=[];
    $scope.$watch('esResponse', function(resp) {
      if (!resp) {
        return;
      }
     
      console.log("--------------resp---------------------");
      console.log(resp);
      var tableGroups = tabifyAggResponse($scope.vis, resp);
      console.log(tableGroups)
      console.log("--------------mychart---------------------");
     
      tableGroups.tables.forEach(function (table,index) {
        var cols = table.columns;
        data= [], legendData=[]; 
        table.rows.forEach(function (row,i) {

          console.log(row[0])
          console.log(row[0].toString())
          console.log(row[1])
            var item = {};
            var name = row[0].toString()
            item.name = name;//cols[i].aggConfig.params.field.displayName;
            item.value = row[1];
            data.push(item);
            legendData.push(name);
        });
        option.series[index].data=data;
      });
      
      
      let mychart = echarts.init($element.get(0));

      option.legend.data=legendData;
     
      console.log(option)
      mychart.setOption(option);
      
      return  notify.timed('Echarts Pie Controller', resp);
    });
  });