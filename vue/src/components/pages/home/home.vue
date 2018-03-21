<!-- 根组件 -->
<template>
	<div>
		<!-- 搜索 -->
		<div class="app-home-header">
			<yd-search v-model="value1" :on-submit="submitHandler" placeholder="搜索热门内容"></yd-search>
    	</div>
    	<!-- 文章 -->
    	<div class="app-home-article">
    		<div class="content">
    			<div class="cover">
                    <img src="../../../assets/img/art.jpg">
    			</div>
    			<h3>为什么要珍惜眼前人</h3>
    			<p>到了现在我才懂，我所嘲笑的，那些男生对女生的骚扰全部都是让人觉得恶心的性冲动，却恰恰也是我们一生之中最美好的青春，永不复返的初恋时光。</p>
    		</div>
    		<div class="author">
    			<i class="fa fa-graduation-cap" style="color:#88d356"></i><span class="name">By Sophia</span>
    			<span class="right_label">公众号 | PPPSecret</span>
    		</div>
    	</div>
        <div style="height:10px;background:#efeff4"></div>
    	<!-- 标签 -->
        <div class="app-home-content">
        	<div class="nav-tab-list">
        		<div class="tabar-nav" v-for="(tabs, index) in NavTabList" :key="index">
        			<div class="pic">
        				<img :src="tabs.pic" />
        			</div>
        			<p class="nav-label">{{ tabs.name }}</p>
        		</div>
        	</div>
            <div class="scroll-wrap">
                <yd-rollnotice autoplay="1500" >
                    <yd-rollnotice-item><span class="hot"> 荐 </span>Apple8 3月超级钜惠！</yd-rollnotice-item>
                    <yd-rollnotice-item><span class="hot"> 荐 </span>11.11 京东超级品牌日格力盛典</yd-rollnotice-item>
                    <yd-rollnotice-item><span class="hot"> 荐 </span>阿宽杂货 零食饮料低至7折</yd-rollnotice-item>
                </yd-rollnotice>
            </div>
        </div>

        <div style="height:12px;background:#efeff4"></div>
        <div class="app-home-article">
            <div class="content">
                <div class="cover">
                    <img src="../../../assets/img/art2.jpg">
                </div>
                <h3>广播精选｜逛美术馆看到了自己</h3>
                <p>“那妇人独自一个，冷冷清清立在帘儿下等着，只见武松踏着那乱琼碎玉归来。”</p>
            </div>
            <div class="author">
                <i class="fa fa-graduation-cap" style="color:#88d356"></i><span class="name">By Sophia</span>
                <span class="right_label">公众号 | PPPSecret</span>
            </div>
        </div>
        
        <div style="height:12px;background:#efeff4"></div>
        <div class="app-home-article">
            <div class="content">
                <div class="cover">
                    <img src="../../../assets/img/art3.jpeg">
                </div>
                <h3>烧脑诛心的《东方快车谋杀案》列车已到站</h3>
                <p>请各位旅客拿好你的智商和纸巾登上列车！</p>
            </div>
            <div class="author">
                <i class="fa fa-graduation-cap" style="color:#88d356"></i><span class="name">By Sophia</span>
                <span class="right_label">公众号 | PPPSecret</span>
            </div>
        </div>
        
        <div style="height:12px;background:#efeff4"></div>
        <div class="app-home-article last-article">
            <div class="content">
                <div class="cover">
                    <img src="../../../assets/img/art4.jpeg">
                </div>
                <h3>Paul Smith｜难以捉摸的人最有趣</h3>
                <p>第67期 “重逢岛”为Lens于2016年创办的原创视频品牌 点击观看，48 HOURS with PAUL SMITH 有一天...</p>
            </div>
            <div class="author">
                <i class="fa fa-graduation-cap" style="color:#88d356"></i><span class="name">By Sophia</span>
                <span class="right_label">公众号 | PPPSecret</span>
            </div>
        </div>

	</div>
</template>

<script>

export default {
    data() {
        return {
           	value1: '',
            NavTabList : [
                {
                    pic : require('../../../assets/tab/times.png'),
                    name : '阿宽时间'
                },
                {
                    pic : require('../../../assets/tab/hot.png'),
                    name : '阿宽文章'
                },
                {
                    pic : require('../../../assets/tab/calendar.png'),
                    name : '阿宽日历'
                },
                {
                    pic : require('../../../assets/tab/shop.png'),
                    name : '阿宽商城'
                },
            ]
        }
     },
     methods: {
        submitHandler(value) {
            this.$dialog.toast({mes: `搜索：${value}`});
        }
    }
}
</script>

<style scoped>
*{
	margin:0;
	padding: 0;
}
.app-home-header{
	background: #04BE02;
}
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
img{
	height:50px;
	width: 50px;
}
/*图标*/
.app-home-content{
    margin-bottom: 12px;
}
.nav-tab-list{
    padding: 10px 10px;
	position: relative;
	width: 100%;
	display: flex;  /*弹性布局*/
	display: -webkit-flex; /* Safari */
}
.tabar-nav{
	text-align: center;
	display: block;
	/*四个居中的代码*/
	-webkit-box-flex: 1;
    flex: 1;
}
.tabar-nav img{
	width: 1.6rem;
	height: 1.6rem;
}
.nav-label{
    margin-top: 5px;
	text-align: center;
    color:#999;
    font-size: 11px;
}
/*滚动框样式*/
.scroll-wrap .yd-rollnotice{
    position: relative;
    width: 94%;
    margin-left:3%;
    height: 30px; 
    border-radius:5px;
    background: #F5F5F5;
    border:1px solid #aaa;
    font-size:11px;
    opacity:0.9;
}
.hot{
    color:red;
    margin-right:6px;
    padding-left:10px;
    font-size: .78rem;
}
</style>