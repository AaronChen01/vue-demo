<template>
    <!--<div id="mychart" style="width: 600px; height: 300px; margin: 0 auto;"></div>-->

    <!--<button @click="createConnection">建立连接</button>-->
    <!--<button @click="disConnection">断开连接</button>-->
    <div class="wrapper">
        <!--<div class="selectTag" style="text-decoration: none;">-->
        <!--<a class="selectItem" href="javascript:void(0);" @click="changeTag(1)">东线</a>-->
        <!--<span style="font-size: 20px;color: floralwhite">|</span>-->
        <!--<a class="selectItem" href="javascript:void(0);" @click="changeTag(2)">西线</a>-->
        <!--</div>-->
        <!--<div class="showTitle">-->
        <!--<div class="leftIcon"></div>-->
        <!--<a class="show">数据展示</a>-->
        <!--<div class="rightIcon"></div>-->
        <!--</div>-->
        <div id="chartPanel">
            <div id="eastTunnel"></div>
            <div id="eastInfo">
                <span style="margin:0 auto;font-size: 18px;font-family: 微软雅黑;color: aliceblue;padding-top: 8px;">东线</span>
                <br/>
                <span style="margin:0 auto;font-size: 12px;font-family: 微软雅黑;color: #999999;">{{ UpdateTime }}</span>
                <table
                    style="vertical-align: middle;margin:0 auto;margin-top:3%;align-content: center;text-align: center;width: 80%; height: 60%;line-height: 100%">
                    <tbody>
                    <tr>
                        <td>
                            <span class="data">{{ eastTemperature[eastMaxIndex]}}℃</span>
                            <br/>
                            <span class="describe">最高温度</span>
                        </td>
                        <td>
                            <span class="data">{{ eastMaxPosition }}</span>
                            <br/>
                            <span class="describe">位置</span>
                        </td>
                        <td>
                            <span class="data">{{ eastIndex[eastMaxIndex] }}</span>
                            <br/>
                            <span class="describe">传感器编号</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="data">{{ eastTemperature[eastMinIndex] }}℃</span>
                            <br/>
                            <span class="describe">最低温度</span>
                        </td>
                        <td>
                            <span class="data">{{ eastMinPosition }}</span>
                            <br/>
                            <span class="describe">位置</span>
                        </td>
                        <td>
                            <span class="data">{{ eastIndex[eastMinIndex] }}</span>
                            <br/>
                            <span class="describe">传感器编号</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <br/>
            <div id="westTunnel"></div>
            <div id="westInfo">
                <span style="margin:0 auto;font-size: 18px;font-family: 微软雅黑;color: aliceblue;padding-top: 8px;">西线</span>
                <br/>
                <span style="margin:0 auto;font-size: 12px;font-family: 微软雅黑;color: #999999;">{{ UpdateTime }}</span>
                <table
                    style="vertical-align: middle;margin:0 auto;margin-top:3%;align-content: center;text-align: center;width: 80%; height: 60%;line-height: 100%">
                    <tbody>
                    <tr>
                        <td>
                            <span class="data">{{ westTemperature[westMaxIndex]}}℃</span>
                            <br/>
                            <span class="describe">最高温度</span>
                        </td>
                        <td>
                            <span class="data">{{ westMaxPosition }}</span>
                            <br/>
                            <span class="describe">位置</span>
                        </td>
                        <td>
                            <span class="data">{{ westIndex[westMaxIndex] }}</span>
                            <br/>
                            <span class="describe">传感器编号</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="data">{{ westTemperature[westMinIndex] }}℃</span>
                            <br/>
                            <span class="describe">最低温度</span>
                        </td>
                        <td>
                            <span class="data">{{ westMinPosition }}</span>
                            <br/>
                            <span class="describe">位置</span>
                        </td>
                        <td>
                            <span class="data">{{ westIndex[westMinIndex] }}</span>
                            <br/>
                            <span class="describe">传感器编号</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <el-dialog id="history" :title="tablename" style="height: 600px;" :visible.sync="historyTableVisible">
            <div id="showHistory" style="width: 600px;height: 300px;margin: 0 auto;"></div>
            <span slot="footer" class="dialog-footer">
                    <!--<el-button @click="historyTableVisible = false">取 消</el-button>-->
                    <el-button type="primary" @click="historyTableVisible = false">确 定</el-button>
                </span>
        </el-dialog>
        <!--<div id="history" >-->
        <!--<div id="show" style="width: 100%;height: 100%;margin: 0 auto;"></div>-->
        <!--</div>-->
    </div>
