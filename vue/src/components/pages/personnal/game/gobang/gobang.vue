<template>
    <div class="chees-boxs">
        <div class="top-more-header">
            <yd-flexbox>
                <div class="icon"><i class="fa fa-chevron-left" @click="back()"></i></div>
                <yd-flexbox-item>
                    <p class="title">{{ titles }}</p>
                </yd-flexbox-item>
            </yd-flexbox>
        </div>

        <div class="chees-clear">
            <div calss="flex-box">
                <div class="clock-icon">
                    <img src="../../../../../assets/tab/clocks.png" alt="">
                </div>
                <div class="clock-speed" v-if="IsStart">
                    <p class="times">用时 ： 00 : 00 : 00</p>
                </div>
                <div class="clock-speed" v-else>
                   <p class="times">用时 ： 00 : {{ minute }} : {{ second }}</p>
                </div>
            </div>
        </div>
        
        <!-- 五子棋 -->
        <canvas id="chees" ></canvas>
        
        <div class="chees-info">
            <div class="btn-box">
                <div class="btn-cell all-chees">
                    <button class="AllTimes" >
                        剩余机会 :  {{ chees_count }} 次
                    </button>
                </div>
                <div class="btn-cell chees">
                    <button class="chees" v-if="IsStart" @click="Start_Chees">
                        开始
                    </button>
                    <button class="chees" v-else @click="Again">
                        不服再来
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import store from '../../../../../store'
import qs from 'qs'

