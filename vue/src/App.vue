<template>
    <div id="app">
      <router-view></router-view>
      <!-- <play-nav></play-nav> -->
    	<app-footer></app-footer>
    </div>
</template>

<script>
import AppFooter from './components/common/footer'
// import PlayNav from './components/pages/movie/product/base/music_nav'

export default {
    name: 'app',
    components: {
      AppFooter : AppFooter,
      // PlayNav : PlayNav
    }
}
</script>

<style>
*{
	margin:0;
	padding: 0;
}
body{
	background: white;
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  width: 100%;
}
.yd-tab-nav-item>a {
    display: inherit;
    color: inherit;
    font-size: .8rem;
    padding: .8rem;
}
</style>
