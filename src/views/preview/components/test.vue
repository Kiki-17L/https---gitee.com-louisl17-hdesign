<template>
  <div style="height: 100%; width: 100%">
    <component :is="chart.cptKey" :option="chart.option"></component>
  </div>
</template>

<script>
import Options from '@/components/options'
import { number } from 'echarts'
export default {
  data() {
    return {
      chart: {},
    }
  },

  props: {
    num: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.chart = Options[0].children[this.num]
  },
}
</script>
