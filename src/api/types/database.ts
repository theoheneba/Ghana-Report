export interface Database {
  public: {
    Tables: {
      reports: {
        Row: {
          id: string;
          report_id: string;
          title: string;
          category: string;
          description: string;
          date: string;
          location: string;
          involved_parties?: string;
          willing_to_testify: boolean;
          status: string;
          created_at: string;
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
      report_comments: {
        Row: {
          id: string;
          report_id: string;
          user_id: string;
          user_email: string;
          content: string;
          created_at: string;
        };
      };
      report_activities: {
        Row: {
          id: string;
          report_id: string;
          user_id: string;
          user_email: string;
          type: string;
          description: string;
          created_at: string;
        };
      };
    };
  };
}