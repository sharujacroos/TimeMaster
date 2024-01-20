import Layout from '../../layout/layout'
import React, { useState } from 'react'
import homeimage from '../../assets/home-image.png'
import Chart from "react-apexcharts"
import FeatherIcon from 'feather-icons-react'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios'

export const Home = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/home');
        console.log(response.data);
        setTaskData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <Layout>
      <div className="container mt-4 mb-4">
        <div className={"col-md"}>
          <div className={"homeCard-container"}>
            <div className={"row p-2"}>
              <div className={"col-md-8"}>
                <div className={"card-title studentCard-title"}><h4>Unlock the Power of Productivity 🚀<br /></h4></div>
                <div className={"card-subtitle homeCard-text pt-3"}>
                  <p>Your Time, Your Rules, Your Mastery.</p>
                  <p>Get ready to conquer your day with Time Master – where efficiency meets simplicity.
                    Seamlessly schedule tasks, prioritize goals, and make every moment count.</p>
                  <p>Let's embark on a journey of productivity together!</p>
                  <p>Elevate your days, own your time, and become the master of your moments.</p>
                </div>
              </div>
              <div className={"col-md-4 card-image homeCard-image align-items-center"}>
                <img src={homeimage} alt="Home Image" className={"home-image float-end img-fluid img-responsive"} />
              </div>
            </div>
          </div>

          <div className={"row  mt-4 pt-5"}>
            <div className={"col-sm-3 mb-3 mb-sm-0"}>
              <div className={"card home_card"}>
                <div className={"card-body "}>
                  <div className={"card-text cardText"}>Total Tasks</div>
                  <div className={"d-flex align-items-center px-5 pt-3"}>
                    <div className={"card-text_total me-5"}><h1>{taskData.completed_task_count + taskData.ongoing_task_count + taskData.failed_count}</h1></div>
                    <div><FeatherIcon className={"home-action-icons ms-5 increased-size"} icon={"dollar-sign"} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-sm-3 mb-3 mb-sm-0"}>
              <div className={"card home_card"}>
                <div className={"card-body p-3"}>
                  <div className={"card-text cardText"}>Total Finished Tasks</div>
                  <div className={"d-flex align-items-center px-5 pt-3"}>
                    <div className={"card-text_total me-5"}><h1>{taskData.completed_task_count}</h1></div>
                    <div><FeatherIcon className={"home-action-icons ms-5 increased-size"} icon={"dollar-sign"} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-sm-3 mb-3 mb-sm-0"}>
              <div className={"card home_card"}>
                <div className={"card-body p-3"}>
                  <div className={"card-text cardText"}>On Going Tasks</div>
                  <div className={"d-flex align-items-center px-5 pt-3"}>
                    <div className={"card-text_total me-5"}><h1>{taskData.ongoing_task_count}</h1></div>
                    <div><FeatherIcon className={"home-action-icons ms-5 increased-size"} icon={"dollar-sign"} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-sm-3 mb-3 mb-sm-0"}>
              <div className={"card home_card"}>
                <div className={"card-body "}>
                  <div className={"card-text cardText"}>Failed Tasks</div>
                  <div className={"d-flex align-items-center px-5 pt-3"}>
                    <div className={"card-text_total me-5"}><h1>{taskData.failed_count}</h1></div>
                    <div><FeatherIcon className={"home-action-icons ms-5 increased-size"} icon={"dollar-sign"} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-1 p-3 mt-4">
            <h1 className="p-3 heading">Task Categories</h1>
            <div className="default-container">
              <Chart
                options={{
                  colors: [
                    '#ab37e7', '#6b0d0d', '#546E7A', '#E91E63', '#FF9800'
                  ],
                  chart: {
                    id: "basic-bar"
                  },
                  xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  }
                }}
                series={[
                  {
                    name: "Finished Tasks",
                    data: [
                      taskData.graph && taskData.graph[1] ? taskData.graph[1].completed : 0,
                      taskData.graph && taskData.graph[2] ? taskData.graph[2].completed : 0,
                      taskData.graph && taskData.graph[3] ? taskData.graph[3].completed : 0,
                      taskData.graph && taskData.graph[4] ? taskData.graph[4].completed : 0,
                      taskData.graph && taskData.graph[5] ? taskData.graph[5].completed : 0,
                      taskData.graph && taskData.graph[6] ? taskData.graph[6].completed : 0,
                      taskData.graph && taskData.graph[7] ? taskData.graph[7].completed : 0,
                      taskData.graph && taskData.graph[8] ? taskData.graph[8].completed : 0,
                      taskData.graph && taskData.graph[9] ? taskData.graph[9].completed : 0,
                      taskData.graph && taskData.graph[10] ? taskData.graph[10].completed : 0,
                      taskData.graph && taskData.graph[11] ? taskData.graph[11].completed : 0,
                      taskData.graph && taskData.graph[12] ? taskData.graph[12].completed : 0,

                    ]
                  },
                  {
                    name: "On-going Tasks",
                    data: [
                      taskData.graph && taskData.graph[1] ? taskData.graph[1].running : 0,
                      taskData.graph && taskData.graph[2] ? taskData.graph[2].running : 0,
                      taskData.graph && taskData.graph[3] ? taskData.graph[3].running : 0,
                      taskData.graph && taskData.graph[4] ? taskData.graph[4].running : 0,
                      taskData.graph && taskData.graph[5] ? taskData.graph[5].running : 0,
                      taskData.graph && taskData.graph[6] ? taskData.graph[6].running : 0,
                      taskData.graph && taskData.graph[7] ? taskData.graph[7].running : 0,
                      taskData.graph && taskData.graph[8] ? taskData.graph[8].running : 0,
                      taskData.graph && taskData.graph[9] ? taskData.graph[9].running : 0,
                      taskData.graph && taskData.graph[10] ? taskData.graph[10].running : 0,
                      taskData.graph && taskData.graph[11] ? taskData.graph[11].running : 0,
                      taskData.graph && taskData.graph[12] ? taskData.graph[12].running : 0,
                    ]
                  },
                  {
                    name: "Failed Tasks",
                    data: [
                      taskData.graph && taskData.graph[1] ? taskData.graph[1].failed : 0,
                      taskData.graph && taskData.graph[2] ? taskData.graph[2].failed : 0,
                      taskData.graph && taskData.graph[3] ? taskData.graph[3].failed : 0,
                      taskData.graph && taskData.graph[4] ? taskData.graph[4].failed : 0,
                      taskData.graph && taskData.graph[5] ? taskData.graph[5].failed : 0,
                      taskData.graph && taskData.graph[6] ? taskData.graph[6].failed : 0,
                      taskData.graph && taskData.graph[7] ? taskData.graph[7].failed : 0,
                      taskData.graph && taskData.graph[8] ? taskData.graph[8].failed : 0,
                      taskData.graph && taskData.graph[9] ? taskData.graph[9].failed : 0,
                      taskData.graph && taskData.graph[10] ? taskData.graph[10].failed : 0,
                      taskData.graph && taskData.graph[11] ? taskData.graph[11].failed : 0,
                      taskData.graph && taskData.graph[12] ? taskData.graph[12].failed : 0,

                    ]
                  }
                ]}
                type="bar"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
