<template>
  <div class="listpagewrap">
    <!--面包屑-->
    <breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></breadcrumb>
    <!--alert-->
    <!--<prompt :alerts="alerts"></prompt>-->
    <!--表格上的时间选框以及 创建-->
    <list-header :listHeader="listHeader" @search="search" @addbtn="addbtn"></list-header>
    <!--表格-->
    <list
      class="list nopointer"
      :tabledata="tabledatas"
      :items="items"
      :actions="actions"
      v-on:getchecked="getchecked"
      :loading="loading"
      v-on:emptyCreate="emptyCreate"
    ></list>
    <!--分页-->
    <pagination
      :page="page"
      v-on:paginationEvent="paginationEvent"
      v-on:getCurrentPage="getCurrentPage"
    ></pagination>
  </div>
</template>

<script>
import List from "@/components/common/action/List.vue";
import Prompt from "@/components/common/prompt/Prompt.vue";
import Breadcrumb from "@/components/common/action/Breadcrumb.vue";
import Pagination from "@/components/common/action/Pagination.vue";
//import ListHeaderMore from '@/components/common/action/ListHeaderMore.vue';
import ListHeader from "@/components/common/action/ListHeader.vue";
import Modal from "@/components/common/action/Modal.vue";
import Message from "@/components/common/action/Message";
import "@/assets/style/common/list.css";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

//这里是打印控件
//import {getLodop} from 'static/lodop/LodopFuncs'
//let LODOP
//本地测试要用下面import代码
//import data from '@/util/mock';

export default {
  components: {
    List,
    Prompt,
    Pagination,
    Breadcrumb,
    Modal,
    ListHeader,
    Message
  },
  computed: {
    ...mapState([
      "modal_id_number",
      "viewdata",
      "editdata",
      "aultdata",
      "messions",
      "mask"
    ]),
    ...mapGetters(["userName", "stateList", "Token"])
  },
  created() {
    //	console.log(this.$route.query)
    //  获取列表数据（第一页）
    this.getlistdata(1);
    //	移除监听事件
    this.$root.eventHub.$off("delelistitem");
    this.$root.eventHub.$off("viewlistitem");
    this.$root.eventHub.$off("editlistitem");

    //	监听列表删除事件
    this.$root.eventHub.$on(
      "delelistitem",
      function(rowid, list) {
      	if(!this.$_ault_alert('sizhengjianshe:delete')){
      			return
      	}
        this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.sendDeleteId(rowid);
//          this.tabledatas = this.tabledatas.filter(function(item) {
//            return item.id !== rowid;
//          });

            
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });

        //  	this.sendDeleteId(rowid);
        //  	console.log(rowid,list);
      }.bind(this)
    );
    //	监听列表点击查看事件
    this.$root.eventHub.$on(
      "viewlistitem",
      function(id, row) {
        //		if(!this.$_ault_alert('information:get')){
        //			return
        //		}
        //		this.$router.push({path: '/index/minProgramManagement/thoughtPoliticalList/thoughtPoliticalAdd',query:{id:id,state:row.state}})
      }.bind(this)
    );
    //	监听列表点击编辑事件
    this.$root.eventHub.$on(
      "editlistitem",
      function(id, row) {
    			if(!this.$_ault_alert('sizhengjianshe:edit')){
      			return
      		}
        //		console.log(id)
        this.$router.push({
          path:
            "/index/minProgramManagement/thoughtPoliticalList/thoughtPoliticalEdit",
          query: { id: id, model: "edit" }
        });
      }.bind(this)
    );
    //	监听列表点击打印事件
  },
  methods: {
    //	列表头触发的事件
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),
//	列表头触发的事件

	addbtn(){
		if(!this.$_ault_alert('sizhengjianshe:save')){
  			return
  	}
//		console.log('addbtn')
		this.$router.push({path: '/index/minProgramManagement/thoughtPoliticalList/thoughtPoliticalAdd'})
	},
	//	搜索电话号码
	search(data){
//		console.log(data)
		this.searchText=data
		this.getlistdata(1)
	},  
	emptyCreate(){
//		this.scanCode();
	},
