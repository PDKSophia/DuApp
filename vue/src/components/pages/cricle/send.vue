<!-- 朋友圈 -->
<template>
	<div>
		<div class="circle-top">
            <yd-flexbox>
                <div class="icon"><i class="fa fa-chevron-left" @click="back()"></i></div>
                <yd-flexbox-item>
                </yd-flexbox-item>
                <div class="icon">
                    <i class="fa fa-paper-plane-o" @click="SubmitSend"></i>
                </div>
            </yd-flexbox>
        </div>

        <div class="form-cell">
            <form class="form-horizontal" role="form" id="uploadForm" name="uploadForm" enctype="multipart/form-data">
			    <textarea v-model.trim="context" name="context" placeholder="say something ..." rows="6"></textarea>
                <div class="add_phone">
    		        <div class="add_file" v-if="PicIsShow">
    		            <input type="file" name="image[]" id="image[]" @change="imageChange('add_phone','add_file')" />
    		        </div>
                    <div class="add_file z_addfile" v-for="(item, index) in PicArray" :key="index">
                        <img :src="item.imgpath" @click="RemovePhone(index)"> 
                    </div>
		        </div>
                <!--遮罩层-->
				<div class="z_mask">
				    <!--弹出框-->
				    <div class="z_alert">
				        <p>确定要删除这张图片吗？</p>
				        <p>
				            <span class="z_cancel" @click="CancelRemove">取消</span>
				            <span class="z_sure" @click="SureRemove">确定</span>
				        </p>
				    </div>
				</div>
            </form>
        </div>
	</div>
</template>

<script>
import store from '../../../store'
import qs from 'qs'