export default {
    data() {
        return {
            titles : '五子棋',
            u_id : '',
            cheesArray : [],
            master : true,
            over : true,
            IsStart : true,
            // 赢法数组
            Wins : [],
            // 赢法统计数组
            MyWin : [],
            ComputeWin : [],
            // 赢法种类
            count : 0,

            // 计时器
            minute : 0,
            second : 0,
            num : 0,
            timer : null,
            interval : null,
            TimeIsFinish : false,
            // 每日可挑战的次数
            chees_count : null
        }
    },
    store,
    methods : {
        back() {
            this.$router.go(-1)
        },
        AdditionalScore : function()
        {
            let _this = this
            let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/User/AddUserScore'
            _this.$axios.post(url, qs.stringify({
                u_id : _this.u_id,
                new_score : 20
            }))
            .then((res) => {
                if(res.data.code == 605)
                {
                    _this.$dialog.alert({
                        mes : `侥幸让你赢了~, ${res.data.message}`,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        // 补零
        ToZero : function(cheestime)
        {
            return cheestime < 10? '0'+cheestime : ''+cheestime
        },
        // 计时
        ComputeTime : function()
        {
            this.IsStart = false
            // 计时
            if(!this.over){
                this.interval = setInterval(() => {
                    this.num++
                    var min = parseInt(this.num/60)        // 分钟
                    var second = parseInt(this.num%60)     // 秒钟
                    this.minute = this.ToZero(min)
                    this.second = this.ToZero(second)
                }, 100)
            }
        },
        Start_Chees : function()
        {
            if(this.$store.state.CurrentU_ID == '')
            {
                this.$dialog.alert({
                    mes : '您还为登陆~'
                })
            }
            else if(this.chees_count <= 0)
            {
                this.$dialog.toast({
                    mes : '您今日机会已用尽，请明日再来~',
                    timeout : 1000,
                    icon : 'error'
                })
            }
            else
            {
                this.over = false
                this.$dialog.toast({
                    mes : '游戏现在开始~',
                    timeout : 500
                })
                this.$store.commit('DecreaseCount')
                this.chees_count--
                this.ComputeTime()
            }
        },
        // 不服再来
        Again : function()
        {
            if(this.TimeIsFinish)
            {
                if(this.chees_count <= 0){
                    this.$dialog.toast({
                        mes : '您今日机会已用尽，请明日再来~',
                        timeout : 1000,
                        icon : 'error'
                    })
                }
                else
                {
                    this.$store.commit('DecreaseCount')
                    this.chees_count--
                    var cheesboard = document.getElementById('chees')
                    var drawboard = cheesboard.getContext("2d")
                    drawboard.clearRect(0, 0, 300, 300)
                    this.drawCheesBoard()
                    this.over = false
                    this.master = true
                    this.TimeIsFinish = false
                    // 清空计时，重新开始
                    this.minute = '00'
                    this.second = '00'
                    this.ComputeTime()
                }
            }
        },
        // 初始化数组
        InitArray : function(cheesboard)
        {
            // 初始化chessArray的前两项索引，cheesArray[0][0][]
            for(let i = 0; i < 15; i++)
            {
                this.cheesArray[i] = []
                for(let j = 0; j < 15; j++)
                {
                    this.cheesArray[i][j] = 0
                }
            }
            // 三维数组定义，i,j是棋盘，Wins[i][j] = []是赢法数组
            for(let i = 0; i < 15; i++)
            {
                this.Wins[i] = []
                for(let j = 0; j < 15; j++)
                {
                    this.Wins[i][j] = []
                }
            }
            /* 第一种赢法
                Wins[0][0][0] = true
                Wins[0][1][0] = true
                Wins[0][2][0] = true
                Wins[0][3][0] = true
                Wins[0][4][0] = true   //Wins[0][0]-Wins[0][4]上面是一条直线
            */
            /* 第二种赢法
                Wins[0][1][1] = true
                Wins[0][2][1] = true
                Wins[0][3][1] = true
                Wins[0][4][1] = true
                Wins[0][5][1] = true   //Wins[0][1]-Wins[0][5]上面是一条直线
            */
            // 横线
            for(let i = 0; i < 15; i++)
            {
                for(let j = 0; j < 11; j++) //为什么小于11？i=0,j=10,k=0..4，那么这样算第二个索引就是从10-14到true，刚好边界
                {
                    for(let k = 0; k< 5; k++)
                    {
                        this.Wins[i][j+k][this.count] = true
                    }
                    this.count++
                }
            }
            // 所有的竖线
            for(let i = 0; i< 15; i++)
            {
                for(let j = 0; j< 11; j++)
                {
                    for(let k = 0; k< 5; k++)
                    {
                        this.Wins[j+k][i][this.count] = true
                    }
                    this.count++
                }
            }
            // 所有的正斜线
            for(let i = 0; i< 11; i++)
            {
                for(let j = 0; j< 11; j++)
                {
                    for(let k = 0; k< 5; k++)
                    {
                        this.Wins[i+k][j+k][this.count] = true
                    }
                    this.count++
                }
            }
            // 所有的反斜线
            for(let i = 0; i< 11; i++)
            {
                for(let j = 14; j > 3; j--)
                {
                    for(let k = 0; k< 5; k++)
                    {
                        this.Wins[i+k][j-k][this.count] = true
                    }
                    this.count++
                }
            }
            // console.log('五子棋有多少种赢法: ' + this.count)

            // 初始化我方赢法统计数组和计算机的赢法统计数组
            for(let i = 0; i < this.count; i++)
            {
                this.MyWin[i] = 0
                this.ComputeWin[i] = 0
            }

        },
        // 画棋盘
        drawCheesBoard : function()
        {
            let _this = this
            var cheesboard = document.getElementById('chees')
            var drawboard = cheesboard.getContext("2d")
            drawboard.strokeStyle = '#BFBFBF'
            for(let i = 0; i < 15; i++)
            {
                //竖线 
                drawboard.moveTo(10 + i*20, 5)              // 宽就原样， 高则是宽的一半
                drawboard.lineTo(10 + i*20, 145)
                drawboard.stroke()
                // 横线
                drawboard.moveTo(10, 5 + i*10-0.5)
                drawboard.lineTo(290, 5 + i*10-0.5)
                drawboard.stroke()
            }
            _this.InitArray(cheesboard)
            // 点击棋盘
            cheesboard.onclick = function(e)
            {
                if(_this.over)       // 如果已经赢了
                {
                    return ;
                }
                if(!_this.master)         // 不是我方下棋
                {
                    return ;
                }
                var positionX = e.offsetX
                var positionY = e.offsetY
                var x = Math.floor(positionX / 20)
                var y = Math.floor(positionY / 20)

                if(_this.cheesArray[x][y] == 0)   //说明这个地方可以落子
                {
                    _this.drawStep(drawboard, x, y, _this.master)
                    _this.cheesArray[x][y] = 1      // 下了一个黑子 标记为1
                    for(let k = 0; k < _this.count; k++)        // 遍历所有的赢法
                    {
                        // 如果第k种赢法在k这位置是有子的，比如我在这个点落子，那么这个点的赢法是有可能的，相反，电脑的这个点赢法是不可以的，给异常值
                        if(_this.Wins[x][y][k])
                        {
                            _this.MyWin[k]++
                            _this.ComputeWin[k] = 6         // 随便给个异常值，在这个点，电脑是不可能赢的
                            if(_this.MyWin[k] == 5)         // 走了5步棋
                            {
                                _this.AdditionalScore()
                                _this.over = true
                                clearInterval(_this.interval)
                                this.TimeIsFinish = true
                            }
                        }
                    }

                    if(!_this.over)
                    {
                        _this.master = !_this.master        // 电脑下棋
                        _this.ComputeAI(drawboard)
                    }
                }
                else
                {
                    _this.$dialog.toast({
                        mes : '这地方已经有棋子了哦~',
                        timeout : 500
                    })
                }
            }
        },
        // 走一步，画棋子
        drawStep : function(drawboard, x, y, master)
        {
            // 画圆
            drawboard.beginPath()
            drawboard.arc(10 + x*20, 5 + y*10, 5, 0, 2*Math.PI)    //圆心坐标x=10，y=15，半径r=13，start=0，stop=2*pi
            drawboard.closePath()
            // 渐变
            let grd = drawboard.createRadialGradient(10 + x*20 + 2, 5 + y*10 - 2, 3, 10 + x*20 + 2, 5 + y*10 - 2, 0)
            // 黑棋
            if(master)
            {
                grd.addColorStop(0, '#0A0A0A')
                grd.addColorStop(1, '#636766')
            }
            else
            {
                grd.addColorStop(0, '#D1D1D1')
                grd.addColorStop(1, '#F9F9F9')
            }
            // 棋子颜色等于渐变颜色
            drawboard.fillStyle = grd
            drawboard.fill()
        },
        // 电脑下棋
        ComputeAI : function(drawboard)
        {
            let _this = this
            // 定义得分
            let myScore = []
            let computeScore = []
            let maxScore = 0 //最大得分
            let u = 0, v = 0   //当前坐标

            // 初始化
            for(let i = 0; i < 15; i++)
            {
                myScore[i] = []
                computeScore[i] = []
                for(let j = 0; j < 15; j++)
                {
                    myScore[i][j] = 0
                    computeScore [i][j] = 0
                }
            }
            // 遍历
            for(let i = 0; i < 15; i++)
            {
                for(let j = 0; j < 15; j++)
                {
                    if(_this.cheesArray[i][j] == 0)     // 可以下子
                    // {
                        for(let k = 0; k < _this.count; k++)
                        {
                            if(_this.Wins[i][j][k])     // 如果这里下了黑子
                            {
                                // 我方得分计算
                                if(_this.MyWin[k] == 1)
                                {
                                    myScore[i][j] += 200        //下一个得200分
                                }
                                else if(_this.MyWin[k] == 2)
                                {
                                    myScore[i][j] += 400        //下两个得400分
                                }
                                else if(_this.MyWin[k] == 3)
                                {
                                    myScore[i][j] += 1000        //下三个得1000分
                                }
                                else if(_this.MyWin[k] == 4)
                                {
                                    myScore[i][j] += 3000        //下四个得3000分
                                }
                                // 计算机
                                if(_this.ComputeWin[k] == 1)
                                {
                                    computeScore[i][j] += 250   //下了一个子得250分
                                }
                                else if(_this.ComputeWin[k] == 2)
                                {
                                    computeScore[i][j] += 450
                                }
                                else if(_this.ComputeWin[k] == 3)
                                {
                                    computeScore[i][j] += 1500
                                }
                                else if(_this.ComputeWin[k] == 4)
                                {
                                    computeScore[i][j] += 3500
                                }
                            }
                        }

                        if(myScore[i][j] > maxScore)
                        {
                            maxScore = myScore[i][j]
                            u = i
                            v = j
                        }
                        else if(myScore[i][j] == maxScore)
                        {
                            if(computeScore[i][j] > computeScore[u][v])
                            {
                                u = i
                                v = j
                            }
                        }

                        if(computeScore[i][j] > maxScore)
                        {
                            maxScore = computeScore[i][j]
                            u = i
                            v = j
                        }
                        else if(computeScore[i][j] == maxScore)
                        {
                            if(myScore[i][j] > myScore[u][v])
                            {
                                u = i
                                v = j
                            }
                        }
                    // }
                }
            }
            _this.drawStep(drawboard, u, v, false)
            _this.cheesArray[u][v] = 2
            for(let k = 0; k < _this.count; k++)     //遍历所有的赢法
            {
                // 如果第k种赢法在k这位置是有子的，比如我在这个点落子，那么这个点的赢法是有可能的，相反，我方的这个点赢法是不可以的，给异常值
                if(_this.Wins[u][v][k])    		
                {
                    _this.ComputeWin[k]++
                    _this.MyWin[k] = 6    //随便给个异常值，不可能赢了
                    if(_this.ComputeWin[k] == 5)    //走了5步棋
                    {
                        _this.$dialog.alert({
                            mes : '你输了，下一个~'
                        })
                        _this.over = true
                        clearInterval(_this.interval)
                        _this.TimeIsFinish = true
                    }
                }
            }

            if(!_this.over)
            {
                _this.master = !_this.master   //走白棋
            }
        }
    },
    mounted() {
        this.drawCheesBoard()
    },
    created () {
        this.chees_count = this.$store.state.chees_count
        this.u_id = this.$store.state.CurrentU_ID
        if(this.$store.state.CurrentU_ID == '')
        {
            this.$dialog.alert({
                mes : '您还未登陆~'
            })
        }
    }
}
</script>

<style scoped>
.chees-boxs {
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

/* 五子棋 */
canvas{
	display: block;
	margin: .8rem auto 1.6rem;
	box-shadow: -2px -2px 2px #EFEFEF, 5px 5px 5px #B9B9B9;
    height: 300px;
    width: 300px;
}
/* 时钟 */
.chees-clear {
	margin: 1rem auto 0rem;
    height: 3rem;
    width: 300px;
}
.flex-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.clock-icon{
    width : 30%;
    float: left;
    text-align: center;
}
.clock-icon img{
    width: 3rem;
}
.clock-speed {
    width: 100%;
}
.clock-speed p.times{
    color: #e2c1ab;
    font-size: 1.2rem;
    padding-top: .8rem;
}
/* 重新 */
.chees-info{
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
button.chees{
    background-color: #9bef8a;
}
</style>
