<template>
  <div id="tojson">
    <el-row>
      <el-col :span="7">
        <el-select @change="selectTp" class="selfw" v-model="selectd" multiple filterable allow-create placeholder="请选择文章标签">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
       <el-col :span="8">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 2}" placeholder="fixparam" v-model="fixparam">
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input class="selfw" @change="changeTemplate" type="textarea" :autosize="{ minRows: 2}" placeholder="template" v-model="template">
        </el-input>
      </el-col>
     
    </el-row>
    <el-row class="content">
      <el-col :span="4">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 10}" placeholder="原始" v-model="proto">
        </el-input>
      </el-col>
      <el-col :span="10" v-for="r in selectDetail" :key="r.value">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 10}" :placeholder="r.label" v-model="r.tempV">
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top:30px;">
      <el-col :span="7">
        <el-input class="selfw" type="textarea" :rows="2" placeholder="aparts" v-model="aparts">
        </el-input>
      </el-col>
      <el-col :span="17">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 2}" placeholder="template" v-model="selectTemplates">
        </el-input>
      </el-col>

    </el-row>

  </div>
</template>
<style lang="less">
#tojson {
  .selfw {
    width: 90%;
  }
  .content {
    margin-top: 120px;
    .selfw {
      width: 98%;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      //先按行进行处理 先处理 param  然后处理 fix
      // 整个模板进行处理，对象放入 fix.param  跟 fix.fixRoles,处理模式与行一样，调用相同的函数

      // param 对 template 进行处理，绑定proto(用户输入)
      //param  是对${...}单个模板 输入项进行操作， 支持操作  [{k:"1",v: [ 规则]}]
      //  对 模板 进行正则处理 ，匹配的项可 [{}]
      //  'transfer',  ( capitalize 首字母大写 ，snake 驼峰)  { k: 'transfer', v: { capitalize: true } }

      //  'replace'  根据输入文本替换成其他文本        { k: 'replace', v: { d: 'format:"yyyy-MM-dd"', c: 'format:"XXX"', s: 'format:"H0002"' } }
      //  'containsReplace'  根据输入逐个解析  默认全部符合时才显示， 可设置 time 符合次数   same 全部符合
      //  { k: 'containsReplace', v: { d: 'format:"yyyy-MM-dd"', c: 'format:"XXX"', s: 'format:"H0002"' } }

      //  'append'     v: { datetime: '",format:"yyyy-MM-dd', combo: '",format:"XXX' }

      //   'copy' 从其他输入复制

      // fix 对行进行操作， 在 param 对行进行处理的时候，在行头，行尾替换、转换处理
      // fix :{ roles:[规则] ,params:{ 参数 }}
      //      roles:  single double both , first end 修理行数据 在行的位置添加
      //  { k: 'both', v: [{ k: 'replace', v: [{ '/^{/': '[{', '/},$/': '}],' }] }] }
      //               k  规则名称， v 规则详细
      //  param 逻辑跟行处理的逻辑一致
      // 在读取的时候 处理 param
      // 'VUECRUDCOL', 'VUECRUDInputTwo', 'goModelAll', 'goStruct'
      selectd: ["VUECRUDCOL", "VUECRUDInputTwo", "goModelAll", "goStruct"],
      // selectd: ["toRow", "toRowSingle"],
      types: [
        {
          value: "VUECRUDCOL",
          label: "VUECRUDCOL",
          template: '{ title: "${2:nm}", data: "${0:code}", width: 130,${3} },',
          desc: "第四个参数：d:时间格式,c:词典,s:词典",
          param: [
            {
              k: "3",
              v: [{ k: "containsReplace", v: { d: 'format:"yyyy-MM-dd"', c: 'format:"XXX"', s: 'format:"H0002"' } }]
            }
          ]
        },
        {
          value: "VUECRUDInputOne",
          label: "VUECRUDInputOne",
          template: '{title: "${2:nm}",data: "${0:code}",required: true,dataType: "${1}",showType: "${3:text}"},',
          desc: "",
          fix: {
            roles: [
              {
                k: "both",
                v: [{ k: "replace", v: [{ "/^{/": "[{", "/},$/": "}]," }] }]
              }
            ],
            param: []
          },
          // 参数为1维数组的原因是 我希望顺序执行规则 ,采用 k v 对象方式是为了以后扩展方便
          param: [
            {
              k: "1",
              v: [
                // 元素值， 变化后值
                { k: "replace", v: { string: "String", int: "Number", int64: "Number" } }
              ]
            },
            {
              k: "3",
              v: [
                { k: "containsReplace", v: { d: "datetime", c: "combo", t: "text", s: "switch" } },
                { k: "append", v: { datetime: '",format:"yyyy-MM-dd', combo: '",format:"XXX' } }
              ]
            }
          ]
        },
        {
          value: "VUECRUDInputTwo",
          label: "VUECRUDInputTwo",
          template: '{title: "${2:nm}",data: "${0:code}",required: true,dataType: "${1}",showType: "${3:text}"},',
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              { k: "double", v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },
              { k: "single", v: [{ k: "replace", v: [{ "/},$/": "}]," }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "}]," }] }] }
            ]
          },
          // 参数为1维数组的原因是 我希望顺序执行规则 ,采用 k v 对象方式是为了以后扩展方便
          param: [
            {
              k: "1",
              v: [{ k: "replace", v: { string: "String", int: "Number", int64: "Number" } }]
            },
            {
              k: "3",
              v: [
                { k: "containsReplace", v: { d: "datetime", c: "combo", t: "text", s: "switch" } },
                { k: "append", v: { datetime: '",format:"yyyy-MM-dd', combo: '",format:"XXX' } }
              ]
            }
          ]
        },
        {
          value: "goModel",
          label: "goModel",
          template: '${0} *${1} `json:"${10}" xorm:"${3}${11}"` //${2}',
          desc: 'i: "index ", u: "unique ", p: "pk ", n: "null ", o: "not null "',
          param: [
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            { k: "1", v: [{ k: "replace", v: { float64: "float64" } }] },
            {
              k: "3",
              v: [{ k: "containsReplace", v: { i: "index ", u: "unique ", p: "pk ", n: "null ", o: "not null " } }]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            },
            {
              k: "11",
              v: [
                { k: "copy", v: { "1": true } },
                { k: "replace", v: { int: "INT(11)", int64: "BIGINT(20)", float64: "DOUBLE", string: "VARCHAR(256)" } }
              ]
            }
          ]
        },
        {
          value: "goModelAll",
          label: "goModelAll",
          template: '${0} *${1} `json:"${10}" xorm:"${3}${11}"` //${2}',
          desc: 'i: "index ", u: "unique ", p: "pk ", n: "null ", o: "not null "',
          param: [
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            {
              k: "1",
              v: [{ k: "replace", v: { float64: "float64" } }]
            },
            {
              k: "3",

              v: [
                {
                  k: "containsReplace",
                  v: { i: "index ", u: "unique ", p: "pk ", n: "null ", o: "not null " }
                }
              ]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            },
            {
              k: "11",
              v: [
                { k: "copy", v: { "1": true } },
                { k: "replace", v: { int: "INT(11)", int64: "BIGINT(20)", float64: "DOUBLE", string: "VARCHAR(256)" } }
              ]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [{ "/^/": 'type ${0:table_name} struct {\nBean       `xorm:"extends"`\n' }]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n}" }] }]
              }
            ],
            param: [
              {
                k: "0",
                v: [{ k: "transfer", v: { snake: true } }]
              }
            ]
          }
        },
        {
          //
          value: "goStruct",
          label: "goStruct",
          template: '${0} *${1} `json:"${10}"`',
          param: [
            // 对 模板 进行正则处理 ，匹配的项可
            //     'transfer',  ( capitalize 首字母大写 ，snake 驼峰)
            //   'replace'  根据输入文本替换成其他文本
            //  'copy' 从其他输入复制
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            {
              k: "1",
              v: [{ k: "replace", v: { float64: "float64" } }]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加

              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [{ "/^/": "type ${0:struct_name} struct {\n" }]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n}" }] }]
              }
            ],
            param: [
              {
                k: "0",
                v: [{ k: "transfer", v: { snake: true } }]
              }
            ]
          }
        },
        {
          //
          value: "goStructValue",
          label: "goStructValue",
          template: '${0} ${1} `json:"${10}"`',
          param: [
            // 对 模板 进行正则处理 ，匹配的项可
            //     'transfer',  ( capitalize 首字母大写 ，snake 驼峰)
            //   'replace'  根据输入文本替换成其他文本
            //  'copy' 从其他输入复制
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            {
              k: "1",
              v: [{ k: "replace", v: { float64: "float64", "array[string]": "[]string" } }]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加

              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [{ "/^/": "type ${0:struct_name} struct {\n" }]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n}" }] }]
              }
            ],
            param: [
              {
                k: "0",
                v: [{ k: "transfer", v: { snake: true } }]
              }
            ]
          }
        },
        {
          value: "rowToArray",
          label: "rowToArray",
          template: '"${0}",',
          param: {},
          fix: {
            roles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/,$/": "]" }] }] }
            ]
          }
        },
        // 未解决
        // 可以考虑生成sql语句
        // 指定数据格式， 可使用参数（与fix 参数可混用，毕竟同时用参数的情况不多）
        {
          // 取第一个值 组成数组格式
          value: "toRow",
          label: "toRow",
          template: '"${0:nm}" ',
          param: {},
          fix: {
            roles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  return str.split("\n").join(",");
                }
              }
            ]
          }
        },
             {
          // 取第一个值 组成数组格式
          value: "toRowNumber",
          label: "toRowNumber",
          template: '${0:nm} ',
          param: {},
          fix: {
            roles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  return str.split("\n").join(",");
                }
              }
            ]
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
              },
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },
        {
          value: "json",
          label: "json",
          template: '{"${0}":"${1}"},'
        },
        // scada6
        {
          value: "scada6crudcol",
          label: "scada6crudcol",
          template:
            '{ "field": "${0:nm}"    ,  "title": "${1:nm}", "align": "center", "halign": "center", "colspan": 1, "hidden": false, "rowspan": 1, "width": 100 },',
          param: {}
        },

        {
          value: "scada6crudinputOne",
          label: "scada6crudinputOne",
          template:
            '  [{ "Field": "${0:nm}", "Name": "${1:nm}",ShowType: "${2:text}",  DataType: "${3:String}", Ext: "${4}", "Required": true, RowSpan: 1, ColSpan: 1 },],',
          param: {}
        },
        {
          value: "scada6crudinputTw0",
          label: "scada6crudinputTw0",
          template:
            '[  { "Field": "${0}", "Name": "${1}", ShowType: "text",  DataType: "${2:String}",Ext: "", "Required": true, RowSpan: 1, ColSpan: 1 ,Unit:""},\n' +
            '   { "Field": "${3}", "Name": "${4}", ShowType: "text",Ext: "", DataType: "${5:String}",   "Required": true, RowSpan: 1, ColSpan: 1 ,Unit:""},],'
        }
      ],
      template: "",
      param: "",
      fixparam: "",
      aparts: " ,	",
      proto: "",
      lastSelect: ""
      //up data
      //dowm for show
    };
  },
  methods: {
    getTemp() {},
    changeTemplate() {
      var self = this;
      if (self.selectd.length > 0) {
        $.each(self.types, function(i, v) {
          if (v.value == self.selectd[0]) {
            v["template"] = self.template;
          }
        });
      }
    },
    selectTp(values) {
      if (!values[0]) {
        return;
      }

      var self = this;
      var o = {};
      $.each(self.types, function(index, v) {
        o[v.value] = v;
      });
      self.template = o[values[0]].template;
      self.param = JSON.stringify(o[values[0]].param);
    },
    // 只有包含的字符才替换 ，按顺序单个替换
    containsReplace: function(str, config, time = 1, same = true) {
      let s = "";
      let configO = {};
      $.each(config, function(configk, configv) {
        configO[configk] = 1;
      });

      $.each(str.split(""), function(stri, strv) {
        if (same && (configO[strv] == undefined || (configO[strv] > time && time != 0))) {
          s = "";
          return false;
        }

        if (config[strv] != undefined) {
          if (time == 0 || time >= configO[strv]) {
            s += config[strv];
            configO[strv] += 1;
          }
        }
        // 字母不完全在config中，或者次数超过规定
      });

      return s;
    },
    // 首字母大写
    capitalize(str) {
      // 正则法
      str = str.toLowerCase();
      var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
      return str.replace(reg, function(m) {
        return m.toUpperCase();
      });
    },
    // 含_-驼峰命名法
    snake: function(str) {
      let self = this;
      let s = [];
      $.each(str.split(/[\_-]/), function(k, v) {
        s.push(self.capitalize(v));
      });
      return s.join("");
    },
    // temp 选中的单个模板
    //row 需要转换的数据 ， i 第几行（重写需要） o 其他对象
    rowTransfer: function(temp, irow, row, len, o) {
      let self = this;

      // 找出可替换变量
      var reg = /\$\{{1}[0-9a-zA-Z\_\/:]+\}{1}/g;
      // 对每个变量进行处理
      var re = /\$\{{1}([0-9]+):?([0-9a-zA-Z\_]*)(\/{1}[0-9a-zA-Z\_\/]*||'')\}{1}/;
      // 单个参数处理正则
      // "${1:nm/String/g}" 第一部分0 匹配值，第二部分1 key ,第三部分2  默认值,  第四部分3正则 , 第五部分4输入字符串
      // ["${1:nm/String/g}", "1", "nm", "/String/g", index: 0, input: "${1:nm/String/g}"]

      let oneRow = temp.template.replace(reg, function(str) {
        // 对每个匹配项 进行 处理(没一项的返回值)
        let s = "";

        if (str.match(re)) {
          // "${1:nm/String/g}" 第一部分0 匹配值，第二部分1 key ,第三部分2  默认值,  第四部分3正则 , 第五部分4输入字符串
          if (row[str.match(re)[1]] != undefined && row[str.match(re)[1]] != "") {
            s = row[str.match(re)[1]];
          } else {
            s = str.match(re)[2];
          }
          //  正则暂时不启用
          // if(str.match(re)[3]){
          //
          //     s.match(str.match(re)[3])
          // }
          // 每一项返回值进行二次处理
          if (temp.param) {
            $.each(temp.param, function(ip, vp) {
              // 同一序号处理完成后再处理其他序号
              if (str.match(re)[1] == vp.k) {
                $.each(vp.v, function(vi, vv) {
                  // 参数的replace 功能
                  if (vv.k == "replace") {
                    $.each(vv.v, function(vvVk, vvVv) {
                      if (s == vvVk) {
                        s = vvVv;
                      }
                    });
                  }

                  if (vv.k == "copy") {
                    $.each(vv.v, function(vvVk, vvVv) {
                      //---

                      if (vvVk && row[vvVk] != undefined) {
                        s = row[vvVk];
                      }
                    });
                  }
                  if (vv.k == "containsReplace" && vv.v) {
                    s = self.containsReplace(s, vv.v, vv.time, vv.same);
                  }
                  if (vv.k == "transfer") {
                    $.each(vv.v, function(vvVk, vvVv) {
                      if (vvVk == "capitalize" && vvVv) {
                        s = self.capitalize(s);
                      }
                      if (vvVk == "snake" && vvVv) {
                        s = self.snake(s);
                      }
                    });
                  }

                  if (vv.k == "append") {
                    $.each(vv.v, function(vvVk, vvVv) {
                      if (s == vvVk) {
                        s += vvVv;
                      }
                    });
                  }
                });
              }
            });
          }
          return s;
        } else {
          return "";
        }
      });

      if (temp.fix) {
        $.each(temp.fix.roles, function(oi, ov) {
          if ((ov.k == "single" || ov.k == "both") && irow % 2 == 1) {
            // 单双行处理
            $.each(ov.v, function(ovi, ovv) {
              if (ovv.k == "replace") {
                $.each(ovv.v, function(ovvVk, ovvVv) {
                  $.each(ovvVv, function(k2, v2) {
                    oneRow = oneRow.replace(eval(k2), v2);
                  });
                });
              }
            });
          }
          if ((ov.k == "double" || ov.k == "both") && irow % 2 == 0) {
            // 单双行处理
            $.each(ov.v, function(ovi, ovv) {
              if (ovv.k == "replace") {
                $.each(ovv.v, function(ovvVk, ovvVv) {
                  $.each(ovvVv, function(k2, v2) {
                    oneRow = oneRow.replace(eval(k2), v2);
                  });
                });
              }
            });
          }
          if (ov.k == "end" && irow == len - 1) {
            // 单双行处理
            $.each(ov.v, function(ovi, ovv) {
              if (ovv.k == "replace") {
                $.each(ovv.v, function(ovvVk, ovvVv) {
                  $.each(ovvVv, function(k2, v2) {
                    oneRow = oneRow.replace(eval(k2), v2);
                  });
                });
              }
            });
          }
          if (ov.k == "first" && irow == 0) {
            // 单双行处理
            $.each(ov.v, function(ovi, ovv) {
              if (ovv.k == "replace") {
                $.each(ovv.v, function(ovvVk, ovvVv) {
                  $.each(ovvVv, function(k2, v2) {
                    oneRow = oneRow.replace(eval(k2), v2);
                  });
                });
              }
            });
          }
          if (ov.k == "fun") {
            debugger;
            oneRow = ov.v(oneRow);
          }
        });
      }

      return oneRow;
    }
  },
  computed: {
    selectTemplates: function() {
      var self = this;
      var o = {};
      $.each(self.types, function(index, v) {
        o[v.value] = v;
      });
      var a = [];
      $.each(self.selectd, function(i, v) {
        // 循环选中模板
        a.push(o[v].template + (o[v].desc ? "------//" + o[v].desc : ""));
      });

      return a.join("\n");
    },
    selectDetail: function() {
      var self = this;

      var o = {};
      var a = [];

      // 获取模板对象
      $.each(self.types, function(index, v) {
        o[v.value] = v;
      });

      var a1 = [];
      // 二维数组    [  行[需要替换对象]] a1
      // 需要转换的数据
      if (self.proto) {
        $.each(self.proto.split("\n"), function(i, v) {
          if (v) {
            a1.push(
              v.split(eval("/[" + self.aparts + "]/ ")).filter(function(x) {
                if (x) return true;
              })
            );
          }
        });
      }

      $.each(self.selectd, function(i, v) {
        // 循环选中模板

        var temp = [];
        o[v]["tempV"] = []; // 更改值,既每个模板的返回值
        if (o[v].template) {
          // 循环生成记录
          $.each(a1, function(a1i, a1v) {
            // 模板  索引 替换值
            let oneRow = self.rowTransfer(o[v], a1i, a1v, a1.length);

            o[v]["tempV"].push(oneRow);
          });
        }

        o[v]["tempV"] = o[v]["tempV"].join("\n");

        if (o[v].fix && (o[v].fix.param || o[v].fix.fixRoles)) {
          let oAfter = { template: o[v]["tempV"] };
          if (o[v].fix.fixRoles) {
            oAfter.fix = { roles: o[v].fix.fixRoles };
          }
          if (o[v].fix.param) {
            oAfter.param = { roles: o[v].fix.param };
          }
          // 整个模板当一行处理
          //fixparam 界面输入的参数
          let a1v = self.fixparam.split(/[\n ]/).filter(function(x) {
            if (x) return true;
          });
          o[v]["tempV"] = self.rowTransfer(oAfter, 0, a1v, 1);
        }

        a.push(o[v]);
      });
      // a 默认模板规则

      return a;
    }
  },
  watch: {},
  mounted() {
    $("#tojson").height($(window).height());
  }
};
</script>