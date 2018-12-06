<template>
    <div class='listpagewrap'>
      <!--面包屑-->
      <breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></breadcrumb>
  	  <!--标题-->
  	  <!--<option-title :title="subtitle" v-on:titleEvent="titleEvent"></option-title>-->		
      <!--提示-->
      <!--<prompt :alerts="alerts"></prompt>-->
      <!--表单-->
      <case-details  :formdatas="formdatas" :reportFilter="reportFilter"></case-details> 
      <!--通知弹框-->
      <!--<message v-if="messageShow" :messages="messages" v-on:messageclick="messageclick" v-on:messageClose="messageClose"></message>-->
      <!--<upload-Modal v-if="modalVisible"  :modal="modal" :uploadPicURL="uploadPicURL" v-on:submitupload="submitupload" v-on:dialogClose="dialogClose"></upload-Modal>-->
      <!--反馈信息-->
      <modal v-if="modalVisible" :modal="modal" v-on:createlibitem="createlibitem" @modelSelectChange="modelSelectChange" v-on:dialogClose="dialogClose"></modal>      	
      <!--底部按钮们-->
      <tfoot-buttons :tfbtns="tfbtns" @tfootEvent="tfootEvent" ></tfoot-buttons>
    </div>
</template>

<style>
	
</style>

<script>

import Prompt from '@/components/common/prompt/Prompt.vue';
import Breadcrumb from '@/components/common/action/Breadcrumb.vue';
import CaseDetails  from "@/components/common/action/CaseDetails"
import OptionTitle from "@/components/common/action/OptionTitle"
import Message from "@/components/common/action/Message"
import UploadModal from "@/components/common/action/UploadModal"
import TfootButtons from '@/components/common/action/TfootButtons.vue';
import Modal from '@/components/common/action/Modal.vue';

import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
//import data from '@/util/mock';



