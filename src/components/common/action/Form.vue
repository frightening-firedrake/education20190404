<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling" :rules="rules" :model="formdatas.form" :label-width="labelWidth">
        <template>
            <p>{{formdatas.title}}</p>
        </template>      
        <el-form-item label="创建时间：" prop="ctime" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.ctime" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="状态：" prop="status" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.status" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="迁样编号：" prop="nid">
		    <el-input v-model="formdatas.form.nid"></el-input>
		</el-form-item>
		<el-form-item label="被查库点：" prop="checkregion">
		    <el-select v-model="formdatas.form.checkregion" placeholder="选择库点">
		        <el-option label="山西" value="1"></el-option>
		        <el-option label="河南" value="henan"></el-option>
		        <el-option label="山东" value="shandong"></el-option>
		        <el-option label="陕西" value="shanxi2"></el-option>
		        <el-option label="东北" value="dongbei"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="货位号：" prop="pnumber" >
		    <el-input v-model="formdatas.form.pnumber"></el-input>
		</el-form-item>
		<el-form-item label="品种：" prop="varieties" >
		    <el-input v-model="formdatas.form.varieties"></el-input>
		</el-form-item>
		<el-form-item label="性质：" prop="quality" >
		    <el-input v-model="formdatas.form.quality"></el-input>
		</el-form-item>
		<el-form-item label="代表数量(吨)：" prop="weight" >
		    <el-input v-model="formdatas.form.weight"></el-input>
		</el-form-item>
		<el-form-item label="产地：" prop="region" >
		    <el-select v-model="formdatas.form.region" placeholder="请选择产地">
		        <el-option label="山西" value="1"></el-option>
		        <el-option label="河南" value="henan"></el-option>
		        <el-option label="山东" value="shandong"></el-option>
		        <el-option label="陕西" value="shanxi2"></el-option>
		        <el-option label="东北" value="dongbei"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="收货年度：" >
		    <el-form-item prop="harvestdate">
		        <!--<el-date-picker type="year" :default-value="dyear" placeholder="选择年度" v-model="form.harvestdate"></el-date-picker>-->
		        <el-date-picker type="year" placeholder="选择年度" v-model="formdatas.form.harvestdate"></el-date-picker>
		    </el-form-item>
		</el-form-item>
		<el-form-item label="扦样日期：" prop="samplingdate" >
		    <el-input v-model="formdatas.form.samplingdate"></el-input>
		</el-form-item>
		<el-form-item label="备注：" prop="remarks" >
		    <el-input v-model="formdatas.form.remarks"></el-input>
		</el-form-item>

        
        <div class="btns">
            <el-button class="yes" type="primary" @click="onSubmit('form')">确认</el-button>
            <el-button class="no" @click="cancel('form')">取消</el-button>
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

