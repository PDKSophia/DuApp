<template>
    <div class="calendar-pages">
        <div class="top-more-header">
            <yd-flexbox>
                <div class="icon"><i class="fa fa-chevron-left" @click="back()"></i></div>
                <yd-flexbox-item>
                    <p class="title">{{ titles }}</p>
                </yd-flexbox-item>
            </yd-flexbox>
        </div>

        <!-- 日历 -->
        <div id="calendar">
            <!-- 年月 -->
            <div class="year-month">
                <ul>
                    <li class="arrow" @click="pre_month()"><</li>
                    <li class="year-and-month">
                        <span class="choose-year">{{ currentYear }}</span>
                        <span class="choose-year">{{ currentMonth }} 月</span>
                    </li>
                    <li class="arrow" @click="next_month()">></li>
                </ul>
            </div>
            <!-- 星期 -->
            <ul class="weekdays">
                <li>日</li>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
            </ul>
            <!-- 日期 -->
            <ul class="days">
                <li v-for="(item, index) in AllLiArray" :key="index">
                    <span v-if="item.active == 'active'" :class="item.active">  
                        {{ item.li }}
                    </span>
                    <span v-else>{{ item.li }}</span>
                </li>
            </ul>
        </div>

        <div class="sign-info">
            <div class="btn-box">
                <div class="btn-cell all-sign">
                    <button class="AllTimes" >
                        共签到 : {{ SignDay.length }} 天
                    </button>
                </div>
                <div class="btn-cell sign">
                    <button class="sign" v-if="isSign" @click="SignObjective">
                        已签到
                    </button>
                    <button class="sign" v-else @click="SignObjective">
                        我要签到
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../../../store'
import qs from 'qs'

