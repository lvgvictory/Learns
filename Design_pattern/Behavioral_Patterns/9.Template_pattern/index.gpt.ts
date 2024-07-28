namespace tp {
  abstract class DataProcessor {
    // Template method
    public process(): void {
      this.loadData();
      this.parseData();
      this.processData();
      this.saveData();
    }

    protected abstract loadData(): void;
    protected abstract parseData(): void;
    protected abstract processData(): void;

    protected saveData(): void {
      console.log("Saving data...");
    }
  }

  class CSVDataProcessor extends DataProcessor {
    protected loadData(): void {
      console.log("Loading CSV data...");
    }

    protected parseData(): void {
      console.log("Parsing CSV data...");
    }

    protected processData(): void {
      console.log("Processing CSV data...");
    }
  }

  class JSONDataProcessor extends DataProcessor {
    protected loadData(): void {
      console.log("Loading JSON data...");
    }

    protected parseData(): void {
      console.log("Parsing JSON data...");
    }

    protected processData(): void {
      console.log("Processing JSON data...");
    }
  }

  const csvProcessor = new CSVDataProcessor();
  csvProcessor.process();

  const jsonProcessor = new JSONDataProcessor();
  jsonProcessor.process();
}
