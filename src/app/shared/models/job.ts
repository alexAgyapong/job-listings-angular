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

export interface JobRequestOptions extends FilterType {
  what?: string;
  where?: string;
  permanent?: string;
  contract?: string;
  part_time?: string;
  full_time?: string;
  pageSize?: number;
  page?: number;
}

export interface FilterType {
  distance?: number;
  minSalary?: number;
  maxSalary?: number;
  jobType?: number[];
  maxDaysOld?: number;
  category?: string;
  location?: string;
}
