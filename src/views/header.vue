<template>
    <div id="nav-header">
        <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <div class="logo">虹梅南路隧道火灾救援辅助系统</div>
            <el-menu-item index="1" @click="change(2)">设施运行状态</el-menu-item>
            <el-menu-item index="2" @click="change(1)">隧道设施</el-menu-item>
            <el-menu-item index="3" @click="change(3)">阈值</el-menu-item>
            <el-menu-item index="4" @click="change(4)">温度查询</el-menu-item>
            <!--<el-menu-item index="5" @click="change(5)">数字化预案</el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
		name: "nav-header",
        methods:{
		    getCont:function (i) {
                return document.getElementById('cont' + i);
            },
		    change:function (i) {
                for (let j = 1;j < 6;j++){
                    console.log(this.getCont(j))
                    this.getCont(j).style.display = 'none';// ('display','none');
                }
                this.getCont(i).style.display = 'block'   //setAttribute('display','block');
                if (i == 3){
                }
            }
        }
	}
</script>

<style scoped>
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
