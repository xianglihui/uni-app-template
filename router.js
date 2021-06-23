import {RouterMount,createRouter} from 'uni-simple-router';
import store from '@/store/index.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log('to',to);
	// console.log('from',from);
  console.log("to.meta",to.meta)
		if(to.meta.auth && !store.getters.token){
			next({
				name:'Login',
				params: {
					redirect:to
				},
				NAVTYPE: 'push'
			});
		}else{
			next();
		}
		
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束')
})

export {
	router,
	RouterMount
}