<template>
    <div>
        <more-header :titles="MoreType"></more-header>
        <list-movie :List="ListMore"></list-movie>
    </div>
</template>

<script>
import MoreHeader from '../../../common/moretop'
import ListMovie from '../../../common/list'

export default {
    components : {
        MoreHeader,
        ListMovie
    },
    data () {
        return {
            MoreType : '',
            ListMore : []
        }
    },
    methods : {
        GetDiffTypeMovie : function(type){
            let _this = this
			let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Api/MovieRanking'
			this.$axios.get(url, {
				params : {
					type : type,
				}
			})
			.then((res) => {
                console.log(res)
                let Data = res.data
                // console.log(Data)
				for(let i = 0; i < Data.length; i++){
                    _this.ListMore.push({ 'id' : Data[i].m_id, 'title' : Data[i].title, 'pic' : Data[i].pic , 'score' : Data[i].average, 'year' : Data[i].year, 'genres' : Data[i].genres, 'directors' : Data[i].directors })
				}
				console.log(_this.ListMore)
			})
			.catch((err) => {
				console.log(err)
			})	
        },
        // 通过路由地址判断是哪种类型的影片列表
        SelectTypeof : function(type)
        {
            switch(type){
                case 'hot': 
                    this.MoreType = '正在热映'
                    this.GetDiffTypeMovie(type)
                    break
                case 'top':
                    this.MoreType = '经典影片TOP'
                    this.GetDiffTypeMovie(type)
                    break
            }
        }
    },
    created () {
        this.SelectTypeof(this.$route.params.type)
    }
}
</script>

<style scoped> 

</style>
