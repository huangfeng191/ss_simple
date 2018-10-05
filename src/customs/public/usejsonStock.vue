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
      selected: [ "proStockCol","scada6crudinputThree", "scada6crudcol"],
       
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

         {
          value: "scada6crudinputThree",
          label: "scada6crudinputThree",
          template:
            '{ "Field": "${1}", "Name": "${0}", ShowType: "${3:text}", Ext: "${31}",DataType: "${2:String}", "Required": false, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { string: "String", int: "Number", double: "Number" } }]
            },
            {
              k: "3",
              v: [
                { k: "filterStr", v: [{ k: "notNumber", operate: "and" }] },
                { k: "replace", v: { c: "combo", d: "datetime", a: "textarea", u: "upload", t: "text" } }
              ]
            },
            {
              k: "31",
              v: [
                { k: "copy", v: { "3": true }, scope: ["c","d"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4]) {
                          return row[4];
                        } else {
                          return "USER";
                        }
                      }
                    },
                     d: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4] && /^[0-9]+$/g.exec(row[4]) == null) {
                          return row[4];
                        } else {
                          return "yyyy-MM-dd";
                        }
                      }
                    }
                  }
                }
              ]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              { k: "mod", condition: { k: 3, v: 0 }, v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },
              { k: "mod", condition: { k: 3, v: 2 }, v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] }
            ],
            param: []
          }
        },
          {
          value: "scada6crudcol",
          label: "scada6crudcol",
          template:
            '{ "field": "${1:nm}","title": "${0:nm}", "align": "left", "halign":"center","colspan": 1,"hidden": false, "rowspan": 1,"width": 100,${3} },',
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
                    d: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[4]=="yyyy") {
                          return 'formatter: YearFormatter,';
                        } else  if (row[4]=="yyyy-MM") {
                          return 'formatter: MonthFormatter,';
                        } else {
                          return 'formatter: DateFormatter,';
                        }
                      }
                    },
                    //  "formatter: DateFormatter,",
                    // u: 'unit:"XXX",',
                    f: "formatter: function (v, r, i) {\n if (v){return v; \n}else {\n return v; \n}   },"
                  }
                }
              ]
            }
          ]
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