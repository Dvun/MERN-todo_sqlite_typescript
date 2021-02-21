import React, {useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../redux/rootState';
import { CLEAR_MESSAGES } from '../redux/reducers/users/userSlice';
import { CLEAR_MESSAGES_TODOS } from '../redux/reducers/users/todoSlice';


const ToastifyBar: React.FC = () => {
  const dispatch = useDispatch()
  const {errorMsg, successMsg} = useSelector(({userReducer}: RootState) => userReducer)
  const {errorMsg: todosError, successMsg: todosSuccess}: any = useSelector(({todoReducer}: RootState) => todoReducer)

  useEffect(() => {
    if (errorMsg) notifyError(errorMsg)
    if (successMsg) notifySuccess(successMsg)

    if (todosSuccess) notifySuccess(todosSuccess)
    if (todosError) notifySuccess(todosError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg, successMsg, todosSuccess, todosError])


  const notifySuccess = (successMsg: string) => {
    toast.success(successMsg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => dispatch(CLEAR_MESSAGES()), 200)
    setTimeout(() => dispatch(CLEAR_MESSAGES_TODOS()), 200)
  }

 const notifyError = (errorMsg: string) => {
   toast.error(errorMsg, {
     position: "bottom-center",
     autoClose: 3000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: false,
     draggable: true,
     progress: undefined,
   });
   setTimeout(() => dispatch(CLEAR_MESSAGES()), 200)
   setTimeout(() => dispatch(CLEAR_MESSAGES_TODOS()), 200)
 }


  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default ToastifyBar