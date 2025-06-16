interface Props {
  completeTodos: string[];
  onClickRestore: (index: number) => void;
  onClickDelete: (index: number) => void;
}

export const CompleteTodos = (props: Props) => {
  const { completeTodos, onClickRestore, onClickDelete } = props;

  return (
    <div className="border-2 border-[#aacfd0] w-[400px] min-h-[200px] p-2 m-2 rounded-lg bg-[#c9dede]">
      <p className="text-center mt-0 font-bold">完了タスク一覧</p>
      <ul>
        {completeTodos.map((todo, index) => (
          <li key={todo}>
            <div className="flex items-center justify-between">
              <p className="m-1.5">{todo}</p>
              <div>
                <button
                  className="rounded-lg border-none py-1 px-4 mx-0.5 bg-[#e9e9e9] hover:bg-[#79a8a9] hover:text-white hover:cursor-pointer"
                  onClick={() => onClickRestore(index)}
                >
                  戻す
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
