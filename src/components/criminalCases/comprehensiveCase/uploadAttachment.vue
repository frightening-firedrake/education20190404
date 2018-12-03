<template>
    <div class='listpagewrap uploadAttachment'>
      <!--面包屑-->
      <breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></breadcrumb>
  	  <!--标题-->
  	  <!--<option-title :title="subtitle" v-on:titleEvent="titleEvent"></option-title>-->		
      <!--提示-->
      <!--<prompt :alerts="alerts"></prompt>-->
	  	<div class="uploadbox">
	  	   	<p class="title">
	  	   		<i></i>
	  	   		请上传案件下一阶段重要文件
	  	   		<i></i>
	  	   	</p>
	  	   	<div class="icons">
	  	   		<div class="lv1" :style="{width:stateWidth}"></div>
	  	   		<div class="lv2"  style="background-image:url(static/images/sys/fujin1.png)"></div>
	  	   		<div class="lv3">
	  	   			<span :class="{ok:state1}" >已接案</span>
	  	   			<span :class="{ok:state2}">侦办中</span>
	  	   			<span :class="{ok:state3}">已结案</span>
	  	   		</div>
	  	   	</div>
	  	   	<el-upload
	  	   	  ref="upload"
			  class="upload-demo"
			  :headers="{'Authorization':Token}"
			  :auto-upload="false"
			  :before-upload="beforeUpload"
			  :on-success="onSuccess"
			  :on-error="onError"
			  drag
			  :data="uploaddata"
			  name="file"
			  :action="uploadURL"
			  :limit=1
			  >
<!--			  multiple-->
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">只能上传不超过500kb的文件，上传文件列表右侧出现对勾表示上传成功！！</div>
			</el-upload>
			<div class="btn-center-uplaod">
			    <el-button class="rbtn" :disabled="tfbtns.btnCenter.ldisabled"  @click="btnCenterNo">{{tfbtns.btnCenter.btnTextL?tfbtns.btnCenter.btnTextL:'不同意'}}</el-button>
			    <el-button  class="lbtn" :loading="tfbtns.loading" :disabled="tfbtns.btnCenter.rdisabled"  type="primary"  @click="btnCenterYes" >{{tfbtns.btnCenter.btnTextR?tfbtns.btnCenter.btnTextR:'同  意'}}</el-button>
		    </div>
	  	</div>

      <!--通知弹框-->
      <!--<message v-if="messageShow" :messages="messages" v-on:messageclick="messageclick" v-on:messageClose="messageClose"></message>-->
      <!--<upload-Modal v-if="modalVisible"  :modal="modal" :uploadPicURL="uploadPicURL" v-on:submitupload="submitupload" v-on:dialogClose="dialogClose"></upload-Modal>-->




    </div>
</template>

