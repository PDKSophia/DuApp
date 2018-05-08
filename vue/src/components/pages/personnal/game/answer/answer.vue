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

        <div class="brains-question" v-if="IsAxiosFinish">
            <div class="question-box" v-for="(que, index) in List" :key="index">
                <p class="question-titels">{{ ++index }} 、</p>
                <p class="question-content">{{ que.question }}</p>
                <div class="question-answer" v-if="ViewAnswer">
                    <p>答案：{{ que.answer }}</p>
                </div>
            </div>
        </div>

        <div class="brains-info">
            <div class="btn-box">
                <div class="btn-cell pre-question">
                    <button class="AllTimes" @click="PlusSlides(-1)">
                        上一题  
                    </button>
                </div>
                <div class="btn-cell">
                    <button class="view-answer" @click="ViewAnswer=true">
                        查看答案  
                    </button>
                </div>
                <div class="btn-cell next-question">
                    <button class="brains" @click="PlusSlides(1)" >
                        下一题
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titles : '脑筋急转弯',
            slideIndex : 1,
            IsAxiosFinish : false,
            ViewAnswer : false,
            List: []
        }
    },
    methods : {
        back : function(){
            this.$router.go(-1)
        },
        // 上一题 / 下一题
        PlusSlides : function(n)
        {
            this.ViewAnswer = false
            this.ScrollQuestion(this.slideIndex += n)
        },
        ScrollQuestion : function(n)
        {
            if(this.IsAxiosFinish)
            {
                let q_box = document.getElementsByClassName('question-box')
                
                if(n > q_box.length){
                    // 题目号大于题目个数
                    this.slideIndex = 1
                }
                if(n < 1){
                    this.slideIndex = q_box.length
                }
                for(let i = 0; i < q_box.length; i++)
                {
                    q_box[i].style.display = 'none'
                }
                q_box[this.slideIndex-1].style.display = "block"
            }
        },
        AxiosQuestion : function()
        {
            let _this = this 
            let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/User/GetQuestion'
            this.$axios.get(url, {
                params : {
                    /* cod...e */
                }
            })
            .then((res) => {
                for(let i = 0; i < res.data.length; i++)
                {
                    _this.List.push({
                        'question'  : res.data[i].question,
                        'answer'  : res.data[i].answer
                    })
                }
                _this.IsAxiosFinish = true
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    watch : {
        List(newValue){
            // 在List赋值之后，回流重绘页面
            this.$nextTick(()=>{
                this.ScrollQuestion(1)
            })
        }
    },
    created () {
        this.AxiosQuestion()
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

/* 问题详情 */
.question-box{
    padding: .3rem .46rem;
}
p.question-titels{
    color: #555;
    font-size: 1.3rem;
    margin-bottom: 1rem;
}
p.question-content{
    color: rgb(32, 32, 32);
    font-size: 1.1rem;
    line-height: 1.8rem;
}
.question-answer{
    font-size: 1.1rem;
    color: #8ad1fc;
    margin-top: 3rem;
}
/* 上一题 / 下一题 */
.brains-info, .brains-question{
    width: 90%;
    margin: 1rem auto;
}
.brains-info{
    position: fixed;
    left: 5%;
    bottom: 55px;
}
.btn-box{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-content: center;
    justify-content:space-around;
    align-items:center;
}
.btn-cell{
    width: 33.33%;
}
button{
    color: white;
    padding: .6rem;
    border: none;
    background-color: #8ad1fc; 
    width: 100%;
    font-size: .9rem;
} 
button.view-answer{
    background-color: #ffb9ba;
}
button.brains{
    background-color: #9bef8a;
}
</style>
