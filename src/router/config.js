import Home from '../components/Home.vue'
import News from '../components/News.vue'
import Mystock from '../customs/mystock/index.vue' 
import Mycolor from '../customs/mystock/getcolor.vue'
// 测试 js
import Test from '../soon/test.vue'


export default{
	routes:[
		{path:'/home', component:Home},
		{path:'/news', component:News},
		{path:'/test', component:Test},
		{path:'/mystock', component:Mystock},
		{path:'/mycolor', component:Mycolor},
		{path:'*', redirect:'/mystock'}
	]
}