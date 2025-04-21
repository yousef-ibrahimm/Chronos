import { createContext, useState } from "react";

export const StudentContext = createContext({
  studentId: "",
  studentName: "",
  googleInfo: {},
  courseId: "",
  courseName: "",
  courseDeadlines: [],
  modules: [],
  moduleData: [],
  setId: (id) => {},
  setName: (name) => {},
  setCourse: (courseId) => {},
  setCourseNameCx: (courseName) => {},
  setCourseDeadlinesCx: (deadlines) => {},
  setModules: (modules) => {},
  setModuleData: (moduleData) => {},
  setDeadlineData: (deadlineData) => {},
  setGoogleInfoCx: (info) => {},
});

const StudentContextProvider = ({ children }) => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDeadlines, setCourseDeadlines] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [deadlineData, setDeadlineData] = useState([]);
  const [googleInfo, setGoogleInfo] = useState({});

  const setId = (id) => {
    setStudentId(id);
  };

  const setName = (name) => {
    setStudentName(name);
  };

  const setCourse = (courseId) => {
    setCourseId(courseId);
  };

  const setCourseNameCx = (courseName) => {
    setCourseName(courseName);
  };

  const setCourseDeadlinesCx = (deadlines) => {
    setCourseDeadlines(deadlines);
  };

  const setModulesCx = (modules) => {
    setModules(modules);
  };

  const setModuleDataCx = (newModuleData) => {
    setModuleData((prevModuleData) => [...prevModuleData, ...newModuleData]);
  };

  const setDeadlineDataCx = (newDeadlineData) => {
    setDeadlineData((prevDeadlineData) => [
      ...prevDeadlineData,
      ...newDeadlineData,
    ]);
  };

  const setGoogleInfoCx = (info) => {
    setGoogleInfo(info);
  };
  const value = {
    studentId: studentId,
    studentName: studentName,
    courseId: courseId,
    courseName: courseName,
    courseDeadlines: courseDeadlines,
    modules: modules,
    moduleData: moduleData,
    googleInfo: googleInfo,
    setId: setId,
    setName: setName,
    setCourse: setCourse,
    setCourseNameCx: setCourseNameCx,
    setCourseDeadlinesCx: setCourseDeadlinesCx,
    setModules: setModulesCx,
    setModuleData: setModuleDataCx,
    setDeadlineData: setDeadlineDataCx,
    setGoogleInfoCx: setGoogleInfoCx,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export default StudentContextProvider;
