<!-- 根组件 -->
<template>
	<div>
		<div class="app-music-header" align="center">
            <p class="title">动态</p>
    	</div>
        <div class="new-dynamic">
            <div class="pic-guess">
                <div class="cell-title"  v-for="(msg, index) in MsgArray" :key="index" :class="[{'last-cell' : index+1 == MsgArray.length }]">
                    <div class="image">
                        <img :src="msg.master" alt="" @click="ViewUserInfo(msg.student_num)">
                        <div class="introduce" style="float:left">
                            <p class="title">{{ msg.user }}</p>
                            <p class="times">{{ msg.time }}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p>{{ msg.content }}</p>
                    </div>
                    <div class="cell-phone">
                        <img src="../../../assets/img/tv1.jpeg" alt="">
                        <img src="../../../assets/img/tv2.jpeg" alt="">
                        <img src="../../../assets/img/tv3.jpeg" alt="">
                    </div>
                </div>
            </div>
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
    data(){
        return {
            MsgArray : [
                {
                    master : require('../../../assets/page/head3.jpg'),
                    pic : require('../../../assets/pig.jpg'),
                    time : '1小时前',
                    user : '阿华田',
                    content: 'good lucky to me , And i come here , ShangHai ~'
                },
                {
                    master : require('../../../assets/page/head2.jpg'),
                    pic : require('../../../assets/pig.jpg'),
                    time : '2小时前',
                    user : 'Sophia',
                    content: '大吉大利， 今晚吃鸡 ~'
                },
                {
                    master : require('../../../assets/page/head1.jpg'),
                    pic : require('../../../assets/pig.jpg'),
                    time : '3小时前',
                    user : 'QQ小冰',
                    content : '安利大家一本特别好看的书！！！'
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
.app-music-header{
	height: 40px;
	background: #8ad1fc;
}
.app-music-header .title{
	font-size: 1.1rem;
	padding-top: .5rem;
	color: white;
}
/* 最新动态 */
.new-dynamic{
    padding:0rem .5rem;
}
.cell-title {
    padding: 1rem 0rem;
    border-bottom: 1px solid #EBEBEB;
}
.image {
    height: 3.7rem;
}
.cell-title .image img{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    float: left;
}
.introduce p.title{
    margin-left: .6rem;
    font-size: .88rem;
    padding-top: .3rem;
    margin-bottom:.4rem;
}
.introduce p.times{
    margin-left: .6rem;
    font-size: .78rem;
}
.content{
    padding:0rem .46rem .66rem;
}
.content p{
    font-size: .88rem;
    color: #555;
    width: 100%;
    overflow: hidden;
    white-space:nowrap; 
    text-overflow:ellipsis; 
    line-height: 1.3rem;
}
.cell-phone img{
    width: 30%;
    height: 9rem;
    margin-left: .3rem;
}
.last-cell {
    margin-bottom: 50px;
}
</style>