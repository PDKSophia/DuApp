<template>
    <div>
        <div class="list-contaier">
            <div class="flex-box" v-for="(item, index) in List" :key="index" :class="{last: index== '19'}" @click="ViewDetailInfo(item.id)">
                <div class="flex-left">
                    <img :src="item.pic">
                </div>
                <div class="flex-right">
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
                    <p class="introduce">{{ item.year }} / {{ item.directors }} / 剧情 动作 犯罪 </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        List : {
            type : Array,
			default : []
        }
    },
    methods : {
        ViewDetailInfo : function(id)
        {   
            this.$router.push({ path : '/bookmusic/product/' + id })
        }
    }
}
</script>

<style scoped>
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
    width: 30%;
}
.flex-left img{
    width: 92%;
    height: 120px;
    border-radius: 15px;
}
.flex-box .flex-right{
    width: 70%;
    padding: 1rem 0rem 0rem 1rem;
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
</style>
