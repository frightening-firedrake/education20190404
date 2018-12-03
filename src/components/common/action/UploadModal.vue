<template>
	<el-dialog :title="modal.title" :visible.sync="modalVisible" custom-class="uploadimg" :width="dialogWidth" @close="dialogClose">
	  	<el-form :model="form" ref="modalform">
	  		<template v-for="(item, index) in modal.formdatas">
	  			<el-form-item v-if="item.type=='input'" :label="item.label" :prop="item.model" :label-width="formLabelWidth"  v-bind:class="{disabled:item.disabled}" :rules="[{ required: true, message: '内容不能为空'}]">
			        <el-input v-model="form[item.model]" auto-complete="off" :disabled="item.disabled"></el-input>
			   	</el-form-item>
			    <el-form-item v-if="item.type=='textarea'" class="textareaall" label="none" :prop="item.model" :label-width="formLabelWidth"  v-bind:class="{disabled:item.disabled}" :rules="[{ required: true, message: '内容不能为空'}]">
			        <el-input
					  	type="textarea"
					  	:autosize="{ minRows: item.rows}"
					  	:placeholder="item.label"
					  	:disabled="item.disabled"
					  	v-model="form[item.model]">
					</el-input>
			    </el-form-item>
	  		</template>
			
			<el-form-item label="图片：" prop="images" class="images" :label-width="formLabelWidth">
				<div class="el-form-item__error" v-if="uploadimg_error">
			        {{uploadimg_error_message}}
			    </div>
			    <el-upload
				  	:action="uploadPicURL"
				  	list-type="picture-card"
				  	ref='upload'
				 	:headers="{'Authorization':Token}"
				 	:limit='limit'
				  	:on-preview="handlePictureCardPreview"
				  	name="pictureFile"
				  	:on-success="(response,file,fileList)=>{return imageUploadSuccess(response,file,fileList,1)}"
				  	:on-error="imageUploadError"
				  	:file-list="images"
				  	:before-remove="(file,fileList)=>{return handleRemove(file,fileList,1)}">
				  	<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" size="tiny">
				  	<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>	
			
		</el-form>
		<div slot="footer" class="dialog-footer center">
		    <el-button class="yes" type="primary" @click="submit('modalform')">{{modal.submitText?modal.submitText:'确 定'}}</el-button>
		    <el-button class="no" @click="dialogClose">取 消</el-button>
	    </div>
	</el-dialog>
</template>

<script>
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';

