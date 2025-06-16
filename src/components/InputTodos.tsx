interface Props {
  todoText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export const InputTodos = (props: Props) => {
  const { todoText, onChange, onClick } = props;
  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="todoを入力してください"
        value={todoText}
        onChange={onChange}
      />
      <button onClick={onClick}>追加</button>
    </div>
  );
};
