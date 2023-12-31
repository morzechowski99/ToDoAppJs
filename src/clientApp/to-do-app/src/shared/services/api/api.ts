import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import config from "config";
import Auth from "../Auth";
import {
   CreateTodoPayload,
   LoginPayload,
   RegisterPayload,
   Todo,
   UpdateTodoPayload,
} from "./api.types";
import { TodoListItem } from "shared/types/interfaces";

class Api {
   protected api: AxiosInstance = axios.create({ baseURL: config.apiUrl });

   constructor() {
      this.api.interceptors.request.use(this.authenticate);
      this.api.interceptors.request.use((config) => {
         config.withCredentials = true;
         return config;
      });
   }

   private authenticate(config: InternalAxiosRequestConfig) {
      const token = Auth.getToken();
      if (token && config.headers)
         config.headers.Authorization = `Bearer ${token}`;
      return config;
   }

   public async addTodo(task: CreateTodoPayload) {
      const response = await this.api.post<CreateTodoPayload>(
         "/api/tasks/add",
         task
      );
      return response;
   }

   public async registerUser(user: RegisterPayload) {
      const response = await this.api.post<RegisterPayload>(
         "/api/auth/register",
         user
      );
      return response;
   }

   public async login(user: LoginPayload) {
      const response = await this.api.post<LoginPayload>(
         "/api/auth/login",
         user
      );
      return response;
   }

   public async getTodos(): Promise<TodoListItem[]> {
      const response = await this.api.get<{ tasks: Todo[] }>("/api/tasks/all");
      return response.data.tasks.map(({ _id, owner, dueDate, ...rest }) => ({
         id: _id,
         dueDate: dueDate ? new Date(dueDate) : undefined,
         ...rest,
      }));
   }

   public async getTodoById(id: string) {
      const response = await this.api.get<{ task: Todo }>(`/api/tasks/${id}`);
      return response.data;
   }

   public async updateTodo(todo: UpdateTodoPayload) {
      const response = await this.api.put<UpdateTodoPayload>(
         `/api/tasks/update`,
         todo
      );
      return response.data;
   }

   public async deleteTodoById(id: string) {
      const response = await this.api.delete(`/api/tasks/delete/${id}`);
      return response.data;
   }
}

export default Api;
