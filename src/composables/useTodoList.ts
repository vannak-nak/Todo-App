import { reactive, ref } from 'vue'
import axios from 'axios'
import { IAddLsitRequest, IGetTodoResponse, IUpdateRequest } from '@/models/todolist'
import { ElNotification } from 'element-plus'

export default function useTodoList () {
  const todoList = ref<IGetTodoResponse[]>([])
  const isloading = ref<boolean>(false)
  const getTodoList = async () => {
    isloading.value = true
    try {
      const response = await axios.post('http://localhost:5118/api/Assignment/Get')
      todoList.value = response.data
    } catch (error) {
      console.error('Error fetching todo list', error)
    }
  }
  getTodoList()
  const isAddNewDialog = ref<boolean>(false)
  const onAddNewList = () => {
    isAddNewDialog.value = true
  }
  const newList = ref({
    title: '',
    status: '',
    description: ''
  })
  const statusOption = {
    Pending: 'Pending',
    Doing: 'Doing',
    Done: 'Done'
  }
  const onCancelList = () => {
    isAddNewDialog.value = false
    isUpdateDialog.value = false
  }
  const onSubmitAddList = async () => {
    const request = reactive<IAddLsitRequest>({
      title: newList.value.title,
      status: newList.value.status,
      description: newList.value.description
    })
    try {
      const response = await axios.post('http://localhost:5118/api/Assignment/Add', request)
      if (response.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Adding successfull',
          type: 'success'
        })
        isAddNewDialog.value = false
        getTodoList()
      }
    } catch (error) {
      console.error('Error fetching todo list', error)
    }
  }
  const isUpdateDialog = ref<boolean>(false)
  const editList = ref({
    id: 0,
    title: '',
    status: '',
    description: ''
  })
  const onEditList = (row: IUpdateRequest) => {
    isUpdateDialog.value = true
    editList.value = row
  }
  const onSubmitUpdateList = async () => {
    const request = reactive({
      id: editList.value.id,
      status: editList.value.status
    })
    try {
      const response = await axios.post('http://localhost:5118/api/Assignment/Update', request)
      if (response.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Adding successfull',
          type: 'success'
        })
        isUpdateDialog.value = false
        getTodoList()
      }
    } catch (error) {
      console.error('Error fetching todo list', error)
    }
  }
  const onDeleteList = async (row: IUpdateRequest) => {
    const request = reactive({
      Id: row.id
    })
    try {
      const response = await axios.post('http://localhost:5118/api/Assignment/Delete', request)
      if (response.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Adding successfull',
          type: 'success'
        })
        getTodoList()
      }
    } catch (error) {
      console.error('Error fetching todo list', error)
    }
  }

  return {
    todoList,
    isAddNewDialog,
    onAddNewList,
    newList,
    statusOption,
    onCancelList,
    onSubmitAddList,
    isloading,
    isUpdateDialog,
    onEditList,
    onSubmitUpdateList,
    editList,
    onDeleteList
  }
}
