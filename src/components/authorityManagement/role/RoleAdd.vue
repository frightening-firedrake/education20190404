<template>
    <div class='listpagewrap'>
      <!--面包屑-->
      <sinograin-breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></sinograin-breadcrumb>
  	  <!--标题-->
  	  <sinograin-option-title :title="subtitle" v-on:titleEvent="titleEvent"></sinograin-option-title>		
      <!--提示-->
      <!--<sinograin-prompt :alerts="alerts"></sinograin-prompt>-->
      <!--表单-->
      <auth-form :btnloading="btnloading" :formdatas="formdatas" @submit='submit'></auth-form> 
    </div>
</template>

<style>
	
</style>

<script>

import SinograinPrompt from '@/components/common/prompt/Prompt.vue';
import SinograinBreadcrumb from '@/components/common/action/Breadcrumb.vue';
import AuthForm  from "@/components/common/action/AuthForm"
import SinograinOptionTitle from "@/components/common/action/OptionTitle"


import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
import data from '@/util/mock';



export default {
  components: {
    SinograinPrompt,SinograinBreadcrumb,SinograinOptionTitle,AuthForm
  },
  computed:{
	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
	...mapGetters(["modal_id"]),
  },
  created(){
//	console.log(this.$route.query)
	this.getRole();
//  获取列表数据（第一页）
//	this.getdata()
  },
  destroy(){

  },
  methods: {
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),
//	获取列表数据方法
	getRole(){
  		this.loading=false;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.getRoleURL,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
		
			}
	    }).then(function (response) {
		  	response.data.rows.forEach((item)=>{
				var obj={label:item.displayName,value:item.id}
	  		this.formdatas.labels[1].items.push(obj)
	  		this.formdatas.labels[2].items.push(obj)
			})
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
  	submit(data){
		if(!this.$_ault_alert('role:save')){
			return
		}
  		this.btnloading=true;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.saveURL,
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
				displayName:data.displayName,
				roleExtendPId:data.roleExtendPId,
				roleRelyId:data.roleRelyId,
				roleMaxNum:data.maxNumber,
				remarks:data.remarks,

			}
	    }).then(function (response) {
  			this.btnloading=false;
			this.$router.go(-1)
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
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
	titleEvent(){
  		console.log('titleEvent');
  	},
  
  },
  data() {
    return {
      getRoleURL:this.apiRoot +'role/data',
      saveURL:this.apiRoot +'role/save',
      searchURL:'/liquid/role2/data/search',
      deleteURL:'/liquid/role2/data/delete',
      btnloading:false,
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
//    弹窗数据
      alerts: [{
        title: '温馨提示：此页面灰色字为不可编辑状态!',
        type: 'info'
      }],
      formdatas: {
      	title:'新建角色',
      	form:{
          displayName: '',
          roleExtendPId: '',
          roleRelyId: '',
          maxNumber: '1',
          remarks: '',
//        action:['查看','增加'],
//        resourceType:'2',
      	},
      	labels:[
      		{label:'角色名称：',type:"input",},
      		{label:'父级角色：',type:"select",
      			items:[
	      			{label:'无',value:'-1'},
	      		],
      		},
      		{label:'依赖角色：',type:"select",
      			items:[
	      			{label:'无',value:'-1'},
	      		],
      		},
      		{label:'最大用户限制数：',type:"num",},
      		{label:'备注：',type:"input",class:'full'},
//    		{label:'相关操作：',type:"checkbox",class:'full',
//	      		items:[
//	      			{label:'查看'},
//	      			{label:'增加'},
//	      			{label:'更改'},
//	      		],
//    		},
//    		{label:'资源类型：',type:"select",
//    			items:[
//	      			{label:'菜单1',value:'1'},
//	      			{label:'菜单2',value:'2'},
//	      			{label:'菜单3',value:'3'},
//	      		],
//    		},
      	],
	  }
    }
  }
}
</script>

