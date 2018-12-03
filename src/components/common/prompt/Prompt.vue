<template>
    <ul class="alert_list">
    <li v-for="alert in alerts" :key="alert.id">
        <el-alert :title="alert.title" :type="alert.type" :description="alert.description" show-icon>
        </el-alert>
    </li>
    </ul>
</template>
<script>
import "@/assets/style/common/Prompt.css"

     export default {
         props: ['alerts'],
     }
</script>