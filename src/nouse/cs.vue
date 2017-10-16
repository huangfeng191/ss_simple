<template>
    <div id="ipadanalysis1">
        <div class="header">
            <div style="width:20%;height:100%;float:left;background:yellow;"></div>
            <div style="width:80%;float:left;position:relative;">
                <div class="div0">
                    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal">
                        <el-menu-item index="1">基本信息</el-menu-item>
                        <el-menu-item index="2">登记表</el-menu-item>
                        <el-menu-item index="3">分户台账</el-menu-item>
                    </el-menu>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex2: '1'
        };
    },
    methods: {},
    watch: {},
    mounted() {
        //16为body 的margin
        $("#ipadanalysis1").height($(window).height()-25-16);
    }
};
</script>
<style lang="less">
#ipadanalysis1 {
    background-color: #B8C5D6;
    .header {
        .div0 {
            width: 56%;
            position: absolute;
            top: 55px;
        }
        .el-menu-demo {

            
            background-color: #0389DA;
            color: white!important;
            border-bottom: 0px solid #f7f7f7;
            border-right: 0px solid #f7f7f7;
            .el-menu-item {
                line-height: 71px;
                height: 71px;
                margin-right: 12%;
                color: white!important;
            }
            .is-active {
                border-bottom: 8px solid #6CDB00!important;
                
               
            }
        }


        height: 126px;
        width: 100%;
        background-color: #0389DA;
    }
}
</style>