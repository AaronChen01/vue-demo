<template>
    <div id="nav-header">
        <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <div class="logo">大连路隧道监控系统</div>
            <el-menu-item index="1" @click="change(1)">隧道设施</el-menu-item>
            <el-submenu index="2" @click="change(3)">
                <template slot="title">设施运行状态</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">隧道火灾实施环境</template>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" @click="change(2)">温度查询</el-menu-item>
            <el-menu-item index="4" @click="change(4)"><a href="https://www.ele.me" target="_blank">数字化预案</a></el-menu-item>
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
                for (let j = 1;j < 3;j++){
                    console.log(this.getCont(j))
                    this.getCont(j).style.display = 'none';// ('display','none');
                }
                this.getCont(i).style.display = 'block'   //setAttribute('display','block');
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
