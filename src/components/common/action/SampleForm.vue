<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling" :rules="rules" :model="formdatas.form" :label-width="labelWidth">
        <template>
            <p>{{formdatas.title}}</p>
        </template>      
        <el-form-item label="创建时间：" prop="createTime" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.createTime" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="样品条形码：" class="code" prop="code" v-bind:class="{disabled:disabled}">
<!--			<img class="codeimg" :src="formdatas.form.code" alt="" />-->
			<img class="codeimg" :src="code" alt="" />
		</el-form-item>
		<!--<el-form-item label="扦样编号：" prop="sampleNo" v-bind:class="{disabled:disabled}">-->
		<el-form-item label="检验编号：" prop="sampleNo" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.sampleNum" :disabled="disabled"></el-input>
		</el-form-item>
		<!--<el-form-item label="货位号：" prop="position" v-bind:class="{disabled:disabled}" >
		    <el-input v-model="formdatas.form.depot" :disabled="disabled"></el-input>
		</el-form-item>-->
		<el-form-item label="性质：" prop="quality"  v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.quality" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="被查直属库：" prop="pLibraryName" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.pLibraryName" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="产地：" prop="originPlace"  v-bind:class="{disabled:disabled}">
		    <!--<el-select v-model="formdatas.form.originPlace" placeholder="请选择产地" :disabled="disabled">
		        <el-option label="山西" value="1"></el-option>
		        <el-option label="河南" value="henan"></el-option>
		        <el-option label="山东" value="shandong"></el-option>
		        <el-option label="陕西" value="shanxi2"></el-option>
		        <el-option label="东北" value="dongbei"></el-option>
		    </el-select>-->
			 <el-input v-model="formdatas.form.originPlace" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="被查库点：" prop="libraryName" v-bind:class="{disabled:disabled}">
		    <!--<el-select v-model="formdatas.form.libraryName" placeholder="选择库点" :disabled="disabled">
		        <el-option label="本库" value="本库"></el-option>
		        <el-option label="山西屯留国家粮食储备库" value="山西屯留国家粮食储备库"></el-option>
		        <el-option label="山西长治国家粮食储备库" value="山西长治国家粮食储备库"></el-option>
		        <el-option label="山西晋城国家粮食储备库" value="山西晋城国家粮食储备库"></el-option>
		        <el-option label="长子分库" value="长子分库"></el-option>
		        <el-option label="黎城分库" value="黎城分库"></el-option>
		        <el-option label="沁县分库" value="沁县分库"></el-option>		
		    </el-select>-->
		    <el-input v-model="formdatas.form.libraryName" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="品种：" prop="sort" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.sort" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="代表数量(吨)：" prop="amount"  v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.amount" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="收货年度："  v-bind:class="{disabled:disabled}" prop="gainTime">
		    <el-input v-model="formdatas.form.gainTime" :disabled="disabled"></el-input>
		    <!--<el-form-item>
		        <el-date-picker type="year" placeholder="选择年度" v-model="formdatas.form.gainTime" :disabled="disabled"></el-date-picker>
		    </el-form-item>-->
		</el-form-item>
		<el-form-item label="扦样日期：" prop="sampleTime"  v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.sampleTime" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="备注："  prop="remark" v-bind:class="{disabled:disabled}" >
		    <el-input v-model="formdatas.form.remark" :disabled="disabled"></el-input>
		</el-form-item>
		
		<div class="line">
		</div>
			<el-form-item label="存放状态：" prop="storageStatus"  v-bind:class="{disabled:disabled}">
			    <el-input v-model="samplestate" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="储存时间：" prop="sampleInTime" v-bind:class="{disabled:formdatas.readonly}">
		    	<el-form-item>
		        	<el-date-picker type="date" placeholder="选择年度" v-model="formdatas.form.storageTime" :disabled="formdatas.readonly"></el-date-picker>
		    	</el-form-item>
			</el-form-item>
			<el-form-item label="存放位置："  prop="storage" v-bind:class="{disabled:disabled}">
			    <el-input v-model="formdatas.form.storage" :disabled="disabled"></el-input>
			<!--<el-form-item label="存放位置：" class="position">-->
				<!--<el-select v-model="formdatas.form.depot" placeholder="选择样品室">
			        <el-option label="样品1室" value="样品1室"></el-option>
			        <el-option label="样品2室" value="样品2室"></el-option>
			        <el-option label="样品3室" value="样品3室"></el-option>       
			    </el-select>
			    <el-input v-model="formdatas.form.counter" placeholder="请填写几号柜"></el-input>
			    <div class="el-form-item__error" v-if="position_error">
		        	{{position_error_message}}
		        </div>-->
		        
			</el-form-item>
			<el-form-item label="样品签收：" prop="autograph" v-bind:class="{disabled:formdatas.readonly}">
			    <el-input v-model="formdatas.form.autograph" :disabled="formdatas.readonly"></el-input>
			</el-form-item>
        
        <div class="btns">
            <el-button v-if="!formdatas.readonly" class="yes" type="primary" @click="onSubmit('form')">{{formdatas.submitText?formdatas.submitText:'确定'}}</el-button>
            <el-button class="no" @click="cancel('form')">{{formdatas.readonly?'返回':'取消'}}</el-button>
        </div>
        
        <div class="clear"></div>
    </el-form>
</template>

<script>
import "@/assets/style/common/Form.css";
export default {
    props: ["formdatas"],
    created(){
    	// console.log(this.formdatas.form.sampleInSign)
    },
    mounted: function() {
//		console.log(this.formdatas)
    },
    computed:{
    	samplestate(){
    		if(this.formdatas.form.sampleState==-1){
    			return "未扦样";
    		}else if(this.formdatas.form.sampleState==1){
    			return "已扦样";
    		}else if(this.formdatas.form.sampleState==2){
    			return "已储存";
    		}else if(this.formdatas.form.sampleState==3){
//  			return "已分小样";
    			return "已储存";
    		}else if(this.formdatas.form.sampleState==4){
    			return "已处理";
    		}
    	},
    	code(){
//  		return  this.apiRoot +'/grain/upload/barcode/'+this.formdatas.form.samplePic;
    		return  this.apiRoot +'/grain/upload/barcode/'+this.formdatas.form.sampleNumPic;
    	},
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
//      dyear:new Date(2017),
        position_error:false,
        position_error_message:'',
        labelWidth:'2rem',
        errorinline:false,
        disabled:true,
            rules: {
                
                position:[
                    {validator:validateText,trigger:'blur'}
                ],
	            autograph: [
                    {validator:validateText,trigger:'blur'}
                ],
	            
                
            }
        }
    },
    methods: {  
        onSubmit(formname) {
        	if(!this.formdatas.form.depot){
        		this.position_error=true;
        		this.position_error_message="请选择样品室";
        		return
        	}
        	if(!this.formdatas.form.counter){
        		this.position_error=true;
        		this.position_error_message="请填写几号柜";
        		return
        	}
        	this.position_error=false;
            this.$refs[formname].validate((valid) => {
                if (valid) {
//                  alert('submit!');
                    this.$emit('submit')
//					window.history.go(-1)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(formname) {
            console.log('取消!');
        	this.position_error=false;
			this.$refs[formname].resetFields();
//          this.$emit('btn_close')
			window.history.go(-1)
        },
        
    }

}
</script>

