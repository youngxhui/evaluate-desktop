<template>
    <div>
        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" :router=true mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">{{username}}</el-menu-item>
                <el-menu-item index="studentMenu">学生详情</el-menu-item>
                <el-menu-item index="addTitle">添加试题</el-menu-item>
            </el-menu>
        </div>
        选择试题类型
        <div class="choice-class">
            <el-select v-model="type" placeholder="请选择班级" @change="getStudent()">
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

        <div v-if="type==0">

            <el-input class="sel">
                <template slot="prepend">A</template>
            </el-input>

            <el-input class="sel">
                <template slot="prepend">B</template>
            </el-input>

            <el-input class="sel">
                <template slot="prepend">C</template>
            </el-input>

            <el-input class="sel">
                <template slot="prepend">D</template>
            </el-input>
        </div>
        <div v-if="type==2">
             <el-select v-model="order" placeholder="请选择班级" @change="getStudent()">
                <el-option v-for="o in orders" :label="o.name" :value="o.id">
                </el-option>
            </el-select>
        </div>

        <el-input type="text" v-model="analytics" class="sel">
            <template slot="prepend">添加解析</template>
        </el-input>
    </div>
</template> 

<script>
export default {
  name: "AddTitle",
  data() {
    return {
      order:"",
      orders:["是","否"],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      analytics: "",
      answer: "",
      title: "",
      type: "",
      typeList: [
        { id: 0, name: "选择题" },
        { id: 1, name: "填空题" },
        { id: 2, name: "简答题" },
        { id: 7, name: "其他题型" }
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
    }
  }
};
</script>

<style scoped>
.sel {
  margin-top: 10px;
}

.upload {
  margin-top: 20px;
}
</style>