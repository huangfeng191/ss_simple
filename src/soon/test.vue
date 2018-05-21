<template>
      <div class="test">

          <div class="align_bottom">
                <icon name="shijian1" class="margin_right_90" >
                    <div style="top: -180px; position: absolute;left: -16px;">
                        <subject w="542px" h="166px"></subject>
                    </div>
                </icon>
                <icon name="sousuo"  class="margin_right_90">
                     <div style="top: -180px; position: absolute;left: -16px;">
                        <subject w="542px" h="166px"></subject>
                    </div>
                </icon>
                <icon name="tuceng"  class="margin_right_90"></icon>
                <icon name="shijian1"  class="margin_right_90"></icon>
          </div>
      </div>
       
</template>

<script>
import icon from "./part/icon.vue";
import subject from "./part/subject.vue";
export default {
  props: {},
  data() {
    return {
        show1:true,
    };
  },
  created() {},
  mounted() {},
  methods: {
      showShijian1:function(){
          debugger
          this.show1=!this.show1
      }
  },
  watch: {},
  components: {
    icon,
    subject
  }
};
</script>
<style lang="less" >
.test {
  .align_bottom {
    position: absolute;
    bottom: 50px;
    left: 500px;
  }
  .margin_right_90 {
    position: relative;
    margin-right: 90px;
  }
}
</style>