//	获取搜索数据
  searchingfor(searching,page){
  		page?page:1;
  		this.searchText=searching.indexOf('监')==0?searching.slice(1):searching;
//		console.log(this.searchText);
  		var params = {};
			params.sampleWordOrsampleNumLike = this.searchText;
			params.ruKuSampleState = 2
			params.fenxiaoyangSampleState = 3
			params.rank = 'sampleNum'
	//		console.log(this.breadcrumb.searching);
	  		// 获取列表数据（第？页）
			this.$http({
			    method: 'post',
				url: this.searchURL,
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
					page:page,
				    rows:this.page.size,
				   	params:JSON.stringify(params)
				}
		    }).then(function (response) {
				this.tabledatas=response.data.rows;
		  		this.page.total=response.data.total;
		  		this.page.currentPage=page;
			}.bind(this)).catch(function (error) {
			    console.log(error);
			}.bind(this));
  	},
  
//	获取列表数据方法
  	getlistdata(page){
		var params = {};
		if(this.searchText){
			params.titleLike =this.searchText
		}
      this.loading = false;
      // 获取列表数据（第？页）
      this.$http({
        method: "post",
        url: this.datalistURL,
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          page: page,
          rows: this.page.size,
          params: JSON.stringify(params)
        }
      })
        .then(
          function(response) {
            //			console.log(response)
            this.tabledatas = response.data.rows;
            this.page.total = response.data.total;
            this.page.currentPage = page;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    //	发送删除id
    sendDeleteId(id) {
      this.$http({
        method: "post",
        url: this.deleteURL,
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          id: id
        }
      }).then(function(response) {
      	if(response.data.success){
	      	this.getlistdata(this.page.currentPage)
	      	this.$message({
	          type: "success",
	          message: "删除成功!"
	        });
      	}else{
      		this.$message({
	          type: "error",
	          message: "删除失败!"
	        });
      	}
		}.bind(this))
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    //	获取分页点击事件中及当前页码
    getCurrentPage(currentPage) {
      this.getlistdata(currentPage);
    },
    //	映射分页触发的事件
    paginationEvent(actiontype) {},
    //	获取多选框选中数据的id(这是一个数组)
    getchecked(checkedId) {
      this.checkedId = checkedId;
    },
    titleEvent() {
      console.log("titleEvent");
    },
    getDateNow() {
      var date1 = new Date();
      return (
        date1.getFullYear() +
        "-" +
        (date1.getMonth() + 1) +
        "-" +
        date1.getDate()
      );
    }
  },
  data() {
    return {
      datalistURL: this.apiRoot + "sizhengjianshe/data",
      //    datalistURL: this.apiRoot+'information/data',
      searchURL: this.apiRoot + "/grain/sample/data",
      deleteURL: this.apiRoot + "sizhengjianshe/delete",

      searchText: "",

      checkedId: [],
      breadcrumb: {
        search: false,
        searching: ""
      },
      subtitle: {
        btn: false,
        btntext: ""
      },
      loading: false,
      //    分页数据
      page: {
        size: 10,
        total: 1,
        currentPage: 1,
        show: true,
        tfootbtns: {
          btns: false, //是否添加按钮组
          leading_out: false, //导出按钮
          refresh: false, //刷新按钮
          delete: false //删除按钮
        }
      },
      //    弹窗数据
      alerts: [
        {
          title: "温馨提示：储存前请准备好条码打印机，以便于更换检验编号!",
          type: "info"
        }
      ],
      //    表格数据
      listHeader: {
        search: true,
        placeholder: "请输入标题名称",
        addbtn: "新建内容"
      },

      tabledatas: [],
      items: [
        {
          id: 1,
          prop: "title",
          label: "标题"
          //      status:true,
          //      sort:true
        },
        {
          id: 2,
          prop: "hits",
          label: "阅读次数",
          //      sort:true
          width: "100"
        },
        {
          id: 3,
          prop: "articleSource",
          label: "来源",
          //  width:80,
          //      sort:true,
          width: "120"
        },
        {
          id: 4,
          prop: "createTime",
          label: "发布日期",
          //      minWidth:130,
          width: "120"
          //      status:true,
          //      sort:true,
        }
      ],
      actions: {
        selection: false,
        number: true,
        //    	view1:true,
        edit: true,
        show: true,
        dele: true,
        manuscript: false,
        safetyReport: false,
        printSampleIn: false,
        actionWidth: 150
        //    	sort:'sampleNum',
      }
    };
  }
};
</script>

