<!-- 底部 -->
<template>
    <div>
        <div class="app-music-footer">
            <div class="tabar-nav" v-for="(item, index) in List" :key="index">
                <router-link :to="item.path">
                    <div class="pic">
                        <img :src="item.pic">
                    </div>
                    <p class="tabbar-label" :class="item.active">{{ item.label }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script >


export default {
	data () {
		return {
			List : [
				{
					pic : require('../../assets/add.png'),
					label : '首页',
					path : '/'
				},
				{
					pic : require('../../assets/detail.png'),
					label : '书影音',
					path : '/bookmusic',
				},
				{
					pic : require('../../assets/salar.png'),
					label : '发现',
					path : '/display'
				},
				{
					pic : require('../../assets/cricle.png'),
					label : '圈子',
					path : '/circle',
				},
				{
					pic : require('../../assets/my.png'),
					label : '我',
					path : '/user/info'
				}
			]
		}
	}
}

</script>

<style scoped>
*{
	margin:0;
	padding: 0;
}

.app-music-footer{
	padding-top: 0.3rem;
	position: fixed;
	bottom: 0px;
	display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    bottom: 0;
    width: 100%;
    background-color: #f7f7fa;
}
.tabar-nav{
	position: relative;
	display: block;
	/* Safari 和 Chrome */
    -webkit-box-flex: 1;  
    flex: 1;
    font-size: 0;
    color: #999;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.pic img{
	display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
}
.tabbar-label{
	text-align: center;
    color:#999;
    font-size: .66rem;
    line-height: 1.8;
}
.active{
	color: #04BE02;
}
.app-music-footer::before{
	content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #c0bfc4;
    color: #c0bfc4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
</style>