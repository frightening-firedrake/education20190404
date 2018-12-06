<template>
    <div class="login" style="background-image:url(static/images/login/bj1.jpg)">
        <div class="login_box">
        	<span class="sjx"></span>
        	<img class="loginbj2" src="static/images/login/bj2.png" alt="" />
        	<span class="auth">山西硬汉网络科技科技有限公司 版权所有</span>
            <el-form ref="form"  class="login_form" :model="loginForm">
            	<h1 class="title">登录账户</h1>
            	<p v-if="loginError" class="loginError"><span class="el-icon-warning"></span>{{errorMessage}}</p>
            	<p v-else class="loginError"></p>
                <el-form-item label="">
                	<el-input @focus="focusUser=true" @blur="focusUser=false" placeholder="请输入您的账号" v-model="loginForm.name">
					    <template slot="prepend">
					    	<div class="prependimg" :class="{focus:focusUser}" style="background-image:url(static/images/login/user.png)"></div>
					    </template>
					</el-input>
                </el-form-item>
                <el-form-item label="" >
                	<el-input @focus="focusPass=true" @blur="focusPass=false"  type='password' placeholder="请输入您的密码" v-model="loginForm.password">
					    <template  slot="prepend">
					    	<div class="prependimg" :class="{focus:focusPass}" style="background-image:url(static/images/login/pass.png)"></div>
					    </template>
					</el-input>
                </el-form-item>
                <div class="el-form-item">
	                <el-form-item label="" class="code" @click="addBorder()">
	                	<el-input  @focus="focusYzm=true" @blur="checkcode" placeholder="请输入验证码" v-model="loginForm.number">
						    <template  slot="prepend">
						    	<div class="prependimg" :class="{focus:focusYzm}" style="background-image:url(static/images/login/yzm.png)"></div>
						    </template>
						</el-input>
	                </el-form-item>
	                <!--好看的验证码-->
	                <div id="code_canvas" class="code_img" @click="change()"></div>
	                <!--难看的验证码-->
	                <!--<img class="code_img" :src="captcha" @click="change()" alt="验证码加载中...">-->                	
                </div>
                <el-button class="login_submit" @click="submitForm()">登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
import "@/assets/style/common/login.css";
import "static/code/code.js";
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
	computed:{
		...mapState([]),
		...mapGetters(["libraryId","libraryName"]),
  	},
    created() {
        this.change()
    },
    methods: {
    	...mapMutations(['setUserInfo']),
  		...mapActions([]),
        change() {
        	this.$http({
			    method: 'post',
//				url:  "http://m.ityyedu.com/grain/" + 'captcha?d='+new Date().getTime(),
				url:  this.apiRoot + 'captcha?d='+new Date().getTime(),
//				withCredentials: true,
//     			crossDomain: true,
				transformRequest: [function (data) {
					// Do whatever you want to transform the data
					let ret = ''
					for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
				headers: {'Content-Type': 'application/x-www-form-urlencoded','crossDomain': true},
				data: {
	                
				}
	       }).then(function (response) {
//	        	console.log(response)
//	        	console.log(response.data.capText)
	           	this.captcha = 'data:image/jpg;base64,'+response.data.img;
//	           	this.captcha = response.data;
//          	this.captcha = this.apiRoot + '/grain/captcha?d='+new Date().getTime()
	           	this.captchaId = response.data.captcha; 
//	           	下面是一个好看的验证码但是鉴于某人眼瞎有时需要关掉
	           	var container=document.querySelector('#code_canvas')
	           	container.innerHTML="";
	           	var option={};
				option.id="code_canvas"
				option.zlcode=response.data.captcha
				var verifyCode = new GVerify(option);
	        }.bind(this)).catch(function (error) {
	            console.log(error);
	        }.bind(this));
//          this.captcha = this.apiRoot + '/grain/captcha?d='+new Date().getTime()
        },
        submitForm() {
//      	if(this.test){
//             	this.$router.push({ path: '/index'});
//      		return
//      	}
        	if(!this.checkcode()){
        		return
        	}
            this.$http({
		    method: 'post',
			url: this.apiRoot +  'login',
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {'Content-Type': 'application/x-www-form-urlencoded','crossDomain': true},
			withCredentials: true,
       		crossDomain: true,
			data: {
			    userName:this.loginForm.name,
                userPass:this.loginForm.password,
                verityCode:this.loginForm.number,
                captcha:this.captchaId,
			}
	        }).then(function (response) {
               	if(response.data.success == true) {
               		var payload={};
               		payload.libraryId=response.data.user.libraryId;
               		payload.libraryName=response.data.user.libraryName;
               		payload.userName=response.data.user.userName;
               		payload.userId=response.data.user.id;
               		payload.userAuth=response.data.user.resourceName;
               		payload.Token=response.data.user.token;
               		payload.permissions=response.data.user.permissions;
               		payload.roleName=response.data.user.roleName;
//             		payload.Token='akjshjakjclacahdawhdlahwdiua';
//             		payload.userRole=response.data.user.userRole;
//             		payload.userAuth='InformationManagement,AuthorityManagement';//grainDepot
               		this.setUserInfo(payload)
                   	this.$router.push({ path: '/index'});
               	}else if(response.data.success == false){
                    this.loginError=true;
            		this.errorMessage=response.data.code+'!';    
            		this.loginForm.name='',
                	this.loginForm.password='',
                	this.loginForm.number='',
        			this.change();           		
               	}
            }.bind(this)).catch(function (error) {
                console.log(error);
            }.bind(this));
        },
        addborder(e){
            alert(1)
            console.log(e)
        },
//      失去焦点时是否需要验证码的验证
        checkcode(){
        	this.focusYzm=false;
			if(this.captchaId==this.loginForm.number){
                this.loginError=false;			
				return true;
			}else{
                this.loginError=true;
				this.errorMessage="您输入的验证码信息不正确，请重新输入！";
				return false;
			}
       	},
    },
    data() {
        return {
        	test:true,
        	focusUser:false,
        	focusPass:false,
        	focusYzm:false,
        	loginError:false,
            captcha:'',
            captchaId:'',
            loginForm: {
                name:"",
                password:"",
                number:"",
            },
            errorMessage:"",
        }
    }
}
</script>