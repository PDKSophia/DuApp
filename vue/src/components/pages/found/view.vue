<template>
    <div class="top">
        <div class="icon"><i class="fa fa-chevron-left" @click="Toback()"></i></div>
        <!-- 正文 -->
        <div class="art-content" v-if="AxiosFinish" v-for="(art, index) in CrtArtData" :key="index"> 
            <div class="art-title">
                <p class="titles">{{ art.headtitle }}</p>
                <p><i class="fa fa-calendar icon-cal"></i>{{ art.time }}</p>
                <div class="tag-list-create">
                    <div class="author-create" align="center">
                        <p>原创</p>
                    </div>
                    <!-- 标签 -->
                    <div class="author-create" align="center" v-for="(tag, index) in ArtTagArray" :key="index">
                        <p>{{ tag.tag }}</p>
                    </div>
                    <!-- 分类 -->
                    <div class="author-create" align="center" v-for="(cate, index) in ArtCateArray">
                        <p>{{ cate.cate }}</p>
                    </div>
                </div>
            </div>
            
            <div class="art-pic" v-if="ArtPicArray[0].pic !== ''">
                <img :src="ArtPicArray[0].pic">
            </div>

            <div class="art-contents" v-html="art.content">
            </div>

            <div class="art-pic">
                <yd-lightbox>
                    <yd-lightbox-img v-for="(ArtPic, index) in ArtPicArray" :key="index"  :class="[{'last-pic' : index+1 == ArtPicArray.length}]" :src="ArtPic.pic"></yd-lightbox-img>
                </yd-lightbox>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            SharedPower : false,
            AxiosFinish : false,
            CrtArtData : [],                // 当前文章详细
            ArtPicArray : [],               // 当前文章的配图
            ArtTagArray : [],               // 当前文章的标签
            ArtCateArray : [],              // 当前文章的分类
        }
    },
    methods : {
        Toback() {
            this.$router.go(-1)
        },

        // json没有length属性 ， 通过计算得到长度好遍历
        computeJsonLength : function(JsonData)
        {
            let jsonlength = 0
            for(let item in JsonData){
                jsonlength++
            }
            return jsonlength
        },
        // 查看当前文章
        CurrentArticle : function(id)
        {
            let _this = this
            this.$axios.get('http://www.pengdaokuan.cn/blog/restful/public/index.php/index/Article/TotalArticle',{
                params : {
                    /* code.... */
                    type : 'normal',
                    art : id
                }
            })
            .then(function (res){
                console.log(res)
				let Art_Data = res.data
				for(let i = 0; i < res.data.length; i++)
				{
					_this.CrtArtData.push({
                        'id' : Art_Data[i].id, 
                        'pic' : 'http://www.pengdaokuan.cn/blog' + Art_Data[i].headimg, 
					    'headtitle' : Art_Data[i].titles, 
                        'content' : Art_Data[i].contents, 
					    'author' : Art_Data[i].author, 
                        'time' : Art_Data[i].time })
                }
                // 循环拿图片
                for(let j = 0; j < res.data[0].image.length; j++)
                {
                    _this.ArtPicArray.push({ 'pic' : 'http://www.pengdaokuan.cn/blog/' + res.data[0].image[j] })
                }

                // 通过JSON.parse解析标签
                let Tag = JSON.parse(res.data[0].tag)
                let TagLength = _this.computeJsonLength(Tag)
                for(let k =0; k < TagLength; k++)
                {
                    _this.ArtTagArray.push({'tag' : Tag[k] })
                }

                // 通过JSON.parse解析分类
                let Cate = JSON.parse(res.data[0].cate)
                let CateLength = _this.computeJsonLength(Cate)
                for(let k =0; k < CateLength; k++)
                {
                    _this.ArtCateArray.push({'cate' : Cate[k] })
                }
                // 对内容进行判断
                let art_content = res.data[0].contents
                // 找出该字符串是否存在“加粗的情况”
                let art_open_blod = art_content.replace(/openblod/g, "<h2 class='tips'>")
                let art_close_blod = art_open_blod.replace(/closeblod/g, "</h2>")
                // 找出该字符串是否存在“代码的情况”
                let art_my_code = art_close_blod.replace(/mycode/g, "<div class='code_div'>")
                let art_close_code = art_my_code.replace(/closecode/g, "</div>")
                // 找出该字符串是否是正常p标签
                let art_common_srt = art_close_code.replace(/comstr/g, "<p class='ctn'>")
                let art_common_close = art_common_srt.replace(/closestr/g, "</p>")
                // console.log(art_common_close)
                _this.CrtArtData[0].content = art_common_close

                _this.AxiosFinish = true
            })
            .catch(function (error){
                console.log(error)
            })
        }
    },
    created() {
        console.log(this.$route.params.artID)
        this.CurrentArticle(this.$route.params.artID)
    }
}
</script>

<style>
h2{
    display: block;
    -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;
}
.top{
    height: 46px;
    background-color: #275353;
}
.icon{
    padding: .8rem 1rem;
}
.icon i{
    font-size: 1.32rem;
    color: white;
}

/* 文章正文 */
.art-content {
    padding : .4rem;
}
.art-content .art-title p.titles{
    font-size: 1.1rem;
    font-weight: 550;
    margin-bottom: .78rem; 
    margin-left: .36rem;
}
/* 日历 */
.art-content .art-title i.icon-cal{
    font-size: 1rem;
    margin-left : .69rem;
    margin-right: .69rem;
}
/* 原创 + 标签 + 分类*/
.tag-list-create {
    height: 5rem;
}
.art-content .art-title .tag-list-create .author-create{
    border: .5px #555 solid;
    float: left;
    margin-left: .6rem;
    margin-top: .6rem;
    height: 1.6rem;
    padding: .2rem .6rem;
}
/* 图片 */
.art-pic {
    padding: .2rem .6rem;
}
.art-pic img{
    width: 100%;
    height: 100%;
    margin-top: .3rem;
}
/* 最后一张图片 */
.last-pic{
    margin-bottom: 3.6rem;
}
/* 内容 */
.art-contents{
    padding: .2rem .6rem;
}
.art-contents p.ctn{
    line-height: 1.8rem;
    color: #555;
    font-size: .88rem;
}
/* 内容-子标题 */
.art-contents h2.tips{
    height: 1.6rem;
    margin-bottom: 1.1rem;
    margin-top: .88rem;
    border-left: 8.8px solid #275353;
    padding-left: .4rem;
    font-size: 1.1rem;
    font-weight: 550;
}
/* 内容-代码块 */
.art-contents .code_div{
    margin-top: 1rem;
    position: relative;
    width: 94%;
    margin-left: 3%;
    border-radius: 5px;
    background: #f5f5f5;
    border: 1px solid #aaa;
    font-size: 11px;
    opacity: .9;
    padding: .6rem;
    word-wrap:break-word;  
    word-break:break-all;  
    overflow: hidden;  
    margin-bottom:1rem;
}
</style>
