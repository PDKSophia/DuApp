import { ChangeCurrentAdmin } from './mutation-types'

const mutations = {
    ChangeUserID(state, userid){
        state.CurrentU_ID = userid
    },

    ChangeUserName(state, username){
        state.CurrentName = username
    },

    ChangeUserImg(state, img){
        state.CurrentImg = img
    },

    ChangeUserScore(state, score){
        state.CurrentScore = score
    },

    PlayMp3Url(state, mp3url){
        state.Mp3Url = mp3url
        state.IsPlay = true
    },

    MarkMp3Mid(state, mp3_mid){
        state.mp3_mid = mp3_mid
    },

    ChangeFlag(state){
        state.Current_Flag = true
    },

    ChangeRemoveIndex(state, index){
        state.RemovePicIndex = index
    },

    ChangeSignFlag(state){
        state.isSign = true
    },

    DecreaseCount(state){
        state.chees_count--
    }
}
export default mutations