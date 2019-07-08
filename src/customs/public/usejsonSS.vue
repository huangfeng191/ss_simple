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
      // selected: ["tableRow","ssForm", "ssButton", "ssBinding", "ssTable"],
      // selected: ["CommandForm","ssBindingSame","CommandFormExtend"],
      // selected: ["CommandForm", "CommandFormExtend"],
      selected: ["CommandFormExtend"],
      types: [
        {
          value: "ssForm",
          label: "ssForm",
          template:
            ' [{ "title": "${0:nm}","field": "${1:sn}",  "showType": "${2:text}", ${21} }],',
          param: [
            { k: "2", v: [{ k: "replace", v: { c: "select" } }] },

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
                          return 'binding:"' + row[3] + '"';
                        } else {
                          return 'binding:"XXX"';
                        }
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          value: "CommandForm",
          label: "CommandForm",
          template:
            ' [{ "title": "${0:nm}","field": "${1:sn}","command": "${2}","key": "${3}","showType": "${4:text}", ${41} }],',
          param: [
            { k: "4", v: [{ k: "replace", v: { c: "select" } }] },

            {
              k: "41",
              v: [
                { k: "copy", v: { "4": true }, scope: ["c"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[5]) {
                          return 'binding:"' + row[5] + '"';
                        } else {
                          return 'binding:"XXX"';
                        }
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          value: "CommandFormExtend",
          label: "CommandFormExtend",

          //  title	qCommand	qOthers	qKey	qGroup
          template:
            ',"qCommand": "${2}","qKey": "${1}","qOthers": ${3},"qGroup": "${4}" ${99} ',
          param: [],
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr) {
                // 3 = 替换成词典  # 替换成 数组  
              var isLast="";
              if(arr.length>0){
               
                 if(arr[arr.length-1].split("#").length>1){
                  isLast=arr[arr.length-1].split("#")[1]
                  arr.splice(-1,1)
                }
              }

                
              

                if (arr.length == 4) {
                  if (arr[3].split("=").length == 1) {
                    arr[4] = arr[3];
                    arr[3] = '""';
                  }
                }
                (arr || []).forEach(function(a, i) {
                  if (a.split("=").length > 1) {
                    var keyValue = a.split("=");
                    arr[i] = {};
                    arr[i][keyValue[0]] = keyValue[1];
                    arr[i] = JSON.stringify(arr[i]);
                  }
                });
                if(isLast){
                  arr.push('')
                  arr.push('')
                  arr.push('')
                  arr.push(',"qIndexKey":"'+isLast+'" ,"qIndexLevel":"2"')
                }else{
                    arr.push('')
                }

                return arr;
              }
            }
          ]
        },
        {
          value: "ssTable",
          label: "ssTable",
          // showType  : c select  v selectValue b:button
          template:
            ' { "title": "${0:nm}","field": "${1:sn}",  "showType": "${2:text}", ${21}  ${22} },',
          param: [
            {
              k: "2",
              v: [
                {
                  k: "replace",
                  v: { b: "button", c: "select", v: "selectValue" }
                }
              ]
            },

            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["b"] },
                {
                  k: "containsReplace",
                  v: {
                    b: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return 'format:"' + row[3] + '"';
                        } else {
                          return 'format:"XXX"';
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              k: "22",
              v: [
                { k: "copy", v: { "2": true }, scope: ["c", "v"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return 'binding:"' + row[3] + '"';
                        } else {
                          return 'binding:"XXX"';
                        }
                      }
                    },
                    v: {
                      // 输入为v
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return 'binding:"' + row[3] + '"';
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
          fix: {
            roles: [],
            fixRoles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },
        {
          value: "tableRow",
          label: "tableRow",
          // showType  : c select  v selectValue b:button
          template: ' { "title": "${0:nm}","field": "${1:sn}"${21}${22} },',
          param: [
            //  f  format   d  dateformatter  c binding
            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["f", "d"] },
                {
                  k: "containsReplace",
                  v: {
                    f: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return ',format:"' + row[3] + '"';
                        } else {
                          return ',format:"XXX"';
                        }
                      }
                    },
                    d: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return ',format:"' + row[3] + '"';
                        } else {
                          return ',format:"TimeFormatter"';
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              k: "22",
              v: [
                { k: "copy", v: { "2": true }, scope: ["c"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return ',binding:"' + row[3] + '"';
                        } else {
                          return ',binding:"XXX"';
                        }
                      }
                    }
                  }
                }
              ]
            }
          ],
          fix: {
            roles: [],
            fixRoles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },
        {
          // 取第一个值 组成数组格式
          value: "ssButton",
          label: "ssButton",
          template:
            '{"Name": "${0:nm}", "Cmd": "${1:insert}",  "Class": "${2}" },',
          param: [],
          fix: {
            roles: [],
            fixRoles: []
          }
        },
        {
          // 取第一个值 组成数组格式
          value: "ssBinding",
          label: "ssBinding",
          template: '{"Name": "${0}", "Value":"${1}" },',
          param: [],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [
                      {
                        "/^/": "${0:nm}:[//${1:nm}\n"
                      }
                    ]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n]" }] }]
              }
            ],
            fixRoles: []
          }
        },
        {
          // 取第一个值 组成数组格式
          value: "ssBindingSame",
          label: "ssBindingSame",
          template: '{"Name": "${0}", "Value":"${0}" },',
          dealProtoLikeArray: function(a) {
            var ret = [];
            var b = a;
            if (!a) {
              b = [];
            }
            b.forEach(function(x) {
              $.each(x, function(xi, xv) {
                ret.push([xv]);
              });
            });
            return ret;
          },
          param: [],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [
                      {
                        "/^/": "${0:nm}:[//${1:nm}\n"
                      }
                    ]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n]" }] }]
              }
            ],
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
              v: [
                {
                  k: "replace",
                  v: { string: "String", int: "Number", double: "Number" }
                }
              ]
            },
            {
              k: "3",
              v: [
                { k: "filterStr", v: [{ k: "notNumber", operate: "and" }] },
                {
                  k: "replace",
                  v: {
                    c: "combo",
                    d: "datetime",
                    a: "textarea",
                    u: "upload",
                    t: "text"
                  }
                }
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
              {
                k: "mod",
                condition: { k: 3, v: 0 },
                v: [{ k: "replace", v: [{ "/^{/": "[{" }] }]
              },
              {
                k: "mod",
                condition: { k: 3, v: 2 },
                v: [{ k: "replace", v: [{ "/},$/": "},]," }] }]
              },
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