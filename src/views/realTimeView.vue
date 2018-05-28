<template>
    <div id="cont3">
        <div id="thresholdPanel">
            <div id="eastThreshold"></div>
            <div id="westThreshold"></div>
        </div>
        <el-dialog id="thresholdHistory" :title="tablename" style="height: 600px;" :visible.sync="historyTableVisible">
            <div id="thresholdHistoryShow" style="width: 600px;height: 300px;margin: 0 auto;"></div>
            <span slot="footer" class="dialog-footer">
                    <!--<el-button @click="historyTableVisible = false">取 消</el-button>-->
                    <el-button type="primary" @click="historyTableVisible = false">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>

    import scoreData from '../assets/mock/scoreTable.json'
    import thresholdData from '../assets/mock/threshold.json'
    import dark from '../assets/js/dark.js'

    var score = []

    var thresholdItem = {
        "upperThreshold": "",
        "lowerThreshold": "",
        "noiseThreshold": "",
        "thermalThreshold": "",
        "defaultThreshold": ""
    }

	export default {
		name: "realTimeView",
        data() {
            return {
                eastTunnel: null,
                westTunnel: null,

                eastIndex: [],
                eastupperThreshold:[],
                eastlowerThreshold:[],
                eastnoiseThreshold:[],
                eastthermalThreshold:[],
                eastdefaultThreshold:[],

                UpdateTime: "2017-12-31 7:00",
                westIndex: [],//update.setWest(),
                westupperThreshold:[],
                westlowerThreshold:[],
                westnoiseThreshold:[],
                westthermalThreshold:[],
                westdefaultThreshold:[],

                historyTableVisible:false,
                tablename:""
            }
        },
        created(){
            this.parserJson();
        },
        mounted(){
            console.log("runTime mounted.");
            this.init();
        },
        methods:{
            init:function () {
                this.eastTunnel = this.$echarts.init(document.getElementById('eastThreshold'));
                this.westTunnel = this.$echarts.init(document.getElementById('westThreshold'));
                console.log('init..');
                let eastOption = {
                    title: {
                        text: '东线阈值记录图',
                        subtext: "2017-12-31 7:00", //this.UpdateTime,
                        textStyle: {
                            color: '#FFFFFF',
                            fontFamily: '微软雅黑',
                            fontWeight: 16
                        },
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            animation: false,
                            snap:true
                        },
                        hideDelay:200,
                        position: function (pos, params, dom, rect, size) {
                            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
//                            var obj = {top: 60};
//                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                            return [pos[0] + 10, pos[1] - 10];
                            ;
                        },
                        formatter: function (data) {
                            var str = '';
                            str += '编号：' + data[0].name;
                            str += '<div>';
                            //为了保证和原来的效果一样，这里自己实现了一个点的效果
//                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[0].color+';"></span>';
//                            str += '位置: ' + westMile[data[0].dataIndex] + '<br>';
                            str += '评估分数:' + score[data[0].dataIndex] + '<br>';

                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[0].color+';"></span>';
                            str += data[0].seriesName + '：' + data[0].value + '<br>';
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[1].color+';"></span>';
                            str += data[1].seriesName + '：' + data[1].value + '<br>';
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[2].color+';"></span>';
                            str += data[2].seriesName + '：' + data[2].value + '<br>';
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[3].color+';"></span>';
                            str += data[3].seriesName + '：' + data[3].value + '<br>';
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[4].color+';"></span>';
                            str += data[4].seriesName + '：' + data[4].value + '<br>';
//                            str += '阈值上限: ' + threshold[data[0].dataIndex].upperThreshold + '<br>';
//                            str += '阈值下限: ' + threshold[data[0].dataIndex].lowerThreshold + '<br>';
//                            str += '针对噪声阈值下限: ' + threshold[data[0].dataIndex].noiseThreshold + '<br>';
//                            str += '针对热冲击阈值下限: ' + threshold[data[0].dataIndex].thermalThreshold + '<br>';
//                            str += '默认建议阈值: ' + threshold[data[0].dataIndex].defaultThreshold + '<br>';
                            str += '</div>';
                            return str;
                        },
                        textStyle:{
                            align:'left'
                        },
                        extraCssText: 'float:left'
                    },
                    dataZoom: {
                        type: 'inside',
                        realtime: true
                    },
                    legend: {
                        data:['阈值下限','阈值上限','针对噪声阈值下限','针对热冲击阈值下限','默认建议阈值'],
                        bottom: 10,
                        textStyle:{
                            color:'#FFFFFF',
                            backgroudColor:'#a0cfff'
                        },
                    },
                    xAxis: {
                        name: '传感器编号',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                        data: this.eastIndex
                    },
                    yAxis: {
                        name: '阈值',
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                    },
                    series: [
                        {
                            name: '阈值下限',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#ff0033',
                            data: this.eastlowerThreshold,
                        },
                        {
                            name: '阈值上限',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#FFFF00',
                            data: this.eastupperThreshold
                        },
                        {
                            name: '针对噪声阈值下限',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#EE4000',
                            data: this.eastnoiseThreshold
                        },
                        {
                            name: '针对热冲击阈值下限',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#E0FFFF',
                            data: this.eastthermalThreshold
                        },
                        {
                            name: '默认建议阈值',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#DC143C',
                            data: this.eastdefaultThreshold
                        },

                    ]
                };
                let westOption = {
                    title: {
                        text: '西线阈值记录图',
                        subtext: "2017-12-31 7:00", //this.UpdateTime,
                        textStyle: {
                            color: '#FFFFFF',
                            fontFamily: '微软雅黑',
                            fontWeight: 16
                        },
                        x: 'center'
                    },
                    legend: {
                        data:['阈值下限','阈值上限','针对噪声阈值下限','针对热冲击阈值下限','默认建议阈值'],
                        bottom: 10,
                        textStyle:{
                            color:'#FFFFFF',
                            backgroudColor:'#a0cfff'
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            animation: false
                        },
                        hideDelay:200,
                        position: function (pos, params, dom, rect, size) {
                            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
//                            var obj = {top: 60};
//                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                            return [pos[0] + 10, pos[1] - 10];
                            ;
                        },
                        formatter: function (data) {
                            var str = '';
                            str += '编号：' + data[0].name;
                            str += '<div>';
                            //为了保证和原来的效果一样，这里自己实现了一个点的效果
//                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[0].color+';"></span>';
//                            str += '位置: ' + westMile[data[0].dataIndex] + '<br>';
                            str += '评估分数:' + score[data[0].dataIndex] + '<br>';

                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[0].color+';"></span>';
                            str += data[0].seriesName + '：' + data[0].value + '<br>';
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[1].color+';"></span>';
                            str += data[1].seriesName + '：' + data[1].value + '<br>';
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[2].color+';"></span>';
                            str += data[2].seriesName + '：' + data[2].value + '<br>';
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[3].color+';"></span>';
                            str += data[3].seriesName + '：' + data[3].value + '<br>';
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+data[4].color+';"></span>';
                            str += data[4].seriesName + '：' + data[4].value + '<br>';
//                            str += '阈值上限: ' + threshold[data[0].dataIndex].upperThreshold + '<br>';
//                            str += '阈值下限: ' + threshold[data[0].dataIndex].lowerThreshold + '<br>';
//                            str += '针对噪声阈值下限: ' + threshold[data[0].dataIndex].noiseThreshold + '<br>';
//                            str += '针对热冲击阈值下限: ' + threshold[data[0].dataIndex].thermalThreshold + '<br>';
//                            str += '默认建议阈值: ' + threshold[data[0].dataIndex].defaultThreshold + '<br>';
                            str += '</div>';
                            return str;
                        },
                        textStyle:{
                            align:'left'
                        },
                    },
                    dataZoom: {
                        type: 'inside',
                        realtime: true
                    },
                    xAxis: {
                        name: '传感器编号',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                        data: this.westIndex
                    },
                    yAxis: {
                        name: '数值',
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                    },
                    series: [
                        {
                            name: '阈值下限',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#ff0033',
                            data: this.westlowerThreshold
                        },
                        {
                            name: '阈值上限',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#FFFF00',
                            data: this.westupperThreshold
                        },
                        {
                            name: '针对噪声阈值下限',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#EE4000',
                            data: this.westnoiseThreshold
                        },
                        {
                            name: '针对热冲击阈值下限',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#E0FFFF',
                            data: this.westthermalThreshold
                        },
                        {
                            name: '默认建议阈值',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            color:'#DC143C',
                            data: this.westdefaultThreshold
                        },

                    ]
                };
                this.eastTunnel.setOption(eastOption);
                this.westTunnel.setOption(westOption);
                this.eastTunnel.on('mousedown', function (params) {
                    this.historyTableVisible = true;
                    let node = document.getElementById('thresholdHistory');
                    this.tablename = params.name + "号传感器阈值历史数据";
                    this.$nextTick(() => {

                        var myChart = this.$echarts.init(document.getElementById('thresholdHistoryShow'));
                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                text: '折线图堆叠'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
                                bottom: -5,
                            },
//                            grid: {
//                                left: '3%',
//                                right: '4%',
//                                bottom: '3%',
//                                containLabel: true
//                            },
//                            toolbox: {
//                                feature: {
//                                    saveAsImage: {}
//                                }
//                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: ['周一','周二','周三','周四','周五','周六','周日']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    name:'邮件营销',
                                    type:'line',
                                    stack: '总量',
                                    data:[120, 132, 101, 134, 90, 230, 210]
                                },
                                {
                                    name:'联盟广告',
                                    type:'line',
                                    stack: '总量',
                                    data:[220, 182, 191, 234, 290, 330, 310]
                                },
                                {
                                    name:'视频广告',
                                    type:'line',
                                    stack: '总量',
                                    data:[150, 232, 201, 154, 190, 330, 410]
                                },
                                {
                                    name:'直接访问',
                                    type:'line',
                                    stack: '总量',
                                    data:[320, 332, 301, 334, 390, 330, 320]
                                },
                                {
                                    name:'搜索引擎',
                                    type:'line',
                                    stack: '总量',
                                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                                }
                            ]
                        };

                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                    });
                    // 基于准备好的dom，初始化echarts实例

