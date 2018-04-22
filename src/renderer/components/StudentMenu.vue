<template>

    <div>
        <el-menu default-active="studentMenu" class="el-menu-demo" :router=true mode="horizontal">
            <el-menu-item index="index">返回</el-menu-item>
            <el-menu-item index="studentMenu">学生详情</el-menu-item>
        </el-menu>

        <!-- 选择班级 -->
        <!-- 班级 -->
        <div class="choice-class">
            <el-select v-model="classList" placeholder="请选择班级" @change="getStudent()">
                <el-option v-for="clazz in classes" :label="clazz.name" :value="clazz.id">
                </el-option>
            </el-select>
        </div>

        <!-- 学生列表 -->
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="studentNumber" label="学号">
            </el-table-column>
            <el-table-column prop="qq" label="QQ/Email">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
name: "StudentMenu";
export default {
  data() {
    return {
      studentSet: {},
      classList: "",
      classes: [],
      tableData: []
    };
  },
  methods: {
    // 获取班级
    getClass: function() {
      console.log("getClass");
      this.$http
        .get("/teacher/getClassByTeacherId", {
          params: {
            teacherId: JSON.parse(window.localStorage.getItem("user")).id
          }
        })
        .then(clazz => {
          this.classes = clazz.data.data;
          console.log("classes", this.classes);
        })
        .catch(err => {
          console.log("get class err", err);
        });
    },
    getStudent() {
      this.tableData = [];
      this.$http
        .get("/teacher/getStudentByClassId", {
          params: {
            classId: this.classList
          }
        })
        .then(res => {
          console.log("res", res);
          for (let index = 0; index < res.data.data.length; index++) {
            const element = res.data.data[index];
            const item = {
              id: "",
              name: "",
              studentNumber: "",
              qq: "",
              phone: ""
            };
            item.id = element.id;
            item.name = element.name;
            item.qq = element.qq == null ? element.email : element.qq;
            item.studentNumber = element.studentNumber;
            item.phone = element.phone;

            this.tableData.push(item);
          }
        })
        .catch(err => {});
    }
  },
  created() {
    this.getClass();
  }
};
</script>

<style scoped>

</style>
