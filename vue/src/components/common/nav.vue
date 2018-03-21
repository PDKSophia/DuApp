<template>
    <div>
        <div class="cricle">
            <img src="../../assets/tab/input.png" @click="NewCircle">
        </div>
    </div>
</template>

<script>
export default {
    methods : {
        NewCircle : function() {
            this.$router.push({ path : '/circle/send' })
        }
    }
}
</script>

<style scoped>
.cricle {
    width: 2.6rem;
    height: 2.6rem;
    background-color: #8ad1fc;
    text-align: center;
    padding: .5rem;
    border-radius: 50%;
    position: fixed;
    bottom: 6rem;
    right: 6%;
}
.cricle img{
    width: 1.6rem;
    height: 1.6rem;
}
</style>
