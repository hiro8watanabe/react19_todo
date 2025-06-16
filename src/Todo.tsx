// import "./Todo.css";
import { useState } from "react";
import { InputTodos } from "./components/InputTodos";
import { InCompleteTodos } from "./components/InCompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  const onClickAdd = () => {
    if (todoText === "") return;
    setIncompleteTodos([...incompleteTodos, todoText]);
    setTodoText("");
  };

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const onClickIncompleteDelete = (index: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
  };

  const onClickCompleteDelete = (index: number) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickComplete = (index: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    const newCompleteTodos = [...completeTodos, newIncompleteTodos[index]];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickCompleteRestore = (index: number) => {
    const newCompleteTodos = [...completeTodos];
    const newIncompleteTodos = [...incompleteTodos, newCompleteTodos[index]];
    newCompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <div className="font-sans text-gray-600 w-[400px] m-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Todo List</h1>
      <InputTodos
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />

      <InCompleteTodos
        incompleteTodos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickIncompleteDelete}
      />

      <CompleteTodos
        completeTodos={completeTodos}
        onClickRestore={onClickCompleteRestore}
        onClickDelete={onClickCompleteDelete}
      />
    </div>
  );
};
