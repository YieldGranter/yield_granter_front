import { Route, Routes } from "react-router-dom";
import { Header } from "../feature/header";
import { MainPage } from "../pages/main";
import { ProjectPage } from "../pages/project";
import { AddProjectPage } from "../pages/add-project";

export const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Header />}>
        <Route index element={<MainPage />}></Route>
        <Route path={"/project/:projectId"} element={<ProjectPage />}></Route>
        <Route path={"/add-project"} element={<AddProjectPage />}></Route>
      </Route>
    </Routes>
  )
}
