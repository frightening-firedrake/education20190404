<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling" :rules="rules" :model="formdatas.form" :label-width="labelWidth">
        <template>
            <p>{{formdatas.title}}</p>
        </template>      
        <el-form-item label="创建时间：" prop="createTime" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.createTime" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="样品条形码：" class="code" prop="code" v-bind:class="{disabled:disabled}">
			<!--<span class="codeinfo">{{formdatas.form.sampleWord}}</span>-->
			<img class="codeimg" :src="code" alt="" />
		</el-form-item>
		<el-form-item label="扦样编号：" prop="sampleNo" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.sampleWord" disabled></el-input>
		</el-form-item>
		<el-form-item label="货位号：" prop="position" >
		    <el-input v-model="formdatas.form.position" disabled></el-input>
		</el-form-item>
		<el-form-item label="性质：" prop="quality" >
		    <el-input v-model="formdatas.form.quality" disabled></el-input>
		</el-form-item>
		<el-form-item label="状态：" prop="sampleState" v-bind:class="{disabled:disabled}">
		    <el-input v-model="samplestate" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="产地：" prop="originPlace" >
		    <el-select v-model="formdatas.form.originPlace" placeholder="请选择产地" disabled>
		        <el-option label="山西" value="1"></el-option>
		        <el-option label="河南" value="henan"></el-option>
		        <el-option label="山东" value="shandong"></el-option>
		        <el-option label="陕西" value="shanxi2"></el-option>
		        <el-option label="东北" value="dongbei"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="被查库点：" prop="libraryName">
		    <el-select v-model="formdatas.form.libraryName" placeholder="选择库点" disabled>
		        <el-option label="本库" value="本库"></el-option>
			        <el-option label="山西屯留国家粮食储备库" value="山西屯留国家粮食储备库"></el-option>
			        <el-option label="山西长治国家粮食储备库" value="山西长治国家粮食储备库"></el-option>
			        <el-option label="山西晋城国家粮食储备库" value="山西晋城国家粮食储备库"></el-option>
			        <el-option label="长子分库" value="长子分库"></el-option>
			        <el-option label="黎城分库" value="黎城分库"></el-option>
			        <el-option label="沁县分库" value="沁县分库"></el-option>		
		    </el-select>
		</el-form-item>
		<el-form-item label="品种：" prop="sort">
		    <el-input v-model="formdatas.form.sort" disabled></el-input>
		</el-form-item>
		<el-form-item label="代表数量(吨)：" prop="amount" >
		    <el-input v-model="formdatas.form.amount" disabled></el-input>
		</el-form-item>
		<el-form-item label="收货年度：" >
		    <el-form-item prop="gainTime">
		        <!--<el-date-picker type="year" :default-value="dyear" placeholder="选择年度" v-model="form.harvestdate"></el-date-picker>-->
		        <el-date-picker type="year" placeholder="选择年度" v-model="formdatas.form.gainTime"  disabled></el-date-picker>
		    </el-form-item>
		</el-form-item>
		<el-form-item label="扦样日期：" prop="sampleTime" >
		    <el-input v-model="formdatas.form.sampleTime" disabled></el-input>
		</el-form-item>
		<el-form-item label="备注：" class="full" prop="remark" >
		    <el-input v-model="formdatas.form.remark" disabled></el-input>
		</el-form-item>

        
        <div class="btns">
            <!--<el-button class="yes" type="primary" @click="onSubmit('form')">确认</el-button>-->
            <el-button class="no" @click="cancel('form')">返回</el-button>
        </div>
        
        <div class="clear"></div>
    </el-form>
</template>

<script>
import "@/assets/style/common/Form.css";
export default {
    props: ["formdatas"],
    created(){
    	
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
    		return  this.apiRoot +'/grain/upload/barcode/'+this.formdatas.form.samplePic;
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
        
        labelWidth:'2rem',
        errorinline:false,
        disabled:true,
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
            this.$refs[formname].validate((valid) => {
                if (valid) {
                    alert('submit!');
//                  this.$emit('btn_close')
					window.history.go(-1)
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
        
    }

}
</script>

