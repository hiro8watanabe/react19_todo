import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputTodos } from "../InputTodos";

describe("InputTodos", () => {
  const mockOnChange = vi.fn();
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    todoText: "",
    onChange: mockOnChange,
    onClick: mockOnClick,
  };

  test("正しくレンダリングされる", () => {
    render(<InputTodos {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("todoを入力してください")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });

  test("入力値が正しく表示される", () => {
    const todoText = "テストタスク";
    render(<InputTodos {...defaultProps} todoText={todoText} />);

    const input = screen.getByDisplayValue(todoText);
    expect(input).toBeInTheDocument();
  });

  test("入力時にonChangeが呼ばれる", async () => {
    const user = userEvent.setup();
    render(<InputTodos {...defaultProps} />);

    const input = screen.getByPlaceholderText("todoを入力してください");
    await user.type(input, "テスト");

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("追加ボタンクリック時にonClickが呼ばれる", async () => {
    const user = userEvent.setup();
    render(<InputTodos {...defaultProps} />);

    const button = screen.getByRole("button", { name: "追加" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("inputとbuttonが適切なクラスを持っている", () => {
    render(<InputTodos {...defaultProps} />);

    const input = screen.getByPlaceholderText("todoを入力してください");
    const button = screen.getByRole("button", { name: "追加" });

    expect(input).toHaveClass("rounded-lg", "border-none");
    expect(button).toHaveClass("rounded-lg", "border-none", "bg-[#e9e9e9]");
  });
});
