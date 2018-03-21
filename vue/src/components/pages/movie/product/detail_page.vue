<template>
    <div v-if="isShow">
        <div  v-for="(pro, index) in productArray" :key="index">
        <div class="top-more-header">
            <yd-flexbox>
                <div class="icon"><i class="fa fa-chevron-left" @click="back()"></i></div>
                <yd-flexbox-item>
                    <!-- <p class="title">{{ titles }}</p> -->
                </yd-flexbox-item>
            </yd-flexbox>
        </div>
        <!-- <canvas id="canvas"></canvas> -->
        <div class="iamges" >
            <img class="m_phone" :src="pro.pic"/>
        </div>
        <div class="base_info">
            <!-- 片名等 -->
            <div class="flex-box">
                <div class="left">
                    <p class="pro_title">{{ pro.title }}</p>
                    <button type="button" class="db_select">
                        豆瓣精选
                    </button>
                    <!-- <p class="pro_title">{{ pro.title }}</p> -->
                    <div class="introduce">
                        <p>年份 : {{ pro.year }}</p>
                        <!-- <p>{{ pro.year }} / {{ pro.genres[0] }} /  {{ pro.genres[1] }} / {{ pro.genres[2] }} </p> -->
                        <p>原名 : {{ pro.original_title }}</p>
                        <p>导演 : {{ pro.directors }}</p>
                    </div>
                </div>
                <div class="right">
                    <div class="square">
                        <p class="score">豆瓣评分</p>
                        <p class="get_score">{{ pro.score }}</p>
                        <p class="score_icon">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </p>
                        <p class="score">{{ pro.ratings_count }} 人</p>
                    </div>
                </div>
            </div>

            <!-- 简介 -->
            <div class="introduce_summary">
                <p class="intro_title">简介</p>
                <p class="summary" id="summary_content">{{ pro.summary }}</p>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import DetailComponent from '../../../common/detail'

export default {
    components : {
        DetailComponent
    },
    data(){
        return {
            titles : '嘟嘟APP',
            product_id : '',
            isShow : false,
            productArray : [],                  // 电影
            castsArray : []
            // #5c452f
        }
    },
    methods : {
        back : function(){
            this.$router.go(-1)
        },
        // canvas吸取图片中的颜色
        CanvasDrawPic : function(imgSrc)
        {
            var draw_canvas = document.getElementById('canvas')
            var ctx = draw_canvas.getContext('2d')
            var img = new Image()
            img.src = imgSrc
            img.onload = function()
            {
                var iamgeData = ctx.getImageData(0, 0, img.width, img.height)
                console.log(iamgeData)
                let red = '0', green = '0', blue = '0', alpha = '1'
                for(let i = 0; i < iamgeData.data.length; i++){
                    red = iamgeData.data[i],//红色色深
                    green = iamgeData.data[i+1],//绿色色深
                    blue = iamgeData.data[i+2],//蓝色色深
                    alpha = iamgeData.data[i+3];//透明度
                }
                // console.log(red + '---' + green + '---' + blue)
            }
        },
        // 简介的展开和收起
        initOpen()
        {
            var maxlen = 60
            var ctn = document.getElementsByClassName('summary')
            console.log(ctn.length)
        },
        GetProductIdInfo : function(pro_id)
        {
            let _this = this
			let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Api/ProductToDoShow'
			this.$axios.get(url, {
				params : {
                    type : 'movie',
                    id : pro_id
				}
			})
			.then((res) => {
                let Data = res.data
                console.log(Data)
                _this.productArray.push(
                    { 
                        'id' : Data.m_id,                                           // id
                        'title' : Data.title,                                       // 电影名
                        'pic' : Data.pic ,                                          // 封面
                        'score' : Data.score,                                       // 得分
                        'year' : Data.year,                                         // 年份
                        'genres' : Data.genres,                                     // 类型
                        'original_title' : Data.original_title,                     // 原名
                        'directors' : Data.directors,                               // 导演
                        'summary' : Data.summary,                                   // 简介
                        'ratings_count' : Data.talk
                    }
                )
                // _this.CanvasDrawPic(_this.productArray[0].pic)
                _this.isShow = true
			})
			.catch((err) => {
				console.log(err)
			})	
        }
    },
    watch:{
        productArray : function(){
            this.$nextTick(()=>{
                console.log(123)
            })
        }
    },
    created () {
        this.product_id = this.$route.params.id
        this.GetProductIdInfo(this.product_id)
    }
}
</script>

<style scoped>

.top-more-header{
    background-color: #5c452f;
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
p.title{
    font-size: 1.1rem;
    color: white;
    margin-left: 1rem;
}
/* 剧照 */
.iamges {
    height: 15.5rem;
    background-color: #5c452f;
    padding-top: 1rem;
    text-align: center;
}
.iamges img.m_phone{
    width: 10rem;
    height: 13.5rem;
}
/* 基本内容 */
.base_info{
    background-color: rgba(250, 238, 238, 0.966);
    padding: 1.2rem;
    padding-bottom: 6rem;
}
.flex-box {
    display: flex;
    width: 100%;
    padding-bottom: 1.5rem;
    border-bottom: .5px solid #999;
}
.flex-box .left{
    width: 60%;
}
.flex-box button.db_select{
    margin-top: .75rem;
    background-color: rgb(231, 188, 135);
    border: none;
    padding: .4rem .6rem;
    color: rgb(170, 103, 21);
    font-size: .75rem;
    border-radius: 4px;
}
.flex-box .left p.pro_title{
    font-size: 1.2rem;
    color: black;
    font-weight: 600;
}
.left .introduce {
    font-size: .75rem;
    color: #999;
    margin-top: 1rem;
}
.left .introduce p{
    line-height: 1.05rem;
}

/* 右侧 */
.flex-box .right{
    width: 35%;
}
.flex-box .right .square{
    float: right;
    margin-top: .33rem;
    width: 88px;
    height: 90px;
    background-color: white;
    text-align: center;
    padding: .66rem;
}
.right .square p.score{
    color: #999;
    font-size: .66rem;
}
.square p.get_score{
    color: black;
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: .1rem;
    margin-bottom: .1rem;
}
.square p.score_icon{
    color:#ffac38;
    font-size:.4rem;
    margin-bottom: .15rem;
}

/* 简介 */
.introduce_summary{
    padding-top : 1rem;
    margin-bottom: 1rem;
}
p.intro_title{
    color: #999;
    font-size: .8rem;
    margin-bottom: .68rem;
}
.introduce_summary p.summary{
    color: rgb(54, 54, 54);
    font-size: .8rem;
    line-height: 1.2rem;
    width: 100%;
}

/* 剧照 */
.images_casts {

}
.images_casts .flex-casts{
    width: 100%;
    display: flex;
}
.flex-casts .cell-label{
    width: 30%;
    height: 180px;
    text-align: center;
    margin-right: 3.3%;
}
.cell-label img{
    width: 100%;
    height: 7rem;
}
</style>
