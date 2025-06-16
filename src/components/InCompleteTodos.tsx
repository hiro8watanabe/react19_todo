interface Props {
  incompleteTodos: string[];
  onClickComplete: (index: number) => void;
  onClickDelete: (index: number) => void;
}

export const InCompleteTodos = (props: Props) => {
  const { incompleteTodos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">タスク一覧</p>
      <ul>
        {incompleteTodos.map((todo, index) => (
          // test用、実際はidなどを使う
          <li key={todo}>
            <div className="list-row">
              <p className="todo-item">{todo}</p>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
