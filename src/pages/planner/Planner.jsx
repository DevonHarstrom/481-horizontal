import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import TablePage from "../../components/tablepage";
import { useData } from '../../DataProvider';
import CourseDrawer from './CourseDrawer';
import PieChart from '../../components/pieChart';
import { formatData } from '../../Data/Utilities';
import Canvas from './Canvas';
import 'reactflow/dist/style.css';
import CourseDrawerNode from "./CourseDrawerNode";


const Planner = () => {

  const [chartData, setChartData] = useState(null);
  const [courseNodeList, setCourseNodeList] = useState([]);
  const { data, totalCourseData } = useData();

  useEffect(() => {
    if (data != null && totalCourseData != null) {
      const userCourses = data["Nathan Ferris"]['courses']; // No need to convert to an array
      const allCourses = { ...userCourses, ...totalCourseData['courses'] };

      // Convert the object of courses back to an array if needed
      const mergedCourseArray = Object.values(allCourses);
      console.log("merged", data["Nathan Ferris"]['courses']);
      setCourseNodeList(mergedCourseArray);
      setChartData(formatData(data));
    }
  }, [data, totalCourseData]);


  useEffect(() => {
    console.log("coursenodeList ", courseNodeList)
  }, [courseNodeList])

  // if (data != null && totalCourseData != null) {
  //   const userCourses = data['Nathan Ferris']['courses']; // Assuming 'Nathan Ferris' is the user key in your data object
  //   const mergedCourseNodeList = Object.values(totalCourseData['courses']).reduce((merged, course) => {
  //     // check if the course already exists in userCourses
  //     const courseExistsInData = userCourses.some(dataCourse => dataCourse.title === course.title && dataCourse.id === course.id);

  //     // if course doesnt exist yet, add it to the accumulator
  //     if (!courseExistsInData) {
  //       merged.push(course);
  //     }

  //     return merged;
  //   }, [...userCourses]); // Start with the courses from data

  //   setCourseNodeList(mergedCourseNodeList);
  //   setChartData(formatData(data))
  // }

  // const removeCourse = (course) => {
  //   console.log("removing course: ", course.title + " " + course.id);
  //   setCourseNodeList(courseNodeList.filter(elmnt => elmnt.id !== course.id && elmnt.title !== course.title));
  // };

  const removeCourse = useCallback((courseToRemove) => {
    setCourseNodeList(prevCourseNodeList => {
      const filteredList = prevCourseNodeList.filter(course =>
        course.id !== courseToRemove.id || course.title !== courseToRemove.title
      );
      // console.log("After filtering: ", filteredList);
      return filteredList;
    });
  }, []);


  return (
    <>
      <div className="w-full h-full flex flex-row">
        <Canvas data={data} onRemove={course => removeCourse(course)} />
        <TablePage>
          <CourseDrawer>
            {data != null &&
              courseNodeList.map((course) => (
                <CourseDrawerNode key={course.title + course.id} course={course} onRemove={() => removeCourse(course)} />
              ))
            }
          </CourseDrawer>
          <div className="absolute flex justify-center items-center w-full gap-1 pt-2 text-stone-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
            <p>Help</p>
          </div>

          {data != null && <PieChart data={chartData} details={false} mb={"0"} />}
        </TablePage>
      </div>
    </>
  );
};

export default Planner;