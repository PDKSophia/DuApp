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
                    <div class="add_file" v-for="(item, index) in PicArray" :key="index">
                        <img :src="item.imgpath"> 
                    </div>
		        </div>
            </form>
        </div>
	</div>
</template>

<script>
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
                                // $.ajax({
                                //     url : "./upload",
                                //     type : 'post',
                                //     data : formdata,
                                //     contentType : false,   // <form>表单构造的FormData对象，且已经声明了属性enctype="multipart/form-data"
                                //     processData : false,    // 不处理发送的数据
                                //     success: function (data) {  
                                //         _this.$dialog.alert({mes: '发布成功'})
                                //         setTimeout(function(){
                                //             _this.$router.push({ path : '/' })
                                //         }, 1500)
                                //     },
                                //     error:function(err){
                                //         if(err.status == 500)
                                //         {
                                //             let errText = JSON.parse(err.responseText)
                                //             _this.$dialog.alert({ mes : errText.msg })
                                //         }
                                //     }
                                // });
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
</style>