<style>
.listpagewrap.uploadAttachment{
	background-color: #f6f8fa;
	height:auto;
}
.uploadAttachment .btn-center-uplaod{
	text-align: center;
	/*padding:0.12rem 0;*/
	padding:0.4rem 0;
}
.uploadAttachment .btn-center-uplaod button {
    font-size: 0.18rem;
    padding: 0rem;
    line-height: 0.5rem;
    border-radius: 0.1rem;
    /*width:1.3rem;
    height:0.5rem;*/
   	padding:0 0.15rem;
    text-align: center;
}
.uploadAttachment .btn-center-uplaod .el-button+.el-button{
	margin-left:0.3rem;
}
.uploadAttachment .btn-center-uplaod button.lbtn {
	background-color: rgb(76,144,219);
	border-color:rgb(76,144,219);
}
.uploadAttachment .btn-center-uplaod button.lbtn.is-disabled,.btn-center-uplaod button.lbtn.is-disabled:hover  {
	background-color: #999999;
	border-color:#999999;
}
.uploadAttachment .btn-center-uplaod button.lbtn:hover {
	background-color: rgba(76,144,219,0.8);
	border-color:rgb(76,144,219);
}
.uploadAttachment .btn-center-uplaod button.rbtn {
	color: rgb(76,144,219);
	border-color:rgb(76,144,219);
}
.uploadAttachment .btn-center-uplaod button.rbtn:hover {
	background:rgba(76,144,219,0.1);
}
.uploadAttachment .btn-center-uplaod button.rbtn.is-disabled,.uploadAttachment .btn-center-uplaod button.rbtn.is-disabled:hover {
	color: #999999;
	border-color:#999999;
	background:#fff;
}
.uploadAttachment .btn-center-uplaod button.yes {
	color: #ffffff;
	background-color: rgb(76,144,219);
	border-color:rgb(76,144,219);
}
.uploadAttachment .btn-center-uplaod button.yes:hover {
	background-color: rgba(76,144,219,0.8);
	border-color:rgb(76,144,219);
}
.uploadAttachment .btn-center-uplaod button.no {
	background-color: rgba(255, 76, 120, 1);
	border-color:rgba(76,144,219, 1);
}
.uploadAttachment .btn-center-uplaod button.no:hover {
	background-color: rgba(255, 76, 120, 0.8);
	border-color:rgba(76,144,219, 1);
}
.uploadbox{
	width: 10.5rem;
	min-height: 6.9rem;
	/*height: 6.9rem;*/
	background-color: #ffffff;
	box-shadow: 0px 2px 9px 1px 
		rgba(0, 0, 0, 0.2), 
		inset 0px 1px 5px 0px 
		rgba(206, 206, 206, 0.75);
	/*border: solid 1px #4c90db;*/
	position:absolute;
	left:50%;
	top:1.2rem;
	margin-left:-5.25rem;
	/*margin-top:-3.5rem;*/
}
.uploadbox .title{
	padding-top:0.66rem;
	font-size:0.3rem;
	letter-spacing: 0.3em;
	color: #4c8fda;
	text-align: center;
	font-weight: 700;
}
.uploadbox .title i{
	display: inline-block;
	background-color:#4c8fda;
	width:0.15rem;
	height:0.1rem;
	margin:0 0.35rem;
	vertical-align: middle;
}
.uploadbox .icons{
	margin:0.1rem auto 0;
	width:8.5rem;
	height:2rem;
	position:relative;
	background-color:#999999;
}
.uploadbox .icons .lv1{
	top:0;
	bottom:0;
	left:0;
	width:2rem;
	background-color:#4c8fda;
	position:absolute;
	z-index: 1;
	transition: all 1s;
}
.uploadbox .icons .lv2{
	width:8.5rem;
	height:2rem;
	position:absolute;
	z-index: 2;
	/*background-image:url("/static/images/sys/fujin1.png");*/
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100%;
}
.uploadbox .icons .lv3{
	width:8.5rem;
	/*height:2rem;*/
	bottom:0.2rem;
	position:absolute;
	left:-0.05rem;
	z-index: 3;
	text-align: center;
}
.uploadbox .icons .lv3 span{
	color: #999999;
	font-size:0.2rem;
	margin:0 1.06rem;
}
.uploadbox .icons .lv3 span.ok{
	color: #4c90db;
}
.upload-demo{
	/*text-align: center;*/
	margin:0 auto;
	width:6rem;
}
.uploadbox .el-upload-dragger{
	width:6rem;
	height:2rem;
	margin:0 auto;
}
</style>

<script>

import Prompt from '@/components/common/prompt/Prompt.vue';
import Breadcrumb from '@/components/common/action/Breadcrumb.vue';

import OptionTitle from "@/components/common/action/OptionTitle"
import Message from "@/components/common/action/Message"




import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
//import data from '@/util/mock';