export default {
	data() {
        return {
            context : '',
            PicIsShow : true,           //控制 + 号的显示和隐藏
            choosePhone : true,         //必须上传图片
            count : 0,                  //用来判断图片数目
            PicArray : [],              //图片地址数组
            filesArray : [],            //文件数组
        }
    },
    store,
    methods : {
        back : function()
        {
            this.$router.go(-1)
        },
        // 多图上传
        imageChange : function(phone, img)
        {
            // 获取点击的文本框
            var file = document.getElementById('image[]')
            // 获取的图片文件
            var fileList = file.files
            // 把文件对象push进数组中, 因为每次都是一张一张传
            this.filesArray.push(fileList[0])
            console.log(this.filesArray)
            // 获得图片名， 大小， 类型(全转换小写)
            var imgName = fileList[0].name
            var imgSize = fileList[0].size
            var imgType = imgName.substring(imgName.lastIndexOf(".")+1).toLowerCase()
            // 判断是否属于jpg  jpeg png
            if(imgType != 'jpg' && imgType != 'jpeg' && imgType != 'png')
            {
                this.$dialog.toast({ mes : '只支持jpg , jpeg , png格式', timeout : 1000 })
                imgName = ''
                fileList = null
                return false
            }
            // 判断大小
            if(imgSize > 5240000)       // 1M = 1024 * 1024 * 1
            {
                this.$dialog.toast({ mes : '图片不能大于5M', timeout : 1000 })
                fileList = null
                return false
            }
            else
            {
                if(this.count + fileList.length <= 9)
                {
                    for(let i = 0; i < fileList.length; i++)
                    {
                        // imgUrl是BLOB，常常是数据库中用来存储二进制文件的字段类型
                        var imgUrl = window.URL.createObjectURL(file.files[i])
                        this.PicArray.push({ 'imgpath' : imgUrl })
                    }
                    console.log(this.PicArray)
                    this.count += fileList.length
                    this.choosePhone = false
                    if(this.count == 9)
                    {
                        this.PicIsShow = false
                    }
                }
                else
                {
                    for(let i = 0; i < 9-this.count; i++)
                    {
                        // imgUrl是BLOB，常常是数据库中用来存储二进制文件的字段类型
                        var imgUrl = window.URL.createObjectURL(file.files[i])
                    }
                    this.count = 9;
                    this.PicIsShow = false;
                }
            }
            this.picFlag = false   //选中最少一张图片就不显示提示
            file.value = ''   //虽然file的value不能设为有字符的值，但是可以设置为空值
        },
        RemovePhone : function(index)
        {
            console.log(index)
            this.$store.commit('ChangeRemoveIndex', index)
            // 获得遮布层
            var mask = document.getElementsByClassName("z_mask")[0]
            // 获得取消
            mask.style.display = "block"
        },
        CancelRemove : function()
        {
            var mask = document.getElementsByClassName("z_mask")[0]
            mask.style.display = "none"
        },
        SureRemove : function()
        {
            let num = this.$store.state.RemovePicIndex
            var mask = document.getElementsByClassName("z_mask")[0]
            mask.style.display = "none"
            this.PicArray.splice(num, 1)
            this.filesArray.splice(num, 1)
            console.log(this.PicArray)
        },
        // 发送
        SubmitSend : function()
        {
            let _this = this 
            if(_this.context == '')
            {
                _this.$dialog.toast({
                    mes: '内容不能为空',
                    timeout: 1000,
                    icon: 'error'
                });
            }
            else if(_this.choosePhone)
            {
                _this.$dialog.toast({
                    mes: '最少选择一张照片',
                    timeout: 1000,
                    icon: 'error'
                });
            }
            else
            {
                var myForm = document.getElementById('uploadForm')
                var formdata = new FormData(myForm)
                formdata.append('context', _this.context)
                if(_this.filesArray.length == 1 )
                {
                    formdata.append('image[]', _this.filesArray[0])
                }
                else
                {
                    for(var i = 0; i < _this.filesArray.length; i++)
                    {
                        formdata.append('image[]', _this.filesArray[i])
                    }
                }
                _this.$dialog.confirm({
                    title: '嘟嘟APP 提示',
                    mes: '是否发送该动态？',
                    opts: [
                        {
                            txt: '取消',
                            color: false,
                            callback: () => {
                                
                            }
                        },
                        {
                            txt: '确定',
                            color: true,
                            callback: () => {
                                let url = 'http://www.pengdaokuan.cn/DuApp/restful/public/index.php/index/Circle/UploadCircle'
                                this.$axios.post(url, formdata, {
                                    headers : {
                                        "Content-Type": "multipart/form-data"
                                    }
                                })
                                .then((res) => {
                                    console.log(res)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                            }
                        }
                    ]
                });
            }
        }
    }
    
}

</script>

<style scoped>
*{
	margin:0;
	padding: 0;
}
/* 顶部图标 */
.circle-top{
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
textarea {
    width: 100%;
    border: none;
    height: 10rem;
    padding: .4rem .6rem;
    resize:none;
}

/*添加一张图片*/
.add_phone {
  width: 100%;
  overflow: auto;
  clear: both;
  padding: .4rem .6rem;
}
/*图片的大小*/
.add_phone img {
    width: 5.5rem;
    height: 5.5rem;
}
/*每张图片都是一个div*/
.z_addImg {
    float: left;
    margin-left: 0.1rem;
    margin-bottom: 0.1rem;
}
/*+ 号的样式*/
.add_file {
  width: 5.5rem;
  height: 5.5rem;
  background: url(../../../assets/z_add.png) no-repeat; 
  background-size: 100% 100%;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
.imgClass {
    width: 5.5rem;
    height: 5.5rem;
    background-size: 100% 100%;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
}
.add_file input::-webkit-file-upload-button {
  width: 5.5rem;
  height: 5.5rem;
  border: none;
  position: absolute;
  outline: 0;
  opacity: 0;
}
    
.add_file input#image[] {
  display: block;
  width: auto;
  border: 0;
  vertical-align: middle;
}

/*遮罩层*/
.z_mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: none;
}
/*弹出框*/
.z_alert {
    width: 56%;
    height: 4.2rem;
    border-radius: .2rem;
    background: #fff;
    font-size: .68rem;
    text-align: center;
    position: absolute;
    left: 28%;
    top: 45%;
    margin-left: -1.5rem;
    margin-top: -2rem;
}
.z_alert p:nth-child(1) {
    line-height: 1.5rem;
    padding: .56rem 0rem;
    font-size: .82rem;
}
/*取消和确定*/
.z_alert p:nth-child(2) span {
    display: inline-block;
    width: 49%;
    padding-top: .48rem;
    height: 1.5rem;
    line-height: .5rem;
    float: left;
    border-top: 1px solid #ddd;
}
/*给取消和确定添加边框*/
.z_cancel {
    border-right: 1px solid #ddd;
}
</style>