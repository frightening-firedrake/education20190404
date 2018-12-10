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
        tabletype: {
          type: "topic",
          distinction: "single"
        },
        problem: [
          {
            label: "问题:",
            prop: "problem",
            placeholder: "请填写问题"
          }
        ],
        hearder: [
          {
            prop: "option",
            label: "选项",
            width: "80"
          },
          {
            prop: "Answer",
            label: "答案及测试结果"
          },
          {
            prop: "danger",
            label: "危险测评",
            width: "124"
          }
        ],
        body: [
          {
            module: {
              Answer: "",
              result: "",
              evaluate: ""
            },
            Answer: [
              {
                text: "",
                placeholder: "请输入答案",
                height: "0.3rem",
                prop: "Answer"
              },
              {
                text: "",
                placeholder: "请输入测试结果",
                height: "0.8rem",
                prop: "result"
              }
            ],
            danger: [
              {
                text: "优秀",
                prop: "evaluate",
                textcolor: "#20a235",
                class: "fine"
              },
              {
                text: "良好",
                prop: "evaluate",
                textcolor: "#2871df",
                class: "good"
              },
              {
                text: "危险",
                textcolor: "#df2828",
                class: "danger",
                prop: "evaluate"
              }
            ]
          }
        ]
      },
      formData: {
        title: "编辑单题测试",
        addrowTitle: "增加选项",
        model: {
          name: "",
          categort: "",
          source: "",
          xingshi: "单题测试",
          laiyuan: "",
          zhaiyao: "",
          photo: "",
          problem: "",
          danger: ""
        },
        data: [
          {
            label: "标题名称:",
            labelWidth: "",
            prop: "name",
            span: 40,
            type: "",
            placeholder: "请填写标题名称"
          },
          {
            label: "测试题形式:",
            labelWidth: "",
            class: "mini",
            prop: "xingshi",
            type: "text",
            disabled: true
            // data: [
            //   {
            //     index: 1,
            //     label: "学院机构",
            //     value: "111"
            //   }
            // ]
          },
          {
            label: "测试类别:",
            labelWidth: "",
            class: "mini",
            prop: "category",
            type: "select",
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
            prop: "laiyuan",
            class: "mini",
            span: 20,
            type: "",
            placeholder: "请填写来源"
          },
          {
            label: "摘要:",
            labelWidth: "",
            prop: "zhaiyao",
            type: "",
            placeholder: "请填写摘要你"
          },
          {
            label: "封面照片:",
            labelWidth: "",
            prop: "photo",
            type: "photo",
            height: "1.1rem"
          }
        ]
      }
    };
  },
  methods: {
    addRow() {
      if (this.tableDate.body.length == 7) {
        this.$notify({
          title: "警告",
          message: "已到最大选择项",
          type: "warning"
        });
      } else {
        let valuenum = 0,
          objlength = 0;

        let params = {
          module: {
            Answer: "",
            result: "",
            evaluate: ""
          },
          Answer: [
            {
              text: "",
              placeholder: "请输入答案",
              height: "0.3rem",
              prop: "Answer"
            },
            {
              text: "",
              placeholder: "请输入测试结果",
              height: "0.8rem",
              prop: "result"
            }
          ],
          danger: [
            {
              text: "优秀",
              textcolor: "#20a235",
              class: "fine",
              prop: "evaluate"
            },
            {
              text: "良好",
              textcolor: "#2871df",
              class: "good",
              prop: "evaluate"
            },
            {
              text: "危险",
              textcolor: "#df2828",
              class: "danger",
              prop: "evaluateS"
            }
          ]
        };
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
