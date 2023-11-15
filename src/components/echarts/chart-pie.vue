<template>
  <div :id="uuid" style="width: 100%; height: 100%"></div>
</template>
<script>
import { getDataJson, pollingRefresh } from '@/utils/refreshCptData'
export default {
  name: 'chart-pie',
  props: {
    width: Number,
    height: Number,
    option: Object,
  },
  data() {
    return {
      uuid: '',
      chartOption: {},
      chart: undefined,
      cptData: [],
    }
  },
  watch: {
    'option.attribute': {
      handler(newObj) {
        this.loadChart(newObj)
      },
      deep: true, //深度监听
    },

    //监听宽度
    width() {
      this.chart.resize()
    },

    // 监听高度
    height() {
      this.chart.resize()
    },
  },
  created() {
    this.uuid = this.$v1()
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById(this.uuid)) //挂载Pie图,并将句柄返回给chart变量
    this.refreshCptData()
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.option.cptDataForm, this.loadData)
    },
    loadData() {
      getDataJson(this.option.cptDataForm).then((res) => {
        this.cptData = res
        this.loadChart(this.option.attribute)
      })
    },
    /**
     * TODO:挂载组件数据
     * @param {*} attribute
     */
    loadChart(attribute) {
      this.chartOption = {
        color: attribute.pieColor,
        title: {
          text: attribute.chartTitle,
          subtext: attribute.subtext,
          left: attribute.titleX,
          top: attribute.titleY,
          textStyle: {
            fontSize: attribute.titleFontSize,
            color: attribute.titleTextColor,
          },
          // 副标题文本样式设置
          subtextStyle: { fontSize: 12, color: attribute.subtextColor },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: attribute.legendShow,
          orient: attribute.orient,
          x: attribute.legendX,
          y: attribute.legendY,
          textStyle: {
            color: attribute.legendTextColor,
            fontSize: attribute.legendFontSize,
          },
        },
        series: [
          {
            name: attribute.chartTitle,
            type: 'pie',
            roseType: attribute.roseType === 'false' ? false : attribute.roseType,
            radius: [attribute.radiusInside + '%', attribute.radiusOutside + '%'],
            label: {
              position: attribute.labelPosition,
              fontSize: attribute.labelFontSize,
              color: attribute.labelColor,
            },
            itemStyle: {
              borderRadius: attribute.borderRadius,
            },
            data: this.cptData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(255, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      this.chart.setOption(this.chartOption)
    },
  },
}
</script>

<style scoped></style>
