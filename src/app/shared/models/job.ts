export interface Location {
  __CLASS__: string;
  display_name: string;
  area: string[];
}

export interface Category {
  label: string;
  __CLASS__: string;
  tag: string;
}

export interface Company {
  __CLASS__: string;
  display_name: string;
}

export interface Job {
  __CLASS__: string;
  salary_min: number;
  location: Location;
  latitude: number;
  contract_time: string;
  id: string;
  category: Category;
  created: Date;
  redirect_url: string;
  adref: string;
  company: Company;
  title: string;
  longitude: number;
  description: string;
  salary_max: number;
  salary_is_predicted: string;
  contract_type: string;
}

export interface JobResponse {
  mean: number;
  count: number;
  __CLASS__: string;
  results: Job[];
}

export interface JobRequestOptions {
  contract?: string;
  pageSize?: number;
  what: string;
  where?: string;
  part_time?: string;
  full_time?: string;
}