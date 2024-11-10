import { createContext, useState } from "react";

export const StudentContext = createContext({
  studentId: "",
  studentName: "",
  courseId: "",
  courseName: "",
  courseDeadlines: [],
  modules: [],
  setId: (id) => {},
  setName: (name) => {},
  setCourse: (courseId) => {},
  setCourseNameCx: (courseName) => {},
  setCourseDeadlinesCx: (deadlines) => {},
  setModules: (modules) => {},
});

const StudentContextProvider = ({ children }) => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDeadlines, setCourseDeadlines] = useState([]);
  const [modules, setModules] = useState([]);

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

  const value = {
    studentId: studentId,
    studentName: studentName,
    courseId: courseId,
    courseName: courseName,
    courseDeadlines: courseDeadlines,
    modules: modules,
    setId: setId,
    setName: setName,
    setCourse: setCourse,
    setCourseNameCx: setCourseNameCx,
    setCourseDeadlinesCx: setCourseDeadlinesCx,
    setModules: setModulesCx,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export default StudentContextProvider;
