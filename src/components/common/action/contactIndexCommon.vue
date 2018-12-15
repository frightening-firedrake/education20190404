<template>
  <div class="editcontact">
    <p class="title">{{formdata.title}}</p>
    <el-form :model="formdata.model" :rules="rules" ref="ruleForm">
      <div class="formborder">
        <el-form-item
          v-for="(data,index) in formdata.data"
          :key="index"
          :label="data.label"
          size="mini"
          :label-width="data.labelWidth?data.labelWidth:labelWidth"
          :class="data.class?data.class:''"
          :style="{height:data.height}"
          :prop="data.prop"
          :inline-message="true"
        >
          <template v-if="data.type=='photo'">
            <el-upload
              class="avatar-uploader"
              :show-file-list="true"
              :action="action"
              :on-exceed="handleexceed"
              :on-success="handleAvatarSuccess"
              :limit="1"
              :file-list="filelist"
              name="pictureFile"
              list-type="picture-card"
            >
              <!-- <img
              

                :src="apiRoot+'upload/picture/'+formdata.model.image"
                v-if="formdata.model.image"
                alt
              >-->
              <i class="iconfont icon-tianjia"></i>
            </el-upload>
          </template>
          <template v-else-if="data.type=='select'">
            <el-select
              v-model="formdata.model[data.prop]"
              :placeholder="data.placeholder"
              value-key="index"
            >
              <el-option
                v-for="(options,index) in data.data"
                :key="index"
                :label="options.label"
                :value="options.value"
              ></el-option>
            </el-select>
          </template>
          <template v-else>
            <el-input
              :disabled="data.disabled"
              v-model="formdata.model[data.prop]"
              :maxlength="data.span"
            ></el-input>
            <span
              class="fontlength"
              v-if="data.span"
            >还可以输入{{data.span-formdata.model[data.prop].length}}个文字</span>
          </template>
        </el-form-item>
      </div>
      <div class="formborder active">
        <template v-if="tabledata.tabletype.type=='contact'">
          <el-table border :data="tabledata.body">
            <template v-for="(table,index) in tabledata.hearder">
              <el-table-column
                :key="index"
                :prop="table.prop"
                :label="table.label"
                header-align="center"
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item label>
                    <el-input v-model="scope.row[table.prop]"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </template>
            <el-table-column label="操作" header-align="center" align="center" width="128">
              <template slot-scope="scope">
                <el-button size="small" class="del" type="text" @click="del(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="tabledata.tabletype.type=='topic'">
          <p class="title">题目内容</p>

          <el-form-item
            class="table"
            v-for="table in tabledata.problem"
            :key="table.id"
            :prop="table.prop"
            :inline-message="true"
            :label="table.label"
            size="mini"
            :label-width="table.tableWidth?table.tableWidth:tableWidth"
            :class="table.class?table.class:''"
            :style="{height:table.height}"
          >
            <el-input
              :disabled="table.disabled"
              v-model="formdata.model[table.prop]"
              :placeholder="table.placeholder"
            ></el-input>
          </el-form-item>
          <el-table border :data="tabledata.body" class="topic">
            <template v-for="(table,index) in tabledata.hearder">
              <el-table-column
                :key="index"
                :prop="table.prop"
                :label="table.label"
                header-align="center"
                align="center"
                :width="table.width"
              >
                <template slot-scope="scope">
                  <span v-if="table.prop=='option'">{{topicnum[scope.$index]}}</span>
                  <el-form-item
                    v-else-if="table.prop=='result'"
                    v-for="answer in scope.row.result"
                    :key="answer.placeholder"
                    label
                    :style="{height:answer.height}"
                  >
                    <el-input
                      v-model="scope.row.module[answer.prop]"
                      :placeholder="answer.placeholder"
                      :disabled="answer.disabled"
                    ></el-input>
                  </el-form-item>
                  <el-radio
                    v-else-if="table.prop=='rank'"
                    v-model="scope.row.module[rank.prop]"
                    v-for="rank in scope.row.rank"
                    :key="rank.text"
                    :label="rank.value"
                    :class="rank.class"
                    :style="{color:rank.textcolor}"
                  >{{rank.text}}</el-radio>
                </template>
              </el-table-column>
            </template>
            <el-table-column label="操作" header-align="center" align="center" width="92">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  :disabled="topicnum[scope.$index]=='A'"
                  class="del"
                  type="text"
                  @click="del(scope)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <p class="addrow">
        <span @click="addRow">+{{formdata.addrowTitle}}</span>
      </p>
    </el-form>
    <div class="btns">
      <el-button class="no" @click="goout">返回上一层</el-button>
      <el-button class="submit" @click="submitForm('ruleForm')">提交发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["formdata", "tabledata"],
  computed: {
    filelist: function() {
      if (this.formdata.model.image == "") return [];
      let params = {
        name: this.formdata.model.image,
        url: this.apiRoot + "upload/picture/" + this.formdata.model.image
      };
      return [params];
    }
  },
  data() {
    return {
      action: this.apiRoot + "/test/uploadPic",
      topicnum: ["A", "B", "C", "D"],
      labelWidth: "2.07rem",
      tableWidth: "79px",
      rules: {
        sectionName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        articleSource: [
          { required: true, message: "请输入来源", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        topic: [{ required: true, message: "请输入问题", trigger: "blur" }],
        form: [{ required: true, message: "请输入问题", trigger: "blur" }],
        type: [{ required: true, message: "请输入测试类别", trigger: "blur" }],
        source: [{ required: true, message: "请输入来源", trigger: "blur" }],
        pictureFile: [
          { required: true, message: "请输入封面照片", trigger: "blur" }
        ],
        summarize: [{ required: true, message: "请输入摘要", trigger: "blur" }]
      }
    };
  },
  methods: {
    //合并行
    // row({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0 || columnIndex === 3) {
    //     if (rowIndex % 3 === 0) {
    //       return {
    //         rowspan: 3,
    //         colspan: 1
    //       };
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       };
    //     }
    //   } else if (columnIndex === 1) {
    //     if (rowIndex % 3 === 1) {
    //       return {
    //         rowspan: 2,
    //         colspan: 1
    //       };
    //     } else if (rowIndex % 3 === 0) {
    //       return {
    //         rowspan: 1,
    //         colspan: 1
    //       };
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       };
    //     }
    //   }
    // },
    //上传个数超出时
    handleexceed(files, fileList) {
      this.$notify({
        title: "警告",
        message: "只能上传一张图片",
        type: "warning"
      });
    },
    //上传成功时
    handleAvatarSuccess(res, file, fileList) {
      this.formdata.model.image = res.msg;
    },
    del(e) {
      // console.log(e);
      this.$emit("delrow", e.$index);
    },
    addRow() {
      this.$emit("addRow");
    },
    goout() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.$refs[formName]);
          this.$emit("submit", this.$refs[formName]);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.editcontact {
  padding-top: 0.3rem;
  .title {
    font-size: 0.2rem;
    color: #000000;
    width: 100%;
    height: 0.6rem;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    background-color: #eeeeee;
    text-align: center;
    line-height: 0.6rem;
    border: 1px solid #dfdfdf;
    border-bottom: none;
  }
  .el-form {
    .formborder {
      border: 1px solid #dfdfdf;
      &.active {
        border-bottom: none;
        margin-top: 0.12rem;
        border-top-right-radius: 0.1rem;
        border-top-left-radius: 0.1rem;
        border-top: none;
      }
    }
  }
  .btns {
    width: 100%;
    height: 0.5rem;
    text-align: center;
    margin-top: 0.45rem;
    .el-button {
      width: 1.3rem;
      height: 0.5rem;
      border-radius: 0.1rem;
      color: #ffffff;
      font-size: 0.18rem;
      text-align: center;
      &:active {
        border-color: transparent;
      }
    }
    .no {
      background-color: #f16b74;
    }
    .submit {
      background-color: #58b481;
    }
  }
  .addrow {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    span {
      cursor: pointer;
      display: inline-block;
      width: auto;
      height: 0.3rem;
      padding: 0 0.2rem;
      margin: 0 auto;
      text-align: center;
      border: 1px solid #4c90db;
      border-radius: 0.3rem;
      font-size: 0.16rem;
      color: #4c90db;
      line-height: 0.3rem;
    }
  }
  .el-table {
    border-left: none;
    border-right: none;
    &::before {
      background-color: transparent;
    }
    .el-table__header-wrapper {
      table {
        thead {
          tr {
            th {
              height: 0.5rem;
              font-size: 0.16rem;
              color: #333333;
              border-color: #dfdfdf;
              background-color: #fbfbfb;
            }
          }
        }
      }
    }
    .el-table__body-wrapper {
      table {
        tbody {
          tr {
            td {
              height: 0.5rem;
              padding: 0;
              border-color: #dfdfdf;
              .cell {
                .el-form-item {
                  border: none;
                  .el-form-item__content {
                    margin-left: 0;
                    border: none;
                    padding-left: 0;
                    .el-input {
                      width: 100%;
                    }
                  }
                }
                button {
                  span {
                    font-size: 0.16rem;
                    color: #f16b74;
                  }
                  &.is-disabled {
                    span {
                      color: #999;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    &.topic {
      .el-table__body-wrapper {
        table {
          tbody {
            tr {
              height: 1.5rem;
              td {
                .cell {
                  padding: 0;
                }
              }
            }
          }
        }
      }
      .el-radio {
        margin-left: 0;
        width: 100%;
        height: 0.48rem;
        line-height: 0.48rem;
        border-bottom: 1px solid #dfdfdf;
        &:last-child {
          border: none;
        }
        .el-radio__label {
          color: inherit !important;
        }
        &.fine {
          .el-radio__input.is-checked {
            .el-radio__inner {
              background-color: #20a235;
              border-color: #20a235;
            }
          }
        }
        &.good {
          .el-radio__input.is-checked {
            .el-radio__inner {
              background-color: #2871df;
              border-color: #2871df;
            }
          }
        }
        &.danger {
          .el-radio__input.is-checked {
            .el-radio__inner {
              background-color: #df2828;
              border-color: #df2828;
            }
          }
        }
      }
      .el-form-item {
        width: 98%;
        margin: 0 auto;
        border: none;
        &:last-child {
          margin-top: 0.09rem;
        }
        .el-form-item__content {
          margin-left: 0;
          border: none;
          padding: 0;
          height: 100%;
          .el-input {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .el-form-item {
    width: 100%;
    height: 0.5rem;
    // line-height: 0.5rem;
    margin-bottom: 0;
    border-top: 1px solid #dfdfdf;
    &.table {
      height: 1rem;
      padding-right: 0.1rem;
      .el-form-item__label {
        line-height: 1rem;
      }
      .el-form-item__content {
        .el-input {
          height: 0.8rem;
          width: 100%;
          input {
            line-height: 0;
          }
        }
        .el-form-item__error {
          position: absolute;
          top: 65%;
          margin-left: 0;
          display: block;
          left: 93%;
        }
      }
    }
    .el-form-item__label {
      background-color: #fbfbfb;
      height: 100%;
      line-height: 0.5rem;
      padding-right: 0.25rem;
      font-size: 0.16rem;
    }
    .el-form-item__content {
      border-left: 1px solid #dfdfdf;
      padding-left: 0.1rem;
      line-height: 0;
      padding-top: 0.1rem;
      .avatar-uploader {
        height: 100%;
        // padding-top: 0.08rem;
        .el-upload-list {
          .el-upload-list__item {
            width: 1.3rem;
            height: 0.84rem;
            .el-upload-list__item-actions {
              font-size: 40px;
              .el-upload-list__item-delete {
                i {
                  font-size: 0.3rem;
                }
              }
            }
          }
        }
        .el-upload {
          width: 1.3rem;
          height: 0.84rem;
          line-height: 0.84rem;
          border: 1px solid #4c90db;
          border-radius: 0;
          img {
            width: 1.3rem;
            height: 0.84rem;
            margin: 0 8px 8px 0;
          }
          i {
            font-size: 0.4rem;
            color: #4c90db;
          }
        }
      }
      .el-input {
        width: 75%;
        height: 0.3rem;
        .el-input__inner {
          height: 100%;
          border-radius: 0;
          background-color: #f9f9f9;
          font-size: 0.16rem;
          color: #333333;
        }
        .el-input__suffix {
          .el-input__suffix-inner {
            i {
              line-height: 0.3rem;
            }
          }
        }
      }
      .fontlength {
        font-size: 0.16rem;
        color: #4c90db;
        margin-left: 0.18rem;
      }
    }
    &.mini {
      .el-input {
        width: 4rem;
      }
    }
  }
}
</style>
