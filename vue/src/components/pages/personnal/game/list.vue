<template>
    <div>
        <div class="top-more-header">
            <yd-flexbox>
                <div class="icon"><i class="fa fa-chevron-left" @click="back()"></i></div>
                <yd-flexbox-item>
                    <p class="title">{{ titles }}</p>
                </yd-flexbox-item>
            </yd-flexbox>
        </div>

        <!-- 游戏列表 -->
        <div class="list-contaier">
            <div class="flex-box" v-for="(item, index) in GameList" :key="index" :class="{last: index== '19'}">
                <div class="flex-left">
                    <img :src="item.pic">
                </div>
                <div class="flex-center">
                    <p class="title-year">
                        <span>{{ item.title }}</span>
                        <span style="color: #999">({{ item.year }})</span>
                    </p>
                    <p class="icon-score">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-full"></i>
                        <span style="color:#CFCFCF;padding-left:6px;">{{ item.score }}</span>
                    </p>
                    <p class="introduce">{{ item.year }} / {{ item.directors }} / 智力  </p>
                </div>
                <div class="flex-right">
                    <button class="start_game" @click="openStart(item.id)">Open</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            titles : '游戏列表',
            GameList : [
                {
                    id : 1,
                    pic : require('../../../../assets/page/chees.jpg'),
                    title : '五子棋',
                    year : 2018,
                    score : 9.9,
                    directors : '彭道宽'
                },
                {
                    id : 2,
                    pic : require('../../../../assets/page/answer1.jpg'),
                    title : '脑筋急转弯',
                    year : 2018,
                    score : 9.9,
                    directors : '彭道宽'
                },
                {
                    id : 3,
                    pic : require('../../../../assets/page/game2.jpg'),
                    title : '绝地求生',
                    year : 2018,
                    score : 9.8,
                    directors : '彭道宽'
                },
                {
                    id : 4,
                    pic : require('../../../../assets/page/game1.jpg'),
                    title : '王者荣耀',
                    year : 2017,
                    score : 9.3,
                    directors : '彭道宽'
                }
            ]
        }
    },
    methods : {
        back() {
            this.$router.go(-1)
        },
        openStart : function(id)
        {
            console.log(id)
            switch(id){
                case 1 : 
                    this.$dialog.loading.open('正在加载~')
                    setTimeout( () => {
                        this.$dialog.loading.close();
                    }, 2000)
                    this.$router.push({
                        path : '/user/game/gobang'
                    })
                    break
                case 2 : 
                    this.$dialog.loading.open('正在加载~')
                    setTimeout( () => {
                        this.$dialog.loading.close();
                    }, 1000)
                    this.$router.push({
                        path : '/user/game/answer'
                    })
                    break
                default :
                    this.$dialog.alert({
                        mes : '游戏还未上线'
                    })
                    break
            }
        }
    }
}
</script>

<style scoped>
.top-more-header{
    background-color: #8ad1fc;
    height: 3.5rem;
}
.icon{
    padding: 1rem;
}
.icon i{
    font-size: 1.32rem;
    color: white;
    margin-top: .2rem;
}
p.title {
    color : white;
    font-size: 1.1rem;
}
/* 列表 */
.list-contaier{
    padding: 0rem 1rem;
}
.flex-box {
    display: flex;
    border-bottom: 1px solid #999;
    padding: .5rem 0rem;
    width: 100%;
}
.flex-box .flex-left{
    width: 28%;
}
.flex-left img{
    width: 93%;
    height: 6rem;
    border-radius: 15px;
}
.flex-center{
    width: 52%;
    padding: 1rem 0rem 0rem .46rem;
}
.flex-box .flex-right{
    width: 20%;
}
/* 内容 */
p.title-year {
    font-size: 1.1rem;
    margin-bottom: .2rem;
}
/* 评分 */
p.icon-score{
    color:#ffac38; 
    margin-bottom:.2rem
}
/* 介绍 */
p.introduce{
    color: #999;
    font-size: .72rem;
}
.last {
    margin-bottom: 55px;
    border-bottom: none;
}
button.start_game{
    float: right;
    margin-top: 2rem;
    border: none;
    border-radius: 6px;
    padding: .52rem .5rem;
    font-size: .8rem;
    background-color: #ffac38;
    color: white;
}
</style>
