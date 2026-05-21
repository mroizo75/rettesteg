export type UserRole = 'user' | 'org_admin' | 'admin';
export type Tier = 'free' | 'pro';
export type AssessmentStatus = 'in_progress' | 'completed';
export type AssessmentType = 'riasec' | 'big_five' | 'values';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';
export type OrgType = 'school' | 'municipality' | 'other';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      organizations: {
        Row: Organization;
        Insert: Omit<Organization, 'id' | 'created_at'>;
        Update: Partial<Omit<Organization, 'id' | 'created_at'>>;
      };
      assessments: {
        Row: Assessment;
        Insert: Omit<Assessment, 'id' | 'created_at'>;
        Update: Partial<Omit<Assessment, 'id' | 'created_at'>>;
      };
      assessment_questions: {
        Row: AssessmentQuestion;
        Insert: Omit<AssessmentQuestion, 'id'>;
        Update: Partial<Omit<AssessmentQuestion, 'id'>>;
      };
      assessment_responses: {
        Row: AssessmentResponse;
        Insert: Omit<AssessmentResponse, 'id' | 'created_at'>;
        Update: Partial<Omit<AssessmentResponse, 'id'>>;
      };
      assessment_results: {
        Row: AssessmentResult;
        Insert: Omit<AssessmentResult, 'id' | 'created_at'>;
        Update: Partial<Omit<AssessmentResult, 'id'>>;
      };
      careers: {
        Row: Career;
        Insert: Omit<Career, 'id' | 'created_at'>;
        Update: Partial<Omit<Career, 'id'>>;
      };
      education_programs: {
        Row: EducationProgram;
        Insert: Omit<EducationProgram, 'id' | 'created_at'>;
        Update: Partial<Omit<EducationProgram, 'id'>>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, 'id' | 'created_at'>;
        Update: Partial<Omit<Subscription, 'id'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at'>>;
      };
    };
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      get_my_role: { Args: Record<string, never>; Returns: UserRole };
    };
  };
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  role: UserRole;
  tier: Tier;
  birth_year: number | null;
  school: string | null;
  organization_id: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  type: OrgType;
  contact_email: string;
  contact_name: string | null;
  stripe_customer_id: string | null;
  subscription_status: SubscriptionStatus | null;
  max_users: number;
  created_at: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  type: AssessmentType;
  status: AssessmentStatus;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

export interface AssessmentQuestion {
  id: string;
  assessment_type: AssessmentType;
  question_no: number;
  text_no: string;
  text_en: string;
  category: string;
  weight: number;
}

export interface AssessmentResponse {
  id: string;
  assessment_id: string;
  question_id: string;
  answer_value: number;
  created_at: string;
}

export interface RiasecScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface BigFiveScores {
  O: number;
  C: number;
  E: number;
  A: number;
  N: number;
}

export interface ValuesScores {
  autonomy: number;
  security: number;
  achievement: number;
  relationships: number;
  creativity: number;
  helping: number;
  prestige: number;
  variety: number;
}

export interface AssessmentResult {
  id: string;
  assessment_id: string;
  user_id: string;
  riasec_scores: RiasecScores | null;
  big_five_scores: BigFiveScores | null;
  values_scores: ValuesScores | null;
  top_career_ids: string[];
  top_education_ids: string[];
  created_at: string;
}

export interface Career {
  id: string;
  slug: string;
  title_no: string;
  title_en: string;
  description_no: string;
  description_en: string;
  riasec_primary: string;
  riasec_secondary: string | null;
  riasec_codes: string[];
  education_level: string;
  education_years: number | null;
  sector: string;
  salary_range: string | null;
  growth_outlook: string | null;
  created_at: string;
}

export interface EducationProgram {
  id: string;
  slug: string;
  title_no: string;
  title_en: string;
  description_no: string;
  description_en: string;
  level: string;
  duration_years: number;
  riasec_match: string[];
  institution_type: string;
  subject_list: string[];
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string | null;
  organization_id: string | null;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  tier: Tier;
  status: SubscriptionStatus;
  current_period_end: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title_no: string;
  title_en: string;
  excerpt_no: string;
  excerpt_en: string;
  content_no: string;
  content_en: string;
  published: boolean;
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}
