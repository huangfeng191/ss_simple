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
      // 整个模板进行处理，对象放入 (fix.param (主要是替换参数用) 跟 fix.fixRoles（对模板进行处理）),处理模式与行一样，调用相同的函数

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
     
     

      template: "", //*** 行模板
      param: "",    //*** 行模板 
      aparts: " ,	",//*** 对行处理的分割符， 也就是说 获取 ${?}信息
      fixparam: "",
      proto: "", //*** 输入的所有原始数据
      lastSelect: "" //*** 暂时没用，记录最后一次选择的情况，可以考虑使用 lastSelect
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
    // 选择模板时触发
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
    /* ↓↓↓↓↓↓↓↓↓↓↓↓以下为转换的规则 */
    // 只有包含的字符才替换 ，按顺序单个替换
    // str 输入的值，  config 配置的规则 ，time 匹配几次, same 是否完全匹配
    // 
    containsReplace: function({str,config,time=0,same=true,row,tempConfigO}) {
      debugger
      // s 是最后的返回值
      let s = "";
      let configO = {};
      $.each(config, function(configk, configv) {
        configO[configk] = 1;
      });

      $.each(str.split(""), function(stri, strv) {
        // 如果不在替换范围内则不需要替换 ，或者转换次数大于
        if (same && (configO[strv] == undefined || (configO[strv] > time && time != 0))) {
          s = "";
          return false;
        }

        if (config[strv] != undefined) {
          if (time == 0 || time >= configO[strv]) {

            if(config[strv].k){
                if(config[strv].k=="fun"){
                      // row 行数组, 需要处理的模板
                      s = config[strv].v(row,tempConfigO);
                    }
            }else{
               s += config[strv];

            }

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
     /* ↑↑↑↑↑↑↑↑↑↑↑↑以上为转换的规则 */
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

//  作为逻辑来讲，，1 模板，+proto 生成目标数据，对目标数据进行处理（fix）
/* 对行数据处理的核心方法
处理逻辑：
    找出模板中需要替换的字段，用用户输入的信息进行替换，
    目前调用分两种情况，
      1 对行数据进行处理，此时的规则配置为：param:[
        {  替换字段按顺序执行
              k: "2",
              v: [   k规则名， 对每项的规则按顺序执行
                   { k: "replace",  
                    v: { c: "combo", d: "datetime", a: "textarea", u: "upload", f: "text" }}] 
                    
        },
      ] 
      2 对行数据处理完合并的数据，再次应用规则，此时的规则配置为：fix{
          roles: [ 对数据进行处理
              {
                k: "both",
                v: [{ k: "replace", v: [{ "/^{/": "[{", "/},$/": "}]," }] }]
              }
            ],

           //  paramBefore: [  事先对输入进行处理 目前只支持 function 方式 (次方法应该也可在 方式1中使用)
              { 
                k: "fun",
                v: function(arr) {
                  return arr.filter(function(v, i, self) {
                    if (v == "–") {
                      return false;
                    }
                    return self.indexOf(v) === i;
                  });
                }
              }
            ],  

            param: [] // 类似调用方式1 中的，param

            fixRoles: [ // 就是方式1中的 fix.roles   roles:  single double both , first end 修理行数据 在行的位置添加
              {
                k: "fun",
                v: function(str) {
                  return str.split("\n").join(",");
                }
              }
            ]



      }
    
    */
   /* 
   temp: 模板：
   irow: proto  的第几行
   row:proto 根据分割符分割后的数组[1,2,3,4]
   len:proto 的总行数
   o:可能暂时没有用到
   */
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
          // 对每个匹配项 进行 处理(每一项的返回值)
          // 用户输入的row 数组里面，根据 key:数组下标，找到值
          let s = "";
          /*str ： ${0:1} 类似次结构
           是 应用正则后 返回复核要求的每一项
           str.match(re)： 得到需要替换的属性，考虑把这个对象存成一个对象(tempConfigO)，后续可使用 
           */
          let tempConfigO={}
          let methodParam={}// 为了解构新加 ,函数调用function
              methodParam["tempConfigO"]=tempConfigO
              methodParam["row"]=row
          if (str.match(re)) {
            tempConfigO["str"]=str.match(re)[0]
            tempConfigO["key"]=str.match(re)[1]
            tempConfigO["default"]=str.match(re)[2]
            // "${1:nm/String/g}" 第一部分0 匹配值，第二部分1 key ,第三部分2  默认值,  第四部分3 正则 , 第五部分4输入字符串
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
                        // 输入的值 是需要替换的，那么替换成配置的值
                        if (s == vvVk) {
                          // 如果需要替换的值时一个对象，那么按对象类型（目前只有一个fun）进行控制
                          if(vvVv.k){
                            if(vvVv.k=="fun"){
                              // row 行数组, 需要处理的模板
                              s = vvVv.v(row,tempConfigO);
                            }

                          }else{
                            s = vvVv;
                          }
                         
                        }
                      });
                    }

                    if (vv.k == "copy") {
                      // (不为空的时候才复制,目前复制的是输入，而不是转换后的值 , scope 是在范围内的才复制 )
                      $.each(vv.v, function(vvVk, vvVv) {
                        //---
                        debugger
                        if (vvVk && row[vvVk] != undefined) {
                          if (vv.scope && $.inArray(row[vvVk], vv.scope) < 0) {
                          } else {
                            s = row[vvVk];
                          }
                        }
                      });
                    }
                    if (vv.k == "containsReplace" && vv.v) {
                      // s 输入的值，  vv.v 配置的规则 ，vv.time 匹配几次, vv.same 是否完全匹配
                      // str,config,time,same=true
                      let containsRQuery={}
                      containsRQuery["str"]=s
                      containsRQuery["config"]=vv.v
                      containsRQuery["time"]=vv.time
                      containsRQuery["same"]=vv.same
                      containsRQuery["row"]=methodParam.row
                      containsRQuery["tempConfigO"]=methodParam.tempConfigO
                      s = self.containsReplace(containsRQuery);
                      // s = self.containsReplace(s, vv.v, vv.time, vv.same);
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
        debugger
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
    // ******** 转换的入口
    // 转换的入口函数
    selectedetail: function() {
      var self = this;

      var o = {};
      var a = [];

      // 获取模板对象
      $.each(self.types, function(index, v) {
        o[v.value] = v;
      });
//↓↓↓↓↓↓↓↓↓↓↓ 从输入的原始数据（proto） 中依据分割符号，提取成二维数组的数据
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
//↑↑↑↑↑↑↑*************** 从输入的原始数据（proto） 中依据分割符号，提取成二维数组的数据

      $.each(self.selected, function(i, v) {
        // 循环选中模板

        var temp = [];
        o[v]["tempV"] = ""; // 更改值,既每个模板的返回值

        //↓↓↓↓↓↓↓*************** 行数据需要转换的模板开始处理

        if (o[v].template) {
          o[v]["tempV"] = [];
          // 循环生成记录
          $.each(a1, function(a1i, a1v) {
            // 模板  索引 替换值 将输入行（proto）通过分割符分割成数组 [1,2,3,4]
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

        //↑↑↑↑↑↑↑*************** 行数据需要转换的模板处理完成

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