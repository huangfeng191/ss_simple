<template>
  <div class="usejson">
    <to-json
      :types="types"
      :selected="selected"
    ></to-json>
  </div>

</template>

<script>
import ToJson from "./tojson.vue";
export default {
  props: {},
  data() {
    return {
      // selected: ["ssForm", "scada6crudinputOne"],
      // selected: ["scada6crudinputThree", "toRowSingle", "ssForm", "scada6Important"],
      // selected: ["scada6crudinputThree", "toRowSingle", "CueColumns", "CueCrudInputThree"],
      // selected: ["toRowSingle", "switch2and1", "CueColumns", "CueCrudInputThree", "interfaceUp", "mongoField"],
      selected: ["ssForm","ssButton"],
      // selected: ["mongoField"],
      types: [
  
        {
          value: "ssForm",
          label: "ssForm",
          template:
            ' [{ "title": "${0:nm}","field": "${1:sn}",  "showType": "${2:text}", ${21} }],',
          param: [
              { k: "2",
               v: [{ k: "replace", v: { c: "select" } }],},

              {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["c"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return  'binding:"'+row[3]+'"'  ;
                        } else {
                          return 'binding:"XXX"';
                        }
                      }
                    }
                  
                  }
                }

              
              ]
            }


          ],
        },


           {
          // 取第一个值 组成数组格式
          value: "ssButton",
          label: "ssButton",
          template: '{"Name": "${0:nm}", "Cmd": "${1:insert}",  "Class": "${2}" },',
          param: [

          ],
          fix: {
            roles: [],
            fixRoles: []
          }
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
              }
              // { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              // { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },

        {
          // 取第一个值 组成数组格式
          value: "switch2and1",
          label: "switch2and1",
          template: '"${1:to2}" "${0:to1}"',
          param: {},
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
                { k: "copy", v: { "3": true }, scope: ["c", "d"] },
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