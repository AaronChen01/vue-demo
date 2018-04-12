<template>
  <div id="app">
    <connect></connect>
    <chart></chart>
    <chart></chart>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import connect from './components/connect'
import chart from './components/echart'
export default {
  name: 'App',
  components: {
    HelloWorld,
    connect,
    chart
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
  margin-top: 60px;
}
</style>
