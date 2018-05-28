<template>
    <div id="app">
        <div id="inner">
        <!--<connect></connect>-->
        <!--<nav-header></nav-header>-->
        <div id="nav-header">
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <div class="logo">虹梅南路隧道火灾救援辅助系统</div>
                <el-menu-item index="1" @click="change('runTime')">实时温度分布</el-menu-item>
                <el-menu-item index="3" @click="change('realTime')">评估结果</el-menu-item>
                <el-menu-item index="4" @click="change('tempQuery')">温度查询</el-menu-item>
                <el-menu-item index="2" @click="change('tunnelFacility')">隧道设施</el-menu-item>
                <!--<el-menu-item index="5" @click="change(5)">数字化预案</el-menu-item>-->
            </el-menu>
        </div>
        <div id="views" >
            <component :is="current"></component>
            <!--<run-time ></run-time>-->
            <!--<tunnel-facility class="hide"></tunnel-facility>-->
            <!--&lt;!&ndash;<chart class="hide"></chart>&ndash;&gt;-->
            <!--<real-time class="hide"></real-time>-->
            <!--<temp-query class="hide"></temp-query>-->
            <!--<plan-view class="hide"></plan-view>-->
        </div>

        </div>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld'
    import connect from './components/connect'
    import chart from './components/echart'

    import navHeader from './views/header'
    import tunnelFacility from './views/tunnelFacility'
    import runTime from './views/runTimeView'
    import realTime from './views/realTimeView'
    import tempQuery from './views/temperatureQueryView'
    import planView from './views/planView'

    export default {
        name: 'App',
        data(){
            return{
                current:runTime,
            }
        },
        components: {
            HelloWorld,
            connect,
            chart,
            navHeader,
            tunnelFacility,
            runTime,
            realTime,
            tempQuery,
            planView
        },
        methods:{
            change:function(tab){
                this.current = tab;
            }
        }
    }

</script>

<style>
    ::-webkit-scrollbar {display:none}
    html{
        height:100%;
        overflow: scroll;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0px;
        padding: 0px;
        height: 100%;
    }
    #views{
        height:inherit;
    }
    .hide{
        display: none;
    }
    body {
        margin: 0px;
        padding: 0px;
        height:100%;
        background: url("./assets/img/body.png") center no-repeat;
        background-size: 100% 100%;
        /*overflow-y: hidden;*/
    }


    #nav-header{
        line-height:50px;
        width: 100%;
        background-color: black;
        display: block;
        border: none;
    }
    .el-menu-demo{
        border: none;
    }
    .hide {
        display: none;
    }
    .display {
        display: block;
    }
    .logo{
        float: left;
        color: aliceblue;
        line-height: 61px;
        margin: 0 20px;
    }
    a{
        text-decoration: none;
    }
</style>
