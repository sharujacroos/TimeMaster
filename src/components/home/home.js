import Layout from '../../layout/layout'
import React, { useState, useEffect } from 'react'
import homeimage from '../../assets/home-image.png'
import Chart from "react-apexcharts"
import FeatherIcon from 'feather-icons-react'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const Home = () => {
  // const [state, setState] = useState({
  //   options: {
  //     colors: [
  //       '#ab37e7', '#6b0d0d', '#546E7A', '#E91E63', '#FF9800'
  //     ],
  //     chart: {
  //       id: "basic-bar"
  //     },
  //     xaxis: {
  //       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //     }
  //   },
  //   series: [
  //     {
  //       name: "Progress Tasks",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 54, 75, 96]
  //     },
  //     {
  //       name: "Finished Tasks",
  //       data: [90, 70, 35, 15, 29, 59, 90, 100, 90, 15, 45, 15]
  //     },
  //     {
  //       name: "Failed Tasks",
  //       data: [90, 70, 35, 15, 29, 59, 90, 100, 90, 15, 45, 15]
  //     }
  //   ]
  // })

  const [state, setState] = useState({
    options: {
      colors: [
        '#ab37e7', '#6b0d0d', '#546E7A', '#E91E63', '#FF9800'
      ],
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    },
    series: [
      {
        name: "Progress Tasks",
        data: []
      },
      {
        name: "Finished Tasks",
        data: []
      },
      {
        name: "Failed Tasks",
        data: []
      }
    ]
  });

  // useEffect(() => {
  //   // Fetch tasks data from the backend
  //   const fetchTasksData = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:8000/task');
  //       const tasksData = await response.json();

  //       // Update state with the new tasks data
  //       const progressTasks = tasksData.filter(task => task.status === 'IN_PROGRESS');
  //       const completedTasks = tasksData.filter(task => task.status === 'COMPLETED');
  //       const failedTasks = tasksData.filter(task => task.status === 'FAILED');

  //       setState(prevState => ({
  //         ...prevState,
  //         series: [
  //           { ...prevState.series[0], data: progressTasks.map(task => task.id) },
  //           { ...prevState.series[1], data: completedTasks.map(task => task.id) },
  //           { ...prevState.series[2], data: failedTasks.map(task => task.id) },
  //         ],
  //       }));
  //     } catch (error) {
  //       console.error('Error fetching tasks data:', error);
  //       toast.error('Error fetching tasks data');
  //     }
  //   };

  //   fetchTasksData();
  // }, []);

  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/task');
        const tasksData = await response.json();

        const uniqueMonths = [...new Set(tasksData.map(task => task.startDate.slice(5, 7)))];

        const completedData = Array(uniqueMonths.length).fill(0);
        const inProgressData = Array(uniqueMonths.length).fill(0);
        const failedData = Array(uniqueMonths.length).fill(0);

        tasksData.forEach(task => {
          const monthIndex = uniqueMonths.indexOf(task.startDate.slice(5, 7));
          if (monthIndex !== -1) {
            switch (task.status) {
              case "COMPLETED":
                completedData[monthIndex]++;
                break;
              case "IN_PROGRESS":
                inProgressData[monthIndex]++;
                break;
              case "FAILED":
                failedData[monthIndex]++;
                break;
              default:
                break;
            }
          }
        });

        setState(prevState => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              categories: uniqueMonths,
            }
          },
          series: [
            { ...prevState.series[0], data: completedData },
            { ...prevState.series[1], data: inProgressData },
            { ...prevState.series[2], data: failedData },
          ],
        }));
      } catch (error) {
        console.error('Error fetching tasks data:', error);
        toast.error('Error fetching tasks data');
      }
    };

    fetchTasksData();
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
                <div className={"card-body p-3"}>
                  <div className={"card-text"}>Total Finished Tasks</div>
                  <div className={"d-flex align-items-center"}>
                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"user-plus"} /></div>
                    <div className={"card-text_total"}>29</div>
                  </div>

                </div>
              </div>
            </div>
            <div className={"col-sm-3 mb-3 mb-sm-0"}>
              <div className={"card home_card"}>
                <div className={"card-body p-3"}>
                  <div className={"card-text"}>On Going Tasks</div>
                  <div className={"d-flex align-items-center"}>
                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"user-check"} /></div>
                    <div className={"card-text_total"}>
                      <ul>
                        <li>task 01</li>
                        <li>task 01</li>
                        <li>task 01</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-sm-3 mb-3 mb-sm-0"}>
              <div className={"card home_card"}>
                <div className={"card-body "}>
                  <div className={"card-text"}>Choosing Task Categories</div>
                  <div className={"d-flex align-items-center"}>
                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"dollar-sign"} /></div>
                    <div className={"card-text_total"}>5</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-sm-3 mb-3 mb-sm-0"}>
              <div className={"card home_card"}>
                <div className={"card-body "}>
                  <div className={"card-text"}>Current Tasks</div>
                  <div className={"d-flex align-items-center"}>
                    <div><FeatherIcon className={"home-action-icons me-3"} icon={"dollar-sign"} /></div>
                    <div className={"card-text_total"}>09</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-1 p-3 mt-4">
            <h1 className="p-3 heading">Task Categories</h1>
            <div className="default-container">
              <Chart
                options={state.options}
                series={state.series}
                type="bar"  // bar, line, area, radar, histogram, scatter, heatmap
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
