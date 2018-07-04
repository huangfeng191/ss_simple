o={
  types: [{
    value: "test",
    label: "test",
    template: '${99:nm} ',
    single: true,
    desc: " ",
    param: [
      {
        k: "98",
        v: [{ k: "existsReplace", v: { int: "int", string: "string" },or:["number"] }]  // 全部存在的时候 ，才显示， 或者输入是数字
      }
    ],
    
    fix: {
      roles: [
        // single double both ,end 修理行数据 在行的位置添加
        //  当符合条件时 配置余数
        { k: "mod", config:{"k":3,"value":0}, v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },
        { k: "mod", config:{"k":3,"value":1}, v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] },
        { k: "end", v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] }
      ],
      fixRoles: [

      ]
    }
  }
}

/* 
                    处理顺序：
                    1 param: 行应用模板，形成行数组
                    2 fix: roles: 对行数据进行处理。

*/

/* ${99} 表示取数组的最后一个元素        
${98}  表示取数组的倒数第二个元素      
${97}  表示取数组的倒数第三个元素    


*/