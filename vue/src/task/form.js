const CheckForm = {
    // 邮箱正则
    Email : function(email)
    {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        let flag = reg.test(email)
        return flag
    },
    UserName : function(username)
    {
        let reg = /^[a-zA-Z0-9_-]{4,16}$/
        let  flag = reg.test(username)
        return flag
    },
    // 密码规则，8-20位字母数字组合
    PassWord : function(password)
    {
        let reg = /^[A-Za-z0-9]{8,20}$/
        let flag = reg.test(password)
        return flag
    }
}

export default CheckForm