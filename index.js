module.exports = function(kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/kibana-plugin-echarts/kibana-plugin-echarts']
    }
  });
};