export default {
    store,
    data () {
        return {
            titles : "签到",
            currentYear : '',
            currentMonth : '',

            AllLiArray : [],        // 所有的Li标签
            DaysLiDom : [],         // 添加的空li标签
            iNow : 0,   

            SignDay : [],           // 签到的天数
            isSign : '',            // 是否已签到
            u_id : '',  
        }
    },
    methods : {
        back : function()
        {
            this.$router.go(-1)
        },
        initDate : function(n) 
        {
            // 默认当前时间
            let cur_date = new Date()
            let cur_month = cur_date.setMonth(cur_date.getMonth() + n)      // 设置当前月份

            let year = cur_date.getFullYear()
            let month = cur_date.getMonth()                             // 返回 0-11 （1月- 12月）
            let day = cur_date.getDate()                                
            
            // 月份数组
            let DayArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // 获得当前月份所在数组
            let allDay = DayArray[month];

            // 计算闰年， 1 代表 2月
            if(month == 1){
                if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0){
                    allDay = 29
                }
            }
            cur_date.setDate(1)                         // 时间调到本月1号
            let week = cur_date.getDay()                // 0 - 6  星期日 - 星期六

            // 每次都要清空月份的数组
            this.AllLiArray = []
            // 加入 week = 4 说明今天星期四， 说明前面有4个空的li
            for(let i = 0; i < week; i++)
            {
                this.AllLiArray.push({ 'li' : '' })
            }
            for(let i = week + 1; i <= allDay + week; i++)
            {
                this.AllLiArray.push({
                    'li' : i - week,
                    'active' : ''
                })
            }
            for(let i = 0; i < 6; i++)
            {

                this.AllLiArray.push({ 'li' : '' })
            }

            this.currentYear = year
            this.currentMonth = month +  1

        },
        // 上个月
        pre_month : function()
        {
            // this.iNow --
            // this.initDate(this.iNow)
        },
        // 下个月
        next_month : function()
        {
            // this.iNow ++ 
            // this.initDate(this.iNow)
        },
        // 签到
        SignObjective : function()
        {
            let _this = this
            if(_this.u_id == '')
            {
                _this.$dialog.alert({mes: '您还未登陆'})
            }
            else 
            {
                if(_this.isSign)
                {
                    _this.$dialog.alert({mes: '您今日已签到~'})
                }
                else
                {
                    // 发送请求，签到当日
                    let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/User/UserSign'
                    _this.$axios.post(url, qs.stringify({
                        u_id : _this.u_id,
                    }))
                    .then((res) => {
                        if(res.data.code == 602){
                            _this.$store.commit('ChangeSignFlag')
                            _this.isSign = true
                        }
                        _this.$dialog.alert({mes: res.data.message})
                        setTimeout(() => {
                            _this.InitSignTimes()
                            _this.SignDay = []
                        }, 1000)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            }
        },
        // 判断时间
        JudgeTimeTask : function(month, day)
        {
            var now_date = new Date()
            var now_month = parseInt((now_date.getMonth()+1))
            var now_day = parseInt(now_date.getDate())
            if(now_day == day)
            {
                return true
            }
            else{
                return false
            }
        },
        // 获得所有的签到
        InitSignTimes : function()
        {
            let _this = this 
            let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/User/GetAllSign'
            _this.$axios.get(url, {
                params : {
                    u_id : _this.u_id
                }
            })
            .then((res) => {
                let respone = res.data
                // console.log(respone)
                if(respone.code == 603){
                    _this.$dialog.alert({ mes : respone.message })
                }
                else
                {
                    for(let i = 0; i < respone.length; i++)
                    {
                        _this.SignDay.push({
                            'li' : parseInt((respone[i].sign_time).substring(8,10))
                        })
                    }
                    for(let j = 0; j < _this.AllLiArray.length; j++)
                    {
                        for(let k = 0; k < _this.SignDay.length; k++)
                        {
                            if(_this.AllLiArray[j].li == _this.SignDay[k].li)
                            {
                                _this.AllLiArray[j].active = 'active'
                            }
                        }
                    }
                    let dayflag = _this.JudgeTimeTask(parseInt((respone[respone.length-1].sign_time).substring(5,7)) , parseInt((respone[respone.length-1].sign_time).substring(8,10)))
                    if(dayflag){
                        _this.$store.commit('ChangeSignFlag')
                        _this.isSign = true
                    }else{
                        _this.isSign = false
                    }
                }
                
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    watch: {
        AllLiArray(){
            this.$nextTick(() => {
            })
        }
    },
    created() {
        this.initDate(0)
        this.u_id = this.$store.state.CurrentU_ID
        this.isSign = this.$store.state.isSign
        this.InitSignTimes()
        // console.log(this.$store.state.CurrentScore)
    }
}
</script>

<style scoped>
.calendar-pages {
    margin-bottom: 5rem;
}
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

/* 日历 */
#calendar {
    width: 90%;
    margin: 1rem auto;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
}
/* 年份-月份 */
.year-month{
    width: 100%;
    background: #8ad1fc;
}
.year-month ul{
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
}
/* 年月显示的样式 */
.year-and-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.year-and-month:hover{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.year-and-month:hover {
    background: rgba(150, 2, 12, 0.1);
}
.choose-year {
    padding-left: 20px;
    padding-right: 20px;
    color: white;
    font-size: 1.6rem;
    margin-bottom: .5rem;
}
.choose-month {
    text-align: center;
    font-size: 1.5rem;
    color: white;
    font-size: 1.6rem;
}
/* 左右箭头 */
.arrow {
    padding: 30px;
    font-size: 2rem;
    color: white;
}
.arrow:hover {
    background: rgba(100, 2, 12, 0.1);
}
/* 每周 */
.weekdays {
    margin: 0;
    display: flex;
    color :white;
    padding : 1rem .3rem;
    font-size: 1rem;
    border-top: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    background-color: #8ad1fc;
    width: 100%;
    flex-wrap : wrap;
    justify-content: space-around;  /* justify-content属性定义了项目在主轴上的对齐方式。*/
}
.weekdays li{
    display: inline-block;
    width: 13.6%;
    text-align: center;
}
.days { 
    margin: 0;
    display : flex;
    background-color: #fff;
    flex-wrap: wrap;
    justify-content: space-around;
}
.days li{
    width: 14.22%;
    color: #c2b5b5;
    text-align: center;
    font-size: 1rem;
    padding: .6rem;
    margin: .3rem 0rem;
    
    position:relative
}
.days .active {
    background-color: #8ad1fc; 
    color: white; 
    border-radius: 40%;
    padding: .36rem .46rem; 
}

.sign-info{
    width: 90%;
    margin: 1rem auto;
    /* background-color: rgb(140, 185, 245); */
    height: 2rem;
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
    width: 50%;
}
button{
    color: white;
    padding: .6rem;
    border: none;
    background-color: #8ad1fc; 
    width: 100%;
    font-size: .9rem;
} 
button.sign{
    background-color: #9bef8a;
}
</style>
