export class CustomError extends Error {
    status: number;
    url?: string;
    method?: string;
    constructor(message: string, status: number, url?: string, method?: string) {
      super(message);
      this.status = status;
      this.url = url;
      this.method = method;
    }
}
  