//
////                    this.showHistory(params);
                    console.log("mousedown over");
                }.bind(this));
                this.westTunnel.on('mousedown', function (params) {
                    this.historyTableVisible = true;
                    let node = document.getElementById('thresholdHistory');
                    this.tablename = params.name + "号传感器阈值历史数据";
                    this.$nextTick(() => {

                        var myChart = this.$echarts.init(document.getElementById('thresholdHistoryShow'));
                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                text: '折线图堆叠'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
                                bottom: -5,
                            },
//                            grid: {
//                                left: '3%',
//                                right: '4%',
//                                bottom: '3%',
//                                containLabel: true
//                            },
//                            toolbox: {
//                                feature: {
//                                    saveAsImage: {}
//                                }
//                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: ['周一','周二','周三','周四','周五','周六','周日']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    name:'邮件营销',
                                    type:'line',
                                    stack: '总量',
                                    data:[120, 132, 101, 134, 90, 230, 210]
                                },
                                {
                                    name:'联盟广告',
                                    type:'line',
                                    stack: '总量',
                                    data:[220, 182, 191, 234, 290, 330, 310]
                                },
                                {
                                    name:'视频广告',
                                    type:'line',
                                    stack: '总量',
                                    data:[150, 232, 201, 154, 190, 330, 410]
                                },
                                {
                                    name:'直接访问',
                                    type:'line',
                                    stack: '总量',
                                    data:[320, 332, 301, 334, 390, 330, 320]
                                },
                                {
                                    name:'搜索引擎',
                                    type:'line',
                                    stack: '总量',
                                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                                }
                            ]
                        };

                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                    });
                    // 基于准备好的dom，初始化echarts实例

