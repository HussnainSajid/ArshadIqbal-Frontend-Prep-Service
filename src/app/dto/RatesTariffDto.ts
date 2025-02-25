export class RatesTariffDto {
    id: number;
    type?: string;
    key?: string;
    value?: string;
  
    constructor(
      id: number,
      type?: string,
      key?: string,
      value?: string
    ) {
      this.id = id;
      this.type = type;
      this.key = key;
      this.value = value;
    }
  }