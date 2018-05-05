<template>
    <div id="app">
        <!--<connect></connect>-->
        <nav-header></nav-header>
        <tunnel-facility ></tunnel-facility>
        <chart class="hide"></chart>

    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld'
    import connect from './components/connect'
    import chart from './components/echart'
    import navHeader from './views/header'
    import tunnelFacility from './views/tunnelFacility'

    export default {
        name: 'App',
        components: {
            HelloWorld,
            connect,
            chart,
            navHeader,
            tunnelFacility
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0px;
        padding: 0px;

    }

    .hide{
        display: none;
    }
    body {
        margin: 0px;
        padding: 0px;
        background: url("./assets/img/body.png") center no-repeat;
    }
</style>
