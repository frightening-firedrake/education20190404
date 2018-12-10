<template>
  <div class="listpagewrap">
    <!--面包屑-->
    <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
    <index-common :formdata="formData" :tabledata="tableDate" @addRow="addRow" @delrow="delrow"></index-common>
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
        tabletype:{
          type:'contact'
        },
        hearder: [
          {
            prop: "department",
            label: "部门"
          },
          {
            prop: "Telephone",
            label: "电话"
          },
          {
            prop: "Office",
            label: "办公地点"
          }
        ],
        body: [
          {
            department: "",
            Telephone: "",
            Office: ""
          }
        ]
      },
      formData: {
        title: "编辑内容",
        addrowTitle:"新增一行",
        model: {
          name: "",
          categort: "",
          source: ""
        },
        data: [
          {
            label: "机构名称:",
            labelWidth: "",
            prop: "name",
            span: 40,
            type: "",
            placeholder: "请填写机构名称"
          },
          {
            label: "机构类别:",
            labelWidth: "",
            class: "mini",
            prop: "category",
            type: "select",
            placeholder: "请填写机构类别",
            data: [
              {
                index: 1,
                label: "学院机构",
                value: "111"
              }
            ]
          },
          {
            label: "来源:",
            labelWidth: "",
            class: "mini",
            prop: "source",
            type: "",
            span: 20
          }
        ]
      }
    };
  },
  methods: {
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
      this.tableDate.body.splice(e, e);
    }
  }
};
</script>

<style>
</style>
