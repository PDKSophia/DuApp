<template>
    <div>
        <div class="music-slide">
            <yd-slider autoplay="2500">
                <yd-slider-item v-for="(item, index) in slides" :key="index" :src="item.src">
                    <img :src="item.src">
                </yd-slider-item>
            </yd-slider>
        </div>
        <div class="music-nav">
			<div class="nav-tab-list">
        		<div class="tabar-nav" v-for="(tabs,index) in NavTabList" :key="index">
        			<div class="pic">
        				<img :src="tabs.pic" />
        			</div>
        			<p class="nav-label">{{ tabs.name }}</p>
        		</div>
        	</div>
		</div>
        <div class="guess-you-like" v-if="isShow">
            <div class="like-titles">
                <p class="title">
                    <span style="float:left">推荐歌曲({{ SongLength }}首)</span>
                    <span style="float:right; margin-right: 1rem" @click="randChange">换一批</span>
                </p>
            </div>
            <div class="music-song-info">
                <yd-flexbox class="cell-item" v-for="(item,index) in SongList" :key="index" >
                    <div class="num">
                        <p>{{ ++index }}</p>
                    </div>
                    <yd-flexbox-item class="song-introduce">
                        <div @click="PlayMusic(item.song_mid, index)">
                            <p class="song_name">{{ item.song_name }}<i class="fa fa-youtube-play mv-icon"></i></p>
                            <p class="song_album"><i class="fa fa-share-alt share-alt"></i>专辑：{{ item.album_name }}</p>
                            <audio :src="mp3_url" controls="controls" loop="loop" preload="auto" v-show="isHideAudio" id="audio"></audio>
                        </div>
                    </yd-flexbox-item>
                    <div class="icon">
                        <i class="fa fa-pause-circle mores-icon" v-if="index == mp3_index" @click="PauseMusic(item.song_mid, index)"></i>
                        <i class="fa fa-play-circle mores-icon" v-else @click="PlayMusic(item.song_mid, index)"></i>
                    </div>
                </yd-flexbox>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../../../store'

export default {
    data() {
        return {
            NavTabList : [],
            slides : [],
            SongList : [],
            isHideAudio : false,
            SongLength : 0,
            isShow : false,

            mp3_url : '',
            mp3_index : ''
        }
    },
    methods : {
        initList : function()
        {
            let _this = this
            let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Music/SongList'
            this.$axios.get(url, {
                params : {
                    /* cod...e */
                }
            })
            .then((res) => {
                // console.log(res)
                let data = res.data
                _this.SongLength = data.length
                for(let i = 0; i < data.length; i++)
                {
                    _this.SongList.push({
                        'song_mid' : data[i].song_mid,
                        'song_name' : data[i].song_name,
                        'album_name' : data[i].album_name,
                    })
                }
                _this.isShow = true
            })
            .catch((err) => {
                console.log(err)
            })
        },
        // 随机切换一批
        randChange : function()
        {
            this.SongList = []
            this.SongLength = 0
            this.initList()
        },
        // 播放音乐
        PlayMusic : function(song_mid, index)
        {
            if(song_mid == this.$store.state.mp3_mid)
            {
                let audioPlayer = document.getElementById('audio')
                audioPlayer.play()
                this.mp3_index = index
            }
            else
            {
                let _this = this
                let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Music/SongInfo'
                this.$axios.get(url, {
                    params : {
                        'song_mid' : song_mid
                    }
                })
                .then((res) => {
                    // 提交到store
                    _this.mp3_url = res.data.mp3_url
                    _this.mp3_index = index
                    _this.$store.commit('PlayMp3Url', res.data.mp3_url)
                    _this.$store.commit('MarkMp3Mid', song_mid)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            
        },
        // 暂停音乐
        PauseMusic : function(song_mid, index)
        {
            let audioPlayer = document.getElementById('audio')
            // console.log(audioPlayer)
            audioPlayer.pause()
            this.mp3_index = ''
        }
    },
    // 监听
    watch : {
        mp3_url : function(newval, oldval){
            // let audioPlayer = this.$refs.audio
            if(newval == 'undefined' || newval == null){
                // console.log(123)
            }else{
                this.$nextTick(()=>{
                    let audioPlayer = document.getElementById('audio')
                    // console.log(audioPlayer)
                    audioPlayer.play()
                })
            }
        },
        mp3_index : function(news, olds){
            this.$nextTick(() => {
                // console.log(123456789)
            })
        }
    },
    store,
    created() {
        this.NavTabList = this.$store.state.NavTabList
        this.slides = this.$store.state.slides
        this.mp3_url = this.$store.state.mp3_url        
        this.initList()
    }
}
</script>

<style scoped>
.music-slide {
    height: 13rem;
    width: 100%;
}
.music-slide img{
    width: 100%;
    height: 13rem;
}
.music-nav{
	border-bottom: .5px #ccc solid;
}

/*icon布局*/
.nav-tab-list{
    padding: 1rem;
	position: relative;
	width: 100%;
	display: flex;  /*弹性布局*/
	display: -webkit-flex; /* Safari */
}
.tabar-nav{
	text-align: center;
	display: block;
	/*四个居中的代码*/
	-webkit-box-flex: 1;
    flex: 1;
}
.tabar-nav img{
	width: 2rem;
	height: 2rem;
}
.nav-label{
	text-align: center;
    color:#999;
    font-size: .9rem;
}
.guess-you-like{
    margin-bottom: 55px;
}
.guess-you-like .like-titles{
    padding: 1rem 0rem 1rem .6rem;
    height: 3.2rem;
    border-bottom: .5px solid rgb(224, 222, 222);
}
.guess-you-like .like-titles p.title{
    font-size: 1rem;
    color: #555;
    margin-bottom: .2rem;
}
/* 歌曲 */
.cell-item{
	border-bottom:.5px #ccc solid;
	padding: .2rem 0;
}
.music-song-info {
	margin-bottom: 3.6rem;
}
.music-song-info .num{
	width: 12%;
	padding: 1rem .8rem;
	color:#999;
	font-size: 1rem;
}
.music-song-info .song-introduce{
	width: 80%;
}
.music-song-info .song-introduce p.song_name{
	color: black;
	font-size: .9rem;
	overflow: hidden;
	margin-bottom: .3rem;
}
.music-song-info .song-introduce p.song_album{
	color: #999;
	font-size: .82rem;
}
.music-song-info .icon{
	width: 8%;
}
i.mv-icon{
	color:#f44e39;
	margin-left: .3rem;
	font-size: 1rem;
}
i.share-alt{
	color:#f44e39;
	margin-right: .3rem;
	font-size: .7rem;
}
i.mores-icon{
	color:#f44e39;
	font-size: 1.3rem;
}
</style>
