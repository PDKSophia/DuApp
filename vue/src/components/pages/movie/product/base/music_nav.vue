<template>
    <div>
        <div class="cricle" v-if="this.$store.state.IsPlay">
            <i class="fa fa-pause-circle mores-icon" ></i>
            <audio :src="this.$store.state.Mp3Url" controls="controls" loop="loop" preload="auto" v-show="isHideAudio" ref="audio"></audio>
        </div>
    </div>
</template>

<script>
import store from '../../../../../store'

export default {
    data() {
        return {
			isHideAudio : false,	   //播放按钮不显示
        }
    },
    store,
    mounted() {
        // if(this.$store.state.IsPlay){
            let audioPlayer = this.$refs.audio
            console.log(audioPlayer)
            audioPlayer.play()
        // }
    }
}
</script>

<style scoped>
.cricle {
    width: 2.6rem;
    height: 2.6rem;
    background-color: #f1624f;
    text-align: center;
    padding-top: .3rem;
    border-radius: 50%;
    position: fixed;
    bottom: 35%;
    right: 6%;
}
.cricle .mores-icon{
    color: white;
    font-size: 2rem;
}
</style>
