interface Props {
  incompleteTodos: string[];
  onClickComplete: (index: number) => void;
  onClickDelete: (index: number) => void;
}

export const InCompleteTodos = (props: Props) => {
  const { incompleteTodos, onClickComplete, onClickDelete } = props;
  return (
    <div className="border-2 border-[#aacfd0] w-[400px] min-h-[200px] p-2 m-2 rounded-lg">
      <p className="text-center mt-0 font-bold">タスク一覧</p>
      <ul>
        {incompleteTodos.map((todo, index) => (
          // test用、実際はidなどを使う
          <li key={todo}>
            <div className="flex items-center justify-between">
              <p className="m-1.5">{todo}</p>
              <div>
                <button
                  className="rounded-lg border-none py-1 px-4 mx-0.5 bg-[#e9e9e9] hover:bg-[#79a8a9] hover:text-white hover:cursor-pointer"
                  onClick={() => onClickComplete(index)}
                >
                  完了
                </button>
                <button
                  className="rounded-lg border-none py-1 px-4 mx-0.5 bg-[#e9e9e9] hover:bg-[#79a8a9] hover:text-white hover:cursor-pointer"
                  onClick={() => onClickDelete(index)}
                >
                  削除
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
