<template>
	<div>
		<div class="list" v-for="(item, index) in DataArray" :key="index" >
			<img :src="item.pic" @click="ViewProductS(item.id)">
		    <p>{{ item.name }}</p>
		    <p v-if="IsComputedScore" style="color:#ffac38">
				<i class="fa fa-star"></i>
				<i class="fa fa-star"></i>
				<i class="fa fa-star"></i>
				<i class="fa fa-star"></i>
				<i class="fa fa-star-half-full"></i>
				<span style="color:#CFCFCF;padding-left:6px;">{{ item.score }}</span>
			</p>
		</div>
	</div>
</template>

<script>
import store from '../../store'

export default {
	// 不能直接使用父组件定义好的DataArray，要用props接收
	props : {
		DataArray : {
			type : Array,
			default : []
		}
	},
	data(){
		return {
			IsComputedScore : true,
		}
	},
	store,
	watch : {
		DataArray : ((newValue, oldValue) => {
			// let _this = this
			// for(let i = 0; i < newValue.length; i++){

			// }
		})
	},
	methods : {
		ViewProductS : function(id)
        {   
			console.log(id)
            this.$router.push({ path : '/bookmusic/product/' + id })
        }
	},
	created(){
	}
}

</script>

<style scoped>
.list{
	float: left;
	width: 30%;
	margin-right: 3.3%;
	margin-bottom: 1rem;
}
.list img{
	height:9rem;
	width: 100%;
}
.list p{
	font-size: 11px;
	color:black;
	text-align: center;
}
</style>