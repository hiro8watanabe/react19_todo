interface Props {
  completeTodos: string[];
  onClickRestore: (index: number) => void;
  onClickDelete: (index: number) => void;
}

export const CompleteTodos = (props: Props) => {
  const { completeTodos, onClickRestore, onClickDelete } = props;

  return (
    <div className="complete-area">
      <p className="title">完了タスク一覧</p>
      <ul>
        {completeTodos.map((todo, index) => (
          <li key={todo}>
            <div className="list-row">
              <p className="todo-item">{todo}</p>
              <button onClick={() => onClickRestore(index)}>戻す</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
