<template>
      <div class="tojsonTest">
        <to-json :types="types" :selected="selected"></to-json>
      </div>
       
</template>

<script>
import ToJson from "./tojson.vue";
export default {
  props: {},
  data() {
      return {
      selected: ["test"],
      types: [{
          value: "test",
          label: "test",
          template: '${0:nm} ',
          single: true,
          desc: " ",
          param: [],
          fix: {
            roles: [
              
            ],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  let singleConnect="";
                  $.each(str.split("\n"),function(i,v){
                   if(i!=0&&i%2==0){
                     singleConnect=singleConnect+"\n"+v;
                   }else{
                      singleConnect=singleConnect+v;
                    
                   }
                  })
                  return singleConnect;
                }
              }
            ]
          }
        }
        ]
    };
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  components: {
    ToJson
  }
};

</script>
<style lang="less" >
.tojsonTest{
}
</style>