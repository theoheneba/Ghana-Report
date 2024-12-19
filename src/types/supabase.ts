export interface Database {
  public: {
    Tables: {
      reports: {
        Row: {
          id: string;
          title: string;
          category: string;
          description: string;
          date: string;
          location: string;
          involved_parties?: string;
          willing_to_testify: boolean;
          created_at: string;
          status: string;
          report_id: string;
        };
        Insert: {
          title: string;
          category: string;
          description: string;
          date: string;
          location: string;
          involved_parties?: string;
          willing_to_testify?: boolean;
        };
      };
    };
  };
}