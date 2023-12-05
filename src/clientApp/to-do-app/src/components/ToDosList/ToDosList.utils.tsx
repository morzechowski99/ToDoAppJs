import {
   GridActionsCellItem,
   GridColDef,
   GridRenderCellParams,
   GridRowParams,
   GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import Api from "shared/services/api";
import { TodoListItem } from "shared/types/interfaces";
import { propertyOf } from "shared/utils";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { Priority } from "shared/types/enums";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import PriorityProgressBar from "components/PriorityProgressBar";

export const useGetTodos = () => {
   const [todos, setTodos] = useState<TodoListItem[] | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<Error | null>(null);
   const getTodos = useCallback(async () => {
      setLoading(true);
      try {
         const api = new Api();
         const response = await api.getTodos();
         setTodos(response);
      } catch (error) {
         setError(error as Error);
      } finally {
         setLoading(false);
      }
   }, []);
   return { todos, loading, error, getTodos };
};

export const useDataGrid = (): [GridColDef[]] => {
   const columns = useMemo(
      (): GridColDef<TodoListItem>[] => [
         {
            field: propertyOf<TodoListItem>("done"),
            headerName: "Done",
            renderCell: ({
               value,
            }: GridRenderCellParams<TodoListItem, string>) => {
               return value && <DoneIcon />;
            },
            type: "boolean",
            flex: 1,
         },
         {
            field: propertyOf<TodoListItem>("title"),
            headerName: "Title",
            flex: 6,
            minWidth: 100,
         },
         {
            field: propertyOf<TodoListItem>("description"),
            headerName: "Description",
            flex: 12,
         },
         {
            field: propertyOf<TodoListItem>("dueDate"),
            headerName: "Due date",
            type: "dateTime",
            valueFormatter: ({ value }: GridValueFormatterParams<Date>) => {
               if (!value) return null;
               return (
                  value &&
                  `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`
               );
            },
            flex: 5,
         },
         {
            field: propertyOf<TodoListItem>("priority"),
            headerName: "Priority",
            type: "singleSelect",
            valueOptions: Object.values(Priority),
            flex: 3,
            minWidth: 130,
            renderCell: ({
               value,
            }: GridRenderCellParams<TodoListItem, Priority>) => {
               return value && <PriorityProgressBar priority={value} />;
            },
         },
         {
            field: "actions",
            type: "actions",
            flex: 5,
            minWidth: 100,
            getActions: (params: GridRowParams<TodoListItem>) => [
               <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => {
                     console.log("delete" + params.id);
                  }}
               />,
               params.row.done ? (
                  <GridActionsCellItem
                     icon={<CheckBoxIcon />}
                     label="Undone"
                     onClick={() => {
                        console.log("done" + params.id);
                     }}
                  />
               ) : (
                  <GridActionsCellItem
                     icon={<CheckBoxOutlineBlankIcon />}
                     label="Mark as done"
                     onClick={() => {
                        console.log("undone" + params.id);
                     }}
                  />
               ),
            ],
         },
      ],
      []
   );

   return [columns];
};