<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling" :model="formdatas" :label-width="labelWidth">
        <template>
            <p>{{formdatas.title}}</p>
        </template>      
        <template v-for="(value,key,index) in formdatas.form">
            <template v-if="formdatas.labels[index]['type']=='input'">
		        <el-form-item :label="formdatas.labels[index]['label']" :prop="'form.'+key" v-bind:class="formdatas.labels[index]['class']"     			
		        	:rules="rules[key]"
    			>
				    <el-input v-model="formdatas.form[key]" placeholder="请输入" :disabled="formdatas.labels[index]['disabled']"></el-input>
				</el-form-item>
            </template>
            <template v-if="formdatas.labels[index]['type']=='num'">
		        <el-form-item :label="formdatas.labels[index]['label']" :prop="'form.'+key" v-bind:class="formdatas.labels[index]['class']">
					<el-input-number v-model="formdatas.form[key]" :min="1" :max="10"></el-input-number>
				</el-form-item>
            </template>
            <template v-if="formdatas.labels[index]['type']=='checkbox'">
		        <el-form-item :label="formdatas.labels[index]['label']" :prop="'form.'+key" v-bind:class="formdatas.labels[index]['class']">
					<el-checkbox-group v-model="formdatas.form[key]">
				      	<el-checkbox
					      v-for="item in formdatas.labels[index]['items']"
					      :key="item.value"
					      :label="item.label">
					    </el-checkbox>
				    </el-checkbox-group>
				</el-form-item>
            </template>
            <template v-if="formdatas.labels[index]['type']=='select'">
		        <el-form-item :label="formdatas.labels[index]['label']" :prop="'form.'+key" v-bind:class="formdatas.labels[index]['class']"
		        	:rules="[{ required: true, message: '请完善选择内容', trigger: 'change' }
    			]">
					<el-select v-model="formdatas.form[key]"  placeholder="请选择">
				        <el-option
					      v-for="item in formdatas.labels[index]['items']"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				    </el-select>
				</el-form-item>
            </template>
        </template> 
        
        <template v-for="(value,index) in formdatas.actions">
        	<div class="actionsWrap">
        		<div class='actionsTitle'>
        			操
        			<br />
        			作
        		</div>
			    <el-form-item label="相关操作："  :class="formdatas.actions.length-1>index?'disabled':''" :prop="'actions['+index+']'+'.operation'" class="full" :rules="[
      				{ required: true, message: '请输入操作名称', trigger: 'blur' },
    			]">
					<el-input v-model="value.operation" placeholder="请输入" :disabled="formdatas.actions.length-1>index"></el-input>
				</el-form-item>
				<el-form-item label="权限许可：" :class="formdatas.actions.length-1>index?'disabled':''" :prop="'actions['+index+']'+'.permission'"  class="full" :rules="[
      				{ required: true, message: '权限许可名称', trigger: 'blur' },
    			]">
					<el-input v-model="value.permission" placeholder="请输入" :disabled="formdatas.actions.length-1>index"></el-input>
				</el-form-item>
				<el-form-item label="依赖操作：" :class="formdatas.actions.length-1>index?'disabled':''" :prop="'actions['+index+']'+'.relyName'"  class="full" :rules="[
      				{ required: true, message: '选择依赖操作', trigger: 'change' },
    			]">
					<el-select v-model="value.relyName" placeholder="请选择" :disabled="formdatas.actions.length-1>index">
				        <el-option
					      v-for="item in formdatas.operationRIds"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				    </el-select>
				</el-form-item>
        	</div>
        </template>

        
        <div class="btns">
        	<div class="tableAddWrap" v-if="formdatas.actions">        		
	        	<div class="tableAdd"  @click="actionAdd">
					<p style="background-image:url('static/images/sys/create.png');">					
						新增一组操作
					</p>
				</div>
				<div class="tableDel"  @click="actionDel" v-if="formdatas.actions.length>0">
					<p style="background-image:url('static/images/sys/icons2.png');">					
						删除最后一组操作
					</p>
				</div>
        	</div>
			
            <el-button class="yes" type="primary" @click="onSubmit('form')">确认</el-button>
            <el-button class="no" @click="cancel('form')">取消</el-button>
        </div>
        
        <div class="clear"></div>
    </el-form>
