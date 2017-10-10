<template>
    <div id="cs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane   name="first">
               <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
                <el-row>
                    <el-col :span="4">
                        <div>1</div>
                    </el-col>
                    <el-col :span="4">
                        <div>2</div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'second'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },

    watch: {

    },
    mounted() {}
};
</script>
<style lang="less">
#cs {}
</style>