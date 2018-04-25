<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">选择试题</el-menu-item>
    </el-menu>
    <div class="main">
      <!-- 名称 -->
      <div class="title-input">
        <el-input v-model="pageTitle" placeholder="填写试卷标题"></el-input>
      </div>
      <!-- 班级 -->
      <div class="choice-class">
        <el-select v-model="classList" placeholder="请选择">
          <el-option v-for="clazz in classes" :key="clazz" :label="clazz.name" :value="clazz.id">
          </el-option>
        </el-select>
      </div>

      <!-- <div class="choice-class">
        <el-checkbox-group v-model="classList" v-for="c in classes" :key="c">
          <el-checkbox :label="c.id">{{c.name}}</el-checkbox>
        </el-checkbox-group>
      </div> -->

      <!-- 时间 -->
      <div class="block">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker v-model="value4" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <!-- 试卷选择 -->
      <!-- <div>试卷</div> -->

      <div class="page-choice">
        <el-select v-model="pageId" placeholder="请选择试卷编号">
          <el-option v-for="page in pages" :key="page" :label="page.id" :value="page.id">
          </el-option>
        </el-select>
      </div>

      <div>选择下列试题</div>

      <!-- 试题多选框 -->
      <el-checkbox-group v-model="checkList">
        <div v-for="title in titles" :key="title">
          <el-checkbox :label="title.id">{{title.title}}</el-checkbox>
        </div>
      </el-checkbox-group>

      <div class="btn-next">
        <el-button type="success" @click="nextStep">完成</el-button>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  margin-left: 30%;
}
.title-input {
  margin: 20px;
  width: 40%;
}
.btn-next {
  margin-top: 20px;
}
.page-choice {
  margin: 30px;
}
.choice-class {
  margin: 50px;
}
</style>

<script>
export default {
  name: "AddTitleForPage",
  data() {
    return {
      value4: [new Date(2018, 3, 10, 10, 10), new Date(2018, 4, 11, 10, 10)],
      activeIndex: "1",
      knowledgeIds: [],
      titles: [],
      checkList: [],
      pages: [],
      pageId: "",
      pageIdAndTitle: {},
      classList: [],
      classes: [],
      pageTitle: "",
      classValue: ""
    };
  },

  methods: {
    handleSelect(key, keyPath) {
      this.$router.push("/addknowledge");
    },
    // 获取page试卷详细
    getPage: function() {
      this.$http
        .get("/teacher/getPagesByTeacherId", {
          params: {
            teacherId: JSON.parse(window.localStorage.getItem("user")).id
          }
        })
        .then(page => {
          console.log("page", page);
          this.pages = page.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取题目
    getTitle: function() {
      this.$http
        .get("/teacher/getTitleByKnowledgeIds", {
          params: {
            knowledgeIds: this.knowledgeIds.toString()
          }
        })
        .then(titleRes => {
          console.log("title", titleRes);
          this.titles = titleRes.data.data;
          this.getPage();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取班级
    getClass: function() {
      this.$http
        .get("/teacher/getClassByTeacherId", {
          params: {
            teacherId: JSON.parse(window.localStorage.getItem("user")).id
          }
        })
        .then(clazz => {
          this.classes = clazz.data.data;
          this.getTitle();
          console.log("classes", this.classes);
        })
        .catch(err => {
          console.log("get class err", err);
        });
    },

    getParams() {
      this.knowledgeIds = this.$route.query.knowledgeIds;
      this.getClass();
    },
    nextStep: function() {
      // 验证
      if (this.checkList.length == 0) {
        this.$message.error("您还没有选择题目");
        return;
      } else if (this.value == "") {
        this.$message.error("您还没有选择试卷");
        return;
      }
      // 提交
      this.$http
        .post(
          "/teacher/addTitleForPage",
          {
            titleIdArray: this.checkList.toString(),
            pageId: this.pageId
          },
          { emulateJSON: true }
        )
        .then(res => {
          console.log("res", res);
          if (res.data.code == 200) {
            // 下一次提交
            this.$http
              .post(
                "/teacher/startTest",
                {
                  pagesId: this.pageId,
                  classId: 1,
                  startTime: this.value4[0],
                  endTime: this.value4[1],
                  pageTitle: this.pageTitle,
                  teacherId: JSON.parse(window.localStorage.getItem("user")).id
                },
                {
                  emulateJSON: true
                }
              )
              .then(res => {
                this.$router.push("/index");
                console.log("res", res);
              })
              .catch(err => {
                console.log("err", err);
              });
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  created() {
    this.getParams();
    // this.getClass();
    // this.getTitle();
    // this.getPage();
  },

  computed: {
    user() {
      return JSON.parse(window.localStorage.getItem("user"));
    }
  }
};
</script>