</template>

<script>
    //    import eCharts from 'echarts'
    import Promise from 'Promise'
    import lodash from 'lodash'
    import async from '../assets/js/yjasync'
    import update from '../assets/js/UpdateData'
    import {myEvent} from '../assets/js/EventEmitter'

    //    import mock from '../assets/mock/mock'
    import mockData from '../assets/mock/res.json'
    import scoreData from '../assets/mock/scoreTable.json'
    import thresholdData from '../assets/mock/threshold.json'

    //    import dark from '../assets/js/dark'

    //    import EventEmitter from 'events'

    var eastMile = []
    var westMile = []
    var score = []
    var threshold = []
    var thresholdItem = {
        "upperThreshold": "",
        "lowerThreshold": "",
        "noiseThreshold": "",
        "thermalThreshold": "",
        "defaultThreshold": ""
    }

    export default {

        name: "echart",
        data() {
            return {
                activeItem: '东线',
                eastTunnel: null,
                westTunnel: null,

                eastIndex: [],//update.setEast(),
                eastTemperature: [],
                eastMaxPosition: null,
                eastMinPosition: null,
                eastMaxIndex: '',
                eastMinIndex: '',


                UpdateTime: "2017-12-31 7:00",
                westIndex: [],//update.setWest(),
                westTemperature: [],
                westMaxPosition: null,
                westMinPosition: null,
                westMaxIndex: '',
                westMinIndex: '',
                historyTableVisible: false,
                tablename:""
            }
        },

        //创建时建立websocket连接，向后台获取数据，注册监听事件来更新数据
        created() {
            window.onbeforeunload = this.disConnection();

            //向后端建立websocket连接
//            this.createConnection();
            myEvent.on('data', function (data) {
                //解析数据
                this.parserData(JSON.parse(data));
                console.log("events ，after parser");

                //将数据更新到图标上
                this.refresh();
                console.log("after refresh");

            }.bind(this));


            //模拟数据使用，
            this.parserJson();
            this.eastMaxIndex = this.getMaxIndex(this.eastTemperature);
            this.westMaxIndex = this.getMaxIndex(this.westTemperature);
            this.eastMaxPosition = eastMile[this.eastMaxIndex];
            this.westMaxPosition = westMile[this.westMaxIndex];

            this.eastMinIndex = this.getMinIndex(this.eastTemperature);
            this.westMinIndex = this.getMinIndex(this.westTemperature);
            this.eastMinPosition = eastMile[this.eastMinIndex];
            this.westMinPosition = westMile[this.westMinIndex];

            console.log("created done!!");
            //多图表自适应

        },

        //挂载时初始化echarts
        mounted() {
            console.log("runTime mounted.");
            $(window).onload = this.init();
        },


        methods: {
            //初始化echart
            init: function () {

                this.eastTunnel = this.$echarts.init(document.getElementById('eastTunnel'));
                this.westTunnel = this.$echarts.init(document.getElementById('westTunnel'));
                console.log('init..');
                let eastOption = {
                    title: {
                        text: '东线温度分布图',
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

                            str += data[0].seriesName + '：' + data[0].value + '<br>';
                            str += '位置: ' + eastMile[data[0].dataIndex] + '<br>';
//                            str += '评估分数:' + score[data[0].dataIndex] + '<br>';
//                            str += '阈值上限: ' + threshold[data[0].dataIndex].upperThreshold + '<br>';
//                            str += '阈值下限: ' + threshold[data[0].dataIndex].lowerThreshold + '<br>';
//                            str += '针对噪声阈值下限: ' + threshold[data[0].dataIndex].noiseThreshold + '<br>';
//                            str += '针对热冲击阈值下限: ' + threshold[data[0].dataIndex].thermalThreshold + '<br>';
//                            str += '默认建议阈值: ' + threshold[data[0].dataIndex].defaultThreshold + '<br>';

                            str += '</div>';
                            return str;
                        },
                        extraCssText: 'float:left'
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
                        data: this.eastIndex
                    },
                    yAxis: {
                        name: '温度/℃',
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                    },
                    series: [{
                        name: '温度',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: true,
                        data: this.eastTemperature
                    }]
                };
                let westOption = {
                    title: {
                        text: '西线温度分布图',
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

                            str += data[0].seriesName + '：' + data[0].value + '<br>';
                            str += '位置: ' + westMile[data[0].dataIndex] + '<br>';
//                            str += '评估分数:' + score[data[0].dataIndex] + '<br>';
//                            str += '阈值上限: ' + threshold[data[0].dataIndex].upperThreshold + '<br>';
//                            str += '阈值下限: ' + threshold[data[0].dataIndex].lowerThreshold + '<br>';
//                            str += '针对噪声阈值下限: ' + threshold[data[0].dataIndex].noiseThreshold + '<br>';
//                            str += '针对热冲击阈值下限: ' + threshold[data[0].dataIndex].thermalThreshold + '<br>';
//                            str += '默认建议阈值: ' + threshold[data[0].dataIndex].defaultThreshold + '<br>';
                            str += '</div>';
                            return str;
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
                        name: '温度/℃',
                        axisLine: {
                            lineStyle: {
                                color: '#FFFFFF',
                            }
                        },
                    },
                    series: [{
                        name: '温度',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: true,
                        data: this.westTemperature
                    }]
                };
                this.eastTunnel.setOption(eastOption);
                this.westTunnel.setOption(westOption);

                this.eastTunnel.on('mousedown', function (params) {
                    this.historyTableVisible = true;
                    let node = document.getElementById('history');
                    this.tablename = params.name + "号传感器历史数据";
                    this.$nextTick(() => {

                        var myChart = this.$echarts.init(document.getElementById('showHistory'));

                        console.log("2")
                        // 指定图表的配置项和数据
                        var option = {
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line'
                            }]
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
                    let node = document.getElementById('history');
                    this.tablename = params.name + "号传感器历史数据";
                    this.$nextTick(() => {

                        var myChart = this.$echarts.init(document.getElementById('showHistory'));

                        console.log("2")
                        // 指定图表的配置项和数据
                        var option = {
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line'
                            }]
                        };

                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                    });
                    // 基于准备好的dom，初始化echarts实例

//
////                    this.showHistory(params);
                    console.log("mousedown over");
                }.bind(this));

                this.eastTunnel.resize();
                this.westTunnel.resize();


                //动态更新数据到图表上
//                this.refresh();
                window.onresize = function () {
                    console.log("window resize")
                    this.eastTunnel.resize();
                    this.westTunnel.resize();
                }.bind(this);
            },
