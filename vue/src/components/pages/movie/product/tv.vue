<template>
  	<div>
	    <div class="TV-header">
	    	<p class="title">正在热议</p>
	    	<p class="more">更多<i class="fa fa-angle-right"></i></p>
	    </div>
    	<div class="discuss">
    		<div class="speak">
    			<p><span style="color:#fc1d2f">1191</span> 人讨论《权利的游戏》<span style="color:#999;font-size:0.8rem">9.2分</span></p>
    		</div>
    		<div class="author">
    			<span style="color:#fc1d2f"><i class="fa fa-comment"></i></span>
    			<div class="remark-content">
    				<p>综合特效剧情，到底该给几分？</p>
    				<p class="auto-time">By Sophia<span>2017-11-9</span></p>
    			</div>
    		</div>
    	</div>
    	<div class="discuss">
    		<div class="speak">
    			<p><span style="color:#fc1d2f">2017</span> 人讨论《行尸走肉 第八季》<span style="color:#999;font-size:0.8rem">9.2分</span></p>
    		</div>
    		<div class="author">
    			<span style="color:#fc1d2f"><i class="fa fa-comment"></i></span>
    			<div class="remark-content">
    				<p>“想战胜恶魔，首先要成为恶魔本身”</p>
    				<p class="auto-time">By Sophia<span>2017-11-9</span></p>
    			</div>
    		</div>
    	</div>

  		<!-- 近期热门美剧 -->
		<div class="hot-tv commond">
			<div class="detail-conduct">
				<p class="title" style="padding-left:0">近期热门美剧</p>
			    <p class="more">更多<i class="fa fa-angle-right"></i></p>
			</div>
	    	<show-list :DataArray="TvDataList"></show-list>
		</div>

		<!-- 近期热门综艺节目 -->
		<div class="hot-variety commond">
			<div class="detail-conduct">
				<p class="title" style="padding-left:0">近期热门综艺节目</p>
			    <p class="more">更多<i class="fa fa-angle-right"></i></p>
			</div>
	    	<show-list :DataArray="tvVarietyList"></show-list>
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
			TvDataList : [
				{
					pic : require('../../../../assets/img/tv1.jpeg'),
					name : '行尸走肉第八季',
					score : '9.1',
					id : '26842605'
				},
				{
					pic : require('../../../../assets/img/tv3.jpeg'),
					name : '怪奇物语',
					score : '8.8',
					id : '26844438'
				},
				{
					pic : require('../../../../assets/img/tv2.jpeg'),
					name : '西部世界',
					score : '8.8',
					id : '2338055'
				}
			],
			tvVarietyList : [
				{
					pic : require('../../../../assets/img/variety1.jpg'),
					name : '身临其境',
					score : '8.5',
					id : '27617683'
				},
				{
					pic : require('../../../../assets/img/variety2.jpeg'),
					name : '蒙面唱将',
					score : '7.0',
					id : '26873155'
				},
				{
					pic : require('../../../../assets/img/variety4.jpeg'),
					name : '爸爸去哪儿',
					score : '8.9',
					id: '27086865'
				},
			]
		}
	}
}
</script>

<style scoped>
.TV-header{
	height: 2.2rem;
	width: 100%;
	margin-bottom: .6rem;
}
.TV-header p{
	font-size: 1rem;
	letter-spacing: 1px;
	padding:.6rem 1rem; 
}
.TV-header p.title{
	float:left;
}
.TV-header p.more{
	float: right;
	color:#999;
}
/*讨论*/
.discuss {
	position: relative;
    width: 94%;
    margin-left:3%;
    height:6.3rem; 
    border-radius:5px;
    background: #F5F5F5;
    border:1px solid #aaa;
    font-size:11px;
    opacity:0.9;
    padding: 0.6rem;
    margin-bottom: 1rem;
}
.discuss .speak{
	padding-left:0.5rem;
	padding-bottom: .5rem;
	border-bottom: 1px solid #999;
}
.speak p{
	font-size: .95rem;
	font-weight: 550;
}
.discuss .author{
	padding-top:0.6rem;
	padding-left:0.5rem;
}
.author span{
	float: left;
	font-size: .9rem;
}
.author .remark-content{
	float: left;
	overflow: hidden;
	width: 90%;
	margin-left: .6rem;
}
.remark-content p{
	font-size: .88rem;	
	margin-bottom: .4rem;
}
.remark-content p.auto-time{
	color:#999;
	font-size: .72rem;
}
.remark-content p.auto-time span{
	font-size: .72rem;
	float: right;
}

/*列表*/
.commond {
	padding-left:10px;
	border-top: 1px solid #999;
	padding-top: .3rem;
}
.hot-tv{
	height: 15rem;
}
.detail-conduct{
	height: 2.2rem;
	width: 100%;
	margin-bottom: .6rem;
}
.detail-conduct p{
	font-size: 1rem;
	letter-spacing: 1px;
	padding:.6rem 1rem; 
}
.detail-conduct p.title{
	float:left;
}
.detail-conduct p.more{
	float: right;
	color:#999;
}

.hot-variety{
	height: 20rem;
}
</style>
