<template>
    <div>
        <top></top>
        <div class="grids-cell">
            <yd-grids-group :rows="3" item-height="6.8rem">
                <yd-grids-item v-for="(item, index) in AbilityList" :key="index">
					<div slot="else" style="text-align: center;width: 100%"  @click="TaskDialog(item.id)">
                        <img :src="item.symbol" style="height: 2.2rem;">
                        <p class="text-label">{{ item.content }}</p>
                    </div>
                </yd-grids-item>
            </yd-grids-group>
        </div>
        <div class="slot-box" v-if="IntroduceShow">
            <div class="box">
                <p class="names">应用介绍<p>
                <p class="content">基于WebApp，通过Vue.js + ThinkPHP5.0 开发，实现集豆瓣电影、音乐播放、天气查询、博客接入等API功能，
                    提供五子棋小游戏、脑筋急转弯等小游戏娱乐、通过签到、战胜五子棋机器人小P获得积分，根据积分等级开辟不同功能专区。</p>
            </div>
            <div class="box">
                <p class="names">开发团队<p>
                <p class="content">&nbsp;&nbsp;&nbsp;UI设计 : 彭道宽</p>
                <p class="content">Web前端 : 彭道宽</p>
                <p class="content">PHP后端 : 彭道宽</p>
            </div>
            <div class="bottom">
                <p>Powered By PengDaoKuan</p>
                <p>Copyright © 彭道宽</p>
            </div>
        </div>
        <div class="slot-box" v-if="FackBackShow">
            <div class="box">
                <p class="names">有问题、意见、建议<p>
                <p class="content">如果在使用过程中有什么问题、意见或者建议，并且在 “ 常见问题 ” 中也无法找到想要的结果，可以通过<span style="color : #8cbbeb" @click="FackBackMessage()">留言反馈</span>联系我们，留言时请务必说明具体情况</p>
            </div>
            <div class="bottom">
                <p>Powered By PengDaoKuan</p>
                <p>Copyright © 彭道宽</p>
            </div>
        </div>
        <div class="slot-box" v-if="OnlineHelp">
            <div class="box">
                <p class="names">【登陆不了怎么办】<p>
                <p class="content">如果登陆不了，可能是网络原因、密码错误原因，请重试，如果实在无法登陆，请重置密码~</p>
            </div>
            <div class="box">
                <p class="names">【如何重置密码 ?】<p>
                <p class="content">进入 “ 登陆页面 ” -> “ 忘记密码 ” -> “ 获取验证码 ” ，之后嘟嘟APP会往您QQ邮箱发送一封验证码邮件，1分钟内有效，只要输入验证码即可重置密码</p>
            </div>
            <div class="box">
                <p class="names">【如何赚取积分 ?】<p>
                <p class="content">每日签到 +10积分</p>
                <p class="content">五子棋战胜小P +20积分</p>
                <p class="content">脑筋急转弯答对一题 +3积分</p>
            </div>
            <div class="box">
                <p class="names">【音乐无法播放 ?】<p>
                <p class="content">由于QQ音乐接口限制访问次数，歌曲播放地址存于数据库中，如果无法播放歌曲，可能是数据库中的地址字段为空或者歌曲路径不对~</p>
            </div>
            <div class="box">
                <p class="names">【限定功能 ?】<p>
                <p class="content">如果积分达不到专区需要的积分，需要日常签到和五子棋 / 脑筋急转弯赚取积分，目前限制专区为 朋友圈专区、音乐专区、商城专区等~</p>
            </div>
            <div class="bottom">
                <p>Powered By PengDaoKuan</p>
                <p>Copyright © 彭道宽</p>
            </div>
        </div>
        <div class="slot-box" v-if="MessageShow">
            <div class="box">
                <p class="names">留言反馈<p>
                <p style="padding: 0rem 1rem">
                    <textarea placeholder="说些什么..." v-model.trim="MessageValue"></textarea>
                </p>
                <p class="btn-fackback">
                    <button type="button" class="message" @click="SendMessage">提交</button>
                </p>
            </div>
            <div class="bottom">
                <p>Powered By PengDaoKuan</p>
                <p>Copyright © 彭道宽</p>
            </div>
        </div>
    </div>
</template>

<script>
import Top from '../../../common/top'
export default {
    components : {
        Top
    },
    data () {
        return {
            TitleString : '使用指南',
            IntroduceShow : false,
            FackBackShow : false,
            OnlineHelp : false,
            MessageShow : false,

            MessageValue : '',
            AbilityList : [
                {
                    symbol : require('../../../../assets/tab/app.png'),
                    content : '使用介绍',
                    id : 'introduce'
                },
                {
                    symbol : require('../../../../assets/tab/feedback.png'),
                    content : '留言反馈',
                    id : 'fackback'
                },
                {
                    symbol : require('../../../../assets/tab/helps.png'),
                    content : '常见问题',
                    id : 'onlinehelp'
                }
            ]
        }  
    },
    methods: {
        TaskDialog : function(id) {
            this.MessageShow = false
            switch(id)
            {
                case 'introduce' : 
                    this.FackBackShow = false
                    this.OnlineHelp = false
                    this.IntroduceShow = !this.IntroduceShow
                    break
                case 'fackback' :
                    this.IntroduceShow = false
                    this.OnlineHelp = false
                    this.FackBackShow = !this.FackBackShow
                    break
                case 'onlinehelp' :
                    this.FackBackShow = false
                    this.IntroduceShow = false
                    this.OnlineHelp = !this.OnlineHelp
                    break
            }
        },
        FackBackMessage : function()
        {
            this.FackBackShow = false
            this.MessageShow = true
        },
        SendMessage : function()
        {
            if(this.MessageValue != '')
            {
                this.$dialog.alert({
                    mes : '您的留言已提交~谢谢您的意见',
                    timeout : 1000
                })
                this.MessageShow = false
            }
            else
            {
                this.$dialog.toast({
                    mes : '给小二提些意见吧~',
                    timeout : 1000
                })
            }
        }
    }
}
</script>

<style scoped> 
/* 九宫格 */
.grids-cell p.text-label{
    color : #999;
    font-size: .74rem;
	margin-top: .36rem;
}
.slot-box {
    background-color: white;
    padding: 1rem .6rem;
}
.slot-box .box {
    margin-bottom: 1rem;
}
.box p.names{
    color: #8cbbeb;
    font-size: 1rem;
    padding: .6rem;
}
.box p.content{
    color: #7B7373;
    font-size: .78rem;
    line-height: 1.7rem;
    padding: .3rem 1.6rem;
}
.bottom {
    font-size: .88rem;
    color: #999;
    text-align: center;
    margin: 5.6rem 0rem 4.6rem;
}
textarea {
    width: 100%;
    height: 10rem;
    padding: .4rem .68rem;
}
button.message {
    width: 3.1rem;
    height: 2rem;
    border-radius: 10px;
    font-size: .9rem;
    color: #8cbbeb;
    background: white;
    border: 1px solid #8cbbeb;
}
.btn-fackback {
    padding: 0rem 1rem;
    float: right;
}
</style>
