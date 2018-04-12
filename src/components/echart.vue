<template>
    <div id="mychart" style="width: 600px; height: 300px"></div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "echart",
        data() {
          return {
            myChart: ''
          }
        },
        props:{
            option:{
                type:Object,
                default() {
                  return {
                    title: { text: 'ECharts 入门示例' },
                    tooltip: {},
                    xAxis: {
                      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                      name: '销量',
                      type: 'line',
                      data: [5, 20, 36, 10, 10, 20]
                    }]
                  }
                }
            }
        },
        created(){

        },
        mounted() {
            this.init();
            this.drawLine();
        },
        methods:{
            init(){
              this.myChart = echarts.init(document.getElementById('mychart'));
              console.log('created');
            },
            drawLine:function () {
                this.myChart.setOption(this.option);
            }
        }
    }
</script>

<style scoped>

</style>
