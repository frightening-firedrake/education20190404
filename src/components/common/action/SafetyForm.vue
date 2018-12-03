<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling" :rules="rules" :model="formdatas.form" :label-width="labelWidth">
        <template>
            <p>{{formdatas.title}}</p>
        </template>      
       
		<el-form-item label="被查库点：" prop="libraryName"  v-bind:class="{disabled:disabled}">
		    <el-select v-model="formdatas.form.libraryName" placeholder="选择库点" :disabled="disabled">
		        <el-option label="本库" value="本库"></el-option>	
		    </el-select>
		</el-form-item>
		<el-form-item label="货位号：" prop="position"  v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.position" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="检查人：" prop="rummager" class="full">
		    <el-input v-model="formdatas.form.rummager" ></el-input>
		</el-form-item>
		<!--问题组-->
		
		
		<template v-for="(item, index) in formdatas.form.problems">
			<el-form-item 
				:label="'问题' + (index+1)+'：'" 
				:prop="'problems.'+index+'.problem'" 
				class="problem" 
				:rules="{
			      required: true, message: '请填写问题详情', trigger: 'blur'
			    }">
			    <el-input type="textarea" v-model="item.problem"></el-input>
			</el-form-item>
			<el-form-item label="图片：" prop="images" class="images">
			    <el-upload
				  :action="uploadPicURL"
				  list-type="picture-card"
				  ref='upload'
				  :headers="{'Authorization':Token}"
				  :limit='limit'
				  :on-preview="handlePictureCardPreview"
				  name="pictureFile"
				  :on-success="(response,file,fileList)=>{return imageUploadSuccess(response,file,fileList,index)}"
				  :on-error="imageUploadError"
				  :file-list="item.images"
				  :before-remove="(file,fileList)=>{return handleRemove(file,fileList,index)}">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" size="tiny">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>			
		</template>
		

        
        <div class="btns">
			<div class="addproblem" @click="addproblem">
				问题加一
			</div>
			<div v-if="delebtn" class="delproblem" @click="delproblem">
				问题减一
			</div>
            <el-button class="yes" type="primary" @click="onSubmit('form')">确认</el-button>
            <el-button class="no" @click="cancel('form')">取消</el-button>
        </div>
        
        <div class="clear"></div>
    </el-form>
</template>