</template>
<style>

</style>
<script>
import "@/assets/style/common/Form.css";
export default {
    props: ["formdatas"],
    created(){
//  	console.log(this.$route.query.id,'编辑')
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
                var str = /^1[3|4|5|7|8][0-9]\d{4,8}$/
                if(!value){
                    return callback(new Error("手机号码不能为空"))
                }else if(!str.test(value)){
                    return callback(new Error("请填写正确的手机号码"))
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
//          重名验证后台比对
			var displayName = ( rule, value, callback ) => {
				if(!value){
					return
				}
				this.$http({
				    method: 'post',
					url: this.apiRoot +'role/findBydisplayName',
					transformRequest: [function (data) {
						// Do whatever you want to transform the data
						let ret = ''
						for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: {
						displayName:value,
						id:this.$route.query.id,
					}
			    }).then(function (response) {
					if(response.data.success){					
						return callback()
					}else{
						return callback(new Error("该角色名称已存在"))					
					}
				}.bind(this)).catch(function (error) {
				    console.log(error);
				}.bind(this));

            }
//          重名验证后台比对
			var userName = ( rule, value, callback ) => {
				this.$http({
				    method: 'post',
					url: this.apiRoot +'user/findByuserName',
					transformRequest: [function (data) {
						// Do whatever you want to transform the data
						let ret = ''
						for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: {
						userName:value,
						id:this.$route.query.id,
					}
			    }).then(function (response) {
					if(response.data.success){					
						return callback()
					}else{
						return callback(new Error("该用户名称已存在"))					
					}
				}.bind(this)).catch(function (error) {
				    console.log(error);
				}.bind(this));

            }
//          重名验证后台比对
			var resourceName = ( rule, value, callback ) => {
				this.$http({
				    method: 'post',
					url: this.apiRoot +'resource/findByresourceName',
					transformRequest: [function (data) {
						// Do whatever you want to transform the data
						let ret = ''
						for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: {
						resourceName:value,
						id:this.$route.query.id,
					}
			    }).then(function (response) {
					if(response.data.success){					
						return callback()
					}else{
						return callback(new Error("该资源名称已存在"))					
					}
				}.bind(this)).catch(function (error) {
				    console.log(error);
				}.bind(this));

            }
        return {
        labelWidth:'2rem',
        errorinline:false,
        disabled:true,
        
            rules: {
                phone:[
                	{ required: true, message: '请完善输入内容', trigger: 'blur' },
                    {validator:validatePhone,trigger:'blur'}
                ],
                email:[
                	{ required: true, message: '请完善输入内容', trigger: 'blur' },
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
                ],
//              displayName:[
//              	{ required: true, message: '请完善输入内容', trigger: 'blur' },
//                  {validator:displayName,trigger:'blur'}
//              ],
//              userName:[
//              	{ required: true, message: '请完善输入内容', trigger: 'blur' },
//                  {validator:userName,trigger:'blur'}
//              ],
//	            resourceName: [
//              	{ required: true, message: '请完善输入内容', trigger: 'blur' },
//                  {validator:resourceName,trigger:'blur'}
//              ], 
				remarks:[
                	{ required: true, message: '请完善输入内容', trigger: 'blur' },
                ],
                userPass:[
                	{ required: true, message: '请完善输入内容', trigger: 'blur' },
                ],

            }
        }
    },
    methods: {  
        onSubmit(formname) {

            this.$refs[formname].validate((valid) => {
                if (valid) {
                	var formobj={};
                	for(var key in this.formdatas.form){
//              		console.log(this.formdatas.form[key])
                		formobj[key]=this.formdatas.form[key]
                	}
                	if(this.formdatas.actions){                		
						formobj.actions=this.formdatas.actions
                	}
                	this.$emit('submit',formobj)            		

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
        actionAdd(){
        	this.$emit('actionAdd');
        },
        actionDel(){
        	this.$emit('actionDel');
        },
    }

}
</script>

