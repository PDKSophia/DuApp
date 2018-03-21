<!-- 发现 -->
<template>
	<div>
		<div class="app-music-header" align="center">
            <p class="title">洪荒之力</p>
    	</div>
		<div class="search-userful">
			<template>
				<yd-search :on-submit="submitHandler"></yd-search>
			</template>
		</div>
		<div class="Article-Auth">
			<div class="Auth-blog" v-for="(art, index) in ArtList" :key="index">
				<p class="head-title">{{ art.titles }}</p>
				<p class="summary-icon">{{ art.likes }}人喜欢 - {{ art.author }} - {{ art.times }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import qs from 'qs'
import TaskTime from '../../../task/time'

export default {
	components : {
	},
	data() {
        return {
			ArtList : [], 				// 文章列表
			Time : []					// 时间计算
        }
    },
    methods: {
        submitHandler(value) {
			if(value == ''){
				this.$dialog.alert({mes: '输入您要搜索的内容' });
			}else{
           	 	this.$dialog.toast({mes: `搜索：${value} `});
			}
		},
		initArticleList : function()
		{
			let _this = this
			let $domain_url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Article/ArticleList'
			this.$axios.get($domain_url)
			.then(function(res){
				console.log(res)
				for(let i = 0; i < res.data.length; i++)
				{
					let time = TaskTime(res.data[i].time)
					_this.Time.push({'times' : time})
				}
				for(let j = 0; j < res.data.length; j++)
				{
					_this.ArtList.push({
						'titles' : res.data[j].titles,
						'likes' : res.data[j].likes,
						'author' : res.data[j].author,
						'times' : _this.Time[j].times
					})
				}
				console.log(_this.ArtList)
			})
			.catch(function(err){
				console.log(err)
			})
		}
	},
	created () {
		this.initArticleList()
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

/* 阿宽热门 */

.Auth-blog {
	padding: .88rem 1.1rem;
	padding-bottom: 1.3rem;
	border-bottom: .1px solid rgb(221, 220, 220);
}
.Auth-blog p.head-title{
	font-size: .88rem;
	margin-bottom: .6rem;
}
.Auth-blog p.summary-icon{
	font-size: .68rem;
	color: #999;
}
</style>