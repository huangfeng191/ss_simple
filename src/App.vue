<template>
  <div id="app">
        <router-link to="/cs">cs</router-link>
        <router-link to="/test">test</router-link>
        <router-link to="/mycolor">获取颜色</router-link>
         <router-link to="/mystock">维护页面</router-link>
     <router-view></router-view>
  </div>
</template> 

<script>


export default {
  name: 'app',
  props:[
    "sss" 
  ],
  data(){
    return {
       msg: 'Welcome to Your Vue.js App'
      ,"cs":"app_"}
  }
}
</script>
  