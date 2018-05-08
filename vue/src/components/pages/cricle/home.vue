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
                        <img v-if="msg.master!=null" :src="msg.master" alt="" @click="ViewUserInfo(msg.student_num)">
                        <img v-else src="../../../assets/pig.jpg" @click="ViewUserInfo(msg.student_num)">
                        <div class="introduce" style="float:left">
                            <p class="title">{{ msg.u_id }}</p>
                            <p class="times">{{ msg.time }}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p>{{ msg.context }}</p>
                    </div>
                    <div class="cell-phone">
                        <yd-lightbox>
                            <yd-lightbox-img v-for="(item, key) in msg.image" :key="key" :src="item.pic"></yd-lightbox-img>
                        </yd-lightbox>
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
            MsgArray : [],
            ImageArray : []
        }
    },
    methods : {
        TotalList : function()
        {
            let _this = this
            let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Circle/CircleList'
            this.$axios.get(url, {
                params : {

                }
            })
            .then((res) => {
                // console.log(res)
                let result = res.data
                for(let j = 0; j < result.length; j++)
                {
                    console.log(123)
                }
                for(let i = 0; i < res.data.length; i++)
                {
                    _this.MsgArray.push({
                        'u_id'   : res.data[i].u_id,
                        'master' : res.data[i].headimg,
                        'time'   : res.data[i].time,
                        'user'   : res.data[i].name,
                        'context': res.data[i].context,
                        'image'  : res.data[i].image
                    })
                }
                console.log(_this.MsgArray)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    created() {
        this.TotalList()
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
    /* overflow: hidden;
    white-space:nowrap; 
    text-overflow:ellipsis;  */
    line-height: 1.3rem;
}
.cell-phone img{
    width: 31%;
    height: 8.5rem;
    margin-left: .3rem;
}
.last-cell {
    margin-bottom: 50px;
}
</style>