export default {
  components: {
    Prompt,Breadcrumb,OptionTitle,Message
  },
  computed:{
	...mapGetters(["Token","userId"]),
  },
  created(){
//	console.log(this.$route.query)
//  获取列表数据（第一页）

//	this.getdata()
//	this.getSafetyData()
	if(this.$route.query.state==1){
		this.state1=true;
	    this.state2=false;
	    this.state3=false;
		this.stateWidth='2rem';
		this.uploaddata.id=this.$route.query.id;
		this.uploaddata.state=2;
		this.uploaddata.assessorId=this.userId;
	}else if(this.$route.query.state==2){
		this.state1=true;
	    this.state2=true;
	    this.state3=false;
		this.stateWidth='4.7rem';
		this.uploaddata.id=this.$route.query.id;
		this.uploaddata.state=3;
		this.uploaddata.assessorId=this.userId;
	}
	this.laststate=this.$route.query.state;

  },
  destroy(){

  },
  methods: {
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),



//	获取搜索数据
  	searchingfor(searching){
  		console.log(searching);
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.searchURL,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//			data: {
//			   
//			}
	    }).then(function (response) {
//		  	this.tabledatas=response.data.rows;
	  		setTimeout(()=>{			  		
		  		this.loading=false;
		  	},1000)
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
	passProblem(id,form,images){
		if(!this.$_ault_alert('safety:edit')){
			return
		}
		var params=form;
			params.id=id;
			params.isDeal=1;
			params.approveImage=images.join(',');
			console.log(params)
		this.$http({
		    method: 'post',
			url: this.passURL,
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:params,
	    }).then(function (response) {
		  	console.log(response)
			  if(response.data.success) {
			  	this.getSafetyData()
//				this.formdatas.problems.forEach((value)=>{
//					if(value.id==id){
//						value.isDeal=1;
//					}
//				})
			  }
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},

  	//	填入新建数据
	createlibitem(form){
		console.log(form);
//		this.disagreeSubmit(form.reason)
	},

//	关闭新建弹框
	dialogClose(){
		this.modalVisible=false;
	},

	titleEvent(){
  		console.log('titleEvent');
  	},


//	新建安全报告
  	addsafety(){
    	this.$router.push({path: '/index/sampling/libraryList/samplingList/sampleShowList/safetyReportCreate',query:{id:this.$route.query.id,libraryName:this.$route.query.libraryName,position:this.$route.query.position}})
  	},
	btnCenterNo(){
		this.$router.go(-1)
		
	},
	btnCenterYes(){
		if(!this.$_ault_alert('information:toExamine')){
			return
		}
		this.$refs.upload.submit();
	},
	beforeUpload(file){
		console.log(file)
		this.tfbtns.loading=true;
	},
	onSuccess(response, file, fileList){
//		console.log(file.name+'上传成功')
//		console.log(response=="upload success")
		this.tfbtns.loading=false;
		if(this.$route.query.state==2){
			this.state1=true;
		    this.state2=true;
		    this.state3=true;
			this.stateWidth='8rem';
		}
		this.laststate=this.laststate-0+1
		
		setTimeout(() => {
			var path=this.$route.path.substr(0,this.$route.path.lastIndexOf('/'))
			var query={};
			query.id=this.$route.query.id;
			query.state=this.laststate;
			this.$router.push({path:path,query:query})          
        }, 1500);
	},
	onError(err, file, fileList){
		console.log(file.name+'上传失败')
		this.tfbtns.loading=false;
	},
  },

  data() {
    return {
      dataURL: this.apiRoot + '/grain/sample/get',
	  dataSafetyURL:  this.apiRoot + '/grain/safetyReport/data',
	  editURL:  this.apiRoot + '/grain/safetyReport/edit',
      searchURL:'/liquid/role2/data/search',
      passURL: this.apiRoot + '/grain/safetyReport/edit',
      uploadPicURL: this.apiRoot + '/grain/safetyReport/uploadPic',
      uploadURL:this.apiRoot + 'information/upload',
      uploaddata:{id:'',state:'',assessorId:''},
      laststate:'',
      problemStatus:'all',
      passProblemId:'',
      checkedId:[],
	  createlibVisible:false,
      breadcrumb:{
      	search:false,   
      	searching:'',
      },
      subtitle:{
      	btn:false,
      	btntext:'',
      },
	  tfbtns:{
	  	loading:false,
      	btnCenter:{
			btnTextL:'返回案件详情页',
			btnTextR:'提交,案件进入下一阶段',
		}, 	
      },
      state1:true,
      state2:false,
      state3:false,
	  stateWidth:'4rem',

    }
  }
}
</script>

