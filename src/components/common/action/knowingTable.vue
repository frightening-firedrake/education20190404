<template>
  <div>
    <template slot-scope="scope">
      <span v-if="table.prop=='option'">{{scope.row[table.prop]}}</span>
      <el-form-item
        v-else-if="table.prop=='Answer'"
        v-for="answer in scope.row.Answer"
        :key="answer.placeholder"
        label
        :style="{height:answer.height}"
      >
        <el-input v-model="answer.text" :placeholder="answer.placeholder"></el-input>
      </el-form-item>
      <el-radio
        v-else-if="table.prop=='danger'"
        v-model="scope.row.danger[0].model"
        v-for="danger in scope.row.danger"
        :key="danger.text"
        :label="danger.text"
        :class="danger.class"
        :style="{color:danger.textcolor}"
      >{{danger.text}}</el-radio>
    </template>
  </div>
</template>

<script>
export default {
  props: ["tabledata"]
};
</script>

<style>
</style>
