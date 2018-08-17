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
      selected: [ "toRowSingle", "CueColumns", "CueCrudInputThree"],
      // selected: ["scada6crudinputThree"],
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
              v: [{ k: "existsReplace", v: { int: "int", nt: "int", Int: "int", string: "string", text: "text" }, or: ["number"] }]
            },
            {
              k: "97",
              v: [{ k: "existsReplace", v: { int: "int", nt: "int", Int: "int", string: "string", text: "text" }, or: ["number"] }]
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
          value: "scada6Input",
          label: "scada6Input",
          template: '"${1}": {"Names": [u"${0}"], "DataType": "${2:String}", "Ext": "","required":True},',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { string: "String", int: "Number", double: "Double" } }]
            }
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
//  cue 
         {
          value: "CueCrudInputThree",
          label: "CueCrudInputThree",
          template: 
        '{title: "${0}", data: "${1}", required: false, dataType: "${2:String}", showType: "${3:text}" ${31},},',
          param: [
              {
              k: "2",
              v: [{ k: "replace", v: { string: "String", int: "Number", double: "Number", float: "Number" , text: "String" } }]
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
                { k: "copy", v: { "3": true }, scope: ["c","d","a"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4]) {
                          return ',format:"'+row[4]+'"';
                        } else {
                          return ',format:"USER"';
                        }
                      }
                    },
                     d: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4] && /^[0-9]+$/g.exec(row[4]) == null) {
                          return ',format:"'+row[4]+'"';
                        } else {
                          return ',format:"yyyy-MM-dd"';
                        }
                      }
                    },
                      a: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        return ',colSpan:3';
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
          value: "CueColumns",
          label: "CueColumns",
          template: 
          '{title: "${0}", data: "${1}","width": 100,${3}  },',
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
                          // return 'binding:"' + row[4] + '"';
                          return 'format:"' + row[4] + '",';
                        } else {
                          return 'format:"USER",';
                        }
                      }
                    },
                    d: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[4]=="yyyy") {
                          return 'type: "date",format: "yyyy", ';
                        } else  if (row[4]=="yyyy-MM") {
                          return 'type: "date",format: "yyyy-MM", ';
                        } else {
                          return 'type: "date",format: "yyyy-MM-dd", ';
                        }
                      }
                    },
                  
                    // u: 'unit:"XXX",',
                    // f: "formatter: function (v, r, i) {\n if (v){return v; \n}else {\n return v; \n}   },"
                  }
                }
              ]
            }
          ],
           fix: {
    
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