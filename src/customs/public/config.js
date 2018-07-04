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
        
      ],
      fixRoles: [

      ]
    }
  }
}

/* ${99} 表示取数组的最后一个元素        
${98}  表示取数组的倒数第二个元素      
${97}  表示取数组的倒数第三个元素    


*/