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
      selected: ["scada6crudcol","scada6crudinputOne"],
      types: [{
          value: "scada6crudcol",
          label: "scada6crudcol",
          template:
            '{ "field": "${0:nm}","title": "${1:nm}", "align": "center", "halign":"center","colspan": 1,"hidden": false, "rowspan": 1,"width": 100,${2} },',
          param: [
            {
              k: "2",
              v: [
                {
                  k: "containsReplace",
                  v: {
                    c: 'binding: "USER"',
                    d: "formatter: DateFormatter",
                    f: "formatter: function (v, r, i) {\n if (v){return v; \n}else {\n return v; \n}   }"
                  }
                }
              ]
            }
          ]
        },

        {
          value: "scada6crudinputOne",
          label: "scada6crudinputOne",
          template:
            '{ "Field": "${0}", "Name": "${1}", ShowType: "${2:text}", Ext: "${3}",DataType: "${4:String}", "Required": true, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { c: "combo", d: "datetime", a: "textarea", u: "upload", f: "text" } }]
            },
            {
              k: "3",
              v: [{ k: "copy", v: { "2": true }, scope: ["d", "c"] }, { k: "replace", v: { d: "yyyy-MM-dd", c: "USER" } }]
            },
            {
              k: "4",
              v: [{ k: "copy", v: { "2": true }, scope: ["d"] }, { k: "replace", v: { d: "Number" } }]
            }
          ],
          fix: {
            roles: [
              {
                k: "both",
                v: [{ k: "replace", v: [{ "/^{/": "[{", "/},$/": "}]," }] }]
              }
            ],
            param: []
          }
        },
        {
          value: "scada6crudinputTwo",
          label: "scada6crudinputTwo",
          template:
            '{ "Field": "${0}", "Name": "${1}", ShowType: "${2:text}", Ext: "${3}",DataType: "${4:String}", "Required": true, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { c: "combo", d: "datetime", a: "textarea", u: "upload", f: "text" } }]
            },
            {
              k: "3",
              v: [{ k: "copy", v: { "2": true }, scope: ["d", "c"] }, { k: "replace", v: { d: "yyyy-MM-dd", c: "USER" } }]
            },
            {
              k: "4",
              v: [{ k: "copy", v: { "2": true }, scope: ["d"] }, { k: "replace", v: { d: "Number" } }]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              { k: "double", v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },
              { k: "single", v: [{ k: "replace", v: [{ "/},$/": "}]," }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "}]," }] }] }
            ],
            param: []
          }
        }]
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