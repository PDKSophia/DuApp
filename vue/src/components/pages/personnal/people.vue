<!-- 个人 -->
<template>
	<div>
		<div class="app-person-header" align="center">
            <p class="title">我的</p>
    	</div>
		<!-- 用户已登陆 -->
    	<div class="app-person-infomation" v-if="UserInfo.name != ''">
    		<div class="heading">
    			<img src="../../../assets/pig.jpg">
    		</div>
    		<div class="message">
    			<p class="name">{{ UserInfo.name }}</p>
    			<p class="about">查看或编辑个人主页</p>
    		</div>
    		<div class="arrow">
    			<i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
    		</div>
    	</div>
		<!-- 用户未登录 -->
		<div class="app-person-infomation" v-else>
    		<div class="heading">
    			<img src="../../../assets/pig.jpg">
    		</div>
    		<div class="message">
				<p style="margin-top: 1rem; font-size: .88rem">还未登陆，点此
					<a style="text-decoration:underline" onclick="document.getElementById('modal_login').style.display='block'">登陆~</a>
				</p>
				<div id="modal_login" class="modal">
					<form class="modal-content animate">
						<div class="imgcontainer">
							<span @click="CloseModal" class="close" title="Close Modal">&times;</span>
							<img src="../../../assets/pig.jpg" alt="Avatar" class="avatar">
						</div>
						<div class="container">
							<label>用户号</label>
							<input type="text" placeholder="例如 : 1505060201" v-model.trim="u_id">

							<label>密码</label>
							<input type="password" placeholder="请输入密码" v-model.trim="password">
								
							<button type="button" @click="UserLogin">登陆</button>
						</div>

						<div class="container" style="background-color:#f1f1f1">
							<button type="button" class="cancelbtn">注册 ? </button>
							<span class="psw">Forgot <a href="#">password?</a></span>
						</div>
					</form>
				</div>
    		</div>
    	</div>

        <div style="height:10px;background:#efeff4"></div>
        <div class="grids-cell">
            <yd-grids-group :rows="3" item-height="4.6rem">
                <yd-grids-item v-for="(item, index) in AbilityList" :key="index"  :link="item.path">
                    <div slot="else" style="text-align: center;">
                        <img :src="item.symbol" style="height: 2rem;">
                        <p class="text-label">{{ item.content }}</p>
                    </div>
                </yd-grids-item>
            </yd-grids-group>
        </div>
    </div>
</template>

<script>
import store from '../../../store'
import TaskDialog from '../../../task/dialog'
import qs from 'qs'

export default {
	store,
	data () {
		return {
			u_id : '',
			password: '',
			// 关于
			AbilityList : [
	          	{
	             	symbol : require('../../../assets/weather.png'),
	             	content :  '天气',
	          	},
	          	{
	             	symbol : require('../../../assets/tab/calendar.png'),
					 content : '签到',
					 path : '/user/calendar/sign'
	          	},
	          	{
	             	symbol : require('../../../assets/tab/shop.png'),
	             	content : '商城',
	          	},
	          	{
	             	symbol : require('../../../assets/add.png'),
	             	content : '喜欢',
	          	},
	          	{
	             	symbol : require('../../../assets/news.png'),
	             	content :  '动态',
	          	},
	          	{
	             	symbol : require('../../../assets/game.png'),
	             	content :  '游戏',
					path : '/user/game'
	          	},
	          	{
	             	symbol : require('../../../assets/tab/pic.png'),
	             	content :  '相册',
	          	},
	          	{
	             	symbol : require('../../../assets/detail.png'),
	             	content : '手册',
	          	},
	          	{
	             	symbol : require('../../../assets/tab/setting.png'),
	             	content : '设置',
	          	}
			],
			UserInfo : {
                u_id : '',
                name : '',
                headimg : ''
            },
		}
	},
	methods : {
		CloseModal : function()
		{
			document.getElementById('modal_login').style.display='none'
		},
		// 获取用户的信息
		GetUserInfo : function()
		{
			let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/User/GetInfo'
		},
		// 登陆
		UserLogin : function()
		{
			if(this.u_id == '' || this.password == ''){
				let mes = JSON.parse(TaskDialog())
				this.$dialog.alert({mes: mes.content})
			}
			else
			{
				let _this = this
				// 发送数据
				let _url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/User/Login'
				this.$axios.post(_url, qs.stringify({
					u_id : _this.u_id,
					password : _this.password
				}))
				.then((res) => {
					if(res.data.code == 500)
					{
						_this.$dialog.alert({ mes: res.data.message })
						_this.u_id = ''
						_this.password = ''
					}
					else
					{
						_this.UserInfo.u_id = res.data.u_id
						_this.UserInfo.name = res.data.name
						_this.UserInfo.headimg = res.data.headimg
						
						_this.$store.commit('ChangeUserID', _this.UserInfo.u_id)
						_this.$store.commit('ChangeUserName', _this.UserInfo.name)
						_this.$store.commit('ChangeUserImg', _this.UserInfo.headimg)
						_this.$store.commit('ChangeUserScore', res.data.score)
					}
				})
				.catch((err) => {
					console.log('err')
				})
			}
		},
		// 弹窗告知是否登陆 
		StoreUserIsExist : function()
		{
			let _this = this
			if(!_this.$store.state.Current_Flag)
			{
				_this.$dialog.confirm({
                    title: '嘟嘟APP 提示',
                    mes: '您还未登陆，是否现在去登陆？',
                    opts: () => {
                        document.getElementById('modal_login').style.display='block'
                    }
				});
				_this.$store.commit('ChangeFlag')
			}
		}
	},
	created(){
		if(this.$store.state.CurrentU_ID != '')
		{
			// 已登陆
			this.UserInfo.name = this.$store.state.CurrentName
			this.UserInfo.u_id = this.$store.state.CurrentU_ID
			this.UserInfo.headimg = this.$store.state.CurrentImg
		}
		else
		{
			this.StoreUserIsExist()
		}
	}
}

