let TaskTime = function(times){
    var now_date = new Date()
    // 判断年份
    let now_year = now_date.getFullYear()
    let year = times.substring(0, 4)
    // 判断月份
    let now_month = parseInt((now_date.getMonth()+1))           // 从 Date 对象返回月份 (0 ~ 11)。
    let month = parseInt(times.substring(5, 7))
    
    // 判断日期
    let now_day = parseInt(now_date.getDate())                  // 从 Date 对象返回一个月中的某一天 (1 ~ 31)。
    let day = parseInt(times.substring(8, 10))

    // 判断小时
    let now_hour = parseInt(now_date.getHours())                  //返回 Date 对象的小时 (0 ~ 23)。
    let hour = parseInt(times.substring(11, 14))

    // 判断分钟
    let now_min = parseInt(now_date.getMinutes()+1)                  // 返回 Date 对象的分钟 (0 ~ 59)。
    let min = parseInt(times.substring(14, 17))

    /*
        * example :  2018-3-18  和  2017-12-5
        * 超过一年， 无论多久都显示一年前, 之后的月 / 日 都不判断
    */
    let res_year = (now_year > year) ? (now_year-year)*12 : null    // 2018-2017 = 1*12
    if(res_year != null ){
        let res_month = (res_year+now_month)-month      // (12+3) - 12
        if(res_month >= 12)  // 最多显示一年前
        {
            return '1年前';
        }
        else
        {
            return res_month + '月前'
        }
    }
    else
    {
        let m_time = now_month - month
        if(m_time > 0){
            return m_time + '月前'
        } 
        else
        {
            let d_time = now_day - day
            if(d_time > 0){
                return d_time + '天前'
            }
            else
            {
                let h_time = now_hour - hour
                if(h_time > 0){
                    return h_time + '小时前 '
                }
                else
                {
                    let min_time = now_min - min
                    if(min_time > 0){
                        return min_time + '分钟前'
                    } 
                }
            }
        }
    }
}
export default TaskTime