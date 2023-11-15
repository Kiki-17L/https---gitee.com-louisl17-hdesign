import Vue from 'vue'
//import cpt_input from '@/components/element/cpt-input'

import chart_pie from '@/components/echarts/chart-pie.vue'
import chart_column from '@/components/echarts/chart-column.vue'
import chart_line from '@/components/echarts/chart-line.vue'
import chart_gauge from '@/components/echarts/chart-gauge.vue'
import chart_clock from '@/components/echarts/chart-clock.vue'
let cptList = [chart_pie, chart_column, chart_line, chart_gauge, chart_clock]

cptList.forEach((ele) => {
  Vue.component(ele.name, ele)
})
