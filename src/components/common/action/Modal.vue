<template>
	<el-dialog :title="modal.title" :visible.sync="modalVisible" :custom-class="customClass" :width="dialogWidth" @close="dialogClose">
	  	<el-form :model="form" ref="modalform">
	  		<template v-for="(item, index) in modal.formdatas">
	  			<el-form-item v-if="!item.position&&item.type=='input'&&!item.hidden" :label="item.label" :prop="item.model" :label-width="formLabelWidth"  v-bind:class="{disabled:item.disabled}" :rules="[{ required: true, message: '内容不能为空'}]">
			        <el-input  v-model="form[item.model]" auto-complete="off" :disabled="item.disabled"></el-input>
	  			</el-form-item>
			    <input  v-if="!item.position&&item.type=='input'&&item.hidden" type="hidden"  v-model="form[item.model]" name="" />
			    <el-form-item class="position" v-if="item.position" :label="item.label"  :label-width="formLabelWidth"  v-bind:class="{disabled:item.disabled}">
			        <el-select v-model="form[item.modelselect]" placeholder="选择样品室" :disabled="item.disabled">
				        <el-option label="样品1室" value="样品1室"></el-option>
				        <el-option label="样品2室" value="样品2室"></el-option>
				        <el-option label="样品3室" value="样品3室"></el-option>       
				    </el-select>
				    <el-input v-model="form[item.modelinput]" placeholder="请填写几号柜" :disabled="item.disabled"></el-input>
				    <div class="el-form-item__error" v-if="position_error">
			        	{{position_error_message}}
			        </div>
			    </el-form-item>
			    <el-form-item  class="select" v-if="!item.position&&item.type=='select'&&!item.defaultz" :prop="item.model" :label="item.label"  :label-width="formLabelWidth"  v-bind:class="{disabled:item.disabled}" :rules="[{ required: true, message: '请选择'}]">
			        <el-select v-model="form[item.model]" placeholder="请选择" :disabled="item.disabled" @change="function(val){return change(val,item.model)}" :no-data-text="item.empty?item.empty:'无数据'">
				        <el-option v-for="item2 in item.selectitems" :label="item2.label" :value="item2.value" :key="item2.id"></el-option>    
				    </el-select>
			    </el-form-item>
			    <el-form-item  class="select" v-if="!item.position&&item.type=='select'&&item.defaultz" :prop="item.model" :label="item.label"  :label-width="formLabelWidth"  v-bind:class="{disabled:item.disabled}" >
			        <el-select v-model="defaultz" placeholder="请选择" :disabled="item.disabled" @change="function(val){return change(val,item.model)}" :no-data-text="item.empty?item.empty:'无数据'">
				        <el-option v-for="item2 in item.selectitems" :label="item2.label" :value="item2.value" :key="item2.id"></el-option>    
				    </el-select>
			    </el-form-item>
			    <el-form-item v-if="!item.position&&item.type=='textarea'" :label="item.label+':'" :prop="item.model" :label-width="formLabelWidth"  v-bind:class="{disabled:item.disabled,textareaall:item.textareaall}" :rules="[{ required: true, message: '内容不能为空'}]">
			        <el-input
					  	type="textarea"
					  	:autosize="{ minRows: item.rows}"
					  	:placeholder="'请填写'+item.label"
					  	:disabled="item.disabled"
					  	v-model="form[item.model]">
					</el-input>
			    </el-form-item>
	  		</template>
	  		
	  	<!--<el-form :model="createlib" ref="modalform">
		    <el-form-item label="单位名称:" :label-width="formLabelWidth">
		        <el-input v-model="createlib.unit" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="库点名称:" :label-width="formLabelWidth">
		        <el-input v-model="createlib.lib" auto-complete="off"></el-input>
		    </el-form-item>-->
		    
		    <!--<el-form-item label="库点名称" :label-width="formLabelWidth">
		        <el-select v-model="createlib.region" placeholder="请选择活动区域">
			        <el-option label="区域一" value="shanghai"></el-option>
			        <el-option label="区域二" value="beijing"></el-option>
		        </el-select>
		    </el-form-item>-->
		</el-form>
		<div slot="footer" class="dialog-footer center">
		    <el-button class="yes" type="primary" @click="createlibitem('modalform')">{{modal.submitText?modal.submitText:'确 定'}}</el-button>
		    <el-button class="no" @click="dialogClose">取 消</el-button>
	    </div>
	</el-dialog>
</template>

