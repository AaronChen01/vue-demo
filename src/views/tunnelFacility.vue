<template>
    <div id="cont1" class="tunnelFacility">
        <el-tabs type="border-card" v-model="activeName" >
            <el-tab-pane label="消防栓" name="first">
                <div class="tableZone">
                    <el-table :data="tableData3" height="600" border @row-click="openDetails" >
                        <el-table-column prop="num" label="序号"></el-table-column>
                        <el-table-column prop="devNum" label="设备编号"></el-table-column>
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop="tunnel" label="隧道"></el-table-column>
                        <el-table-column prop="oriented" label="方位"></el-table-column>
                        <el-table-column prop="position" label="位置"></el-table-column>
                        <el-table-column prop="arg1" label="参数1"></el-table-column>
                        <el-table-column prop="arg2" label="参数2"></el-table-column>
                    </el-table>
                </div>
                <div class="funcZone" >
                    <!--<button>新增设备</button>-->
                    <el-button type="info" @click="dialogFormVisible = true">新增设备</el-button>
                    <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
                        <el-form :model="form">
                            <el-form-item label="序号" :label-width="formLabelWidth">
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="活动区域" :label-width="formLabelWidth">
                                <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>
                    <button>删除设备</button>
                    <button>修改信息</button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="安全井盖" name="second">安全井盖</el-tab-pane>
            <el-tab-pane label="横通道" name="third">横通道</el-tab-pane>
            <el-tab-pane label="喷露阀" name="fourth">喷露阀</el-tab-pane>
            <el-tab-pane label="风机" name="fifth">风机</el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    //	import ElCol from "element-ui/packages/col/src/col";
    //    import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu.vue";
    //    import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu.vue";
    //    import ElMenuItem from "../../node_modules/element-ui/packages/menu/src/menu-item.vue";

    import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu.vue";

    export default {
//        components: {
//            ElMenuItem,
//            ElSubmenu,
//            ElMenu,
//            ElCol},
        components: {ElMenu},
        name: "tunnelFacility",
        data() {
            return {
                activeName:'first',
                tableData3: [{
                    num: '1',
                    devNum:'HY-D-1',
                    name: '消防栓',
                    tunnel:'北线',
                    oriented:'左侧',
                    position:'1662.00米'
                }, {
                    num: '2',
                    devNum:'HY-D-1',
                    name: '消防栓',
                    tunnel:'北线',
                    oriented:'左侧',
                    position:'1662.00米'
                }, {
                    num: '3',
                    devNum:'HY-D-1',
                    name: '消防栓',
                    tunnel:'北线',
                    oriented:'左侧',
                    position:'1662.00米'
                }, {
                    num: '4',
                    devNum:'HY-D-1',
                    name: '消防栓',
                    tunnel:'北线',
                    oriented:'左侧',
                    position:'1662.00米'
                }, {
                    num: '5',
                    devNum:'HY-D-1',
                    name: '消防栓',
                    tunnel:'北线',
                    oriented:'左侧',
                    position:'1662.00米'
                }, {
                    num: '6',
                    devNum:'HY-D-1',
                    name: '消防栓',
                    tunnel:'北线',
                    oriented:'左侧',
                    position:'1662.00米'
                }],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods:{
            openDetails:function (row,event,columu) {
                alert(row.num);
            }
        }
    }
</script>

<style scoped>
    .tunnelFacility {
        width: 100%;
        height: 100%;
        text-align: left;
    }

    .tableZone{
        width:70%;
        float: left;
        display: block;
    }
    .funcZone{
        width: 29%;
        padding: 5px;
        height: 600px;
        float: right;
        display: block;
        border: 1px solid black;
    }
    .tac {
        /*background-color: cornflowerblue;*/
        float: left;
        display: block;
        width: 70%;
    }
</style>
