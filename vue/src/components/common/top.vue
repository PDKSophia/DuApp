<template>
    <div class="top">
        <div class="icon"><i class="fa fa-chevron-left" @click="Toback()"></i></div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods : {
        Toback() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.top{
    height: 3.6rem;
    background-color: #aacdf0;
}
.icon{
    padding: 1rem;
}
.icon i{
    font-size: 1.32rem;
    color: white;
    margin-top: .2rem;
}
</style>
