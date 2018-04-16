<template>
    <!--<div id="mychart" style="width: 600px; height: 300px; margin: 0 auto;"></div>-->
    <div>
        <div>
            <div>
                <button id="connect" onclick="connect();value=null">连接</button>
                <button id="disconnect" disabled="disabled" onclick="disconnect();">断开连接</button>
            </div>
            <div id="conversationDiv">
                <label>输入你的名字</label><input type="text" id="name"/>
                <button id="sendName" onclick="RequestData();">发送</button>
                <p id="response"></p>
            </div>
        </div>


        <div class="wrapper">

            <div id="showdata"
                 style="width: 50%; height: 50%; position:absolute; transform: translate(50%,50%); background: #e6e6e6; display: none">
                <input class="closeButton" type="button" style="width: 30px;height: 30px" value="X"
                       onclick="closeWindow()"/>
            </div>
            <div class="cont">
                <div id="eastTunnel"></div>
                <div id="westTunnel"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import formatDate from '../assets/js/FormatDate'
    import update from '../assets/js/UpdateData'

    export default {
        name: "echart",
        data() {
            return {
                eastTunnel: '',
                westTunnel: ''
            }
        },
        props: {
            eastOption: {
                type: Object,
                default() {
                    return {
                        title: {
                            text: '北线温度分布图',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'line',
                                animation: false
                            }
                        },
                        dataZoom: {
                            type: 'inside',
                            realtime: true
                        },
                        xAxis: {
                            splitLine: {
                                show: false
                            },
                            data: eastIndex
                        },
                        yAxis: {},
                        series: [{
                            name: '温度',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            data: []
                        }]
//                    title: { text: 'ECharts 入门示例' },
//                    tooltip: {},
//                    xAxis: {
//                      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
//                    },
//                    yAxis: {},
//                    series: [{
//                      name: '销量',
//                      type: 'line',
//                      data: [5, 20, 36, 10, 10, 20]
//                    }]
                    }
                }
            },
            westOption: {
                type: Object,
                default() {
                    return {
                        title: {
                            text: '南线温度分布图',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'line',
                                animation: false
                            }
                        },
                        dataZoom: {
                            type: 'inside',
                            realtime: true
                        },
                        xAxis: {
                            splitLine: {
                                show: false
                            },
                            data: westIndex
                        },
                        yAxis: {},
                        series: [{
                            name: '温度',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: true,
                            data: []
                        }]
                    }
                }
            }
        },
        created() {

        },
        mounted() {
            this.init();
//            this.refresh();
            var msg = update.connect();
            this.parserData(msg);
        },
        methods: {
            init: function () {
                this.eastTunnel = echarts.init(document.getElementById('eastTunnel'));
                this.westTunnel = echarts.init(document.getElementById('westTunnel'));
                console.log('created');
                update.setEW();
                this.eastTunnel.setOption(this.eastOption);
                this.westTunnel.setOption(this.westOption);
            },
            refresh: function () {

            },
            parserData: function (message) {
                console.log("Message>>>" + message + "<<<");
                getData(message);
                this.eastTunnel.setOption({
                    title: {
                        subtext: update.UpdateTime,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '温度',
                        data: this.eastTemperature
                    }]
                });
                this.westTunnel.setOption({
                    title: {
                        subtext: UpdateTime,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '温度',
                        data: update.westTemperature
                    }]
                });
            }
        }
    }
</script>

<style>

</style>
