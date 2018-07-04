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
      selected: ["scada6crudinputThree","toRowSingle","scada6crudcol","scada6Input"],
      // selected: ["scada6Quick"],
      types: [
        {
          value: "testlast",
          label: "testlast",
          template: "${0:nm} ${99} ${98} ${97} ",
          single: true,
          desc: " ",
          param: [
            {
              k: "98",
              v: [{ k: "existsReplace", v: { int: "int", nt: "int", Int: "int", string: "string" }, or: ["number"] }]
            },
            {
              k: "97",
              v: [{ k: "existsReplace", v: { int: "int", nt: "int", Int: "int", string: "string" }, or: ["number"] }]
            }
          ],
          fix: {}
        },

        {
          value: "scada6crudcol",
          label: "scada6crudcol",
          template:
           '{ "field": "${1:nm}","title": "${0:nm}", "align": "center", "halign":"center","colspan": 1,"hidden": false, "rowspan": 1,"width": 100,${3} },',
          param: [
            {
              k: "3",
              v: [
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[4]) {
                          return 'binding:"' + row[4] + '"';
                        } else {
                          return 'binding:"USER"';
                        }
                      }
                    },
                    d: "formatter: DateFormatter,",
                    u: 'unit:"XXX",',
                    f: "formatter: function (v, r, i) {\n if (v){return v; \n}else {\n return v; \n}   },"
                  }
                }
              ]
            }
          ]
        },

         {
          // 取第一个值 组成数组格式
          value: "toRowSingle",
          label: "toRowSingle",
          template: '"${0:nm}" ',
          param: {},
          fix: {
            roles: [],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  return str
                    .split("\n")
                    .filter(function(v, i, self) {
                      return self.indexOf(v) === i;
                    })
                    .join(",");
                }
              },
              // { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              // { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },


              {
          value: "scada6Input",
          label: "scada6Input",
          template: '"${1}": {"Names": [u"${0}"], "DataType": "${2:String}", "Ext": "","required":True},',
          param: [
              {
              k: "2",
              v: [
                { k: "replace", v: { string: "String", int: "Number" , double: "Double" } }]
            },
          ]
        },
      
        {
          value: "scada6crudinputThree",
          label: "scada6crudinputThree",
          template:
            '{ "Field": "${1}", "Name": "${0}", ShowType: "${3:text}", Ext: "${31}",DataType: "${2:String}", "Required": false, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [
                { k: "replace", v: { string: "String", int: "Number" , double: "Number" } }]
            },
            {
              k: "3",
              v: [
                  { k: "filterStr", v:[{k:"notNumber",operate:"and" } ] },
                  { k: "replace", v: { c: "combo", d: "datetime", a: "textarea", u: "upload", t: "text" } }
                  ]
            }
 
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              { k: "mod", config: { k: 3, value: 0 }, v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },
              { k: "mod", config: { k: 3, value: 2 }, v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] }
            ],
            param: []
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
.usejson {
}
</style>