<script>
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';

export default {
    components:{ },
    props: ['modal'],
    computed:{
		...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask","isCollapse"]),
		...mapGetters(["modal_id"]),
	},
	beforeCreate(){
//		console.log(this.$options.propsData)
	},
	beforeCreate(){

//		this.form.resontype='101'
	},
	created(){

		
		this.modal.formdatas.forEach((item,index)=>{
			if(item.defaultz){
				this.defaultz=item.defaultz
			}else if(item.value){				
				this.form[item.model]=item.value
			}
			
		})
		if(this.modal.customClass){
			this.customClass=this.customClass+' '+this.modal.customClass
		}

	},
	mounted(){


	},
    data() {
        return {
        	customClass:'createlib',
        	defaultz:'',
        	position_error:false,
        	position_error_message:'',
        	dialogWidth:'6.2rem',
        	modalVisible: true,
		    form:{

		    },
	        formLabelWidth: '1.4rem'
        }
    },
    methods:{
    	...mapMutations(['create_modal_id','is_mask','close_modal','hid_modal']),
  		...mapActions(['addAction']),
    	createlibitem(formname){
//  		this.modalVisible = false;
			//这里缺一个表单验证
//			var values=Object.values(this.form);
//			console.log(values)
//			if(values.length){
//				this.$emit('createlibitem',this.form);
//				this.$emit('dialogClose')
////				this.$refs['modalform'].resetFields();				
//			}else{
//				return
//			}

			if(this.modal.addprop){
				if(!this.form.depot){
	        		this.position_error=true;
	        		this.position_error_message="请选择样品室";
	        		return
	        	}
	        	if(!this.form.counter){
	        		this.position_error=true;
	        		this.position_error_message="请填写几号柜";
	        		return
	        	}
			}

        	this.position_error=false;
			this.$refs[formname].validate((valid) => {
                if (valid) {
                 		
                	this.$emit('createlibitem',this.form,this.modal.title);
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
    	change(val,model){
//			this.form[model]=val
//  		console.log(val,model,this.form)
			if(model=='depot'){
				if(this.form['counter']){					
					this.form['counter']='';
				}
				if(this.form['place']){					
					this.form['place']='';
				}
			}else if(model=='counter'){
				if(this.form['place']){					
					this.form['place']='';
				}
			}else if(model=='place'){
//				this.form['counter']=''
			}else if(model=='sort'){
				if(this.form['checkPoint']){					
					this.form['checkPoint']='';
				}
			}else if(model=='reasontype'){
				if(this.form['reason']){					
					this.form['reason']=val;
				}
			}
            this.$emit('modelSelectChange',val,model);
    	},
   	},
    
}
</script>
<style>
.el-dialog{
	overflow: hidden;
    /*width: 10.24rem;*/
    border-radius:0.1rem;
}
/*头部*/
.createlib .el-dialog__header{
	height: 0.6rem;
	line-height: 0.6rem;
	padding:0 0.33rem;
	background-color: rgba(88, 180, 129, 0.8);
	position:relative;	
}
.createlib.blue .el-dialog__header{
	background-color: rgba(76,144,219, 0.8);
}
.createlib .el-dialog__title{
	font-size:0.18rem;
	color:rgba(255,255,255,1);
}
.createlib .el-dialog__title:before{
	position:absolute;
	content:'';
	width:0.04rem;
	height:0.2rem;
	background:rgba(255,255,255, 1);
	left:0.2rem;
	top:0.2rem;
}
.createlib .el-dialog__headerbtn{
	top:50%;
	margin-top:-0.1rem;
	right:0.3rem;
	width:0.2rem;
	height:0.2rem;
}
.createlib .el-dialog__headerbtn .el-dialog__close{
	color:#ffffff;
	font-size:0.2rem;
}
.createlib .el-dialog__body{
	padding:0.45rem 0.35rem 0 0.48rem;
}
.createlib .el-dialog__body .el-form-item{
	/*height: 0.5rem;*/
	line-height: 0.5rem;
	background-color: #ffffff;
	border: solid 1px #dfdfdf;
	margin:0;
	border-top:none;
}
.createlib .el-dialog__body .el-form-item:first-of-type{
	border-top:solid 1px #dfdfdf;
}
.createlib .el-dialog__body .el-form-item.textareaall{
	border:none;
}
.createlib .el-dialog__body .textareaall .el-form-item__label{
	display: none;
}
.createlib .el-dialog__body .textareaall .el-form-item__content{
	margin:0!important;
	border:none;
}
.createlib .el-dialog__body .textareaall .el-form-item__content .el-textarea__inner{
	border-color:#dfdfdf!important;
	border-width: 1px;
}
.createlib .textareaall .el-form-item__error{
	top:17.5px;
}
.createlib .el-dialog__body .el-textarea textarea{
	/*line-height:0.5rem;*/
	font-size:0.16rem;
	color:#333333;
	border-width: 0;
	/*border:none;*/
	padding:8px 15px;
	/*height:auto;*/
}
.createlib .el-dialog__body .el-form-item__label{
	line-height: 0.5rem;
	background-color: #fbfbfb;
	/*border-right:1px solid #dfdfdf;*/
	font-size:0.16rem;
	color:#333333;
}
.createlib .el-dialog__body .el-form-item__label:before{
	display: none;
}
.createlib .el-dialog__body .el-form-item.disabled .el-form-item__label{
	color:#999999;
}
.createlib .el-dialog__body .el-form-item__content{
	line-height: 0.5rem;
	border-left:1px solid #dfdfdf;
}
.createlib .el-dialog__body .el-input input{
	line-height:0.5rem;
	border:none;
	font-size:0.16rem;
	color:#333333;
	height:auto;
}
.createlib .el-dialog__body .el-form-item.disabled .el-input input{
	background:#ffffff;
	color:#999999;
}
/*底部*/
.createlib .el-dialog__footer{
	padding:0.43rem 0;
}
.createlib .dialog-footer.center{
	text-align:center;
}
.createlib .dialog-footer button {
    font-size: 0.18rem;
    padding: 0rem;
    line-height: 0.5rem;
    border-radius: 0.1rem;
    width:1.3rem;
    height:0.5rem;
    text-align: center;
}
.createlib .dialog-footer .el-button+.el-button{
	margin-left:0.57rem;
}
.createlib .dialog-footer button.yes {
	background-color: rgb(88,180,129);
	border-color:rgb(88,180,129);
}
.createlib .dialog-footer button.yes:hover {
	background-color: rgba(88,180,129,0.8);
	border-color:#58b481;
}
.createlib .dialog-footer button.no {
	color: #58b481;
	border-color:#58b481;
}
.createlib .dialog-footer button.no:hover {
	background:rgba(88,180,129,0.1);
}

.createlib.blue .dialog-footer button.yes {

	background-color: rgba(76,144,219,1);
	border-color: rgba(76,144,219, 1);
}
.createlib.blue .dialog-footer button.yes:hover {
	background-color: rgba(76,144,219, 0.8);
	border-color: rgba(76,144,219, 1);
}
.createlib.blue .dialog-footer button.no {
	color: rgba(76,144,219, 1);
	border-color: rgba(76,144,219, 1);
}
.createlib.blue .dialog-footer button.no:hover {
	background-color: rgba(76,144,219, 0.1);
}
/*验证*/
.createlib .el-form-item__error{
	left:auto;
	right:0.1rem;
	top:50%;
	margin-top:-11px;
}
/*存放位置下拉*/
.createlib .el-dialog__body .el-form-item.position .el-form-item__content .el-select{
	padding-left:0.2rem;
}
.createlib .el-dialog__body .el-form-item.position .el-form-item__content .el-select .el-input input{
	height:0.36rem;
	width:1.5rem;
	line-height:0.34rem;
	border:solid  0.01rem #dfdfdf;
	font-size:0.16rem;
	background:#f2f2f2;
	border-radius:0;
}
/*存放位置文本框*/
.createlib .el-dialog__body .el-form-item.position .el-form-item__content>.el-input{
	width:1.25rem;
}
.createlib .el-dialog__body .el-form-item.position .el-form-item__content>.el-input input{
	height:0.46rem;
	line-height:0.46rem;
	border:none;
	/*padding-right:7em;*/
	padding-right:0;
	padding-left:0;
	font-size:0.16rem;
}
/*下拉*/
.createlib .el-form-item.select .el-form-item__content .el-select{
	/*padding-left:0.2rem;*/
	margin-left:0.2rem;
}
.createlib .el-form-item.select .el-form-item__content .el-select .el-input input{
	height:0.36rem!important;
	width:2.75rem;
	line-height:0.34rem;
	border:solid  0.01rem #dfdfdf;
	font-size:0.16rem;
	background:#f2f2f2;
	border-radius:0;
}
</style>