import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CompleteTodos } from "../CompleteTodos";

describe("CompleteTodos", () => {
  const mockOnClickRestore = vi.fn();
  const mockOnClickDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    completeTodos: [],
    onClickRestore: mockOnClickRestore,
    onClickDelete: mockOnClickDelete,
  };

  test("タイトルが正しく表示される", () => {
    render(<CompleteTodos {...defaultProps} />);

    expect(screen.getByText("完了タスク一覧")).toBeInTheDocument();
  });

  test("完了todoがない場合は空のリストが表示される", () => {
    render(<CompleteTodos {...defaultProps} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(0);
  });

  test("完了todoが正しく表示される", () => {
    const todos = ["完了タスク1", "完了タスク2", "完了タスク3"];
    render(<CompleteTodos {...defaultProps} completeTodos={todos} />);

    todos.forEach((todo) => {
      expect(screen.getByText(todo)).toBeInTheDocument();
    });
  });

  test("各todoに戻すボタンと削除ボタンが表示される", () => {
    const todos = ["完了タスク1", "完了タスク2"];
    render(<CompleteTodos {...defaultProps} completeTodos={todos} />);

    const restoreButtons = screen.getAllByText("戻す");
    const deleteButtons = screen.getAllByText("削除");

    expect(restoreButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  test("戻すボタンクリック時にonClickRestoreが正しいindexで呼ばれる", async () => {
    const user = userEvent.setup();
    const todos = ["完了タスク1", "完了タスク2"];
    render(<CompleteTodos {...defaultProps} completeTodos={todos} />);

    const restoreButtons = screen.getAllByText("戻す");
    await user.click(restoreButtons[1]);

    expect(mockOnClickRestore).toHaveBeenCalledWith(1);
  });

  test("削除ボタンクリック時にonClickDeleteが正しいindexで呼ばれる", async () => {
    const user = userEvent.setup();
    const todos = ["完了タスク1", "完了タスク2"];
    render(<CompleteTodos {...defaultProps} completeTodos={todos} />);

    const deleteButtons = screen.getAllByText("削除");
    await user.click(deleteButtons[0]);

    expect(mockOnClickDelete).toHaveBeenCalledWith(0);
  });

  test("適切なスタイルクラスが適用されている", () => {
    const todos = ["完了タスク1"];
    render(<CompleteTodos {...defaultProps} completeTodos={todos} />);

    const container = screen.getByText("完了タスク一覧").closest("div");
    expect(container).toHaveClass(
      "border-2",
      "border-[#aacfd0]",
      "bg-[#c9dede]"
    );

    const title = screen.getByText("完了タスク一覧");
    expect(title).toHaveClass("text-center", "mt-0", "font-bold");
  });

  test("完了エリア特有の背景色が適用されている", () => {
    render(<CompleteTodos {...defaultProps} />);

    const container = screen.getByText("完了タスク一覧").closest("div");
    expect(container).toHaveClass("bg-[#c9dede]");
  });
});