//            connecServer:function () {
//                // 连接SockJS 的endpoint 名称为“/endpointWisely”
//                var socket = new SockJS('/dll/endpointWisely');
//                // 使用STOMP 子协议的WebSocket 客户端
//                this.stompClient = Stomp.over(socket);
//
//                // 连接WebSocket 服务端。
//                this.stompClient.connect({}, function (frame) {
//                    console.log('Connected: ' + frame);
//                    var that = this;
//                    that.subscribe("/topic/getResponse", function (ms) {
//                        if (ms.body) {
//                            console.log('get数据ok：' + ms.body);
//                            this.rawData = ms.body;
//                            // showResponse(ms.body); //JSON.stringify(ms.body)
//                        } else {
//                            console.log("mno data!");
//                        }
//                    });
//                    that.send("/welcome",{},JSON.stringify({'name':"cyj"}));
//                });
//            },
            //更新温度数据数据
            //解析从后台返回的温度数据放入data中
            resizeTunnel: function () {
                console.log("resize");
                this.eastTunnel.resize();
                this.westTunnel.resize();
            }.bind(this),

            showHistory: function (data) {

            },
            //解析后台返回的数据
            parserData: function (data) {
                console.log("Message>>>" + data + "<<<");
                this.eastTemperature = update.getEastTemp(data);
                this.westTemperature = update.getWestTemp(data);
                this.UpdateTime = update.getTime(data);
            },

            //将数据更新到图表上
            refresh: function () {
                this.eastTunnel.setOption({
                    title: {
                        subtext: "2017-12-31 7:00", //this.UpdateTime,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '温度',
                        data: this.eastTemperature
                    }]
                });
                this.westTunnel.setOption({
                    title: {
                        subtext: "2017-12-31 7:00",
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '温度',
                        data: this.westTemperature
                    }]
                });
            },

            //建立websocket连接
            createConnection: function () {
                update.connectServer();
            },
            //断开连接
            disConnection: function () {
                update.disconnect();
            },

            changeTag: function (tag) {
                if (tag == 1) {
                    document.getElementById('eastTunnel').style.display = 'block';
                    document.getElementById('westTunnel').style.display = 'none';
                }
                else {
                    document.getElementById('westTunnel').style.display = 'block';
                    document.getElementById('eastTunnel').style.display = 'none';
                }
            },

            /**
             * 数据模拟相关函数
             */
            //解析模拟数据，仅用于测试展示
            parserJson: function () {
                let temp = null;
//                console.log(mockData[]);
                for (let i = 0; i < 380; i++) {
                    this.eastTemperature.push(mockData[i]["temperature"]);
                    eastMile.push(mockData[i]["Mile"]);
                    this.eastIndex.push(mockData[i]["LineSN"]);
                    score.push(scoreData[i]["Score"]);

                    thresholdItem.upperThreshold = thresholdData[i]["upperThreshold"];
                    thresholdItem.lowerThreshold = thresholdData[i]["lowerThreshold"];
                    thresholdItem.noiseThreshold = thresholdData[i]["noiseThreshold"];
                    thresholdItem.thermalThreshold = thresholdData[i]["thermalThreshold"];
                    thresholdItem.defaultThreshold = thresholdData[i]["defaultThreshold"];
                    temp = lodash.clone(thresholdItem)
                    threshold.push(temp);
                }
                for (let i = 380; i < 1156; i++) {
                    this.westTemperature.push(mockData[i]["temperature"]);
                    westMile.push(mockData[i]["Mile"]);
                    this.westIndex.push(mockData[i]["LineSN"]);

                    score.push(scoreData[i]["Score"]);

                    thresholdItem.upperThreshold = thresholdData[i]["upperThreshold"];
                    thresholdItem.lowerThreshold = thresholdData[i]["lowerThreshold"];
                    thresholdItem.noiseThreshold = thresholdData[i]["noiseThreshold"];
                    thresholdItem.thermalThreshold = thresholdData[i]["thermalThreshold"];
                    thresholdItem.defaultThreshold = thresholdData[i]["defaultThreshold"];
                    temp = lodash.clone(thresholdItem)
                    threshold.push(temp);
                }
            },
            getMaxIndex: function (data) {
                let temp = 0;
                let index = -1;
                for (let i = 0; i < data.length; i++) {
                    if (data[i] > temp) {
                        temp = data[i];
                        index = i;
                    }
                }
                return index;
            },
            getMinIndex: function (data) {
                let temp = 9999;
                let index = -1;
                for (let i = 0; i < data.length; i++) {
                    if (data[i] < temp) {
                        temp = data[i];
                        index = i;
                    }
                }
                return index;
            }

        },


