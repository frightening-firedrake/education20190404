<template>
  <div class="listpagewrap">
    <!--面包屑-->
    <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
    <index-common :formdata="formData" :tabledata="tableDate" @submit="submit" @addRow="addRow" @delrow="delrow"></index-common>
  </div>
</template>

<script>
import IndexCommon from "@/components/common/action/contactIndexCommon";
import Breadcrumb from "@/components/common/action/Breadcrumb.vue";
export default {
  components: { IndexCommon, Breadcrumb },
  data() {
    return {
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
            prop: "positonName",
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
            positonName: "",
            phone: "",
            adress: ""
          }
        ]
      },
      formData: {
        title: "新建内容",
        addrowTitle: "新增一行",
        model: {
          name: "",
          categort: "",
          source: ""
        },
        data: [
          {
            label: "机构名称:",
            labelWidth: "",
            prop: "sectionName",
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
    submit(form){
      console.log(form)
    },
    addRow() {
      let valuenum = 0,
        objlength = 0;
      let params = {
        department: "",
        Telephone: "",
        Office: ""
      };
      for (var i in this.tableDate.body[this.tableDate.body.length - 1]) {
        objlength += 1;
        if (this.tableDate.body[this.tableDate.body.length - 1][i] == "") {
          alert(11);
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
