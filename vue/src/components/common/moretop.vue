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
    </div>
</template>

<script>
export default {
    methods : {
        back : function(){
            this.$router.push({ path : '/bookmusic' })
        }
    },
    props : {
        titles : {
            type : String,
			default : '嘟嘟APP'
        }
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
p.title{
    font-size: 1.1rem;
    color: white;
    margin-left: 1rem;
}
</style>
