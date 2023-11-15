import chart_pie_option from '@/components/echarts/attr/chart-pie-option'
import chart_column_option from '@/components/echarts/attr/chart-column-option'
import chart_line_option from '@/components/echarts/attr/chart-line-option'
import chart_gauge_option from '@/components/echarts/attr/chart-gauge-option'
const Options = [
  {
    name: '图表',
    icon: '',
    opened: true,
    children: [
      {
        name: '饼图',
        icon: 'iconfont icon-bingtu',
        cptKey: 'chart-pie',
        option: chart_pie_option,
      },
      {
        name: '柱状图',
        icon: 'iconfont icon-zhuzhuangtu',
        cptKey: 'chart-column',
        option: chart_column_option,
      },
      {
        name: '折线图',
        icon: 'iconfont icon-zhexiantu',
        cptKey: 'chart-line',
        option: chart_line_option,
      },
      {
        name: '仪表盘',
        icon: 'iconfont icon-icon',
        cptKey: 'chart-gauge',
        option: chart_gauge_option,
        width: 300,
        height: 200,
      },
      {
        name: '时钟',
        icon: 'iconfont icon-clock',
        cptKey: 'chart-clock',
        width: 256,
        height: 191,
        option: {
          attribute: {
            axisLineWidth: 3,
            axisLabelSize: 16,
            hourPointerColor: '#C0911F',
            axisLabelDistance: 8,
            splitLineDistance: 4,
          },
        },
      },
    ],
  },
]
export default Options
