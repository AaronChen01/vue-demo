import {formatDate} from './FormatDate'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
// import EventEmitter from 'events'
import {myEvent} from './EventEmitter'


//初始化数据部分
var eastIndexArr = []
var eastTemperature = []
var UpdateTime = '';
var westIndexArr = []
var westTemperature = []

//设置下标，：东线：n1~n192，西线：s1~s183
function setEast() {
    console.log('set East.');
    var temp;
    for (var i = 1; i < 193; i++) {
        temp = "n" + i;
        eastIndexArr.push(temp);
    }
    return eastIndexArr;
}

function setWest() {
    console.log('set West.');
    var temp;
    for (var i = 1; i < 184; i++) {
        temp = "s" + i;
        westIndexArr.push(temp);
    }
    return westIndexArr;
}

function setEW() {
    setEast();
    setWest();
}

//解析数据，从中获取到东线数据，同时获取时间
function getEastTemp(data) {
    eastTemperature.length = 0;
    for (var i = 0; i < 192; i++) {
        eastTemperature.push(data[eastIndexArr[i]]);
        // console.log("get EastData: " + eastTemperature[i])
    }
    return eastTemperature;
}

//获取数据更新时间
function getTime(data) {
    let date = new Date(data.time)
    UpdateTime = formatDate(date, "yyyy-MM-dd hh:mm:ss");
    console.log(UpdateTime);
    return UpdateTime
}

//解析数据，从中获取到西线数据
function getWestTemp(data) {
    westTemperature.length = 0;
    for (var i = 0; i < 183; i++) {
        westTemperature.push(data[westIndexArr[i]]);
    }
    return westTemperature
}

//整合上面两个函数，同时获取东西线数据
function getdata(data) {
    getEastTemp(data);
    getWestTemp(data);
}

//WebSocket功能
var stompClient = null;

/**
 * 函数名：connect
 * 建立Socket连接
 * 获取传感器数据：ms.body
 * 使用showResponse()函数将获取的数据显示到图标上：*/
function connectServer() {

    console.log("connect Server.");
    // 连接SockJS 的endpoint 名称为“/endpointWisely”
    var socket = new SockJS('/dll/endpointWisely');
    // 使用STOMP 子协议的WebSocket 客户端
    stompClient = Stomp.over(socket);
    // 连接WebSocket 服务端。
    stompClient.connect({}, function (frame) {

        console.log('Connected: ' + frame);
        stompClient.subscribe("/topic/getResponse", function (ms) {
            if (ms.body) {
                // console.log('数据：' + ms.body);
                let res =  ms.body;
                // console.log("res>>>",res,"<<<");
                myEvent.emit('data',res);
            } else {
                console.log("no ms!");
            }
        });

        RequestData();
    });
    // while (res == null);
    // setTimeout(3000,function (res) {
    //     return res;
    // })
    // return res;
}

//断开连接
function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    // setConnected(false);
    console.log("Disconnected");
}

function RequestData() {
    stompClient.send("/welcome", {}, JSON.stringify({'name': "cyj"}));
}


window.onbeforeunload = disconnect;

//关闭窗口函数
function closeWindow() {
    var node = document.getElementById('showdata');
    node.style.display = "none";

    var nodeCharts = document.getElementById('eastTunnelTemplete');
    console.log(nodeCharts);
}

// var timeList = new Array();
// var tempList = new Array();

//东线监听点击事件，当点击某个数据点时，显示该对应点传感器的历史温度信息
// eastTunnel.on('mousedown',function (params) {
//   console.log(params);
//   var node = document.getElementById('showdata');
//   node.style.display="";
//   node.style.zIndex=6666;
//
//   var $showdata = $("#showdata");
//   // $showdata.addClass("show");
//   var $eastTunnelTemplete = $("<div id='eastTunnelTemplete' style='width: 100%;height: 95%' ></div>");
//
//   $showdata.append($eastTunnelTemplete);
//   var nodeChart = echarts.init(document.getElementById('eastTunnelTemplete'));
//   nodeChart.setOption(eastoption);
//
//   var title = "传感器 " + params.name + " 历史数据表";
//   var url = "/dll/DataByID?sensorName=" + params.name;
//
//   $.get(url).done(function (data) {
//     timeList.length = 0;
//     tempList.length = 0;
//     for(var i = 0; i < data.length; i++){
//       var timeTemp = new Date(data[i].time);
//       var timea = timeTemp.Format("yyyy-MM-dd hh:mm:ss")
//       timeList.push(timea);
//       tempList.push(data[i].data);
//     }
//     nodeChart.setOption({
//       title:{
//         text: title,
//         x:'center'
//       },
//       xAxis: {
//         data:timeList
//       },
//       series: [{
//         // 根据名字对应到相应的系列
//         name: '温度',
//         data: tempList
//       }]
//     });
//   });
//   // console.log(timeList);
//   // console.log(tempList);
//   // console.log(typeof timeList)
//   console.log(params.name);
//   console.log('do it');
// });
//西线监听点击事件，当点击某个数据点时，显示该对应点传感器的历史温度信息
// westTunnel.on('mousedown',function (params) {
//   var node = document.getElementById('showdata');
//   node.style.display="";
//   node.style.zIndex=6666;
//
//   // $('.closeButton').attr("z-index",777);
//   var $showdata = $("#showdata");
//   var $eastTunnelTemplete = $("<div id='eastTunnelTemplete' style='width: 100%;height: 95%' ></div>");
//
//   $showdata.append($eastTunnelTemplete);
//   var nodeChart = echarts.init(document.getElementById('eastTunnelTemplete'));
//   nodeChart.setOption(eastoption);
//
//   var title = "传感器 " + params.name + " 历史数据表";
//   var url = "/dll/DataByID?sensorName=" + params.name;
//   // getHistory(url);
//
//   $.get(url).done(function (data) {
//     timeList.length = 0;
//     tempList.length = 0;
//     for(var i = 0; i < data.length; i++){
//       var timeTemp = new Date(data[i].time);
//       timeTemp.toDateString();
//       timeTemp.toISOString(); //  format("YYYY-MM-DD HH:MM:SS");
//       var timea = timeTemp.Format("yyyy-MM-dd hh:mm:ss")
//       timeList.push(timea);
//       tempList.push(data[i].data);
//       // console.log(data[i].data);
//     }
//     nodeChart.setOption({
//       title:{
//         text: title,
//         x:'center'
//       },
//       xAxis: {
//         data:timeList
//       },
//       series: [{
//         // 根据名字对应到相应的系列
//         name: '温度',
//         data: tempList
//       }]
//     });
//   });
//   // console.log(timeList);
//   // console.log(tempList);
// });

export default {
    setWest,
    setEast,
    connectServer,
    getWestTemp,
    getEastTemp,
    getTime,
    disconnect
}
