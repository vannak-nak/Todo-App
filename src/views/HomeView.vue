<template>
  <div class="wrapper">
    <div class="header flex items-center justify-between">
      <h1 class="font-bold py-7 text-3xl text-left">Todo List</h1>
      <el-button type="primary" @click="onAddNewList">Add New List</el-button>
    </div>
    <el-table :data="todoList" border stripe style="width: 100%" :header-cell-style="{textAlign: 'center'}">
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="title" label="Title"  min-width="120"/>
      <el-table-column prop="description" label="Description"  min-width="150"/>
      <el-table-column prop="status" label="Status"  min-width="80"/>
      <el-table-column prop="createdOn" label="CreateOn" min-width="150"/>
      <el-table-column prop="createdBy" label="CreatedBy"  min-width="100"/>
      <el-table-column prop="modifiedOn" label="ModifiedOn"  min-width="150"/>
      <el-table-column prop="modifiedBy" label="ModifiedBy" min-width="100"/>
      <el-table-column label="Action" min-width="120" #default="scope">
        <div class="flex">
          <el-button class="edit-btn" @click="onEditList(scope.row)">
            <el-icon :size="16">
              <edit />
            </el-icon>
          </el-button>
          <el-button class="edit-btn" @click="onDeleteList(scope.row)">
            <el-icon :size="16"><Delete /></el-icon>
          </el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-dialog title="Add List" v-model="isAddNewDialog" width="35%" :show-close="false">
      <div>
        <el-form label-position="left" label-width="150px" :model="newList">
          <el-form-item :label="'Title'" prop="Title" rules="required">
            <el-input v-model="newList.title" ></el-input>
          </el-form-item>
          <el-form-item :label="'Status'" prop="Status">
            <el-select v-model="newList.status" placeholder="please select status">
              <el-option v-for="item in statusOption" :key="item" :value="item" :label="item"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="'Description'" prop="Description">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
              :value="newList.description"
              v-model="newList.description"></el-input>
          </el-form-item>
            <div class="flex justify-end">
              <el-button class="text-center" @click="onCancelList()" >{{ 'Cancel' }}</el-button>
              <el-button class="text-center"  type="primary" @click="onSubmitAddList()">{{ 'Submit' }}</el-button>
            </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="Edit List" v-model="isUpdateDialog" width="35%" :show-close="false">
      <div>
        <el-form label-position="left" label-width="150px" :model="editList">
          <el-form-item :label="'Title'" prop="title" >
            <el-input v-model="editList.title" disabled></el-input>
          </el-form-item>
          <el-form-item :label="'Status'" prop="status">
            <el-select v-model="editList.status" placeholder="please select status">
              <el-option v-for="item in statusOption" :key="item" :value="item" :label="item"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="'Description'" prop="description">
            <el-input
              disabled
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
              :value="editList.description"
              v-model="editList.description"></el-input>
          </el-form-item>
            <div class="flex justify-end">
              <el-button class="text-center" @click="onCancelList()" >{{ 'Cancel' }}</el-button>
              <el-button class="text-center"  type="primary" @click="onSubmitUpdateList()">{{ 'Update' }}</el-button>
            </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useTodoList from '../composables/useTodoList'

const {
  todoList,
  isAddNewDialog,
  onAddNewList,
  newList,
  statusOption,
  onCancelList,
  onSubmitAddList,
  isUpdateDialog,
  onEditList,
  onSubmitUpdateList,
  editList,
  onDeleteList
} = useTodoList()
</script>

<style scoped>
:deep(.el-dialog__body) {
  padding-top: 8px;
}
:deep(.el-table th.el-table__cell) {
  background: #ddd;
  color: #333;
}
</style>
