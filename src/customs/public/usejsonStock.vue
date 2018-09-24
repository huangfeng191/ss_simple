<template>
  <div class="usejson">
    <to-json :types="types" :selected="selected"></to-json>
  </div>

</template>

<script>
import ToJson from "./tojson.vue";
export default {
  props: {},
  data() {
    return {
      // selected: ["scada6crudcol", "scada6crudinputOne"],
      // selected: ["scada6crudinputThree", "toRowSingle", "scada6crudcol", "scada6Input"],
      // selected: ["scada6crudinputThree", "toRowSingle", "CueColumns", "CueCrudInputThree"],
      selected: [ "proStockCol"],
       
      types: [
            {
          value: "proStockCol",
          label: "proStockCol",
          template: "${0:nm},${1:nm},${2:nm} ",
          single: true,
          desc: " ",
          param: [],
          fix: {
            roles: [],
            fixRoles: []
          }
        },
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
.usejson {
}
</style>