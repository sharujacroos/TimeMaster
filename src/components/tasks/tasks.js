import React, { useState } from 'react'
import Layout from '../../layout/layout'
import FeatherIcon from 'feather-icons-react'

export const Tasks = () => {
  const [modalShow, setModalShow] = useState(false)
  const [modalType, setModalType] = useState("view")
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState([
    { no: 0o1, taskName: "Task01", scheduleStart: "2023-11-30", scheduleEnd: "2024-01-30", category: "Backup and Recovery", status: "Running" },
    { no: 0o1, taskName: "Task01", scheduleStart: "2023-11-30", scheduleEnd: "2024-01-30", category: "Backup and Recovery", status: "Running" },
    { no: 0o1, taskName: "Task01", scheduleStart: "2023-11-30", scheduleEnd: "2024-01-30", category: "Backup and Recovery", status: "Running" },
    { no: 0o1, taskName: "Task01", scheduleStart: "2023-11-30", scheduleEnd: "2024-01-30", category: "Backup and Recovery", status: "Running" },
    { no: 0o1, taskName: "Task01", scheduleStart: "2023-11-30", scheduleEnd: "2024-01-30", category: "Backup and Recovery", status: "Running" }
  ])

  function handleDelete() {
    // dispatch(toggleConfirmationDialog({
    //     isVisible: true,
    //     confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS DETAILS'),
    //     confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS DETAILS')
    // }));
  }

  return (
    <Layout>
      <div className={"container"}>
        <div className={"container-widget"}>
          <div className={"tasks_container"}>
            <h1 className="p-3 heading">Tasks</h1>
            <div className={"table-btn-container d-flex justify-content-end pb-3"}>
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
                {tasks.map((tasks) => (
                  <tr>
                    <th scope="row">{1}</th>
                    <td>{tasks.taskName}</td>
                    <td>{tasks.scheduleStart}</td>
                    <td>{tasks.scheduleEnd}</td>
                    <td>{tasks.category}</td>
                    <td>{tasks.status}</td>
                    <td>
                      <FeatherIcon className={"action-icons"} icon={"eye"}
                        onClick={() => {
                          setModalType("View");
                          // setTasks(data)
                          setModalShow(true)
                        }} />
                      <FeatherIcon className={"action-icons"} icon={"edit"}
                        onClick={() => {
                          // setTasks(data)
                          setModalType("Edit");
                          setModalShow(true)
                        }} />
                      <FeatherIcon className={"action-icons text-red"} icon={"trash-2"} onClick={handleDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Layout >
  )
}
