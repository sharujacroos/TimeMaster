import React, { useState, useEffect } from 'react'
import Layout from '../../layout/layout'
import FeatherIcon from 'feather-icons-react'
import { TaskForm } from './taskForm'
// import {toggleConfirmationDialog, toggleLoader} from "../../../redux/actions";
import axios from 'axios'
import { values, pick, filter, pluck } from "underscore";

export const Tasks = () => {
  const [modalShow, setModalShow] = useState(false)
  const [modalType, setModalType] = useState("view")
  const [selectedTask, setSelectedTask] = useState(null)
  const [taskAllList, setTaskAllList] = useState([])
  const [deletedId, setDeletedId] = useState(null)
  // const [tasks, setTasks] = useState([
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Completed" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Failed" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Failed" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Failed" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Failed" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" },
  //   { no: 0o1, taskName: "Task01", startDate: "2023-11-30", endDate: "2024-01-30", category: "Backup and Recovery", status: "Running" }
  // ])

  const [tasksAllList, setTasksAllList] = useState([])
  const [tasksList, setTasksList] = useState([])
  const [update, setUpdate] = useState(false);

  function handleSearch(e) {
    let val = e.target.value;
    if (val !== "") {
      let res = filter(tasksAllList, function (item) { return values(pick(item, 'taskName', 'startDate', 'endDate', 'category', 'status')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase()); });
      setTasksList(res);
      console.log(res)
    } else {
      setTasksList(tasksAllList);
    }
  }

  function colorChange(status) {
    switch (status) {
      case "RUNNING":
        return "bg-warning text-dark"
      case "COMPLETED":
        return "bg-success text-white"
      case "FAILED":
        return "bg-danger text-white"
      default:
        return ""
    }
  }

  function handleDelete(id) {
    // dispatch(toggleConfirmationDialog({
    //     isVisible: true,
    //     confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE TASK DATA'),
    //     confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE TASK DETAILS')
    // }));
    setDeletedId(id)
  }

  useEffect(() => {
    // if (!confirmationDialog || !confirmationDialog.onSuccess || !deletedId) {
    console.log("deleted")
    //   return;
    // }
    console.log("deleted")
    // dispatch(toggleLoader(true))

    axios.delete(`http://127.0.0.1:8000/task`)
      .then((res) => {
        setUpdate(!update)
        // toast.success(`Successfully Deleted`)

      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        // dispatch(toggleLoader(false))
        setDeletedId(null)
      })
  }, [])
  // }, [confirmationDialog])

  // const confirmationDialog = useSelector(state => {
  //   return state.setting.confirmationDialog
  // });

  useEffect(() => {
    (async () => await fetchData())()
  }, []);

  async function fetchData() {
    const data = await axios.get("http://127.0.0.1:8000/task");
    setTasksList(data.data);
  }

  return (
    <Layout>
      <div className={"container"}>
        <div className={"container-widget"}>
          <div className={"tasks_container"}>
            <h1 className="p-3 heading">Tasks</h1>
            <div className={"table-btn-container d-flex justify-content-end pb-3"}>
              <div className={"tasks-search"}>
                <div className="container-fluid">
                  <form className="d-flex" role="search">
                    {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                    <input className="form-control me-2" onChange={handleSearch} type="search" placeholder="Search"
                      aria-label="Search" />
                  </form>
                </div>
              </div>
              <div className={"dropdown"}>
                <button className={"btn btn-secondary dropdown-toggle tasks-dropdown-btn"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category {/* Change this text to your desired label */}
                </button>
                <ul className={"dropdown-menu dropdown-menu-dark"}>
                  <li><a className={"dropdown-item"} href="#">Category 01</a></li>
                  <li><a className={"dropdown-item"} href="#">Category 02</a></li>
                  <li><a className={"dropdown-item"} href="#">Category 03</a></li>
                  <li><a className={"dropdown-item"} href="#">Category 04</a></li>
                  <li><a className={"dropdown-item"} href="#">Category 05</a></li>
                </ul>
              </div>
              <button type="button" className={"btn btn-secondary tasks-dropdown-btn"}
                onClick={() => {
                  setModalType("Add");
                  setModalShow(true)
                }}>
                <FeatherIcon className={"action-icons text-white"} icon={"plus"} />
                Add
              </button>
            </div>
          </div>
          <div className={"table-container"}>
            <table className={"table table-hover table-striped"} >
              <thead className={"top-0 position-sticky h-45"}>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Task Name</th>
                  <th scope="col">Schedule Start</th>
                  <th scope="col">Schedule End</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tasksList.map((tasks) => (
                  <tr>
                    <th scope="row">{1}</th>
                    <td>{tasks.taskName}</td>
                    <td>{tasks.startDate}</td>
                    <td>{tasks.endDate}</td>
                    <td>{tasks.category}</td>
                    {/* <td>{tasks.status}</td> */}
                    <td>
                      <div className={"task_state " + (colorChange(tasks.status))}
                        onClick={() => {
                          let temp = { ...tasks }
                          temp.date = tasks.date?.slice(0, 10)
                          setSelectedTask(temp)
                          setModalShow(true)
                          setModalType("State");
                        }
                        }>{tasks.status}</div>

                    </td>
                    <td>
                      <FeatherIcon className={"action-icons"} icon={"eye"}
                        onClick={() => {
                          setModalType("View");
                          let temp = { ...tasks }
                          temp.date = tasks.date?.slice(0, 10)
                          setSelectedTask(temp)
                          // setTasks(data)
                          setModalShow(true)
                        }} />
                      <FeatherIcon className={"action-icons"} icon={"edit"}
                        onClick={() => {
                          // setTasks(data)
                          // let temp = { ...tasks }
                          // temp.date = tasks.date?.slice(0, 10)
                          setModalType("Edit");
                          setModalShow(true)
                          setSelectedTask(tasks)
                        }} />
                      <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} onClick={() => handleDelete(tasks._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {tasksList.length === 0 && <div className={"text-center py-5 fw-bold"}>No Task Data Found, Please Add...</div>} */}
          </div>
        </div>
      </div>

      <TaskForm
        show={modalShow}
        type={modalType}
        selectedTask={selectedTask}
        update={() => setUpdate(!update)}
        onHide={() => {
          setModalShow(false)
          setSelectedTask(null)
        }}
      />
    </Layout >
  )
}
