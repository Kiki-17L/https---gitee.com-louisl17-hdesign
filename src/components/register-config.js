import Vue from 'vue'
import chart_pie_config from '@/components/echarts/configview/chart-pie-config.vue'
import chart_line_config from '@/components/echarts/configview/chart-line-config.vue'
import chart_column_config from '@/components/echarts/configview/chart-column-config.vue'
import chart_gauge_config from '@/components/echarts/configview/chart-gauge-config.vue'
import chart_clock_config from '@/components/echarts/configview/chart-clock-config.vue'

let ConfigList = [chart_pie_config, chart_line_config, chart_column_config, chart_gauge_config, chart_clock_config]

ConfigList.forEach((ele) => {
  Vue.component(ele.name, ele)
})
