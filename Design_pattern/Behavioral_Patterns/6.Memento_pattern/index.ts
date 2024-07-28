namespace aaa {
  // Memento: Đối tượng lưu trữ trạng thái
  class Memento {
    private state: string;

    constructor(state: string) {
      this.state = state;
    }

    getState(): string {
      return this.state;
    }
  }

  // Originator: Đối tượng có trạng thái cần được lưu trữ và khôi phục
  class Editor {
    private content: string = "";

    setContent(content: string): void {
      this.content = content;
    }

    getContent(): string {
      return this.content;
    }

    createMemento(): Memento {
      return new Memento(this.content);
    }

    restoreFromMemento(memento: Memento): void {
      this.content = memento.getState();
    }
  }

  // Caretaker: Quản lý và lưu trữ các memento
  class History {
    private mementos: Memento[] = [];

    push(memento: Memento): void {
      this.mementos.push(memento);
    }

    pop(): Memento | undefined {
      return this.mementos.pop();
    }
  }

  // Sử dụng
  const editor = new Editor();
  const history = new History();

  // Thực hiện các thay đổi và lưu trạng thái
  editor.setContent("Nội dung ban đầu");
  history.push(editor.createMemento());

  editor.setContent("Nội dung đã thay đổi");
  history.push(editor.createMemento());

  editor.setContent("Nội dung cuối cùng");

  // Undo
  const lastMemento = history.pop();
  if (lastMemento) {
    editor.restoreFromMemento(lastMemento);
    console.log(editor.getContent()); // Output: "Nội dung đã thay đổi"
  }

  // Undo lần nữa
  const previousMemento = history.pop();
  if (previousMemento) {
    editor.restoreFromMemento(previousMemento);
    console.log(editor.getContent()); // Output: "Nội dung ban đầu"
  }
}
