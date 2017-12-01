<template>
    <div id="tojson">
        <el-row>
            <el-col :span="7">
                <el-select @change="selectTp"  class="selfw" v-model="selectd" multiple filterable allow-create placeholder="请选择文章标签">
                    <el-option   v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
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
                <el-input class="selfw" type="textarea" :autosize="{ minRows: 2}"  placeholder="template" v-model="selectTemplates">
                </el-input>
            </el-col>
           
        </el-row>


    </div>
</template>
<style lang="less">
#tojson {
    .selfw {
        width: 90%
    }
    .content {
        margin-top: 120px;
        .selfw {
            width: 98%
        }
    }
}
</style>
<script>
export default {
    data() {
        return {
            selectd: ['crudcol',"crudinputOne"],
            types: [{
                value: 'crudcol',
                label: 'crudcol',
                template: '{ "field": "${0:nm}"    ,  "title": "${1:nm}", "align": "center", "halign": "center", "colspan": 1, "hidden": false, "rowspan": 1, "width": 100 },',
                param: {

                }
            },{
                value: 'toDict',
                label: 'toDict',
                template: ' "":"${0:nm}", ',
                param: {

                }
            }, {
                value: 'crudinputOne',
                label: 'crudinputOne',
                template: '  [{ "Field": "${0:nm}", "Name": "${1:nm}",ShowType: "${2:text}",  DataType: "${3:String}", Ext: "${4}", "Required": true, RowSpan: 1, ColSpan: 1 },],',
                param: {
                    to2:{
                        "日期":"datetime",
                        "选择框":"combo",
                    },

                    "2":{
                        "datetime":["","","","Number","yyyy-MM-dd"],
                        "combo":["","","","String","SSSSS"],
                        "textarea":["","","","",""],
                        "upload":["","","","",""],
                    }
                }
            
            },
            {
                value: 'crudinputTw0',
                label: 'crudinputTw0',
                template: 
           '[  { "Field": "${0}", "Name": "${1}", ShowType: "text",  DataType: "${2:String}",Ext: "", "Required": true, RowSpan: 1, ColSpan: 1 ,Unit:""},\n'+
'   { "Field": "${3}", "Name": "${4}", ShowType: "text",Ext: "", DataType: "${5:String}",   "Required": true, RowSpan: 1, ColSpan: 1 ,Unit:""},],'
                  
            },
             {
                value: 'json',
                label: 'json'
            }],
            template: '',
            param: "",
            aparts: " ,",
            proto: "", 
            lastSelect:""
            //up data
            //dowm for show

        };
    },
    methods: {
        getTemp(){
            debugger
        },
        changeTemplate(){
            var self=this;
            if(self.selectd.length>0){
                $.each(self.types,function(i,v){
                    if(v.value==self.selectd[0]){
                        v["template"]=self.template;
                    }

                })
              

            }
        },
        selectTp(values) {
            if(!values[0]){
                return
            }
            debugger
            var self=this;
            var o={}
            $.each(self.types, function(index, v) {
                o[v.value] = v
            });
            self.template=o[values[0]].template;
            self.param=JSON.stringify(o[values[0]].param) ;
        },

    },
    computed: {
        selectTemplates:function(){
            var self=this;
            var o={}
            $.each(self.types, function(index, v) {
                o[v.value] = v
            });
            var a=[]
             $.each(self.selectd, function(i, v) { // 循环选中模板
            a.push(o[v].template);

            })

            return a.join("\n")
        },
        selectDetail: function() {
            var self = this;
            var reg = /\$\{{1}[0-9a-zA-Z\_:]+\}{1}/g
            var re = /\$\{{1}([0-9]):?([0-9a-zA-Z\_]*)\}{1}/
            var o = {};
            var a = []
            var a1 = []
            // 获取模板对象
            $.each(self.types, function(index, v) {
                o[v.value] = v
            });

            // 需要转换的数据
            if (self.proto) {

                $.each(self.proto.split("\n"), function(i, v) {
                    if (v) {
                        a1.push(v.split(eval("/[" + self.aparts + "]/ ")).filter(function(x) {
                            if (x) return true;
                        }));
                    }
                });
            }

            $.each(self.selectd, function(i, v) { // 循环选中模板

                var temp = []
                o[v]["tempV"] = [] // 更改值

                if (o[v].template) {
                    

                    // 循环生成记录
                    $.each(a1, function(a1i, a1v) {
                        o[v]["tempV"].push(
                            o[v].template.replace(reg, function(str) {
                                if (str.match(re)) {
                                    
                                    if(a1v[str.match(re)[1]]!=undefined &&a1v[str.match(re)[1]]!=""){
                                        
                       //                  if(o[v]["param"] &&o[v]["param"]["to"+str.match(re)[1]]){ no Ok
                       //                      debugger
                       //                      if(o[v]["param"]["to"+str.match(re)[1]][a1v[str.match(re)[1]]]){
                       
                       // o[v]["param"][str.match(re)[1]]    [o[v]["param"]["to"+str.match(re)[1]][a1v[str.match(re)[1]]]]   [str.match(re)[1]]

                       //                      }
                                           
                       //                  }

                                        return a1v[str.match(re)[1]]
                                    }
                                    // 填写默认值
                                    return str.match(re)[2]
                                } else {
                                    return ""
                                }

                            })
                        )


                    })






                }

            o[v]["tempV"]=o[v]["tempV"].join("\n");
                
                a.push(o[v])

            });
            // a 默认模板规则






            return a
        }
    },
    watch: {},
    mounted() {
        $("#tojson").height($(window).height());
    }
};
</script>