//        stompClient:{
//            monitorIntervalTime: 100,
////            stompReconnect: true,
//            timeout(orgCmd) {
//                console.log('Timeout..');
//            }
//        }
//        onConnected(frame){
//            console.log('Connected: ' + frame);
//            this.$stompClient.subscribe('/topic/getResponse', this.responseCallback, this.onFailed);
//        },
//        onFailed(frame){
//            console.log('Failed: ' + frame);
//        },
//        connectSrv(){
//            var headers = {
//                "login": 'guest',
//                "passcode": 'guest',
//                // additional header
//            };
//            this.connetWM(headers, this.onConnected, this.onFailed);
//        },
//        getInvokeId(){
//            let hex = (this.invokeIdCnt++ ).toString(16);
//            var zero = '0000';
//            var tmp  = 4-hex.length;
//            return zero.substr(0,tmp) + hex;
//        },
//        send(){
//            let destination = '/exchange/test'
//            let invokeId = this.getInvokeId();
//            let body = msgHead + invokeId + msgBody;
//            this.sendWM(destination, body, invokeId, this.responseCallback, 3000);
//        },
//        responseCallback(frame){
//            console.log("responseCallback msg=>" + frame.body);
//            this.rawData = frame.body;
//            let invokeId = frame.body.substr(invokeIdIndex, 4);
//            this.removeStompMonitor(invokeId);
//        },
//        disconnect(){
//            this.disconnetWM();
//        }
    }
