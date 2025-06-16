import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InCompleteTodos } from "../InCompleteTodos";

describe("InCompleteTodos", () => {
  const mockOnClickComplete = vi.fn();
  const mockOnClickDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    incompleteTodos: [],
    onClickComplete: mockOnClickComplete,
    onClickDelete: mockOnClickDelete,
  };

  test("タイトルが正しく表示される", () => {
    render(<InCompleteTodos {...defaultProps} />);

    expect(screen.getByText("タスク一覧")).toBeInTheDocument();
  });

  test("todoがない場合は空のリストが表示される", () => {
    render(<InCompleteTodos {...defaultProps} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(0);
  });

  test("todoが正しく表示される", () => {
    const todos = ["タスク1", "タスク2", "タスク3"];
    render(<InCompleteTodos {...defaultProps} incompleteTodos={todos} />);

    todos.forEach((todo) => {
      expect(screen.getByText(todo)).toBeInTheDocument();
    });
  });

  test("各todoに完了ボタンと削除ボタンが表示される", () => {
    const todos = ["タスク1", "タスク2"];
    render(<InCompleteTodos {...defaultProps} incompleteTodos={todos} />);

    const completeButtons = screen.getAllByText("完了");
    const deleteButtons = screen.getAllByText("削除");

    expect(completeButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  test("完了ボタンクリック時にonClickCompleteが正しいindexで呼ばれる", async () => {
    const user = userEvent.setup();
    const todos = ["タスク1", "タスク2"];
    render(<InCompleteTodos {...defaultProps} incompleteTodos={todos} />);

    const completeButtons = screen.getAllByText("完了");
    await user.click(completeButtons[1]);

    expect(mockOnClickComplete).toHaveBeenCalledWith(1);
  });

  test("削除ボタンクリック時にonClickDeleteが正しいindexで呼ばれる", async () => {
    const user = userEvent.setup();
    const todos = ["タスク1", "タスク2"];
    render(<InCompleteTodos {...defaultProps} incompleteTodos={todos} />);

    const deleteButtons = screen.getAllByText("削除");
    await user.click(deleteButtons[0]);

    expect(mockOnClickDelete).toHaveBeenCalledWith(0);
  });

  test("適切なスタイルクラスが適用されている", () => {
    const todos = ["タスク1"];
    render(<InCompleteTodos {...defaultProps} incompleteTodos={todos} />);

    const container = screen.getByText("タスク一覧").closest("div");
    expect(container).toHaveClass("border-2", "border-[#aacfd0]", "w-[400px]");

    const title = screen.getByText("タスク一覧");
    expect(title).toHaveClass("text-center", "mt-0", "font-bold");
  });
});
