import { useCallback, useEffect, useState } from "react";
import TablePage from "../../components/tablepage";
import { useData } from '../../DataProvider';
import CourseDrawer from './CourseDrawer';
import PieChart from '../../components/pieChart';
import { formatData } from '../../Data/Utilities';
import Canvas from './Canvas';
import 'reactflow/dist/style.css';
import CourseDrawerNode from "./CourseDrawerNode";
import Dino from "../../assets/dino.gif"
// import ReactFlow, { Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import { ReactFlowProvider } from 'reactflow';
import Modal from "../../components/Modal/Modal"
import ModalBody from "../../components/Modal/ModalBody";
import ModalControls from "../../components/Modal/ModalControls";
import Preview from "../../assets/add-delete_Trim-crop.mp4"
import Preview2 from "../../assets/show-course-desc_Trim-crop.mp4"
import Preview3 from "../../assets/preqdemo-crop_Trim.mp4"
import KeyboardKey from "../../components/Modal/KeyboardKey";

const Planner = () => {

  const [chartData, setChartData] = useState(null);
  const [courseNodeList, setCourseNodeList] = useState([]);
  const { data, totalCourseData } = useData();
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    if (data != null && totalCourseData != null) {
      const userCourses = data["Nathan Ferris"]['courses']; // No need to convert to an array
      const allCourses = { ...userCourses, ...totalCourseData['courses'] };
      const mergedCourseArray = Object.values(allCourses);

      // console.log("total", mergedCourseArray);
      setCourseNodeList(mergedCourseArray);
      setChartData(formatData(data));
    }
  }, [data, totalCourseData]);


  // useEffect(() => {
  //   console.log("coursenodeList ", courseNodeList)
  // }, [courseNodeList])

  // open the modal on page load
  useEffect(() => {
    setModalOpen(true);
  }, [])

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

  // allow the data to load
  if (data === null || totalCourseData === null) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center ">
        <img src={Dino} className="w-16 h-16"></img>
        <p className="animate-pulse">Loading...</p>
        {/* <p className="animate-bounce pl-2">🦖</p> */}
      </div>
    )
  }
  else {
    return (
      <>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalControls>
            <ModalBody
              header={"Adding and Deleting Courses"}
              description={
                <span className="inline-block">
                  Drag courses from the sidebar onto the canvas to add them to your planner.
                  To delete a course, select it and press the <span title="Backspace" className="inline-block"><KeyboardKey /></span> key on your keyboard.
                  You can also clear the canvas by pressing the trash bin icon on the toolbar.
                </span>
              }
              photo={Preview}
              title={"Help"}
              onClose={() => setModalOpen(false)}
              />
            <ModalBody
              header={"View Course Details"}
              description={"Press the dropdown arrow to view course details like the course description, prerequisites, and the number of units"}
              photo={Preview2}
              title={"Help"}
              onClose={() => setModalOpen(false)}
            />
            <ModalBody
              header={"Connecting Prerequisites"}
              description={"Drag courses close to each to see what you need to take them. You can also hover over courses to see their prerequisites. To reveal all prerequisites together, click the eyeball icon on the toolbar."}
              photo={Preview3}
              title={"Help"}
              onClose={() => setModalOpen(false)}
            />
          </ModalControls>
        </Modal >

        <div className="w-full h-full flex flex-row">
          <ReactFlowProvider>
            <Canvas data={data} onRemove={course => removeCourse(course)} />
          </ReactFlowProvider>
          <TablePage>
            <CourseDrawer>
              {totalCourseData != null ?
                courseNodeList.map((course) => (
                  <CourseDrawerNode key={course.title + course.id} course={course} onRemove={() => removeCourse(course)} />
                )) :
                <p className="animate-pulse">Loading...</p>
              }
            </CourseDrawer>
            <div className="z-10 absolute w-full flex justify-center items-center pt-2 ">
              <button className="flex flex-row items-center w-fit gap-1 text-stone-300 hover:text-stone-400 transition-all duration-200"
                onClick={() => setModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
                Help
              </button  >
            </div>

            {data != null && <PieChart data={chartData} details={false} mb={"0"} />}
          </TablePage>
        </div>
      </>
    );
  };
}

export default Planner;