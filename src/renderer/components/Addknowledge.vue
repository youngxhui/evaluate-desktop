<template>
    <div>
        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">选择试题范围</el-menu-item>
            </el-menu>
        </div>

        <div>
            <el-checkbox-group v-model="checkList" v-for="course in courses" :key="course" @change="getKnowledgeId(course.id)">
                <el-checkbox :label="course.id">{{course.name}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div>
          <el-button type="success" @click="next">下一步</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: "Addknowledge",
  data() {
    return {
      pageId: 0,
      activeIndex: "1",
      courseId: 0,
      courses: [],
      konwledgeIds: []
    };
  },
  methods: {
    getParams() {
      this.pageId = this.$route.query.pageId;
      this.courseId = this.$route.query.courseId;
    },
    getKnowledge() {
      console.log("getKnowledge");
      this.$http
        .get("/teacher/getKnowledgeById", {
          params: {
            courseId: this.courseId
          }
        })
        .then(res => {
          this.courses = res.data.data;
        })
        .catch(err => {});
    },
    handleSelect(key, keyPath) {
      //this.$router.push("/addPage");
    },
    getKnowledgeId(value) {
      var index = this.konwledgeIds.findIndex(v => {
        return v == value;
      });
      if (index == -1) {
        this.konwledgeIds.push(value);
      } else {
        this.konwledgeIds.splice(
          this.konwledgeIds.findIndex(item => item === value),
          1
        );
      }
    },
    next:function(){
      if(this.konwledgeIds.length == 0) {
        return
      }
      
      this.$route.push({
        path: "",
        query: {
          'konwledgeIds':this.konwledgeIds
        }
      })
    }
  },
  created() {
    console.log("created");
    this.getParams();
    this.getKnowledge();
  }
};
</script>

<style scoped>

</style>