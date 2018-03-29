// import Home from '../components/Home.vue'
import News from '../components/News.vue'
import Mystock from '../customs/mystock/index.vue'
import Mycolor from '../customs/mystock/getcolor.vue'
// 测试 js
import Test from '../soon/test.vue'
// 测试 nouse
import Cs from '../nouse/cs.vue'
import CsJs from '../nouse/cs_js.vue'
import Position from '../rest/css/position.vue'
import Css from '../rest/css/css.vue'


// 转换格式化成json
import UseJson6 from '../customs/public/usejson6.vue'
import UseJson7 from '../customs/public/usejson7.vue'
import UseJsona from '../customs/public/usejsona.vue'
export default{
	routes:[
		{path:'/cs', component:Cs},
		{path:'/cs_js', component:CsJs},
		{path:'/usejson6', component:UseJson6},
		{path:'/usejson7', component:UseJson7},
		{path:'/usejsona', component:UseJsona},
        {path:'/position', component:Position},
        {path:'/css', component:Css},
		{path:'/news', component:News},
		{path:'/test', component:Test},
		{path:'/mystock', component:Mystock},
		{path:'/mycolor', component:Mycolor},
		{path:'*', redirect:'/mystock'}
	]
}
