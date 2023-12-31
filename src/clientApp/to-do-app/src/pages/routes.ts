import { ModuleRoute } from "shared/types/config";
import MainPage from "./MainPage";
import TodosPage from "./ToDosPage";
import AddTodoPage from "./AddToDoPage";
import RegisterPage from "./Register";
import paths from "config/paths";
import LoginPage from "pages/Login";
import EditTodoPage from "./EditToDoPage";

const routes: ModuleRoute[] = [
   {
      path: paths.main,
      Component: () => MainPage(),
      public: true,
   },
   {
      path: paths.todos.main,
      Component: () => TodosPage(),
   },
   {
      path: paths.todos.addTodo,
      Component: () => AddTodoPage(),
   },
   {
      path: paths.auth.register,
      Component: () => RegisterPage(),
      public: true,
   },
   {
      path: paths.auth.login,
      Component: () => LoginPage(),
      public: true,
   },
   {
      path: paths.todos.editTodo,
      Component: () => EditTodoPage(),
   },
];

export default routes;
