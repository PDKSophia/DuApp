<!-- 发现 -->
<template>
	<div>
		<div class="app-music-header" align="center">
            <p class="title">朋友圈</p>
    	</div>
		<nav-link></nav-link>
	</div>
</template>

<script>
import NavLink from '../../common/nav'

export default {
	components : {
		NavLink
	},
	data() {
        return {

        }
    },
    
}

</script>

<style scoped>
*{
	margin:0;
	padding: 0;
}
.app-music-header{
	height: 40px;
	background: #8ad1fc;
}
.app-music-header .title{
	font-size: 1.1rem;
	padding-top: .5rem;
	color: white;
}
</style>