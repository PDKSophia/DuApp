const CheckForm = {
    Email : function(email)
    {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        let flag = reg.test(email)
        return flag
    }
}

export default CheckForm