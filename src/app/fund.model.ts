export interface CLOFund {
  fund: string;
  Results: {
    Result: {
      WAS: number;
      Diversity: number;
      WARF: number;
      MRR: number;
    };
    Limit: {
      WAS: number;
      Diversity: number;
      WARF: number;
      MRR: number;
    };
    Cushion: {
      WAS: number;
      Diversity: number;
      WARF: number;
      MRR: number;
    };
    result: {
      WAS: string;
      Diversity: string;
      WARF: string;
      MRR: string;
    };
  };
}
