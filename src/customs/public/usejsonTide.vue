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
      selected: ["CrudInputs3", "CrudColumns", "CrudProp", "CrudQueries"],

      types: [
        {
          value: "CrudColumns",
          label: "CrudColumns",
          template:
            '{ "field": "${1:sn}","title": "${0:nm}", "width": 100,$?param1? },',
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][0]) {
                    arr[1] = MDParam[index][0] + "." + (arr[1] || "");
                  }
                }
                return arr;
              }
            }
          ],
          mDParamHandleBefore: function({ param, v, aRow }) {
            if (param == "param1" && aRow.length > 2 && aRow[2] == "d") {
              if (!v) {
                v = "formatter: DateFormatter,";
              } else if (v == "yyyy") {
                v = "formatter: YearFormatter,";
              } else if (v == "yyyy-MM") {
                v = "formatter: MonthFormatter,";
              } else {
                v = 'formatter:"' + v + '"';
              }
            } else if (param == "param1" && aRow.length > 2 && aRow[2] == "c") {
              debugger;
              v = 'binding:"' + (v || "USER") + '"';
            } else if (param == "param1" && aRow.length > 2 && aRow[2] == "f") {
              v =
                "formatter: function (v, r, i) {\n if (v){\n return v; \n}else {\n return v; \n}   },";
            } else if (param == "param1") {
              v = "";
            }

            return v;
          }
        },

        {
          value: "CrudInputs3",
          label: "CrudInputs3",
          desc: "#  模块名 ?param1?colspan?dataType? ",
          template:
            '{ "Field": "${1}", "Name": "${0}", ShowType: "${2:text}",DataType: "$?dataType:String?", Ext: "$?param1?", "Required": ${3:false}, RowSpan: 1, ColSpan: "$?colspan:1?" },',
          param: [
            {
              k: "2",
              v: [
                {
                  k: "replace",
                  v: {
                    c: "combo",
                    d: "datetime",
                    a: "textarea",
                    u: "upload",
                    t: "text",
                    f: "text"
                  }
                }
              ]
            }
          ],
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][0]) {
                    arr[1] = MDParam[index][0] + "." + (arr[1] || "");
                  }
                }
                return arr;
              }
            }
          ],
          mDParamHandleBefore: function({ param, v, aRow }) {
            if (param == "param1" && aRow.length > 2 && aRow[2] == "d" && !v) {
              v = "yyyy-MM-dd";
            } else if (param == "param1" && aRow.length > 2 && aRow[2] == "d") {
            } else if (param == "param1" && aRow.length > 2 && aRow[2] == "c") {
              v = v || "USER";
            } else if (param == "param1") {
              v = "";
            }
            return v;
          },

          deakTemplateLikeArray: function(a, self) {
            // 对生成后的行数据数组,再次处理
            let ids = [];
            let o = self.protoParam.MDParamO;
            (a || []).forEach(function(v, i) {
              let colSpan = 1;
              if (o[i]) {
                colSpan = o[i].colspan || 1;
              }
              ids.push(colSpan);
            });
            let group = 0;
            ids.forEach(function(v, i) {
              if (group == 0) {
                a[i] = a[i].replace(/^{/, "[{");
              }
              group += Number(v);
              if (
                i == ids.length - 1 ||
                group + ids[i + 1] > 3 ||
                (o[i] && o[i].br)
              ) {
                a[i] = a[i].replace(/},$/, "},],");
                group = 0;
              }
            });
            return a;
          },
          fix: {
            roles: [],
            param: []
          }
        },

        {
          value: "CrudProp",
          label: "CrudProp",
          template:
            '{ "Field": "${1}", "Name": "${0}", ShowType: "${2:text}", Ext: "$?param1?",DataType: "$?dataType:String?" },',

          param: [
            {
              k: "2",
              v: [
                {
                  k: "replace",
                  v: {
                    c: "combo",
                    d: "datetime",
                    a: "textarea",
                    u: "upload",
                    t: "text",
                    f: "text"
                  }
                }
              ]
            }
          ],
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][0]) {
                    arr[1] = MDParam[index][0] + "." + (arr[1] || "");
                  }
                }
                return arr;
              }
            }
          ],
          mDParamHandleBefore: function({ param, v, aRow }) {
            if (param == "param1" && aRow.length > 2 && aRow[2] == "d" && !v) {
              v = "yyyy-MM-dd";
            } else if (param == "param1" && aRow.length > 2 && aRow[2] == "d") {
            } else if (param == "param1" && aRow.length > 2 && aRow[2] == "c") {
              v = v || "USER";
            } else if (param == "param1") {
              v = "";
            }
            return v;
          }
        },

        {
          value: "CrudQueries",
          label: "CrudQueries",
          template:
            '{ "Field": "${1:nm}", "Label": "${0:nm}", "Type":  "${3:QText}", $?param1? },',

          param: [
            {
              k: "2",
              v: [
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
            }
          ],

          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][0]) {
                    arr[1] = MDParam[index][0] + "." + (arr[1] || "");
                  }
                }
                return arr;
              }
            }
          ],
          mDParamHandleBefore: function({ param, v, aRow }) {
            if (param == "param1" && aRow.length > 2 && aRow[2] == "d") {
              v =
                'Ext: "{Format:"' +
                (v || "yyyy-MM-dd") +
                '"}", Value: new Date().FormatString("' +
                (v || "yyyy-MM-dd") +
                '")';
            } else if (param == "param1" && aRow.length > 2 && aRow[2] == "c") {
              v =
                ' Ext: "' +
                (v || "USER") +
                '", Source: "' +
                (v || "USER") +
                '", ';
            } else if (param == "param1") {
              v = "";
            }

            return v;
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