<template>
    <el-row class="packing">
        <el-col :span="24">
            <el-col :span="3" class="packing_title">
                <span>样品管理</span>
            </el-col>
            <el-col :span="21">
                <el-col :span="12">
                    <el-col :span="2" class="packing_num">
                        <span>12</span>
                    </el-col>
                    <el-col :span="22" class="packing_content">
                        <span>监20170078</span>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="4" class="packing_title">
                        <span>打印条数</span>
                    </el-col>
                    <el-col :span="20" class="packing_content">
                        <span>8</span>
                    </el-col>
                </el-col>
                <el-col :span="12"></el-col>
            </el-col>
        </el-col>
        <el-col :span="24">
            <el-col :span="3" class="packing_title">
                <span>打印时间</span>
            </el-col>
            <el-col :span="21" class="packing_content">
                <span>2018.01.25</span>
            </el-col>
        </el-col>
        <el-col :span="24" class="packing_col">
            <el-col :span="3" class="packing_title packing_title_first" id="packing_title">
                <span>检验项目</span>
            </el-col>
            <el-col :span="21" class="packing_none" id="packing_none">
                <el-col :span="12">
                    <el-col :span="2" class="packing_num" >
                        <span>01</span>
                    </el-col>
                    <el-col :span="22" class="packing_content">
                        <span>水分</span>
                        <p>打印</p>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="2" class="packing_num">
                        <span>01</span>
                    </el-col>
                    <el-col :span="22" class="packing_content">
                        <span>水分</span>
                    </el-col>
                </el-col>
                <el-col :span="12" class="broder_last">
                    <el-col :span="2" class="packing_num">
                        <span>01</span>
                    </el-col>
                    <el-col :span="22" class="packing_content">
                        <span>水分</span>
                    </el-col>
                </el-col>
                <div class="clear"></div>
            </el-col>
            <div class="clear"></div>
        </el-col>
    </el-row>
</template>
<script>
import "@/assets/style/common/packingCommon.css";
export default {
    mounted:function() {
        var packing_none = document.getElementById('packing_none');
        var packing_none_height =  getComputedStyle(packing_none,null).height
        var packing_title = document.getElementById("packing_title")
        packing_title.style.height = packing_none_height
        packing_title.style.lineHeight = packing_none_height
    },
}
</script>