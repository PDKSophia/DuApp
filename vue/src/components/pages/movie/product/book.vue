<template>
    <div>
        <!-- 文章 -->
    	<div class="app-home-article">
    		<div class="content">
    			<div class="cover">
                    <img src="../../../../assets/pig.jpg">
    			</div>
    			<h3>【专访】一只努力填坑的程序猿</h3>
    			<p>嗨，感谢你点开这篇文章，互相认识一下吧~ 97年，男，双子座，爱好女，目前是一名在校的大三学生。喜欢学习，心中只有学习，学习使我快乐~偶尔会弹弹吉他，打打篮球，还喜欢魔术，技术确实三流的，喜欢舞蹈，跳得却很糟糕~很高兴认识你~</p>
    		</div>
    		<div class="author">
    			<i class="fa fa-graduation-cap" style="color:#88d356"></i><span class="name">By Sophia</span>
    			<span class="right_label">公众号 | PPPSecret</span>
    		</div>
    	</div>
        <div style="height:10px;background:#efeff4"></div>
		<!-- 正在热映 -->
		<div class="books" style="padding-left:10px;padding-right:10px;">
			<div class="detail-conduct">
				<p class="title" style="padding-left:0">新书上映</p>
				<p class="more">更多<i class="fa fa-angle-right"></i></p>
			</div>
			<show-list :DataArray="books"></show-list>
		</div>
		<!-- 正在热映 -->
		<div class="books-last" style="padding-left:10px;padding-right:10px;">
			<div class="detail-conduct">
				<p class="title" style="padding-left:0">最受关注图书榜</p>
				<p class="more">更多<i class="fa fa-angle-right"></i></p>
			</div>
			<!-- <show-list :DataArray="books"></show-list> -->
		</div>
    </div>
</template>

<script>
import ShowList from '../../../common/show'

export default {
	components : {
		ShowList
	},
	data () {
		return {
			books : []
		}
	},
	methods : {
		// initBookList : function()
		// {
			
		// 	let _this = this
		// 	let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Api/BookRanking'
		// 	this.$axios.get(url)
		// 	.then((res) => {
		// 		console.log(res)
		// 	})
		// 	.catch((err) => {
		// 		console.log('err')
		// 	})	
		// },
	},
	created() {
		// this.initBookList()
	}
}
</script>

<style scoped>
/*文章*/
.last-article{
    margin-bottom: 55px;
}
.app-home-article{
	display: block;
    padding: 18px 18px 18px 0;
    margin-left: 18px;
    position: relative;
    color: #494949;
}
.app-home-article .content{
	overflow: hidden;
    margin-bottom: 10px;
}
.app-home-article .cover{
	position: relative;
    width: 25.6%;
    margin-left: 25px;
    float: right;
}
.app-home-article .cover img{
    width: 5.2rem;
    height: 5.2rem;
}
.content h3{
	text-align: justify;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    color: #494949;
    margin-bottom: 6px;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
}
.content p{
	text-align: justify;
    color: #aaa;
    font-size: .8rem;
    line-height: 1.6;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
span.name{
    font-size: 12px;
    color: #ccc;
    margin-left: 6px;
}
span.right_label{
	position: absolute;
    bottom: 18px;
    right: 18px;
    font-size: 11px;
    color: #ccc;
}

/*列表*/
.books-last{
	border-top: 1px solid #999;
	padding-top: .3rem;
	height: 32rem;
}

/*列表*/
.books{
	border-top: 1px solid #999;
	padding-top: .3rem;
	height: 15rem;
}
.detail-conduct, .always-conduct{
	height: 2.2rem;
	width: 100%;
	margin-bottom: .6rem;
}
p{
	font-size: 1rem;
	letter-spacing: 1px;
	padding:0rem .1rem; 
}
p.title{
	float:left;
}
p.more{
	float: right;
	color:#999;
}
</style>