//
////                    this.showHistory(params);
                    console.log("mousedown over");
                }.bind(this));

            },
            /**
             * 数据模拟相关函数
             */
            //解析模拟数据，仅用于测试展示
            parserJson: function () {
                let temp = null;
//                console.log(mockData[]);
                for (let i = 0; i < 380; i++) {
//                    this.eastTemperature.push(thresholdData[i]["temperature"]);
                    this.eastIndex.push(thresholdData[i]["LineSN"]);

                    score.push(scoreData[i]["Score"]);

                    this.eastupperThreshold.push(thresholdData[i]["upperThreshold"]);
                    this.eastlowerThreshold.push(thresholdData[i]["lowerThreshold"]);
                    this.eastnoiseThreshold.push(thresholdData[i]["noiseThreshold"]);
                    this.eastthermalThreshold.push(thresholdData[i]["thermalThreshold"]);
                    this.eastdefaultThreshold.push(thresholdData[i]["defaultThreshold"]);
                }
                for (let i = 380; i < 1156; i++) {
                    this.westIndex.push(thresholdData[i]["LineSN"]);

                    score.push(scoreData[i]["Score"]);

                    this.westupperThreshold.push(thresholdData[i]["upperThreshold"]);
                    this.westlowerThreshold.push(thresholdData[i]["lowerThreshold"]);
                    this.westnoiseThreshold.push(thresholdData[i]["noiseThreshold"]);
                    this.westthermalThreshold.push(thresholdData[i]["thermalThreshold"]);
                    this.westdefaultThreshold.push(thresholdData[i]["defaultThreshold"]);

                }
            },
        }
	}
</script>

<style scoped>
    #eastThreshold,#westThreshold{
    /*z-index: auto;*/
    /*margin-top: 5px;*/
        padding-top: 8px;
        position: relative;
        width: 70%;
        height: 300px;
        text-align: center;

        /*float: left;*/
        margin: 0 auto;
        align-content: center;
        background-image: url("../assets/img/bg-big.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    /*border:1px solid black;*/
        display: inline-block;
        vertical-align: middle;
    }
</style>