</script>

<style>
    .wrapper {
        position: absolute;
        width: 100%;
        height: inherit;
        text-align: center;
    }

    .showTitle {
        display: inline-block;
        margin: 0 auto;
        font-size: 20px;
        font-family: 楷体;
        color: aliceblue;
        line-height: 36px;
    }

    .leftIcon {
        display: inline-block;
        width: 30px;
        height: 20px;
        background-image: url("../assets/img/right.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .rightIcon {
        display: inline-block;
        width: 30px;
        height: 20px;
        background-image: url("../assets/img/left.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    #chartPanel {
        position: absolute;
        float: left;
        display: block;
        width: 100%;
        height: inherit;
        padding: 10px;
    }

    .selectItem {
        text-decoration: none;
        color: #FAFAD2;
        font-size: 18px;
    }

    .selectItem hover {
        color: #FFDEAD
    }

    #eastTunnel, #westTunnel {
        /*z-index: auto;*/
        /*margin-top: 5px;*/
        padding-top: 8px;
        position: relative;
        width: 70%;
        height: 300px;
        text-align: center;
        float: left;
        /*margin: 0 auto;*/
        align-content: center;
        background-image: url("../assets/img/bg-big.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        /*border:1px solid black;*/
        display: inline-block;
        vertical-align: middle;
    }

    /*#history{*/
    /*z-index: 99999;*/
    /*!*position: absolute;*!*/
    /*display: none;*/
    /*margin:50% auto;*/
    /*margin-top: 20px;*/
    /*width:800px;*/
    /*height: 480px;*/
    /*border-radius: 10px;*/
    /*background-color: rgba(255,255,255,1);*/
    /*opacity: 1;*/

    /*border: 1px #6f7180 solid;*/
    /*}*/
    #eastInfo, #westInfo {
        padding-top: 8px;
        position: relative;
        width: 28%;
        height: 300px;
        text-align: center;
        /*margin: 0 auto;*/
        /*float: right;*/
        /*margin-left: 5px;*/
        align-content: center;
        background-image: url("../assets/img/bg-big.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        /*border:1px solid black;*/
        display: inline-block;
        vertical-align: middle;
    }

    .data {
        font-family: 微软雅黑;
        font-size: 16px;
        color: aliceblue;
        line-height: 38px;
    }

    .describe {
        font-family: 微软雅黑;
        font-size: 14px;
        color: #c6e2ff;
    }

    #cont2 {
        width: 100%;
        height: inherit;
    }

</style>
