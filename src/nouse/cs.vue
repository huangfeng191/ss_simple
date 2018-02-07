<template>
	<div id="cs2">
	
        <child :level="lvl" @to-parent="fromChild">

            <div slot="header">header2</div>
         
            <div>body2</div>
            <div>body3</div>
            <div slot="footer">footer</div></child>
	</div>

</template>
<script>
export default {
  data() {
    return {
      message: "Hello 11Vue!",
      lvl: 1
    };
  },
//   子主键传递到父主键用 emit
// 在父主键中属性的key 都是从子主键中过来的
  methods: {
      fromChild:function(param){
          alert(param);
          alert("正确接收")
      }
  },
  watch: {},
  mounted() {},
  components: {
    child: {
      data() {
        return {
          a: 2
        };
      },
      props: ["level"],
      render: function(createElement) {
          
          var self = this;
        return createElement(
          "h" + this.level, // tag name 标签名称
          {
          on:{
              click:function(event){
                  debugger
                  self.showSlot();
                  self.$emit('to-parent',1212);
                  //可调用组件对象的方法
              }
          }
        },
          this.$slots.default // 子组件中的阵列
        );
      },
      methods:{
          showSlot:function(){
              alert("1212");
          }
      },

      template: `
           <blog-post>
            <h1 slot="header">
                About Me 
            </h1>

            <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.</p>

            <p slot="footer">
                Copyright 2016 Evan You
            </p>

            <p>If I have some content down here, it will also be included in vm.$slots.default.</p>.
            </blog-post>
        `
    }
  }
};
</script>
<style lang="less">
#cs2 {
}
</style>