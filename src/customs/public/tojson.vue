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
        <el-input class="selfw" @change="changeTemplate" type="textarea" :autosize="{ minRows: 2}" placeholder="template" v-model="template">
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 2}" placeholder="param" v-model="param">
        </el-input>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="4">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 10}" placeholder="原始" v-model="proto">
        </el-input>
      </el-col>
      <el-col :span="10" v-for="r in selectDetail">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 10}" :placeholder="r.label" v-model="r.tempV">
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top:30px;">
      <el-col :span="7">
        <el-input class="selfw" type="textarea" :rows="2" placeholder="aparts" v-model="aparts">
        </el-input>
      </el-col>
      <el-col :span="8">
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
      
      // param 对 template 进行处理，绑定proto(用户输入)
      //param  是对${...}单个模板 输入项进行操作， 支持操作  [{k:"1",v: [ 规则]}] 
            //  对 模板 进行正则处理 ，匹配的项可 [{}]
            //  'transfer',  ( capitalize 首字母大写 ，upperSnake 驼峰)  { k: 'transfer', v: { capitalize: true } }
              
            //  'replace'  根据输入文本替换成其他文本        { k: 'replace', v: { d: 'format:"yyyy-MM-dd"', c: 'format:"XXX"', s: 'format:"H0002"' } }
           
            //  'append'     v: { datetime: '",format:"yyyy-MM-dd', combo: '",format:"XXX' }
            
            //   'copy' 从其他输入复制

      // fix 对行进行操作， 在 param 对行进行处理的时候，在行头，行尾替换、转换处理 
      //      fix: single double both ,end 修理行数据 在行的位置添加
      //      k  规则名称， v 规则详细
      //      在 param 对行进行处理的时候，在行头，行位替换、转换处理
      // fixparam 对fix 添加参数应用
      selectd: ['VUECRUDCOL', 'VUECRUDInputTwo', 'goModelAll', 'goStruct'],
      types: [
        {
          value: 'VUECRUDCOL',
          label: 'VUECRUDCOL',
          template: '{ title: "${2:nm}", data: "${0:code}", width: 130,${3} },',
          param: [
            {
              k: '3',
              v: [
                {
                  k: 'replace',
                  v: {
                    d: 'format:"yyyy-MM-dd"',
                    c: 'format:"XXX"',
                    s: 'format:"H0002"'
                  }
                }
              ]
            }
          ]
        },
        {
          value: 'VUECRUDInputOne',
          label: 'VUECRUDInputOne',
          template:
            '{title: "${2:nm}",data: "${0:code}",required: true,dataType: "${1}",showType: "${3:text}"},',
          fix: [
            {
              k: 'both',
              v: [{ k: 'replace', v: [{ '/^{/': '[{', '/},$/': '}],' }] }]
            }
          ],
          // 参数为1维数组的原因是 我希望顺序执行规则 ,采用 k v 对象方式是为了以后扩展方便
          param: [
            {
              k: '1',
              v: [
                {
                  // 元素值， 变化后值
                  k: 'replace',
                  v: { string: 'String', int: 'Number', int64: 'Number' }
                }
              ]
            },
            {
              k: '3',
              v: [
                {
                  k: 'replace',
                  v: { d: 'datetime', c: 'combo', t: 'text', s: 'switch' }
                },
                {
                  k: 'append',
                  v: {
                    datetime: '",format:"yyyy-MM-dd',
                    combo: '",format:"XXX'
                  }
                }
              ]
            }
          ]
        },
        {
          value: 'VUECRUDInputTwo',
          label: 'VUECRUDInputTwo',
          template:
            '{title: "${2:nm}",data: "${0:code}",required: true,dataType: "${1}",showType: "${3:text}"},',
          fix: [
            // single double both ,end 修理行数据 在行的位置添加
            {
              k: 'double',
              v: [{ k: 'replace', v: [{ '/^{/': '[{' }] }]
            },
            {
              k: 'single',
              v: [{ k: 'replace', v: [{ '/},$/': '}],' }] }]
            },
            {
              k: 'end',
              v: [{ k: 'replace', v: [{ '/},$/': '}],' }] }]
            }
          ],
          // 参数为1维数组的原因是 我希望顺序执行规则 ,采用 k v 对象方式是为了以后扩展方便
          param: [
            {
              k: '1',
              v: [
                {
                  // 元素值， 变化后值
                  k: 'replace',
                  v: { string: 'String', int: 'Number', int64: 'Number' }
                }
              ]
            },
            {
              k: '3',
              v: [
                {
                  k: 'replace',
                  v: { d: 'datetime', c: 'combo', t: 'text', s: 'switch' }
                },
                {
                  k: 'append',
                  v: {
                    datetime: '",format:"yyyy-MM-dd',
                    combo: '",format:"XXX'
                  }
                }
              ]
            }
          ]
        },
        {
          // 暂未生效
          value: 'goModel',
          label: 'goModel',
          template: '${0} *${1} `json:"${10}" xorm:"${11}"` //${2}',
          param: [
            {
              k: '0',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'transfer',
                  v: { capitalize: true }
                }
              ]
            },
            {
              k: '1',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'replace',
                  v: { float64: 'float64' }
                }
              ]
            },
            {
              k: '10',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'copy',
                  v: { '0': true }
                }
              ]
            },
            {
              k: '11',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'copy',
                  v: { '1': true }
                },
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'replace',
                  v: {
                    int: 'INT(11)',
                    int64: 'BIGINT(20)',
                    float64: 'DOUBLE',
                    string: 'VARCHAR(256)'
                  }
                }
              ]
            }
          ]
        },
        {
          // 暂未生效
          value: 'goModelAll',
          label: 'goModelAll',
          template: '${0} *${1} `json:"${10}" xorm:"${11}"` //${2}',
          param: [
            {
              k: '0',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'transfer',
                  v: { capitalize: true }
                }
              ]
            },
            {
              k: '1',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'replace',
                  v: { float64: 'float64' }
                }
              ]
            },
            {
              k: '10',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'copy',
                  v: { '0': true }
                }
              ]
            },
            {
              k: '11',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'copy',
                  v: { '1': true }
                },
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'replace',
                  v: {
                    int: 'INT(11)',
                    int64: 'BIGINT(20)',
                    float64: 'DOUBLE',
                    string: 'VARCHAR(256)'
                  }
                }
              ]
            }
          ],
          fix: [
            // single double both ,end 修理行数据 在行的位置添加

            {
              k: 'first',
              v: [
                {
                  k: 'replace',
                  v: [
                    {
                      '/^/': `type XXX struct {\nBean       \`xorm:"extends"\`\n`
                    }
                  ]
                }
              ]
            },
            {
              k: 'end',
              v: [{ k: 'replace', v: [{ '/$/': '\n}' }] }]
            }
          ]
        },
        {
          //
          value: 'goStruct',
          label: 'goStruct',
          template: '${0} *${1} `json:"${10}"`',
          param: [
            // 对 模板 进行正则处理 ，匹配的项可
            //     'transfer',  ( capitalize 首字母大写 ，upperSnake 驼峰)
            //   'replace'  根据输入文本替换成其他文本
            //  'copy' 从其他输入复制
              
            {
              k: '0',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'transfer',
                  v: { capitalize: true }
                }
              ]
            },
            {
              k: '1',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'replace',
                  v: { float64: 'float64' }
                }
              ]
            },
            {
              k: '10',
              v: [
                {
                  //*int INT(11) *int64  BIGINT(20)  *float64 DOUBLE
                  k: 'copy',
                  v: { '0': true }
                }
              ]
            }
          ],
          fix: [
            // single double both ,end 修理行数据 在行的位置添加

            {
              k: 'first',
              v: [
                {
                  k: 'replace',
                  v: [
                    {
                      '/^/': `type XXX struct {\n`
                    }
                  ]
                }
              ]
            },
            {
              k: 'end',
              v: [{ k: 'replace', v: [{ '/$/': '\n}' }] }]
            }
          ]
        },
        {
          value: 'rowToArray',
          label: 'rowToArray',
          template: '"${0}",',
          param: {},
          fix: [
            // fix ，param  可以考虑引入参数
           

            {
              k: 'first',
              v: [{ k: 'replace', v: [{ '/^/': '[' }] }]
            },
            {
              k: 'end',
              v: [{ k: 'replace', v: [{ '/,$/': ']' }] }]
            }
          ],
          // 暂未使用
          fixParam:{
            "${a}":{
              "value":"aaa",
               roles:[
                {
                  k: 'transfer',
                  v: { capitalize: true }
                }
               ]
            }
          }
        },
        {
          value: 'crudcol',
          label: 'crudcol',
          template:
            '{ "field": "${0:nm}"    ,  "title": "${1:nm}", "align": "center", "halign": "center", "colspan": 1, "hidden": false, "rowspan": 1, "width": 100 },',
          param: {}
        },
        {
          value: 'toDict',
          label: 'toDict',
          template: ' "":"${0:nm}", ',
          param: {}
        },
        {
          value: 'crudinputOne',
          label: 'crudinputOne',
          template:
            '  [{ "Field": "${0:nm}", "Name": "${1:nm}",ShowType: "${2:text}",  DataType: "${3:String}", Ext: "${4}", "Required": true, RowSpan: 1, ColSpan: 1 },],',
          param: {}
        },
        {
          value: 'crudinputTw0',
          label: 'crudinputTw0',
          template:
            '[  { "Field": "${0}", "Name": "${1}", ShowType: "text",  DataType: "${2:String}",Ext: "", "Required": true, RowSpan: 1, ColSpan: 1 ,Unit:""},\n' +
            '   { "Field": "${3}", "Name": "${4}", ShowType: "text",Ext: "", DataType: "${5:String}",   "Required": true, RowSpan: 1, ColSpan: 1 ,Unit:""},],'
        },
        {
          value: 'json',
          label: 'json',
          template: '{"${0}":"${1}"},'
        }
      ],
      template: '',
      param: '',
      aparts: ' ,	',
      proto: '',
      lastSelect: ''
      //up data
      //dowm for show
    }
  },
  methods: {
    getTemp() {},
    changeTemplate() {
      var self = this
      if (self.selectd.length > 0) {
        $.each(self.types, function(i, v) {
          if (v.value == self.selectd[0]) {
            v['template'] = self.template
          }
        })
      }
    },
    selectTp(values) {
      if (!values[0]) {
        return
      }

      var self = this
      var o = {}
      $.each(self.types, function(index, v) {
        o[v.value] = v
      })
      self.template = o[values[0]].template
      self.param = JSON.stringify(o[values[0]].param)
    },
    capitalize(str) {
      // 正则法
      str = str.toLowerCase()
      var reg = /\b(\w)|\s(\w)/g //  \b判断边界\s判断空格
      return str.replace(reg, function(m) {
        return m.toUpperCase()
      })
    },
      // 含_-首字母大写 (暂时未使用)
    upperSnake: function(str) {
       let self=this;
      
      let s = []
      $.each(str.split(/[\_-]/), function(k, v) {
        debugger
        s.push(
          self.capitalize(v))
       
      })
      debugger
      return s.join('')
    },
  },
  computed: {
    selectTemplates: function() {
      var self = this
      var o = {}
      $.each(self.types, function(index, v) {
        o[v.value] = v
      })
      var a = []
      $.each(self.selectd, function(i, v) {
        // 循环选中模板
        a.push(o[v].template)
      })

      return a.join('\n')
    },
  
    selectDetail: function() {
      var self = this
      // var reg = /\$\{{1}[0-9a-zA-Z\_:]+\}{1}/g
      // var re = /\$\{{1}([0-9]):?([0-9a-zA-Z\_]*)\}{1}/
      var reg = /\$\{{1}[0-9a-zA-Z\_\/:]+\}{1}/g
      // 单个参数处理正则
      // "${1:nm/String/g}" 第一部分0 匹配值，第二部分1 key ,第三部分2  默认值,  第四部分3正则 , 第五部分4输入字符串
      // ["${1:nm/String/g}", "1", "nm", "/String/g", index: 0, input: "${1:nm/String/g}"]
      var re = /\$\{{1}([0-9]+):?([0-9a-zA-Z\_]*)(\/{1}[0-9a-zA-Z\_\/]*||'')\}{1}/
      var o = {}
      var a = []
      // 二维数组    [  行[需要替换对象]]
      var a1 = []
      // 获取模板对象
      $.each(self.types, function(index, v) {
        o[v.value] = v
      })

      // 需要转换的数据
      if (self.proto) {
        $.each(self.proto.split('\n'), function(i, v) {
          if (v) {
            a1.push(
              v.split(eval('/[' + self.aparts + ']/ ')).filter(function(x) {
                if (x) return true
              })
            )
          }
        })
      }

      $.each(self.selectd, function(i, v) {
        // 循环选中模板

        var temp = []
        o[v]['tempV'] = [] // 更改值,既每个模板的返回值

        if (o[v].template) {
          // 循环生成记录
          $.each(a1, function(a1i, a1v) {
            let oneRow = o[v].template.replace(reg, function(str) {
              // 对每个匹配项 进行 处理(没一项的返回值)
              let s = ''
              debugger
              if (str.match(re)) {
                // "${1:nm/String/g}" 第一部分0 匹配值，第二部分1 key ,第三部分2  默认值,  第四部分3正则 , 第五部分4输入字符串
                if (
                  a1v[str.match(re)[1]] != undefined &&
                  a1v[str.match(re)[1]] != ''
                ) {
                  s = a1v[str.match(re)[1]]
                } else {
                  s = str.match(re)[2]
                }
                //  正则暂时不启用
                // if(str.match(re)[3]){
                //
                //     s.match(str.match(re)[3])
                // }
                // 每一项返回值进行二次处理
                if (o[v].param) {
                  $.each(o[v].param, function(ip, vp) {
                    // 同一序号处理完成后再处理其他序号
                    if (str.match(re)[1] == vp.k) {
                      $.each(vp.v, function(vi, vv) {
                        // 参数的replace 功能
                        if (vv.k == 'replace') {
                          $.each(vv.v, function(vvVk, vvVv) {
                            if (s == vvVk) {
                              s = vvVv
                            }
                          })
                        }

                        if (vv.k == 'copy') {
                          $.each(vv.v, function(vvVk, vvVv) {
                            //---

                            if (vvVk && a1v[vvVk] != undefined) {
                              debugger
                              s = a1v[vvVk]
                            }
                          })
                        }

                        if (vv.k == 'transfer') {
                          $.each(vv.v, function(vvVk, vvVv) {
                            if (vvVk == 'capitalize' && vvVv) {
                              s = self.capitalize(s)
                            }
                          })
                        }
                        if (vv.k == 'append') {
                          $.each(vv.v, function(vvVk, vvVv) {
                            if (s == vvVk) {
                              s += vvVv
                            }
                          })
                        }
                      })
                    }
                  })
                }
                return s
              } else {
                return ''
              }
            })
            if (o[v].fix) {
              $.each(o[v].fix, function(oi, ov) {
                if ((ov.k == 'single' || ov.k == 'both') && a1i % 2 == 1) {
                  // 单双行处理
                  $.each(ov.v, function(ovi, ovv) {
                    if (ovv.k == 'replace') {
                      $.each(ovv.v, function(ovvVk, ovvVv) {
                        $.each(ovvVv, function(k2, v2) {
                          oneRow = oneRow.replace(eval(k2), v2)
                        })
                      })
                    }
                  })
                }
                if ((ov.k == 'double' || ov.k == 'both') && a1i % 2 == 0) {
                  // 单双行处理
                  $.each(ov.v, function(ovi, ovv) {
                    if (ovv.k == 'replace') {
                      $.each(ovv.v, function(ovvVk, ovvVv) {
                        $.each(ovvVv, function(k2, v2) {
                          oneRow = oneRow.replace(eval(k2), v2)
                        })
                      })
                    }
                  })
                }
                if (ov.k == 'end' && a1i == a1.length - 1) {
                  // 单双行处理
                  $.each(ov.v, function(ovi, ovv) {
                    if (ovv.k == 'replace') {
                      $.each(ovv.v, function(ovvVk, ovvVv) {
                        $.each(ovvVv, function(k2, v2) {
                          oneRow = oneRow.replace(eval(k2), v2)
                        })
                      })
                    }
                  })
                }
                if (ov.k == 'first' && a1i == 0) {
                  // 单双行处理
                  $.each(ov.v, function(ovi, ovv) {
                    if (ovv.k == 'replace') {
                      $.each(ovv.v, function(ovvVk, ovvVv) {
                        $.each(ovvVv, function(k2, v2) {
                          oneRow = oneRow.replace(eval(k2), v2)
                        })
                      })
                    }
                  })
                }
              })
            }
            o[v]['tempV'].push(oneRow)
          })
        }

        o[v]['tempV'] = o[v]['tempV'].join('\n')

        a.push(o[v])
      })
      // a 默认模板规则

      return a
    }
  },
  watch: {},
  mounted() {
    $('#tojson').height($(window).height())
  }
}
</script>