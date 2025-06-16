interface Props {
  todoText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export const InputTodos = (props: Props) => {
  const { todoText, onChange, onClick } = props;
  return (
    <div className="bg-[#c6e5d9] w-[400px] p-2 m-2 rounded-lg flex justify-between">
      <input
        className="rounded-lg border-none py-1.5 px-4"
        type="text"
        placeholder="todoを入力してください"
        value={todoText}
        onChange={onChange}
      />
      <button
        className="rounded-lg border-none py-1 px-4 mx-0.5 bg-[#e9e9e9] hover:bg-[#79a8a9] hover:text-white hover:cursor-pointer"
        onClick={onClick}
      >
        追加
      </button>
    </div>
  );
};
