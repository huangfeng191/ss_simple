import Home from '../components/Home.vue'
import News from '../components/News.vue'
import Mystock from '../customs/mystock/index.vue' 
import Mycolor from '../customs/mystock/getcolor.vue'
// 测试 js
import Test from '../soon/test.vue'
// 测试 nouse
import Cs from '../nouse/cs.vue'
import Position from '../rest/css/position.vue'

export default{
	routes:[
		{path:'/cs', component:Cs},
        {path:'/position', component:Position},
		{path:'/news', component:News},
		{path:'/test', component:Test},
		{path:'/mystock', component:Mystock},
		{path:'/mycolor', component:Mycolor},
		{path:'*', redirect:'/mystock'}
	]
}