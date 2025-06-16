import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Todo } from "../Todo";

describe("Todo", () => {
  test("アプリケーションが正しくレンダリングされる", () => {
    render(<Todo />);

    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("todoを入力してください")
    ).toBeInTheDocument();
    expect(screen.getByText("タスク一覧")).toBeInTheDocument();
    expect(screen.getByText("完了タスク一覧")).toBeInTheDocument();
  });

  test("新しいタスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText("todoを入力してください");
    const addButton = screen.getByRole("button", { name: "追加" });

    await user.type(input, "新しいタスク");
    await user.click(addButton);

    expect(screen.getByText("新しいタスク")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("空文字の場合はタスクが追加されない", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const addButton = screen.getByRole("button", { name: "追加" });
    await user.click(addButton);

    const taskLists = screen.getAllByRole("list");
    taskLists.forEach((list) => {
      expect(list.children).toHaveLength(0);
    });
  });

  test("タスクを完了にできる", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    // タスクを追加
    const input = screen.getByPlaceholderText("todoを入力してください");
    await user.type(input, "テストタスク");
    await user.click(screen.getByRole("button", { name: "追加" }));

    // 完了ボタンをクリック
    const completeButton = screen.getByRole("button", { name: "完了" });
    await user.click(completeButton);

    // 完了リストに移動したことを確認
    expect(screen.getByText("テストタスク")).toBeInTheDocument();

    // 未完了リストから削除されたことを確認
    const incompleteTodos = screen
      .getByText("タスク一覧")
      .closest("div")
      ?.querySelector("ul");
    expect(incompleteTodos?.children).toHaveLength(0);
  });

  test("未完了タスクを削除できる", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    // タスクを追加
    const input = screen.getByPlaceholderText("todoを入力してください");
    await user.type(input, "削除テストタスク");
    await user.click(screen.getByRole("button", { name: "追加" }));

    // 削除ボタンをクリック
    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[0]);

    // タスクが削除されたことを確認
    expect(screen.queryByText("削除テストタスク")).not.toBeInTheDocument();
  });

  test("完了タスクを戻すことができる", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    // タスクを追加して完了にする
    const input = screen.getByPlaceholderText("todoを入力してください");
    await user.type(input, "戻すテストタスク");
    await user.click(screen.getByRole("button", { name: "追加" }));
    await user.click(screen.getByRole("button", { name: "完了" }));

    // 戻すボタンをクリック
    const restoreButton = screen.getByRole("button", { name: "戻す" });
    await user.click(restoreButton);

    // 未完了リストに戻ったことを確認
    expect(screen.getByText("戻すテストタスク")).toBeInTheDocument();

    // 完了リストから削除されたことを確認
    const completeTodos = screen
      .getByText("完了タスク一覧")
      .closest("div")
      ?.querySelector("ul");
    expect(completeTodos?.children).toHaveLength(0);
  });

  test("完了タスクを削除できる", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    // タスクを追加して完了にする
    const input = screen.getByPlaceholderText("todoを入力してください");
    await user.type(input, "完了削除テストタスク");
    await user.click(screen.getByRole("button", { name: "追加" }));
    await user.click(screen.getByRole("button", { name: "完了" }));

    // 完了タスクの削除ボタンをクリック
    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[0]);

    // タスクが削除されたことを確認
    expect(screen.queryByText("完了削除テストタスク")).not.toBeInTheDocument();
  });

  test("複数のタスクを正しく管理できる", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText("todoを入力してください");
    const addButton = screen.getByRole("button", { name: "追加" });

    // 複数のタスクを追加
    await user.type(input, "タスク1");
    await user.click(addButton);
    await user.type(input, "タスク2");
    await user.click(addButton);
    await user.type(input, "タスク3");
    await user.click(addButton);

    // 全てのタスクが表示されていることを確認
    expect(screen.getByText("タスク1")).toBeInTheDocument();
    expect(screen.getByText("タスク2")).toBeInTheDocument();
    expect(screen.getByText("タスク3")).toBeInTheDocument();

    // 一つを完了にする
    const completeButtons = screen.getAllByRole("button", { name: "完了" });
    await user.click(completeButtons[1]); // タスク2を完了

    // 完了リストに移動したことを確認
    const completeTodos = screen
      .getByText("完了タスク一覧")
      .closest("div")
      ?.querySelector("ul");
    expect(completeTodos?.children).toHaveLength(1);

    // 未完了リストに2つ残っていることを確認
    const incompleteTodos = screen
      .getByText("タスク一覧")
      .closest("div")
      ?.querySelector("ul");
    expect(incompleteTodos?.children).toHaveLength(2);
  });
});
