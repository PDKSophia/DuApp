<template>
    <div id="app">
      <router-view></router-view>
    	<app-footer></app-footer>
    </div>
</template>

<script>
import AppFooter from './components/common/footer'

export default {
    name: 'app',
    components: {
      AppFooter : AppFooter,
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

.yd-cell-item{
    padding: 12px;
}
.yd-tab-nav-item>a {
    display: inherit;
    color: inherit;
    font-size: .8rem;
    padding: .8rem;
}
.yd-grids-3:before {  
    border:none;
}
.yd-cell-title {
    padding: 5px 12px 5px;   
    font-size: 12px;
}

.yd-cell-left {
    color: #333;
    font-size: .72rem;
    white-space: nowrap;
    -ms-flex-align: center;
}
.yd-textarea>textarea {
    height: 75px;
    font-size: .72rem;
}
</style>
