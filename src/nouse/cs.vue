<template>
<div id="cs2">
  <el-row class="tac">
    <el-col :span="4">
      <h5>自定义颜色</h5>
      <el-button type="text" @click="cgMenu(0)">测试0</el-button>
      <el-button type="text" @click="cgMenu(1)">测试1</el-button>
      <el-input   placeholder="" v-model="cmenuId"></el-input>
      <el-menu
       @select="itemSelect"
        :default-active="cmenuId"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <template > 
            <el-menu-item :index="r.Id"  :id="r.Id" v-for="r in cmenu" :key="r.Id">
              <i class="el-icon-menu"></i>
              <a class="menulink" :href="r.Src">{{r.name}}</a>
              <!-- <span slot="title">{{r.name}}</span> -->
            </el-menu-item>
        </template>
        
      </el-menu>
    </el-col>
    <el-col :span="20">
      <iframe :src="nowSrc" frameborder="0" width="100%" height="300px"></iframe>
    </el-col>
  </el-row>
</div>
</template>
<script>
export default {
  data() {
    return {
     nowSrc:"/mystock",
     m:[{ menus:[
        {"Id":"1","name":"1","Src":"/tojson"},
        {"Id":"2","name":"2","Src":"/position"},
        {"Id":"3","name":"3","Src":"/css"},
       
      ]},
      { menus:[
        {"Id":"11","name":"11","Src":"/cs_js"},
        {"Id":"12","name":"21","Src":"/test"},
        {"Id":"13","name":"31","Src":"/mycolor"}

      ]}
      ],
      message: "Hello 11Vue!",
      lvl: 1,
      cmenuId:"11",
      idx:0
    };
  },

  methods: {
      itemSelect(index,path,item){
        debugger
              $(item.$el).find("a i").trigger("click");
          },
    cgMenu:function(i){
      this.idx=i;
    },
     
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{
    cmenu:function(){

      return this.m[this.idx].menus
    }
  },
  watch: {
    cmenuId:function(){
      let self=this;
      debugger
      if(  $.inArray(self.cmenuId,["1","2","3"])>=0){
        this.idx=0;
      }
      if(  $.inArray(self.cmenuId,["11","12","13"])>=0){
        this.idx=1;
      }
    }
  },
  mounted() {},
  components: {}
};
</script>
<style lang="less">
#cs2 {
  height: 100%;
}
</style>