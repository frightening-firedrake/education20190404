<template>
	<div class='listpagewrap'>
		<!--面包屑-->
		<sinograin-breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></sinograin-breadcrumb>
		<!--标题-->
		<sinograin-option-title :title="subtitle" v-on:titleEvent="titleEvent"></sinograin-option-title>
		<!--提示-->
		<!--<sinograin-prompt :alerts="alerts"></sinograin-prompt>-->
		<!--表单-->
		<auth-form-edit :formdatas="formdatas" @submit='submit'></auth-form-edit>
	</div>
</template>

<style>

</style>

<script>

import SinograinPrompt from '@/components/common/prompt/Prompt.vue';
import SinograinBreadcrumb from '@/components/common/action/Breadcrumb.vue';
import AuthFormEdit from "@/components/common/action/AuthFormEdit"
import SinograinOptionTitle from "@/components/common/action/OptionTitle"


import "@/assets/style/common/list.css"
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
//本地测试要用下面import代码
//import data from '@/util/mock';



export default {
	components: {
		SinograinPrompt, SinograinBreadcrumb, SinograinOptionTitle, AuthFormEdit
	},
	computed: {
		...mapState(["modal_id_number", "viewdata", "editdata", "aultdata", "messions", "mask"]),
		...mapGetters(["modal_id"]),
	},
	created() {
		//	console.log(this.$route.query)
		//  获取列表数据（第一页）
		this.getdata()
		this.getdata()

	},
	destroy() {

	},
	methods: {
		...mapMutations(['create_modal_id', 'is_mask', 'create_modal', 'close_modal']),
		...mapActions(['addAction']),
		//	获取列表数据方法
		getdata(page) {
			this.loading = true;
			// 获取列表数据（第？页）
			this.$http({
				method: 'post',
				url: this.datalistURL+"/"+this.$route.query.id,
				transformRequest: [function(data) {
					// Do whatever you want to transform the data
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				// data: {
				// 	id: this.$route.query.id
				// }
			}).then(function(response) {
				// console.log(response)
				// userName: "李佳",
				// 	userPass: '',
				// 	phone: "15940324325",
				// 	email: "23474@qq.com",
				var { userName,userPass,phone,email } = response.data
				this.formdatas.form.userName = userName
				this.formdatas.form.userPass = ""
				this.formdatas.form.phone = phone
				this.formdatas.form.email = email
//				console.log(this.formdatas.form)
//				setTimeout(() => {
					this.loading = false;
//				}, 1000)
			}.bind(this)).catch(function(error) {
				console.log(error);
			}.bind(this));
		},
		//	获取搜索数据
		searchingfor(searching) {
			console.log(searching);
			// 获取列表数据（第？页）
			this.$http({
				method: 'post',
				url: this.searchURL,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				//			data: {
				//			   
				//			}
			}).then(function(response) {
				//		  	this.tabledatas=response.data.rows;
				setTimeout(() => {
					this.loading = false;
				}, 1000)
			}.bind(this)).catch(function(error) {
				console.log(error);
			}.bind(this));
		},
		titleEvent() {
			console.log('titleEvent');
		},
		submit(data) {
			if(!this.$_ault_alert('user:edit')){
				return
			}
//			console.log(data)
			this.$http({
				method: 'post',
				url: this.saveURL,
				transformRequest: [function(data) {
					// Do whatever you want to transform the data
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: {
					id:this.$route.query.id,
					userName: data.userName,
					email: data.email,
					phone: data.phone,
					userPass: data.userPass
				}
			}).then(function(response) {
				this.$router.go(-1)
			}.bind(this)).catch(function(error) {
				console.log(error);
			}.bind(this));
		}
	},
	data() {
		return {
			saveURL: this.apiRoot + 'user/edit',
			datalistURL: this.apiRoot + 'user/get',
			searchURL: '/liquid/role2/data/search',
			deleteURL: '/liquid/role2/data/delete',
			checkedId: [],
			createlibVisible: false,
			breadcrumb: {
				search: false,
				searching: '',
			},
			subtitle: {
				btn: false,
				btntext: '',
			},
			//    弹窗数据
			alerts: [{
				title: '温馨提示：此页面灰色字为不可编辑状态!',
				type: 'info'
			}],
			formdatas: {
				title: '编辑用户',
				form: {
					userName: "",
					userPass: '',
					phone: "",
					email: "",
					//        action:['查看','增加'],
					//        resourceType:'2',
				},
				labels: [
					{ label: '用户名称：', type: "input", class:'disabled',disabled:true,},
					{ label: '用户密码：', type: "input", },
					{ label: '电话号码：', type: "input", },
					{ label: '邮箱号码：', type: "input", },
					//    		{label:'分配角色：',type:"num",},
					//    		{label:'备注：',type:"input",class:'full'},
					//    		{label:'相关操作：',type:"checkbox",class:'full',
					//	      		items:[
					//	      			{label:'查看'},
					//	      			{label:'增加'},
					//	      			{label:'更改'},
					//	      		],
					//    		},
				],
			}

		}
	}

}
</script>

