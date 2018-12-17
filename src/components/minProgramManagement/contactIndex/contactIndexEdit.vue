<template>
  <div class="listpagewrap">
    <!--面包屑-->
    <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
    <index-common
      :formdata="formData"
      :tabledata="tableDate"
      @addRow="addRow"
      @delrow="delrow"
      @submit="submit"
    ></index-common>
  </div>
</template>

<script>
import IndexCommon from "@/components/common/action/contactIndexCommon";
import Breadcrumb from "@/components/common/action/Breadcrumb.vue";
export default {
  components: { IndexCommon, Breadcrumb },
  data() {
    return {
      dataUrl: this.apiRoot + "xiaoyuanhuangye/findAll",
      editUrl: this.apiRoot + "xiaoyuanhuangye/edit",
      delUrl: this.apiRoot + "xiaoyuanhuangye/delete",
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
        body: []
      },
      formData: {
        title: "编辑内容",
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
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.$http({
        method: "post",
        url: this.dataUrl,
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
          organizationId: this.$route.query.id
        }
      })
        .then(
          function(response) {
            let res = response.data;
            console.log(res);
            if (res) {
              this.formData.model.organizationName = res.organizationName;
              this.formData.model.type = res.type;
              this.formData.model.articleSource = res.articleSource;
              res.xiaoyuanhuangyeDepartment.forEach((v, i) => {
                let modal = {
                  positionName: "",
                  phone: "",
                  adress: "",
                  id: ""
                };
                modal.positionName = v.positionName;
                modal.phone = v.phone;
                modal.adress = v.adress;
                modal.id = v.id;
                this.tableDate.body.push(modal);
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
        url: this.editUrl,
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
          id: this.$route.query.id,
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
    delrow(e, row) {
      this.$http({
        method: "post",
        url: this.delUrl,
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
          id: row.id
        }
      })
        .then(
          function(response) {
            if (response.data.success) {
              this.tableDate.body.splice(e, 1);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    }
  }
};
</script>

<style>
</style>
