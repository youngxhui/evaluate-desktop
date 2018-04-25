<template>
  <div>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" :router=true mode="horizontal" @select="handleSelect">
        <el-menu-item index="index">
          <i class="el-icon-arrow-left"></i>
        </el-menu-item>
        <el-menu-item index="studentMenu">学生详情</el-menu-item>
        <el-menu-item index="addTitle">添加试题</el-menu-item>
      </el-menu>
    </div>

    <div class="choice-class">
      <el-select v-model="type" placeholder="选择试题类型" @change="getStudent()">
        <el-option v-for="t in typeList" :label="t.name" :value="t.id">
        </el-option>
      </el-select>
    </div>

    <el-input type="text" v-model="title" class="sel">
      <template slot="prepend">添加试题</template>
    </el-input>

    <el-input type="text" v-model="answer" class="sel">
      <template slot="prepend">添加答案</template>
    </el-input>

    <div v-if="type==1">

      <el-input class="sel" v-model="A">
        <template slot="prepend">A</template>
      </el-input>

      <el-input class="sel" v-model="B">
        <template slot="prepend">B</template>
      </el-input>

      <el-input class="sel" v-model="C">
        <template slot="prepend">C</template>
      </el-input>

      <el-input class="sel" v-model="D">
        <template slot="prepend">D</template>
      </el-input>
    </div>

    <div v-if="type==2" class="sel">
      答案是否有序:
      <el-select v-model="order" placeholder="答案是否有序" @change="getStudent()">
        <el-option v-for="o in orders" :label="o.name" :value="o.id">
        </el-option>
      </el-select>
    </div>

    <el-input type="text" v-model="analytics" class="sel">
      <template slot="prepend">添加解析</template>
    </el-input>

    <el-button @click="submitTitle" class="sel">提交</el-button>

  </div>
</template> 

<script>
export default {
  name: "AddTitle",
  data() {
    return {
      order: "",
      orders: [{ id: 1, name: "是" }, { id: 2, name: "否" }],
      analytics: "",
      answer: "",
      title: "",
      type: "",
      A: "",
      B: "",
      C: "",
      D: "",
      typeList: [
        { id: 1, name: "选择题" },
        { id: 2, name: "填空题" },
        { id: 3, name: "简答题" },
        { id: 5, name: "其他题型" }
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitTitle: function() {
      this.$http
        .post(
          "/title/addTitle",
          {
            title: this.title,
            category: this.type,
            answer: this.answer,
            analytics: this.analytics,
            sectiona: this.A,
            sectionb: this.B,
            sectionc: this.C,
            sectiond: this.D,
            orderd: this.order
          },
          { emlateJSON: true }
        )
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.sel {
  width: 40%;
  margin-top: 10px;
}

.upload {
  margin-top: 20px;
}
</style>