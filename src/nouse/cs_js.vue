<template>
	<div id="cs2">
    <el-label> 计划输入方法体，返回打印控制台</el-label>
    <el-input   type="textarea" v-model="forInput" ></el-input>
    <el-label> 为了打印控制台</el-label>
    <el-input   type="textarea" v-model="forCon"></el-input>
	</div>

</template>
<script>
export default {
  data() {
    return {
      forCon: "",
      forCon: "控制台显示",
      lvl: 1
    };
  },
  methods: {},
  watch: {},
  mounted() {
    function showDetail(a) {
      $.each(a, function(ai, av) {
        return;
      });
      a.push(2);
      return;
    }

    let a = [1];
    showDetail(a);
    this.forCon = a;
  },
  components: {}
};
</script>
<style lang="less">
#cs2 {
}
</style>