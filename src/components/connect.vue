<template>
  <div class="test">
    <button @click="getData()">获取数据</button>
    <p>result: </p>
  </div>
</template>

<script>
  export default {
    name:'connect',

    methods:{
      getData:function(){
          this.$http.get('/api/goods').then(result => {
              let res = result.data;
              let res_json = [] ;//= JSON.stringify(res);
            console.log(res.length)
              for(let i = 0;i < res.length;i++){
                res_json[i] = JSON.stringify(res[i]);
//                console.log(temp);
              }

              console.log("res:  " + typeof res.id);
              console.log("res_json:  " + res_json[0]);
              console.log("result:  " + typeof result);
            console.log("result:  " + result.data.toString());

          }).catch(error => {
              console.log(error);
          })
      }
    }
  }
</script>
