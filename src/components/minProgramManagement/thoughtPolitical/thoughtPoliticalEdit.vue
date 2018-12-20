<template>
  <div class="listpagewrap">
    <!--面包屑-->
    <breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></breadcrumb>
    <!--标题-->
    <!--<option-title :title="subtitle" v-on:titleEvent="titleEvent"></option-title>-->
    <!--提示-->
    <!--<prompt :alerts="alerts"></prompt>-->
    <!--表单-->
    <article-ueditor :formdatas="formdatas" @submit="submit"></article-ueditor>
  </div>
</template>

<style>
</style>

<script>
import Prompt from "@/components/common/prompt/Prompt.vue";
import Breadcrumb from "@/components/common/action/Breadcrumb.vue";
import ArticleUeditor from "@/components/common/action/ArticleUeditor";
import OptionTitle from "@/components/common/action/OptionTitle";

import "@/assets/style/common/list.css";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
//本地测试要用下面import代码
//import data from '@/util/mock';

export default {
  components: {
    Prompt,
    Breadcrumb,
    OptionTitle,
    ArticleUeditor
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
    ...mapGetters(["userName", "Token"])
  },
  created() {
    //	console.log(this.$route.query)
    //  获取列表数据（第一页）

    //	this.getfeedbackInformation()
    this.getDetails();
  },
  destroy() {},
  methods: {
    ...mapMutations([
      "create_modal_id",
      "is_mask",
      "create_modal",
      "close_modal"
    ]),
    ...mapActions(["addAction"]),

    //	获取数据
    getDetails() {
      var params = {};
      //   params.id = this.$route.query.id;

      // 获取列表数据（第？页）
      this.$http({
        method: "post",
        url: this.DetailsURL,
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
          id: this.$route.query.id
        }
      })
        .then(
          function(response) {
            console.log(response);
            let res = response.data;
            let form = {
              title: res.title,
              summarize: res.summarize,
              articleSource: res.articleSource,
              content: res.content
            };
            this.formdatas.form = form;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },

    //	获取搜索数据
    searchingfor(searching) {},
    articleEdit(data) {
      this.$http({
        method: "post",
        url: this.articleEditURL,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
        data: data
      })
        .then(
          function(response) {
            if (response.data.success) {
              this.$notify({
                title: "操作成功",
                message: "文章修改成功！！！",
                type: "success"
              });
              this.$router.go(-1);
              //				this.$router.push({path: '/index/evilCriminalCases/comprehensiveCriminalCaseList/criminalCasesView',query:{id:id,state:row.state}})

              //		        this.getDetails()
            } else {
              this.$notify.error({
                title: "操作失败",
                message: "文章修改失败！！！"
              });
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    titleEvent() {
      console.log("titleEvent");
    },
    //获取文档内容
    submit(form) {
      this.formdatas.loading = true;
      form.author=this.userName;
      form.id=this.$route.query.id;
      console.log(form);
      this.articleEdit(form)
    }
  },

  data() {
    return {
      DetailsURL: this.apiRoot + "sizhengjianshe/getById",
      articleEditURL: this.apiRoot + "sizhengjianshe/edit",
      editURL: this.apiRoot + "/grain/safetyReport/edit",
      searchURL: "/liquid/role2/data/search",
      createlibVisible: false,
      breadcrumb: {
        search: false,
        searching: ""
      },
      subtitle: {
        btn: false,
        btntext: ""
      },
      //    弹窗数据
      alerts: [
        {
          title: "温馨提示：此页面灰色字为不可编辑状态!",
          type: "info"
        }
      ],
      formdatas: {

      	title:'编辑内容',
      	form:{
	        title:'我是标题',
	        summarize:'我是再要',
	        articleSource:'我是来院',
	        content:'我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
      	},
      	loading:false,

	  },     
    }

  }
};
</script>

