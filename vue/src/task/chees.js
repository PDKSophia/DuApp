const Chees = {
    cheesArray : [],
    master : true,
    over : false,
    // 赢法数组
    Wins : [],
    // 赢法统计数组
    MyWin : [],
    ComputeWin : [],

    // 赢法种类
    count : 0,

    // 初始化数组
    InitArray : function()
    {
        // 初始化chessArray的前两项索引，cheesArray[0][0][]
        for(let i = 0; i < 15; i++)
        {
            cheesArray[i] = []
            for(let j = 0; j < 15; j++)
            {
                cheesArray[i][j] = 0
            }
        }
        // 三维数组定义，i,j是棋盘，Wins[i][j] = []是赢法数组
        for(let i = 0; i < 15; i++)
        {
            Wins[i] = []
            for(let j = 0; j < 15; j++)
            {
                Wins[i][j] = []
            }
        }
        /* 第一种赢法
	        Wins[0][0][0] = true
            Wins[0][1][0] = true
            Wins[0][2][0] = true
            Wins[0][3][0] = true
            Wins[0][4][0] = true   //Wins[0][0]-Wins[0][4]上面是一条直线
        */
        /* 第二种赢法
            Wins[0][1][1] = true
            Wins[0][2][1] = true
            Wins[0][3][1] = true
            Wins[0][4][1] = true
            Wins[0][5][1] = true   //Wins[0][1]-Wins[0][5]上面是一条直线
        */
        // 横线
        for(let i = 0; i < 15; i++)
        {
            for(let j = 0; j < 11; j++) //为什么小于11？i=0,j=10,k=0..4，那么这样算第二个索引就是从10-14到true，刚好边界
            {
                for(let k = 0; k< 5; k++)
                {
                    Wins[i][j+k][count] = true
                }
                count++
            }
        }
        // 所有的竖线
        for(let i = 0; i< 15; i++)
        {
            for(let j = 0; j< 11; j++)
            {
                for(let k = 0; k< 5; k++)
                {
                    Wins[j+k][i][count] = true
                }
                count++
            }
        }
        // 所有的正斜线
        for(let i = 0; i< 11; i++)
        {
            for(let j = 0; j< 11; j++)
            {
                for(let k = 0; k< 5; k++)
                {
                    Wins[i+k][j+k][count] = true
                }
                count++
            }
        }
        // 所有的反斜线
        for(let i = 0; i< 11; i++)
        {
            for(let j = 14; j > 3; j--)
            {
                for(let k = 0; k< 5; k++)
                {
                    Wins[i+k][j-k][count] = true
                }
                count++
            }
        }
        console.log('五子棋有多少种赢法: ' + count)
    }
}
export default Chees