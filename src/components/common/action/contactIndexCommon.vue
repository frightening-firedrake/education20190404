<template>
  <div class="editcontact">
    <p class="title">{{formdata.title}}</p>
    <el-form :model="formdata.model" :rules="rules" ref="ruleForm">
      <el-form-item
        v-for="(data,index) in formdata.data"
        :key="index"
        :label="data.label"
        size="mini"
        :label-width="data.labelWidth?data.labelWidth:labelWidth"
        :class="data.class?data.class:''"
        :prop="data.prop"
        :inline-message="true"
      >
        <template v-if="data.type=='select'">
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
          <el-input v-model="formdata.model[data.prop]" :maxlength="data.span"></el-input>
          <span v-if="data.span">还可以输入{{data.span-formdata.model[data.prop].length}}个文字</span>
        </template>
      </el-form-item>
      <!--  <el-form-item label="来源:" size="mini" :class="mini" :label-width="labelWidth">
        <el-input></el-input>
        <span>还可以输入20个文字</span>
      </el-form-item>-->
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
              <el-form-item label >
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
      <p class="addrow">
        <span @click="addRow">+新增一行</span>
      </p>
      <div class="btns">
        <el-button class="no" @click="goout">返回上一层</el-button>
        <el-button class="submit">提交发布</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["formdata", "tabledata"],
  data() {
    return {
      labelWidth: "2.07rem",
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        department: { required: true, message: "请输入活动名称", trigger: "blur" }
      }
    };
  },
  methods: {
    del(e) {
       this.$emit("delrow",e.$index)
    },
    addRow() {
        this.$emit("addRow")
    },
    goout(){
      this.$router.go(-1)
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
    border: 1px solid #dfdfdf;
    border-top: none;
    line-height: 0.5rem;
    text-align: center;
    span {
      cursor: pointer;
      display: inline-block;
      width: 1.14rem;
      height: 0.3rem;
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
                }
              }
            }
          }
        }
      }
    }
  }
  .el-form-item {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    margin-bottom: 0;
    border-top: 1px solid #dfdfdf;
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
      line-height: 0.5rem;
      .el-input {
        width: 9.43rem;
        .el-input__inner {
          height: 0.3rem;
          border-radius: 0;
          background-color: #f9f9f9;
          font-size: 0.16rem;
          color: #333333;
        }
      }
      span {
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
