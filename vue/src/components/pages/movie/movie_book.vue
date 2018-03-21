<!-- 根组件 -->
<template>
	<div>
		<div class="app-music-header" align="center">
            <p class="title">书影音</p>
    	</div>
    	<div class="tab-slide">
    		<yd-tab>
		        <yd-tab-panel label="电影"><movie-page></movie-page></yd-tab-panel>
		        <yd-tab-panel label="电视"><tv-page></tv-page></yd-tab-panel>
		        <!-- <yd-tab-panel label="读书"><book-page></book-page></yd-tab-panel> -->
		        <yd-tab-panel label="音乐"><music-page></music-page></yd-tab-panel>
		    </yd-tab>
		</div>
	</div>
</template>

<script>
import MoviePage from './product/movie'   //引入电影组件
import TvPage from './product/tv'   //引入电视组件
import BookPage from './product/book'   //引入读书组件
import MusicPage from './product/music'   //引入音乐组件

export default {
	components : {
		MoviePage,
		TvPage,
		BookPage,
		MusicPage
	}
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