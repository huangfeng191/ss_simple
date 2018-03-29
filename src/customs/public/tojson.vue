<template>
  <div id="tojson">
    <el-row>
      <el-col :span="7">
        <el-select @change="selectTp" class="selfw" v-model="selected" multiple filterable allow-create placeholder="请选择文章标签">
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
      <el-col :span="10" v-for="r in selectedetail" :key="r.value">
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
  props: ["types","selected"],
  data() {
    return {
      //undo 添加是否存在不同处理逻辑
      //可以考虑添加截取功能

      //paramBefore 事先对输入进行处理 目前只支持 function 方式
      //  暂时参数 replace
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

      //   'copy' 从其他输入复制 (不为空的时候才复制,目前复制的是输入，而不是转换后的值 , scope 是在范围内的才复制)

      // fix 对行进行操作， 在 param 对行进行处理的时候，在行头，行尾替换、转换处理
      // fix :{ roles:[规则] ,params:{ 参数 }}
      //      roles:  single double both , first end 修理行数据 在行的位置添加
      //  { k: 'both', v: [{ k: 'replace', v: [{ '/^{/': '[{', '/},$/': '}],' }] }] }
      //               k  规则名称， v 规则详细
      //  param 逻辑跟行处理的逻辑一致
      // 在读取的时候 处理 param
      // 'VUECRUDCOL', 'VUECRUDInputTwo', 'goModelAll', 'goStruct'

      //  single:true, 是指没有模板时，输入 不用分 ，不用转换，当做1行处理的情况
     
     

      template: "",
      param: "",
      fixparam: "",
      aparts: " ,	",
      proto: "", // 输入的原始数据
      lastSelect: ""
      //up data
      //dowm for show
    };
  },
  methods: {
    getTemp() {},
    changeTemplate() {
      var self = this;
      if (self.selected.length > 0) {
        $.each(self.types, function(i, v) {
          if (v.value == self.selected[0]) {
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
    // 一个规则
    toFilter: function(arr, regO) {
      // regO  /g /i    role:  replace  match
      // idx:    -- 暂时是数字类型

      let rArr = [];
      $.each(arr, function(arri, arrv) {
        let matched = [];
        if (regO.role == "match") {
          if (regO.g) {
            matched = arrv.match(new RegExp(regO.reg, "g"));
          } else {
            matched = arrv.match(new RegExp(regO.reg));
          }

          if (!matched) {
            rArr.push("");
          } else if (regO.idx != undefined) {
            rArr.push(matched[regO.idx] || "");
          } else {
            rArr.push("未定");
          }
        }
      });
      return rArr;
    },
    // temp 选中的单个模板
    //row [] 需要转换的数据 ， irow 第几行（对行添加前缀后缀时需要） o 其他对象
    // row 是一个一维数组，是用分隔符分割后的数据 ？

    rowTransfer: function(temp, irow, row, len, o) {
      let self = this;
      // 是对输入的字段按分隔符进行处理
      if (temp.paramBefore) {
        // 处理分两类: 参数处理，模板处理，此部分是在 转换前
        $.each(temp.paramBefore, function(vi, vv) {
          if (vv.k == "fun") {
            if (row) {
              row = vv.v(row);
            }
          }
          if (vv.k == "reg") {
            // v 截取规则
            if (row) {
              row = self.toFilter(row, vv.v);
            }
          }
        });
      }
      // 找出可替换变量
      var reg = /\$\{{1}[0-9a-zA-Z\_\/:]+\}{1}/g;
      // 对每个变量进行处理
      var re = /\$\{{1}([0-9]+):?([0-9a-zA-Z\_]*)(\/{1}[0-9a-zA-Z\_\/]*||'')\}{1}/;
      // 单个参数处理正则
      // "${1:nm/String/g}" 第一部分0 匹配值，第二部分1 key ,第三部分2  默认值,  第四部分3正则 , 第五部分4输入字符串
      // ["${1:nm/String/g}", "1", "nm", "/String/g", index: 0, input: "${1:nm/String/g}"]

      // template 是 二维数组，
      // 将行数据 ，与模板结合生成真正的行数据
      let oneRow = "";
      // 没有模板的时候，直接返回数据
      if (temp.template) {
        oneRow = temp.template.replace(reg, function(str) {
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
                    // 参数的replace 功能 // 参数时是原样替换
                    if (vv.k == "replace") {
                      $.each(vv.v, function(vvVk, vvVv) {
                        if (s == vvVk) {
                          s = vvVv;
                        }
                      });
                    }

                    if (vv.k == "copy") {
                      // (不为空的时候才复制,目前复制的是输入，而不是转换后的值 , scope 是在范围内的才复制 )
                      $.each(vv.v, function(vvVk, vvVv) {
                        //---

                        if (vvVk && row[vvVk] != undefined) {
                          if (vv.scope && $.inArray(row[vvVk], vv.scope) < 0) {
                          } else {
                            s = row[vvVk];
                          }
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
      } else {
        // 没有模板的时候，直接返回数据
        oneRow = row.join("\n");
      }
      // 对格式化后的行数据进行二次格式化
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
      $.each(self.selected, function(i, v) {
        // 循环选中模板
        a.push(o[v].template + (o[v].desc ? "------//" + o[v].desc : ""));
      });

      return a.join("\n");
    },
    // 转换的入口函数
    selectedetail: function() {
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

      $.each(self.selected, function(i, v) {
        // 循环选中模板

        var temp = [];
        o[v]["tempV"] = ""; // 更改值,既每个模板的返回值
        if (o[v].template) {
          o[v]["tempV"] = [];
          // 循环生成记录
          $.each(a1, function(a1i, a1v) {
            // 模板  索引 替换值
            let oneRow = self.rowTransfer(o[v], a1i, a1v, a1.length);

            o[v]["tempV"].push(oneRow);
          });
          // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑     每行处理完的结果
          // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 行join :(\n) 行替换完后处理

          o[v]["tempV"] = o[v]["tempV"].join("\n");
        } else {
          // 没有模板的话说明 参数就是输出， 只是做必要转换，那时候就得配置fix  了 （对每行进行处理）
          // 处理逻辑跟 fixparam 一致，只不过挪用param 的位置
        }

        if (o[v].fix && (o[v].fix.param || o[v].fix.fixRoles || o[v].fix.paramBefore)) {
          let oAfter = { template: o[v]["tempV"] };
          if (o[v].fix.fixRoles) {
            oAfter.fix = { roles: o[v].fix.fixRoles };
          }
          if (o[v].fix.param) {
            oAfter.param = o[v].fix.param;
          }
          if (o[v].fix.paramBefore) {
            oAfter.paramBefore = o[v].fix.paramBefore;
          }
          // 整个模板当一行处理
          //fixparam 界面输入的参数

          let a1v = [];
          //single 参数目前只用于一行（template） is null 情况
          if (o[v].single) {
            a1v = [self.proto];
          } else if (!o[v].template) {
            a1v = self.proto.split(/[\n ]/).filter(function(x) {
              if (x) return true;
            });
          } else {
            a1v = self.fixparam.split(/[\n ]/).filter(function(x) {
              if (x) return true;
            });
          }
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