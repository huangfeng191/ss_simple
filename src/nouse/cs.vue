<template>
    <div id="ipadanalysis1">
        <div class="header">
            <div style="width:20%;height:100%;float:left;background:yellow;">
            </div>
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
        <div>
            <div class="left">
                <div class="inp">
                    <el-row>
                        <el-col :span="18">
                            <div>
                                <!--                                 <el-input placeholder="输入用户名、申报号" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                                </el-input> -->
                                <el-autocomplete class="inline-input" icon="search" v-model="input2" :fetch-suggestions="querySearch" placeholder="输入用户名、申报号" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div style="height:36px;vertical-align: middle;line-height: 36px;padding-left:10px;">附近</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <ul>
                                <li>
                                    <i><span>1</span><span>2</span></i>
                                    <i><span>3</span>12</i>
                                </li>
                            </ul>>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="med">
                <div class="meda"></div>
                <div class="medb"></div>
                <div class="medc"></div>
            </div>
            <div class="right">
                <div class="rig1">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex2: '1',
            input2: ""
        };
    },
    methods: {
        handleIconClick() {
            alert(1);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        querySearch(queryString, cb) {
            var restaurants = [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" }
            ];
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        handleSelect() {

        }

    },
    watch: {},
    mounted() {
        //16为body 的margin
        $("#ipadanalysis1").height($(window).height() - 25 - 16);
        $("#ipadanalysis1 .inp").height($(window).height() - 73 - 25 - 16);

        $("#ipadanalysis1 .med .medb").height($(window).height() * 0.29);

        $("#ipadanalysis1 .med .medc").height($(window).height() - $("#ipadanalysis1 .med .medb").height() - 73 - (50 + 10) - 25 - 16);
        $("#ipadanalysis1 .right ").width($(window).width() - $("#ipadanalysis1 .left").width() - $("#ipadanalysis1 .med").width() - 60 - 16);
        $("#ipadanalysis1 .right .rig1").height($(window).height() - $("#ipadanalysis1 .header").height() - 73 - 25 - 16);
        // $("#ipadanalysis1").height($(window).height() );
        // $("#ipadanalysis1 .inp").height($(window).height() -73);
    }
};
</script>
<style lang="less">
#ipadanalysis1 {
    background-color: #F2F3F3;
    .header {
        height: 60px;
        width: 100%;
        font-size: 16px;
        background-color: #0389DA;
        .div0 {
            width: 70%;
            position: absolute;
            top: 0px;
        }
        .el-menu-demo {
            background-color: #0389DA;
            color: white!important;
            border-bottom: 0px solid #f7f7f7;
            border-right: 0px solid #f7f7f7;
            .el-menu-item {
                line-height: 60px;
                height: 60px;
                margin-right: 15%;
                color: white!important;
                &.is-active {

                    border-bottom: 4px solid #3ac300;
                    color: #eeeeee;
                }
                &:hover {

                    border-bottom: 4px solid #6CDB00;
                    color: #eeeeee;
                }
            }
            .el-menu-item:hover,
            .el-submenu__title:hover {
                background-color: #0389DA!important;
            }
            .is-active {
                border-bottom: 4px solid #6CDB00!important;
            }
        }
    }
    .left {
        float: left;
        box-sizing: border-box;
        background-color: #E7F2FB;
        width: 20%;
        height: 100%;
        padding: 10px 0px 0 5px;
        .inp {

            .el-input__inner {
                border: 0px solid #bfcbd9!important;
            }
        }
        .el-input__icon {
            left: 0px!important;
        }
        .el-input__icon+.el-input__inner {
            padding-left: 35px;
            padding-right: 0px;
        }
    }
    .med {
        box-sizing: border-box;
        width: 54%;
        float: left;
        padding: 10px;
        .meda {
            height: 50px;
        }
        .medb {
            height: 29%;
            margin-bottom: 10px;
            background-color: white;
        }
        .medc {
            background-color: white;
        }
    }
    .right {
        box-sizing: border-box;
        float: left;
        padding: 10px;
        padding-top: 60px;
        .rig1 {
            background-color: white;
        }
    }
}
</style>