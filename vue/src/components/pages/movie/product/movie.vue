<template>
  <div style="padding-left:10px;padding-right:10px;">
    <div class="movie-header" v-if="IsFinish">
    	<p class="title">今日推荐</p>
    </div>
    <div class="recommond" v-if="IsFinish">
    	<yd-slider autoplay="1500">
		    <yd-slider-item v-for="(item, index) in slides" :key="index">
		        <a @click="ViewMovie(item.id)">
		            <img :src="item.src">
		        </a>
		    </yd-slider-item>
		</yd-slider>
	</div>
	<!-- 正在热映 -->
	<div class="alone-commodity" v-if="IsFinish">
		<div class="detail-conduct">
			<p class="title" style="padding-left:0">正在热映</p>
		    <p class="more" @click="ViewMore('hot')">更多<i class="fa fa-angle-right"></i></p>
		</div>
    	<show-list :DataArray="HotMovieList"></show-list>
	</div>
	<!-- 经典 -->
	<div class="always-list" v-if="IsFinish">
		<div class="always-conduct">
			<p class="title" style="padding-left:0">经典影片</p>
			<p class="more" @click="ViewMore('top')">更多<i class="fa fa-angle-right"></i></p>
		</div>
		<show-list :DataArray="AlwaysList"></show-list>
	</div>
  </div>
</template>

<script>
import ShowList from '../../../common/show'

export default {
	components : {
		ShowList
	},
	data() {
		return {
			slides : [],
			HotMovieList : [],
			AlwaysList : [],
			IsFinish : false

		}
	},
	methods : {
		initGetHotMovie : function()
		{
			let _this = this
			let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Api/MovieRanking'
			this.$axios.get(url, {
				params : {
					type : 'hot',
				}
			})
			.then((res) => {
				for(let i = 0; i < 6; i++){
					_this.slides.push({ 'src' : res.data[i].pic, 'id' : res.data[i].m_id })
					_this.HotMovieList.push({ 'id' : res.data[i].m_id, 'name' : res.data[i].title, 'pic' : res.data[i].pic , 'score' : res.data[i].average})
				}
			})
			.catch((err) => {
				console.log('err')
			})	
		},
		initGetTopMovie : function()
		{
			let _this = this
			let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Api/MovieRanking'
			this.$axios.get(url, {
				params : {
					type : 'top',
				}
			})
			.then((res) => {
				for(let i = 0; i < 6; i++){
					_this.AlwaysList.push({ 'id' : res.data[i].m_id, 'name' : res.data[i].title, 'pic' : res.data[i].pic , 'score' : res.data[i].average})
				}
				// console.log(_this.AlwaysList)
			})
			.catch((err) => {
				console.log('err')
			})	
		},
		// 查看更多
		ViewMore : function(type)
		{
			this.$router.push({ path : '/bookmusic/' + type })
		},
		ViewMovie : function(id)
		{	
			this.$router.push({ path : '/bookmusic/product/' + id })
		},
		constructMovie : function()
		{
			this.initGetHotMovie()
			this.initGetTopMovie()
			this.IsFinish = true
		}
	},
	created () {
		this.constructMovie()
	}
}
</script>

<style scoped>
.movie-header{
	height: 2.2rem;
	width: 100%;
}
.movie-header .title{
	font-size: 1rem;
	letter-spacing: 1px;
	padding:.5rem; 
}
.recommond{
	height: 300px;
	border-bottom: 1px solid #999;
}
.recommond img{
	width: 100%;
	height: 280px;
}
/*列表*/
.alone-commodity{
	border-top: 1px solid #999;
	padding-top: .3rem;
	height: 27rem;
}
.detail-conduct, .always-conduct{
	height: 2.2rem;
	width: 100%;
	margin-bottom: .6rem;
}

.always-list{
	border-top: 1px solid #999;
	margin-top: .6rem;
	height: 32rem;
}
p{
	font-size: 1rem;
	letter-spacing: 1px;
	padding:.6rem 1rem; 
}
p.title{
	float:left;
}
p.more{
	float: right;
	color:#999;
}
</style>