<script>
import "@/assets/style/common/Form.css";
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
    props: ["formdatas","uploadPicURL"],
    created(){
    	this.createimgbox()
		console.log(this.Token)
    },
    mounted: function() {
//		console.log(this.formdatas)
    },
    computed:{
		...mapGetters(["Token"]),
    	delebtn(){
			if(this.formdatas.form.problems.length>1){
				return true;
			}else{
				return false;
			}
		},
//		problems(){
//			var problems=[];
//			this.$refs.upload.forEach((value,index)=>{
//				var obj={};
//				obj.problem=value.data.problem;
//				obj.images=value.uploadFiles;
//				problems.push(obj)
//			})
//			return problems;
//		}
    },
    data() {

    		// 普通文本的验证
            var validateText = ( rule, value, callback ) => {
                var str =/^[^'"#$%&\^*》>,."<《？，。！@#￥%……’”：/；]+$/;
                if(!value){
                     return callback(new Error("请输入内容"));
                }else if(!str.test(value)){
                    return callback(new Error("请不要输入特殊的字符"))
                }else{
                    callback()
                }
            }
            // 下拉框
            var validateSelect = ( rule, value, callback ) => {
                if(!value){
                    return callback(new Error("必须选择"))
                }else{
                    callback()
                }
            }
            // 电话
            var validatePhone = ( rule, value, callback ) => {
                var str = /^1[3|4|5|8][0-9]\d{4,8}$/
                if(!value){
                    return callback(new Error("手机号不能为空"))
                }else if(!str.test(value)){
                    return callback(new Error("手机号不对"))
                }else{
                    callback()
                }
            }
            // 邮箱
            var validateEmily = ( rule, value, callback ) => {
                var str = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ 
                if(!value){
                    return callback(new Error("邮箱不能为空"))
                }else if(str.test(value)){
                    return callback(new Error("邮箱不正确"))
                }else{
                    return callback()
                }
            }
        return {
        limit:5,	
//      dyear:new Date(2017),
		false:false,
        dialogImageUrl: '',
        dialogVisible: false,
        labelWidth:'2rem',
        errorinline:false,
        disabled:true,
        imgbox:[
//      	{images:[]},
        ],
            rules: {
                text: [
                    {validator:validateText,trigger:'blur'}
                ],
                select:[
                    {validator:validateSelect,trigger:'blur'}
                ],
                ctime:[
                    {validator:validateText,trigger:'blur'}
                ],
	            status: [
                    {validator:validateText,trigger:'blur'}
                ],
	            nid: [
                    {validator:validateText,trigger:'blur'}
                ],
	            checkregion:[
                    {validator:validateSelect,trigger:'blur'}
                ],
	            pnumber:[
                    {validator:validateText,trigger:'blur'}
                ],
	            varieties:[
                    {validator:validateText,trigger:'blur'}
                ],
	            quality:[
                    {validator:validateText,trigger:'blur'}
                ],
	            weight:[
                    {validator:validateText,trigger:'blur'}
                ],
	            region:[
                    {validator:validateSelect,trigger:'blur'}
                ],
//	            harvestdate: '2017',//收货年度
	            samplingdate:[
                    {validator:validateText,trigger:'blur'}
                ],
//	            remarks: '',//备注
                
            }
        }
    },
    methods: {  
        onSubmit(formname) {
//      	console.log(this.formdatas.form)
            this.$refs[formname].validate((valid) => {
                if (valid) {
//                  alert('submit!');
                    this.$emit('submit',this.imgbox)
//					window.history.go(-1)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(formname) {
            console.log('取消!');
			this.$refs[formname].resetFields();
//          this.$emit('btn_close')
			window.history.go(-1)
        },
//      图片上传查看与删除
	    handleRemove(file,fileList,index) {
	        console.log(file, fileList,index);
	        var index2;
	    	fileList.forEach((value,listindex)=>{
//	    		console.log(value.uid,file.uid)
	    		if(value.uid==file.uid){
	    			index2=listindex
	    		}	    		
	    	})
	    	this.imgbox[index].images.splice(index2,1);
	    	
//			this.$emit('changeProblems',this.problems);
	    },
	    handlePictureCardPreview(file, fileList) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	    },
//	       回收图片地址
	    imageUploadSuccess(response, file, fileList, index){
	    	console.log('上传成功')
//	    	console.log(response, file, fileList,index)
	    	var index2;
	    	fileList.forEach((value,listindex)=>{
//	    		console.log(value.uid,file.uid)
	    		if(value.uid==file.uid){
	    			index2=listindex
	    		}	    		
	    	})
			if(response.success){
				var url=response.msg;
				var index1=index;
//				console.log(url,index1,index2)
				this.imgbox[index1].images[index2]=url;
				console.log(this.imgbox)
//				this.$emit('changeProblems',this.problems);
			}else{
//				alert(response.msg)	
				this.$message.error(response.msg);
			}
	    },
		imageUploadError(err, file, fileList){
			this.$message.error('上传失败！！！');
		},
//	       问题加一
		addproblem(){
//			formdatas.form.problems.'+index+'.problem
			var flag=true;
			this.formdatas.form.problems.forEach(function(value,index){
				if(!value.problem){
					flag=false;
				}
			})
			if(flag){
				this.imgbox.push({images:[]})
				console.log(this.imgbox)
				this.$emit('addproblem');				
			}else{
				 this.$message('请完善问题详情！！！');
			}
		},
//		问题减一
		delproblem(){
			this.imgbox.pop()
			this.$emit('delproblem');
		},
//		初始imgbox
		createimgbox(){
			this.imgbox=[],
			this.formdatas.form.problems.forEach((value)=>{
				this.imgbox.push({images:[]})
			})
		}
    }

}
</script>

