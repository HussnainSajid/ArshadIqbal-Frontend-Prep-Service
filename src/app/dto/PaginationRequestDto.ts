export class PaginationRequestDto {
    PageNumber: number;
    PageSize: number;
  
    constructor(PageNumber: number, PageSize: number) {
      this.PageNumber = PageNumber;
      this.PageSize = PageSize;
    }
  }