export default {
  components: {
    Prompt,Breadcrumb,OptionTitle,CaseDetails,Message,UploadModal,TfootButtons,Modal
  },
  computed:{
	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
	...mapGetters(["userName","Token"]),
//	问题筛选
	reportFilter(){
//		if(this.problemStatus=="all"){
			return this.formdatas.reports
//		}else{			
//			return this.formdatas.problems.filter((item)=>{
//				return item.isDeal==this.problemStatus;
//			})
//		}
	}
  },
  created(){
//	console.log(this.$route.query)
//  获取列表数据（第一页）

	this.getfeedbackInformation()
	this.getDetails()
	if(this.$route.query.state==-1){
		this.tfbtns={
	  		loading:false,
	    	btnCenter:{
				btnTextL:'通过审核',
				btnTextR:'未通过审核',
				doubleColor:true,
			},     	
	    };
	}else if(this.$route.query.state==1){
		this.tfbtns={
	  		loading:false,
			btnOne:{
				btnText:'案件进度进入下一步',
			},     	
	    };
	}else if(this.$route.query.state==2){
		this.tfbtns={
	  		loading:false,
			btnOne:{
				btnText:'案件进度进入下一步',
			},     	
	    };
	}else if(this.$route.query.state==3){
		this.tfbtns={
	  		loading:false,
     	
	    };
	}else if(this.$route.query.state==4){
		this.tfbtns={
	  		loading:false,
     	
	    };
	}
	

  },
  destroy(){

  },
  methods: {
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),


 //	获取数据
  	getDetails(){
		  var params = {}
		  params.sampleId = this.$route.query.id
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.DetailsURL,
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
				id:this.$route.query.id
//				params:JSON.stringify(params)
			}
	    }).then(function (response) {
//	    console.log(response.data)
	    	this.formdatas.form.threadArea=response.data.information.threadArea//线报地域
	    	this.formdatas.form.clueAddress=response.data.information.clueAddress//线报详址
	    	this.formdatas.form.industryField=response.data.information.industryField//行业领域
	    	this.formdatas.form.informType=response.data.information.informType//举报类别
	    	this.formdatas.form.informerName=response.data.informer?response.data.informer.informerName?response.data.informer.informerName:'匿名':'匿名'//举报人姓名
	    	this.formdatas.form.phoneNumber=response.data.informer?response.data.informer.phoneNumber?response.data.informer.phoneNumber:'匿名':'匿名'//手机号码
	    	this.formdatas.form.otherContactWay=response.data.informer?response.data.informer.otherContactWay?response.data.informer.otherContactWay:'匿名':'匿名'//其他联系方式
	    	this.formdatas.form.createTime=response.data.information.createTime//举报时间
//	    	report images url videos src
	    	this.formdatas.reports[0].report=response.data.information.informContent//举报文字内容
	    	
	    	if(response.data.information.picture){
	    		var pictures=response.data.information.picture.split(',')//举报图片内容
	    		this.formdatas.reports[0].images=pictures.map((value)=>{
		    		var obj={};
		    		obj.url=this.apiRoot+'upload/barcode/'+value;
		    		return obj
		    	})
	    	}else{
		    	this.formdatas.reports[0].images=[];
	    	}
	    	if(response.data.information.video){
		    	var videos=response.data.information.video.split(',')//举报视频内容
		    	this.formdatas.reports[0].videos=videos.map((value)=>{
		    		var obj={};
		    		obj.src=this.apiRoot+'upload/video/'+value;
		    		return obj
		    	})
	    	}else{
	    		this.formdatas.reports[0].videos=[];
	    	}
	    	
	    	this.formdatas.state[0].assessor=response.data.information?response.data.information.validAssessor?response.data.information.validAssessor:'匿名':'匿名'
	    	this.formdatas.state[1].assessor=response.data.information?response.data.information.investigationAssessor?response.data.information.investigationAssessor:'匿名':'匿名'
	    	this.formdatas.state[1].url=this.$route.query.id
	    	this.formdatas.state[2].assessor=response.data.information?response.data.information.endAssessor?response.data.information.endAssessor:'匿名':'匿名'
	    	this.formdatas.state[2].url=this.$route.query.id


//		  	console.log(response)
			

		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
//	获取反馈信息
    getfeedbackInformation(){

    	 	
	 	this.$http({
	 	    method: 'post',
	 		url: this.feedbackInformationURL,
	 		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	 		transformRequest: [function (data) {
			// Do whatever you want to transform the data
			let ret = ''
			for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
			}],
	 		data: {
//	 			id:this.$route.query
	 		}
	    }).then(function (response) {
	     	response.data.rows.forEach((value)=>{
	     		var obj={};
	     		obj.label=value.type;
	     		obj.id=value.id;
	     		obj.value=value.feedbackInformation;
	     		if(value.state==1){
	     			this.feedbackInformationYes.push(obj)
	     		}
	     		if(value.state==-1){
		     		this.feedbackInformationNo.push(obj)     		
	     		}
	     	})
	     	if(!this.feedbackInformationYes.length){
	     		this.feedbackInformationYes=[{label:'默认',id:"999999",value:'您的本次举报我们已经加入备案，案件侦破期间请保持电话通畅，感谢您的配合！'}]
	     	}
	     	if(!this.feedbackInformationNo.length){
	     		this.feedbackInformationNo=[{label:'默认',id:"999999",value:'您的本次举报不属于扫黑除恶案件，感谢您的举报。'}]
	     	}

	     
//	 	  	this.formdatas.form=response.data.formdatas;
	 	}.bind(this)).catch(function (error) {
	 	    console.log(error);
	 	}.bind(this));
    },
//	获取搜索数据
  	searchingfor(searching){
  		
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
  	//	弹框中的下拉框变化
	modelSelectChange(val,model){
		console.log(val,model)
	},
  	//	填入新建数据
	createlibitem(form){
		var submitdata={};
		submitdata.id=this.$route.query.id
		submitdata.feedbackInformation=form.reason
		submitdata.state=this.isPass
		submitdata.assessorId=this.userId
		this.tfbtns.loading=true;
		this.toExamine(submitdata)
	},
	toExamine(data){
		this.$http({
	 	    method: 'post',
	 		url: this.toExamineURL,
	 		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	 		transformRequest: [function (data) {
			// Do whatever you want to transform the data
			let ret = ''
			for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
			}],
	 		data: data
	    }).then(function (response) {
	     	if(response.data.success){
	     		this.$notify({
		          	title: '操作成功',
		          	message: '案件审批成功！！！',
		          	type: 'success'
		        });
		        this.$router.go(-1)
//				this.$router.push({path: '/index/evilCriminalCases/comprehensiveCriminalCaseList/criminalCasesView',query:{id:id,state:row.state}})
		        
//		        this.getDetails()
	     	}else{
	     		this.$notify.error({
		          	title: '操作失败',
		          	message: '案件审批失败！！！',
		        });
	     	}
	 	}.bind(this)).catch(function (error) {
	 	    console.log(error);
	 	}.bind(this));
	},
//	messageclick(type){
//		if(type=="confirm"){
//
//			var id=this.passProblemId;
//			this.passProblem(id)
//			console.log(id)
//	  		
//		}else if(type=="error"){
////			console.log(type)  			
//		}
//	},
//	messageClose(){
//		this.messageShow=false;
//	},
//	关闭新建弹框
	dialogClose(){
		this.modalVisible=false;
	},
  	submitupload(form,images){
//		var id=this.passProblemId;
//		this.passProblem(id,form,images)
  	},

	titleEvent(){
  		console.log('titleEvent');
  	},

  	//	表单底部触发事件btnCenterNo btnCenterYes btnLeft btnRight btnOne
	tfootEvent(date){
		if(!this.$_ault_alert('information:toExamine')){
			return
		}
		console.log(date);
		if(date=='btnCenterL'){
			this.isPass=1;
			var modal={
			  	title:'通过审核',
			  	customClass:'blue',
				formdatas:[
					{
			  			label:"审核员:",
			  			model:"autograph",
						value: "admin",
//			  			disabled:true,
			  			type:'input',
			  		},
			  		{
			  			label:"自动反馈信息",
			  			type:'textarea',
			  			rows:3,
			  			model:"reason",
			  			value:this.feedbackInformationYes[0].value,
//			  			textareaall:true,
			  		},
		  		],
		  		submitText:'确定',
		  	}
	  		this.modal=modal
			this.modalVisible=true;
//			this.disagree()
//			this.$router.go(-1)
		}else if(date=='btnCenterR'){
			this.isPass=4;
			var modal={
			  	title:'未通过审核',
			  	customClass:'blue',
				formdatas:[
					{
			  			label:"审核员:",
			  			model:"autograph",
						value: "admin",
//			  			disabled:true,
			  			type:'input',
			  		},
			  		{
			  			label:"未通过原因:",
			  			Default:true,
			  			type:'select',
			  			model:"reasontype",
			  			defaultz:this.feedbackInformationNo[0].label,
			  			selectitems:this.feedbackInformationNo,
//						selectitems:[
//							{label:'非扫黑',value:'您的本次举报不属于扫黑除恶案件，感谢您的举报。',id:'1'},
//							{label:'请直接报警',value:'您的本次举报不属于扫黑除恶案件，请打110。',id:'2'},
//							{label:'闹着玩',value:'您的本次举报不属于扫黑除恶案件，请勿占用专线资源。',id:'3'},
//							{label:'查话费',value:'查询话费，请打电话1008611。',id:'4'},
//						],
			  		},
			  		{
			  			label:"自动反馈信息",
			  			type:'textarea',
			  			rows:3,
			  			model:"reason",
			  			value:this.feedbackInformationNo[0].value,
//			  			textareaall:true,
			  		},
		  		],
		  		submitText:'确定',
		  	}
	  		this.modal=modal
			this.modalVisible=true;
	  		
//			this.agree()
//			this.$router.go(-1)
//			window.history.go(-1)
		}else if(date=='btnLeft'){

		}else if(date=='btnRight'){
//			this.exportExcel(this.$route.query.pId)
		}else if(date=='btnOne'){
			var path=this.$route.path+'/uploadAttachment';
			var id=this.$route.query.id;
			var state=this.$route.query.state;

    		this.$router.push({path: path,query:{id:id,state:state}})
		}
	},
  },

  data() {
    return {
      feedbackInformationURL: this.apiRoot + 'feedbackInformation/data',
	  DetailsURL:  this.apiRoot + 'information/get',
	  toExamineURL:  this.apiRoot + 'information/toExamine',
	  editURL:  this.apiRoot + '/grain/safetyReport/edit',
      searchURL:'/liquid/role2/data/search',
      passURL: this.apiRoot + '/grain/safetyReport/edit',
      uploadPicURL: this.apiRoot + '/grain/safetyReport/uploadPic',
      problemStatus:'all',
      passProblemId:'',
      checkedId:[],
      isPass:1,
      feedbackInformationNo:[],
      feedbackInformationYes:[],
	  createlibVisible:false,
      breadcrumb:{
      	search:false,   
      	searching:'',
      },
      subtitle:{
      	btn:false,
      	btntext:'',
      },
//    弹窗数据
      alerts: [{
        title: '温馨提示：此页面灰色字为不可编辑状态!',
        type: 'info'
      }],
//    通知弹窗
// 	  messageShow:false,
//	  messages:{
//	  	type:'confirm',
//	  	confirm:{
//	  		icon:'el-icon-success',
//	  		messageTittle:'确认此问题已解决?',
//	  		messageText:'此操作不可逆，请慎重操作',
//	  		buttonText:'确认',
//	  	},
//	  },
	  modalVisible:false,
	  modal:{
	  	title:'填写原因',
		formdatas:[
			{
	  			label:"审核员:",
	  			model:"autograph",
				value: "admin",
//	  			disabled:true,
	  			type:'input',
	  		},
	  		{
	  			label:"未通过原因:",
	  			Default:true,
	  			type:'select',
	  			model:"reasontype",
	  			defaultz:'101',
				selectitems:[

				],
	  		},
	  		{
	  			label:"自动反馈信息",
	  			type:'textarea',
	  			rows:3,
	  			model:"reason",
	  			value:'789',
//	  			textareaall:true,
	  		},
	  	],
	  	submitText:'确定',
	  },
//	   提交通过信息
//	  modalVisible:false,
//	  modal:{
//	  	title:'该问题已整改证明',
//		formdatas:[
//	  		{
//	  			label:"审批通过人:",
//	  			model:"approver",
//				value: "",
//	  			type:'input',
//	  		},
//	  	],
//	  	adduploadprop:true,
//	  	submitText:'入库',
//	  },
      formdatas: {
      	title:'案件详情',
      	statusItems:[
      		{label:'all',text:'全部'},
      		{label:-1,text:'待解决'},
      		{label:1,text:'已解决'},
      	],
      	form:{
	        threadArea:'',//线报地域
	        clueAddress:'',//线报详址
	        industryField:'',//行业领域
	        informType:'',//举报类别
	
	        informerName:'',    //举报人姓名
	        phoneNumber:'',      //手机号码
	        otherContactWay:'',  //其他联系方式
			createTime:'',//举报时间
      	},
      	// 		state:'',//案件进度
      	state:[
      		{assessor:'审核员',url:''},
      		{assessor:'审核员',url:''},
      		{assessor:'审核员',url:''},
      	],
      	reports:[
      		{
      			report: '',//问题
      			images: [
//    				{url:'static/images/test/tu1.jpg'},
      			],//图片
      			videos: [
//    				{src:'static/video/video1.mp4'},
      			],//视频
      		},
      	],
	  },
	  tfbtns:{
	  	loading:false,
//    	btnCenter:{
//			btnTextL:'通过审核',
//			btnTextR:'未通过审核',
//			doubleColor:true,
//		},
//		btnLeft:{
//			btnText:'导出Excel表格',
//		},
//		btnRight:{
//			btnText:'导出Excel表格',
//		},
		btnOne:{
			btnText:'案件进度进入下一步',
		},     	
      },
    }
  }
}
</script>

