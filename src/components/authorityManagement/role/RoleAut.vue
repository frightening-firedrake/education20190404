<template>
    <div class='listpagewrap'>
      <!--面包屑-->
      <sinograin-breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></sinograin-breadcrumb>
  	  <!--标题-->
  	  <sinograin-option-title :title="subtitle" v-on:titleEvent="titleEvent"></sinograin-option-title>		
      <!--提示-->
      <!--<sinograin-prompt :alerts="alerts"></sinograin-prompt>-->
      <!--表单-->
      <ault-tree :formdatas="formdatas" :tree="tree" @submit='submit'></ault-tree> 

      
    </div>
</template>

<style>
	
</style>

<script>

import SinograinPrompt from '@/components/common/prompt/Prompt.vue';
import SinograinBreadcrumb from '@/components/common/action/Breadcrumb.vue';
import AultTree from "@/components/common/action/AultTree"
import SinograinOptionTitle from "@/components/common/action/OptionTitle"


import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
import data from '@/util/mock';



export default {
  components: {
    SinograinPrompt,SinograinBreadcrumb,SinograinOptionTitle,AultTree
  },
  computed:{
	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
	...mapGetters(["modal_id"]),
  },
  created(){
//	console.log(this.$route.query)
//  获取列表数据（第一页）
	this.getdata()
	this.formdatas.form.roleName=this.$route.query.name;
  },
  destroy(){

  },
  methods: {
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),
//	获取列表数据方法
  	getdata(){
  		this.loading=true;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.datalistURL,
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
				roleId:this.$route.query.id
			}
	    }).then(function (response) {
			this.tree.data=response.data
		  	

		  		this.loading=false;

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
  	submit(data,tree){
		if(!this.$_ault_alert('role:auth')){
			return
		}
//		处理ids数据
  		var operationIds=[];
		tree.forEach((item)=>{
			if(item.type==1){
				operationIds.push(item.id)
			}
		})
		operationIds=operationIds.join(',')
		this.$http({
		    method: 'post',
			url: this.authURL,
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
				roleId:this.$route.query.id,
				operationIds:operationIds,
			}
	    }).then(function (response) {
			this.$router.go(-1)
			
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
//		console.log(operationIds)
//		console.log(data,tree);
  	}
  },
  data() {
    return {
//    datalistURL:this.apiRoot +'/grain/resource/get/resourceAndOperation',
      datalistURL:this.apiRoot +'resource/listAll',
      authURL:this.apiRoot +'role/auth',
      searchURL:'/liquid/role2/data/search',
      deleteURL:'/liquid/role2/data/delete',
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
      	title:'角色授权',
      	form:{
          roleName: '',
      	},
      	labels:[
      		{label:'角色名称：',type:"input",class:'full'},
      	],
 	  },     	

    tree:{
   		label:'角色授权：',
      	defaultCheckedKeys:[],//默认选中的key id
//		checkStrictly:true,//分割了上下父子选中关系
        data: [],
        defaultProps: {
            children: 'children',
            label: 'name',
//			disabled:function(data, node){
//				 console.log(data)
//			},
        }
    }, 

      	
      	
      	

    }
  }
}
</script>

