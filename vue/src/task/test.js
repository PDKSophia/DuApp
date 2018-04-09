/*
   * @Result : 画棋盘和落棋
   * @Author : PDK
   * @Time : 2017-11-15
*/

let cheesArray = []
let master = true
let over = false
// 赢法数组
let Wins = []

// 赢法统计数组
let MyWin = []
let ComputeWin = []

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
for(let i = 0; i < 15; i++){
	Wins[i] = []
	for(let j = 0; j < 15; j++){
		Wins[i][j] = []
	}
}
// 赢法种类
let count = 0

// 所有的横线
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
//以此类推	
for(let i = 0; i< 15; i++)
{
	for(let j = 0; j< 11; j++)  //为什么小于11？i=0,j=10,k=0..4，那么这样算第二个索引就是从10-14到true，刚好边界
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

// 初始化我方赢法统计数组和计算机的赢法统计数组
for(let i = 0; i < count; i++)
{
	MyWin[i] = 0
	ComputeWin[i] = 0
}

let cheesboard = document.getElementById('chees')

let drawboard = cheesboard.getContext("2d")
drawboard.strokeStyle = '#BFBFBF'

// 画棋盘
let drawCheesBoard = function()
{
            for(let i = 0; i < 15; i++)
            {
                //竖线 
                drawboard.moveTo(10 + i*20, 5)
                drawboard.lineTo(10 + i*20, 145)
                drawboard.stroke()
                // 横线
                drawboard.moveTo(10, 5 + i*10-0.5)
                drawboard.lineTo(290, 5 + i*10-0.5)
                drawboard.stroke()
            }
}

// 走一步，画个棋子，master代表是谁走的，控制颜色

let drawStep = function(x, y, master)
{
	// 画圆
	drawboard.beginPath()
	drawboard.arc(15 + x*30, 15 + y*30, 13, 0, 2*Math.PI)  //圆心坐标x=15，y=15，半径r=13，start=0，stop=2*pi
	drawboard.closePath()
	// 渐变
	let grd = drawboard.createRadialGradient(15 + x*30 + 2, 15 + y*30 - 2, 13, 15 + x*30 + 2, 15 + y*30 - 2, 0)
	// 黑棋
	if(master)
	{
		grd.addColorStop(0, '#0A0A0A')
		grd.addColorStop(1, '#636766')
	}
	else
	{
		grd.addColorStop(0, '#D1D1D1')
		grd.addColorStop(1, '#F9F9F9')
	}
	// 棋子颜色等于渐变颜色
	drawboard.fillStyle = grd
	drawboard.fill()
}
cheesboard.onclick = function(e)
{
	if(over)   //如果已经赢了
	{
		return;
	}
	if(!master)   //不是我方下棋
	{
		return;
	}
	var positionX = e.offsetX
	var positionY = e.offsetY
	var x = Math.floor(positionX / 30)
	var y = Math.floor(positionY / 30)
	// console.log(x)
	// console.log(y)
	if(cheesArray[x][y] == 0)    //说明这个地方可以落子
	{
		drawStep(x, y, master)
		cheesArray[x][y] = 1    //下了一个黑子标记1	
		for(let k = 0; k < count; k++)     //遍历所有的赢法
		{
			// 如果第k种赢法在k这位置是有子的，比如我在这个点落子，那么这个点的赢法是有可能的，相反，电脑的这个点赢法是不可以的，给异常值
			if(Wins[x][y][k])    		
			{
				MyWin[k]++
				ComputeWin[k] = 6    //随便给个异常值，不可能赢了
				if(MyWin[k] == 5)    //走了5步棋
				{
					window.alert('卧槽,你能赢已经很厉害了')
					over = true
				}
			}
		}

		if(!over)
		{
			master = !master   //走白棋
			computeAI()
		}
	}
}

// 计算机下棋
let computeAI= function()
{
	// 定义得分
	let myScore = []
	let computeScore = []
	let maxScore = 0 //最大得分
	let u = 0, v = 0   //当前坐标

	// 初始化
	for(let i = 0; i < 15; i++)
	{
		myScore[i] = []
		computeScore[i] = []
		for(let j = 0; j < 15; j++)
		{
			myScore[i][j] = 0
			computeScore [i][j] = 0
		}
	}
	// 遍历
	for(let i = 0; i < 15; i++)
	{
		for(let j = 0; j < 15; j++)
		{
			if(cheesArray[i][j] == 0) //可以下子
			for(let k = 0; k < count; k++)
			{
				if(Wins[i][j][k])   //如果这里下了黑子
				{
					// 我方得分计算
					if(MyWin[k] == 1)
					{
						myScore[i][j] += 200   //下了一个子得200分
					}
					else if(MyWin[k] == 2)
					{
						myScore[i][j] += 400
					}
					else if(MyWin[k] == 3)
					{
						myScore[i][j] += 1000
					}
					else if(MyWin[k] == 4)
					{
						myScore[i][j] += 3000
					}
					// 计算机
					if(ComputeWin[k] == 1)
					{
						computeScore[i][j] += 250   //下了一个子得200分
					}
					else if(ComputeWin[k] == 2)
					{
						computeScore[i][j] += 450
					}
					else if(ComputeWin[k] == 3)
					{
						computeScore[i][j] += 1500
					}
					else if(ComputeWin[k] == 4)
					{
						computeScore[i][j] += 3500
					}
				}
			}

			if(myScore[i][j] > maxScore)
			{
				maxScore = myScore[i][j]
				u = i
				v = j
			}
			else if(myScore[i][j] == maxScore)
			{
				if(computeScore[i][j] > computeScore[u][v])
				{
					u = i
					v = j
				}
			}

			if(computeScore[i][j] > maxScore)
			{
				maxScore = computeScore[i][j]
				u = i
				v = j
			}
			else if(computeScore[i][j] == maxScore)
			{
				if(myScore[i][j] > myScore[u][v])
				{
					u = i
					v = j
				}
			}
		}
	}
	drawStep(u, v, false)
	cheesArray[u][v] = 2
	for(let k = 0; k < count; k++)     //遍历所有的赢法
	{
		// 如果第k种赢法在k这位置是有子的，比如我在这个点落子，那么这个点的赢法是有可能的，相反，我方的这个点赢法是不可以的，给异常值
		if(Wins[u][v][k])    		
		{
			ComputeWin[k]++
			MyWin[k] = 6    //随便给个异常值，不可能赢了
			if(ComputeWin[k] == 5)    //走了5步棋
			{
				window.alert('冷冰冰的机器你都赢不了,辣鸡')
				over = true
			}
		}
	}

	if(!over)
	{
		master = !master   //走白棋
	}
}
window.onload = function(){
	drawCheesBoard()
}