import React, { useState } from 'react'
import { Chart ,registerables} from 'chart.js';
import  {Pie} from "react-chartjs-2"
Chart.register(...registerables);


const InstructorChart = ({courses}) => {

    const [currChart,setCurrChart] = useState("students");

    // function to generates random colors
    const getRandomColors = (numColors)=>{
        const colors = [];
        for(let i = 0; i<numColors; i++){
            const color =`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    const chartDataForStudents = {
        labels:courses.map((course) => course.courseName),
        datasets:[
            {
                data:courses.map((course) => course.studentsEnrolled.length),
                backgroundColor:getRandomColors(courses.length),
            }
        ]
    }
        const chartDataIncome = {
        labels:courses.map((course) => course.courseName),
        datasets:[
            {
                data:courses.map((course) => course.studentsEnrolled.length*course.price),
                backgroundColor:getRandomColors(courses.length),
            }
        ]
    }

  const options = {
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 20,
        padding: 20,
        usePointStyle: true,
      }
    }
  },
  maintainAspectRatio: false,
};

  return (
    <div className='bg-richblack-800 p-6 flex flex-col gap-4 lg:w-[70%] rounded-md'>
        <p className='text-xl font-semibold'>Visualise</p>
        <div className='flex flex-row gap-4  ml-4'>
            <button className={`text-yellow-300 ${currChart === "students" ? "text-yellow-50 bg-yellow-800 px-2 py-1" : ""}`} onClick={() => {setCurrChart("students")}}>Student</button>
            <button   className={`text-yellow-300 ${currChart !== "students" ? "text-yellow-50 bg-yellow-800 px-2 py-1" : ""}`}  onClick={() => {setCurrChart("income")}}>Income</button>
        </div>
        <div className='h-[300px] flex justify-center'>
            <Pie 
            options={options}
            data={currChart === "students" ? chartDataForStudents : chartDataIncome}
            />
        </div>
    </div>
  )
}

export default InstructorChart