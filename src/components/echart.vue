<template>
    <!--<div id="mychart" style="width: 600px; height: 300px; margin: 0 auto;"></div>-->
    <div id="cont2">

        <button @click="createConnection">建立连接</button>
        <button @click="disConnection">断开连接</button>
        <div class="wrapper">

            <!--<div id="result" result=" "></div>-->
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
//    import eCharts from 'echarts'
    import Promise from 'Promise'
    import async from '../assets/js/yjasync'
    import update from '../assets/js/UpdateData'
    import {myEvent} from '../assets/js/EventEmitter'
//    import EventEmitter from 'events'




    export default {
        name: "echart",
        data() {
            return {
                eastTunnel: '',
                westTunnel: '',
                eastIndex : update.setEast(),
                eastTemperature : [],
                UpdateTime:'',
                westIndex : update.setWest(),
                westTemperature : [],
            }
        },

        //创建时建立websocket连接，向后台获取数据，注册监听事件来更新数据
        created() {

            window.onbeforeunload=this.disConnection();
//            this.createConnection();
            myEvent .on('data',function (data) {
                this.rawData = data;

                //解析数据
                this.parserData(JSON.parse(data));
                console.log("events ，after parser");

                //将数据更新到图标上
                this.refresh();
                console.log("after refresh");

            }.bind(this));
            console.log("created done!!");
        },

        //挂载时初始化echarts
        mounted() {
            this.init();
//            this.disconnect();
        },


        methods: {
            //初始化echart
            init: function () {
                this.eastTunnel = this.$echarts.init(document.getElementById('eastTunnel'));
                this.westTunnel = this.$echarts.init(document.getElementById('westTunnel'));
                console.log('init..');

                let eastOption = {
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
                        data: this.eastIndex
                    },
                    yAxis: {},
                    series: [{
                        name: '温度',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: true,
                        data: []
                    }]
                };
                let westOption = {
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
                        data: this.westIndex
                    },
                    yAxis: {},
                    series: [{
                        name: '温度',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: true,
                        data: []
                    }]
                };
                this.eastTunnel.setOption(eastOption);
                this.westTunnel.setOption(westOption);
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
                        subtext: this.UpdateTime,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '温度',
                        data: this.eastTemperature
                    }]
                });
                this.westTunnel.setOption({
                    title: {
                        subtext: this.UpdateTime,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '温度',
                        data: this.westTemperature
                    }]
                });
            },

            //建立websocket连接
            createConnection:function () {
                update.connectServer();
            },
            //断开连接
            disConnection:function () {
                update.disconnect();
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
#eastTunnel,#westTunnel {
    /*width: 1400px;*/
    width: 1020px;
    height: 400px;
    text-align: center;
    margin: 0 auto;
    align-content: center;
    background-image: url("../assets/img/bg-big.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /*border:1px solid black;*/
    display:inline-block;
    vertical-align: middle;
}
    .item {

    }
</style>