</script>

<style scoped>
*{
	margin:0;
	padding: 0;
}
.app-person-header{
	height: 40px;
	background: #8ad1fc;
}
.app-person-header .title{
	font-size: 1.1rem;
	padding-top: .5rem;
	color: white;
}
.app-person-infomation
{
	height: 7.6rem;
	/*border-bottom:1px solid #ccc;*/
}
.app-person-infomation .heading{
	float: left;
	width: 35%;
}
.app-person-infomation .heading img{
	margin-top: .8rem;
	border-radius: 50%;
	width: 6rem;
	height: 6rem;
	margin-left: 10%;
}
.app-person-infomation .message{
	float: left;
	padding: 2.2rem 0.6rem;
}
.message p.name{
	font-size:1rem;
	margin-bottom: .8rem;
}
.message p.about{
	font-size:.8rem;
	color:#999;
}
.arrow{
	float:right;
}
.app-person-infomation .arrow{
	padding: 2.6rem 0;
	margin-right: 6%;
}
.icon .arrow{
	margin-right: 2%;
}
.arrow i{
	color:#999;
}
/*列表*/
.icon{
	padding:.3rem 1rem;
	height: 2.3rem;
;
}
.list-nav .icon img{
	float: left;
	width: 1.6rem;
	height: 1.6rem;
}
.list-nav .icon p.icon-about{
	float: left;
	padding: .3rem .3rem;
	margin-left: .6rem;
	font-size: .8rem;
}
/* 九宫格 */
.grids-cell p.text-label{
    color : #999;
    font-size: .74rem;
}


input[type=text], input[type=password] {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
/* 登陆按钮 */
button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}
button:hover {
    opacity: 0.8;
}
/* 取消按钮 */
.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}
.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
    position: relative;
}
img.avatar {
    width: 40%;
    border-radius: 50%;
}

.container {
    padding: 16px;
}

span.psw {
    float: right;
    padding-top: 16px;
}
/* 模态框 */
.modal {
    display: none;  
    position: fixed; 	
    z-index: 1; 	
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    padding-top: 30px;
}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto; 
    border: 1px solid #888;
    width: 80%; 
}

.close {
    position: absolute;
    right: 25px;
    top: 0;
    color: #000;
    font-size: 35px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: red;
    cursor: pointer;
}
.animate {
    -webkit-animation: animatezoom 0.6s;
    animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
    from {-webkit-transform: scale(0)} 
    to {-webkit-transform: scale(1)}
}
    
@keyframes animatezoom {
    from {transform: scale(0)} 
    to {transform: scale(1)}
}

@media screen and (max-width: 300px) {
    span.psw {
       display: block;
       float: none;
    }
    .cancelbtn {
       width: 100%;
    }
}
</style>