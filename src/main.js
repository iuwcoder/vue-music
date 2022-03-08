import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const app = createApp(App)

app.config.productionTip = false
// app.prototype.$EventBus = createApp({})  // 创建事件总线  全局的事件总线

// 图片懒加载
import lazyPlugin from 'vue3-lazy'
app.use(lazyPlugin, {
  loading: require('assets/default.png')
})

// 加载loading
import loadingDirective from '@/components/common/loading/directive'
app.directive('loading', loadingDirective)

import noResultDirective from '@/components/common/no-result/directive'
app.directive('no-result', noResultDirective)


// 时间过滤器
import installFilter from './common/filters'
installFilter(app)

// 全局注册 Vant 组件库
import { Swipe, SwipeItem } from 'vant'; // 轮播图组件
import { Icon } from 'vant'; //图标
import { Tab, Tabs } from 'vant'; //Tab标签页
import { Tabbar, TabbarItem } from 'vant'; //底部导航栏
import { Slider } from 'vant';  //滑块
import { Button } from 'vant';
import { Popup } from 'vant'; //弹出层
import { Toast } from 'vant'; //提示
import { ConfigProvider } from 'vant'; //自定义配置

// 引入css样式
import 'vant/lib/index.css';
app.use(Swipe)
app.use(SwipeItem)
app.use(Icon);
app.use(Tab);
app.use(Tabs);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Slider);
app.use(Button);
app.use(Popup);
app.use(Toast);
app.use(ConfigProvider);


import "./assets/scss/base.scss" //全局样式
import "./assets/icon/play.css" //全局样式
import "./assets/icon/Common.css" // 公共字体图标
import "./assets/icon/Login.css" // 登录页面字体图标


app.use(store).use(router).mount('#app')