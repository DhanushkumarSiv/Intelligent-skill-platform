import { supabase } from '../utils/supabase/client';

export interface SupabaseSkill {
  id: number;
  name: string;
  category: string;
  description: string;
}

export interface SupabaseCompany {
  id: number;
  name: string;
  industry: string;
  description: string;
  location: string;
}

export interface SupabaseOpportunity {
  id: number;
  company_id: number;
  title: string;
  type: string;
  description: string;
  location: string;
}

export const fetchSupabaseSkills = async (): Promise<SupabaseSkill[]> => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*');

    if (error || !data || data.length === 0) {
      return [
        { id: 1, name: 'Java', category: 'Programming', description: 'Core Java & OOP' },
        { id: 2, name: 'Spring Boot', category: 'Backend', description: 'Microservices & REST' },
        { id: 3, name: 'Cloud Architecture', category: 'Cloud', description: 'AWS Infrastructure' },
        { id: 4, name: 'Docker & Containers', category: 'DevOps', description: 'Containerization' }
      ];
    }
    return data as SupabaseSkill[];
  } catch (e) {
    return [
      { id: 1, name: 'Java', category: 'Programming', description: 'Core Java & OOP' },
      { id: 2, name: 'Spring Boot', category: 'Backend', description: 'Microservices & REST' },
      { id: 3, name: 'Cloud Architecture', category: 'Cloud', description: 'AWS Infrastructure' }
    ];
  }
};

export const fetchSupabaseCompanies = async (): Promise<SupabaseCompany[]> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*');

    if (error || !data || data.length === 0) {
      return [
        { id: 1, name: 'VMware / Broadcom', industry: 'Enterprise Cloud', description: 'Multi-cloud virtualization.', location: 'Bangalore, India' },
        { id: 2, name: 'Google Cloud', industry: 'AI & Cloud', description: 'Cloud infrastructure.', location: 'Hyderabad / Remote' }
      ];
    }
    return data as SupabaseCompany[];
  } catch (e) {
    return [
      { id: 1, name: 'VMware / Broadcom', industry: 'Enterprise Cloud', description: 'Multi-cloud virtualization.', location: 'Bangalore, India' }
    ];
  }
};

export const fetchSupabaseOpportunities = async (): Promise<SupabaseOpportunity[]> => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*');

    if (error || !data) {
      return [];
    }
    return data as SupabaseOpportunity[];
  } catch (e) {
    return [];
  }
};
