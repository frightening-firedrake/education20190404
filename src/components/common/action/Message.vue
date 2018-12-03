<template>
	<el-dialog  :visible.sync="messageVisible" custom-class="message" :width="dialogWidth" @close="messageClose">
	  	<span :class="message.icon"></span>
	  	<h3>{{message.messageTittle}}</h3>
	  	<p>{{message.messageText}}</p>
	  	<input style="height:0;opacity: 0;" ref="scanCode" v-if="messages.type=='scaning'" type="text" v-model="scanCode" @keyup.enter="getScanCode"  v-focus/>
		<div slot="footer" class="dialog-footer center">
		    <el-button @click="messageclick" :class="messages.type" v-if="messages.type!=='loading'&&messages.type!=='scaning'">{{message.buttonText?message.buttonText:'确 定'}}</el-button>
		    <!--<el-button class="no" @click="messageVisible = false">取 消</el-button>-->
	    </div>
	</el-dialog>
</template>

<script>
	
export default {
    components:{ },
    props: ['messages'],
    mounted:function(){
//  	console.log(this.messages[this.messages.type]);

    },
    directives: {
	  focus: {
	    // 指令的定义
	    inserted: function (el) {
	      el.focus()
	    }
	  }
	},
    computed:{
		message(){
			return this.messages[this.messages.type]
		}
	},
	created(){
//		this.$refs['scanCode'].
	},
    data() {
        return {
        	scanCode:'',
        	dialogWidth:'6.2rem',
        	messageVisible: true,		   
        }
    },
    methods:{
    	messageclick(){
    		this.messageVisible = false;
    		this.$emit('messageclick',this.messages.type)
			this.$emit('messageClose')
    	},
    	messageClose(){
    		this.$emit('messageClose')
    	},
    	getScanCode(){
    		this.$emit('getScanCode',this.scanCode)
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
.message .el-dialog__header{
	height: 0.6rem;
	line-height: 0.6rem;
	padding:0 0.33rem;
	/*background-color: rgba(88, 180, 129, 0.8);*/
	position:relative;	
}
/*.message .el-dialog__title{
	font-size:0.18rem;
	color:rgba(2255,255,255,1);
}*/
/*.message .el-dialog__title:before{
	position:absolute;
	content:'';
	width:0.04rem;
	height:0.2rem;
	background:rgba(255,255,255, 1);
	left:0.2rem;
	top:0.2rem;
}*/
/*.message .el-dialog__headerbtn{
	top:50%;
	margin-top:-0.1rem;
	right:0.3rem;
	width:0.2rem;
	height:0.2rem;
}*/
.message .el-dialog__headerbtn .el-dialog__close{
	color:#4c4c4c;
	font-size:0.35rem;
}
.message .el-dialog__body{
	padding:0 0.35rem 0 0.35rem;
	text-align:center;
}
.message .el-dialog__body span{
	font-size:1rem;
	line-height:1.3rem;
}
.message .el-dialog__body h3{
	font-size:0.24rem;
	color:#333333;
}
.message .el-dialog__body p{
	font-size:0.18rem;
	color:#999999;
	line-height:0.4rem;
}
.el-icon-success{
	color:#58b481;
}
.el-icon-error{
	color:#f26868;
}
.message .el-dialog__body span.el-icon-printer{
	width:1rem;
	height:1rem;
	line-height:1rem;
	background-color:#eea339;	
	margin:0.15rem 0;
	border-radius:50%;
	color:#ffffff;
	font-size:0.7rem;
}
.message .el-dialog__body span.icon-iconset0255{
	width:1rem;
	height:1rem;
	line-height:1.5rem;
	margin:0.15rem 0;
	border-radius:50%;
	color:rgba(2, 148, 65, 0.6);	
	background-color:#ffffff;
	font-size:1rem;
}
/*底部*/
.message .el-dialog__footer{
	padding:0.43rem 0;
}
.message .dialog-footer.center{
	text-align:center;
}
.message .dialog-footer button {
    font-size: 0.18rem;
    padding: 0rem;
    line-height: 0.5rem;
    border-radius: 0.1rem;
    width:1.3rem;
    height:0.5rem;
    text-align: center;
}

.message .dialog-footer button:active {
    color: #000;
    border-color: rgb(88,180,129);
    outline: 0;
}

.message .dialog-footer button:focus, .message .dialog-footer button:hover {
    color: #000;
    border-color: rgb(88,180,129);
    /*background-color: rgba(88,180,129,0.5);*/
}
.message .dialog-footer .el-button+.el-button{
	margin-left:0.57rem;
}
/*.message .dialog-footer button.yes {
	background-color: rgb(88,180,129);
	border-color:rgb(88,180,129);
}
.message .dialog-footer button.yes:hover {
	background-color: rgba(88,180,129,0.8);
	border-color:#58b481;
}
.message .dialog-footer button.no {
	color: #58b481;
	border-color:#58b481;
}
.message .dialog-footer button.no:hover {
	background:rgba(88,180,129,0.1);
}*/
.message .dialog-footer button.success {
	color: #58b481;
	border-color:#58b481;
}
.message .dialog-footer button.success:hover {
	background:rgba(88,180,129,0.1);
}
.message .dialog-footer button.error {
	color: #f26868;
	border-color:#f26868;
}
.message .dialog-footer button.error:hover {
	background:rgba(242, 104, 104,0.1);
}
.message .dialog-footer button.loading {
	color: #eea339;
	border-color:#eea339;
}
.message .dialog-footer button.loading:hover {
	background:rgba(88,180,129,0.1);
}
</style>