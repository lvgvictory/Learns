namespace ppgpt {
  // Subject interface
  interface Document {
    display(): void;
    getContent(): string;
  }

  // RealSubject class
  class RealDocument implements Document {
    private filename: string;
    private content: string;

    constructor(filename: string) {
      this.filename = filename;
      this.content = this.loadFromDisk();
    }

    private loadFromDisk(): string {
      console.log(`Loading document ${this.filename} from disk...`);
      return "Document content"; // Giả sử nội dung được tải từ đĩa
    }

    public display(): void {
      console.log(`Displaying document ${this.filename}`);
    }

    public getContent(): string {
      return this.content;
    }
  }

  // Proxy class
  class DocumentProxy implements Document {
    private filename: string;
    private realDocument: RealDocument | null = null;
    private cache: string | null = null;

    constructor(filename: string) {
      this.filename = filename;
    }

    private logAccess(): void {
      console.log(`Accessing document ${this.filename}`);
    }

    public display(): void {
      this.logAccess();
      if (this.realDocument === null) {
        this.realDocument = new RealDocument(this.filename);
      }
      this.realDocument.display();
    }

    public getContent(): string {
      this.logAccess();
      if (this.cache === null) {
        if (this.realDocument === null) {
          this.realDocument = new RealDocument(this.filename);
        }
        this.cache = this.realDocument.getContent();
      }
      return this.cache;
    }
  }

  // Sử dụng
  const document = new DocumentProxy("large_document.pdf");

  // Lazy initialization, logging, and caching demonstration
  document.display();
  // Output:
  // Accessing document large_document.pdf
  // Loading document large_document.pdf from disk...
  // Displaying document large_document.pdf

  console.log(document.getContent());
  // Output:
  // Accessing document large_document.pdf
  // Document content

  document.display();
  // Output:
  // Accessing document large_document.pdf
  // Displaying document large_document.pdf

  console.log(document.getContent());
  // Output:
  // Accessing document large_document.pdf
  // Document content
}
