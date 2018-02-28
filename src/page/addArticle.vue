<template>
	<div>
		<head-top></head-top>
		<el-row>
			<el-col :span="14" :offset="4">
				<el-form :model="articleForm" :rules="arules" ref="articleForm" label-width="110px" class="form food_form">
					<el-form-item label="分类">
						<el-select v-model="articleForm.catalog_id" placeholder="请选择分类">
							<el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="标题" prop="title">
						<el-input v-model="articleForm.title"></el-input>
					</el-form-item>
					<el-form-item label="发布者" prop="author">
						<el-input v-model="articleForm.author"></el-input>
					</el-form-item>
					<el-form-item label="uid" prop="uid">
						<el-input v-model="articleForm.uid"></el-input>
					</el-form-item>
					<el-form-item label="是否置顶" prop="isTop">
						<el-tooltip :content="'Switch value: ' + articleForm.isTop" placement="top">
							<el-switch v-model="articleForm.isTop" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
							</el-switch>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="类型" prop="resource">
						<el-radio-group v-model="articleForm.type">
							<el-radio label="1">热门推荐</el-radio>
							<el-radio label="2">首页推荐</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="点赞数量" prop="zan">
						<el-input v-model="articleForm.zan"></el-input>
					</el-form-item>
					<el-form-item label="位置" prop="location">
						<el-input v-model="articleForm.location"></el-input>
					</el-form-item>
					<el-form-item label="头像" prop="authorImg">
						<el-input v-model="articleForm.authorImg"></el-input>
					</el-form-item>
					<el-form-item label="详情" prop="content">
						<div class="edit_container">
							<quill-editor v-model="articleForm.content" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
							</quill-editor>
						</div>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="addArticle('articleForm')">确认添加</el-button>
					</el-form-item>
				</el-form>

			</el-col>
		</el-row>
	</div>
</template>

<script>
import headTop from "@/components/headTop";
import { getCategory, addCategory, addArticle } from "@/api/getData";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      categorySelect: "",
      categoryList: [],
      articleForm: {
        title: "",
        catalog_id: 0,
        content: "",
        author: "",
        authorImg: "",
        uid: "",
        type: 1,
        isTop: 0,
        view_times: 1,
        zan: 1,
        location: ""
      },
      arules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        uid: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      editorOption: {}
    };
  },
  components: {
    headTop,
    quillEditor
  },
  created() {
    this.initData();
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    async initData() {
      try {
        const result = await getCategory();
        if (result.length > 0) {
          this.categoryList = result;
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    },
    beforeImgUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    addArticle(articleForm) {
      this.$refs[articleForm].validate(async valid => {
        if (valid) {
          const params = {
            ...this.articleForm
          };
          // console.log(JSON.stringify(params))
          try {
            const result = await addArticle(params);
            console.log(result);
            if (result) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
            } else {
              this.$message({
                type: "error",
                message: result.message
              });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查输入是否正确",
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}

.food_form {
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}

.form_header {
  text-align: center;
  margin-bottom: 10px;
}

.category_select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}

.add_category_row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}

.showEdit {
  height: 185px;
}

.add_category {
  background: #f9fafc;
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}

.add_category_button {
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  &:hover {
    background: #f9fafc;
    span,
    .edit_icon {
      color: #20a0ff;
    }
  }
  span {
    .sc(14px, #999);
    transition: all 400ms;
  }
  .edit_icon {
    color: #ccc;
    transition: all 400ms;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.cell {
  text-align: center;
}
</style>