export default {
    components:{ },
    props: ['modal',"uploadPicURL"],
    computed:{
		...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask","isCollapse"]),
		...mapGetters(["Token"]),
	},
	created(){
		this.modal.formdatas.forEach((item,index)=>{
			this.form[item.model]=item.value
		})
	},
    data() {
        return {
        	uploadimg_error:true,
        	uploadimg_error_message:'',
        	dialogWidth:'6.2rem',
        	modalVisible: true,
		    form:{

		    },
	        formLabelWidth: '1.4rem',
	        limit:5,	
			false:false,
	        dialogImageUrl: '',
	        dialogVisible: false,
	        disabled:true,
	        images:[

	        ],
        }
    },
    methods:{
    	...mapMutations(['create_modal_id','is_mask','close_modal','hid_modal']),
  		...mapActions(['addAction']),
    	submit(formname){
    		if(this.modal.adduploadprop){
				if(this.images.length==0){
	        		this.uploadimg_error=true;
	        		this.uploadimg_error_message="请先上传图片";
	        		return
	        	}
			}
        	this.uploadimg_error=false;
			this.$refs[formname].validate((valid) => {
                if (valid) {
					this.$emit('submitupload',this.form,this.images);
					this.$emit('dialogClose')
//					this.$refs['modalform'].resetFields();				
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
    	},
    	dialogClose(){
//  		this.$refs['modalform'].resetFields();
    		this.$emit('dialogClose')
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
	    	this.images.splice(index2,1);
	    	
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
//				var index1=index;
//				console.log(url,index1,index2)
				this.images[index2]=url
//				console.log(this.images)
//				this.$emit('changeProblems',this.problems);
			}else{
//				alert(response.msg)	
				this.$message.error(response.msg);
			}
	    },
		imageUploadError(err, file, fileList){
			this.$message.error('上传失败！！！');
		},
//		//		初始imgbox
//		createimgbox(){
//			this.imgbox=[],
//			this.formdatas.form.problems.forEach((value)=>{
//				this.imgbox.push({images:[]})
//			})
//		}
    },
    mounted:function(){
//		console.log(this.breadcrumb)
    }
    
}
</script>
<style>
.el-dialog{
	overflow: hidden;
    /*width: 10.24rem;*/
    border-radius:0.1rem;
}
/*头部*/
.uploadimg .el-dialog__header{
	height: 0.6rem;
	line-height: 0.6rem;
	padding:0 0.33rem;
	background-color: rgba(88, 180, 129, 0.8);
	position:relative;	
}
.uploadimg .el-dialog__title{
	font-size:0.18rem;
	color:rgba(2255,255,255,1);
}
.uploadimg .el-dialog__title:before{
	position:absolute;
	content:'';
	width:0.04rem;
	height:0.2rem;
	background:rgba(255,255,255, 1);
	left:0.2rem;
	top:0.2rem;
}
.uploadimg .el-dialog__headerbtn{
	top:50%;
	margin-top:-0.1rem;
	right:0.3rem;
	width:0.2rem;
	height:0.2rem;
}
.uploadimg .el-dialog__headerbtn .el-dialog__close{
	color:#ffffff;
	font-size:0.2rem;
}
.uploadimg .el-dialog__body{
	padding:0.45rem 0.35rem 0 0.48rem;
}
.uploadimg .el-dialog__body .el-form-item{
	/*height: 0.5rem;*/
	line-height: 0.5rem;
	background-color: #ffffff;
	border: solid 1px #dfdfdf;
	margin:0;
	border-top:none;
}
.uploadimg .el-dialog__body .el-form-item:first-of-type{
	border-top:solid 1px #dfdfdf;
}
.uploadimg .el-dialog__body .el-form-item.textareaall{
	border:none;
}
.uploadimg .el-dialog__body .textareaall .el-form-item__label{
	display: none;
}
.uploadimg .el-dialog__body .textareaall .el-form-item__content{
	margin:0!important;
}
.uploadimg .el-dialog__body .textareaall .el-form-item__content .el-textarea__inner{
	border-color:#dfdfdf!important;
}
.uploadimg .textareaall .el-form-item__error{
	top:17.5px;
}
.uploadimg .el-dialog__body .el-textarea textarea{
	/*line-height:0.5rem;*/
	font-size:0.18rem;
	color:#333333;
	/*height:auto;*/
}

.uploadimg .el-dialog__body .el-form-item__label{
	line-height: 0.5rem;
	background-color: #fbfbfb;
	/*border-right:1px solid #dfdfdf;*/
	font-size:0.18rem;
	color:#333333;
}
.uploadimg .el-dialog__body .el-form-item__label:before{
	display: none;
}
.uploadimg .el-dialog__body .el-form-item.disabled .el-form-item__label{
	color:#999999;
}
.uploadimg .el-dialog__body .el-form-item__content{
	line-height: 0.5rem;
	border-left:1px solid #dfdfdf;
	
}
.uploadimg .el-dialog__body .el-input input{
	line-height:0.5rem;
	border:none;
	font-size:0.18rem;
	color:#333333;
	height:auto;
}
.uploadimg .el-dialog__body .el-form-item.disabled .el-input input{
	background:#ffffff;
	color:#999999;
}
/*底部*/
.uploadimg .el-dialog__footer{
	padding:0.43rem 0;
}
.uploadimg .dialog-footer.center{
	text-align:center;
}
.uploadimg .dialog-footer button {
    font-size: 0.18rem;
    padding: 0rem;
    line-height: 0.5rem;
    border-radius: 0.1rem;
    width:1.3rem;
    height:0.5rem;
    text-align: center;
}
.uploadimg .dialog-footer .el-button+.el-button{
	margin-left:0.57rem;
}
.uploadimg .dialog-footer button.yes {
	background-color: rgb(88,180,129);
	border-color:rgb(88,180,129);
}
.uploadimg .dialog-footer button.yes:hover {
	background-color: rgba(88,180,129,0.8);
	border-color:#58b481;
}
.uploadimg .dialog-footer button.no {
	color: #58b481;
	border-color:#58b481;
}
.uploadimg .dialog-footer button.no:hover {
	background:rgba(88,180,129,0.1);
}
/*验证*/
.uploadimg .el-form-item__error{
	left:auto;
	right:0.1rem;
	top:50%;
	margin-top:-11px;
}
/*存放位置下拉*/
.uploadimg .el-dialog__body .el-form-item.position .el-form-item__content .el-select{
	padding-left:0.2rem;
}
.uploadimg .el-dialog__body .el-form-item.position .el-form-item__content .el-select .el-input input{
	height:0.36rem;
	width:1.5rem;
	line-height:0.34rem;
	border:solid  0.01rem #dfdfdf;
	font-size:0.16rem;
	background:#f2f2f2;
	border-radius:0;
}
/*存放位置文本框*/
.uploadimg .el-dialog__body .el-form-item.position .el-form-item__content>.el-input{
	width:1.25rem;
}
.uploadimg .el-dialog__body .el-form-item.position .el-form-item__content>.el-input input{
	height:0.46rem;
	line-height:0.46rem;
	border:none;
	/*padding-right:7em;*/
	padding-right:0;
	padding-left:0;
	font-size:0.16rem;
}
.uploadimg .el-form-item.images .el-form-item__content{
	padding:20px 15px 0;
}
.uploadimg .el-form-item.images .el-form-item__content >div{
	
}
.uploadimg .el-upload-list--picture-card .el-upload-list__item{
	width:1.6rem;
	height:1.1rem;
}
.uploadimg .el-upload--picture-card{
	width:1.6rem;
	height:1.1rem;
	line-height:1.1rem;
	margin-bottom:8px;
}
.uploadimg .el-upload--picture-card i{	
	vertical-align:middle;
}
</style>