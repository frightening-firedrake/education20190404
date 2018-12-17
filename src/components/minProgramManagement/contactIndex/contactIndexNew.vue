<template>
  <div class="listpagewrap">
    <!--面包屑-->
    <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
    <index-common
      :formdata="formData"
      :tabledata="tableDate"
      @submit="submit"
      @addRow="addRow"
      @delrow="delrow"
    ></index-common>
  </div>
</template>

<script>
import IndexCommon from "@/components/common/action/contactIndexCommon";
import Breadcrumb from "@/components/common/action/Breadcrumb.vue";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: { IndexCommon, Breadcrumb },
  computed: {
    ...mapGetters(["userName", "stateList", "Token"])
  },
  data() {
    return {
      newUrl: this.apiRoot + "xiaoyuanhuangye/save",
      breadcrumb: {
        search: false,
        searching: ""
      },
      tableDate: {
        tabletype: {
          type: "contact"
        },
        hearder: [
          {
            prop: "positionName",
            label: "部门"
          },
          {
            prop: "phone",
            label: "电话"
          },
          {
            prop: "adress",
            label: "办公地点"
          }
        ],
        body: [
          {
            positionName: "",
            phone: "",
            adress: ""
          }
        ]
      },
      formData: {
        title: "新建内容",
        addrowTitle: "新增一行",
        model: {
          organizationName: "",
          type: "",
          articleSource: ""
        },
        data: [
          {
            label: "机构名称:",
            labelWidth: "",
            prop: "organizationName",
            span: 40,
            type: "",
            placeholder: "请填写机构名称"
          },
          {
            label: "机构类别:",
            labelWidth: "",
            class: "mini",
            prop: "type",
            type: "select",
            placeholder: "请填写机构类别",
            data: [
              {
                index: 1,
                label: "管理机构",
                value: 1
              },
              {
                index: 1,
                label: "学院机构",
                value: 2
              }
            ]
          },
          {
            label: "来源:",
            labelWidth: "",
            class: "mini",
            prop: "articleSource",
            type: "",
            span: 20
          }
        ]
      }
    };
  },
  methods: {
    submit(form) {
      let forms = form.model;
      let valuenum = 0,
        objlength = 0;
      for (var i in this.tableDate.body[this.tableDate.body.length - 1]) {
        objlength += 1;
        if (this.tableDate.body[this.tableDate.body.length - 1][i] == "") {
          this.$notify({
            title: "警告",
            message: "请填写内容",
            type: "warning"
          });
          return;
        } else {
          valuenum += 1;
        }
      }
      //作者
      this.$http({
        method: "post",
        url: this.newUrl,
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
        //         organizationName：机构名称，type:机构类别(1管理机构，2学院机构),articleSource:来源，author:作者
        // params:[{positionName:部门名称,phone:电话,address:地址},{positionName:部门名称,phone:电话,address:地址}]
        data: {
          organizationName: forms.organizationName,
          type: forms.type,
          articleSource: forms.articleSource,
          author: this.userName,
          params: JSON.stringify(this.tableDate.body)
        }
      })
        .then(
          function(response) {
            if (response.data.success) {
              this.$router.go(-1);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    addRow() {
      let valuenum = 0,
        objlength = 0;
      let params = {
        positionName: "",
        phone: "",
        adress: ""
      };
      for (var i in this.tableDate.body[this.tableDate.body.length - 1]) {
        objlength += 1;
        if (this.tableDate.body[this.tableDate.body.length - 1][i] == "") {
          this.$notify({
            title: "警告",
            message: "请填写内容",
            type: "warning"
          });
          return;
        } else {
          valuenum += 1;
        }
      }
      if (objlength == valuenum) {
        this.tableDate.body.push(params);
      }
    },
    delrow(e) {
      this.tableDate.body.splice(e, 1);
    }
  }
};
</script>

<style>
</style>
