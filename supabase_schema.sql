-- ====================================================================
-- SUPABASE DATABASE SCHEMA & SEED DATA
-- AI-Powered Academia–Industry Skill Intelligence Platform
-- Target Supabase Project: https://oaylkobjuhdlewtkkmzu.supabase.co
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SKILL MASTER TABLE
CREATE TABLE IF NOT EXISTS skills (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    parent_skill_id BIGINT REFERENCES skills(id) ON DELETE SET NULL,
    aliases VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TARGET ROLE MASTER TABLE
CREATE TABLE IF NOT EXISTS target_roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. ROLE SKILLS BENCHMARK TABLE
CREATE TABLE IF NOT EXISTS role_skills (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES target_roles(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    importance_score INT DEFAULT 80, -- 1-100
    minimum_score INT DEFAULT 70,     -- 1-100
    CONSTRAINT unique_role_skill UNIQUE (role_id, skill_id)
);

-- 4. STUDENT PROFILES TABLE
CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    department VARCHAR(100) DEFAULT 'Computer Science & Engineering',
    graduation_year INT DEFAULT 2026,
    cgpa NUMERIC(3,2) DEFAULT 8.50,
    target_role_id BIGINT REFERENCES target_roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. VERIFIED STUDENT SKILLS TABLE
CREATE TABLE IF NOT EXISTS student_skills (
    id BIGSERIAL PRIMARY KEY,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    verified_score INT DEFAULT 0,  -- 0-100
    confidence_score INT DEFAULT 0, -- 0-100
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_student_skill UNIQUE (student_profile_id, skill_id)
);

-- 6. EVIDENCE RECORDS TABLE
CREATE TABLE IF NOT EXISTS evidence_records (
    id BIGSERIAL PRIMARY KEY,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    source_type VARCHAR(50) NOT NULL, -- AST_CODE_ANALYSIS, ASSESSMENT, CERTIFICATE, MENTOR_FEEDBACK
    evidence_score INT NOT NULL,
    confidence_weight NUMERIC(3,2) DEFAULT 1.0,
    evidence_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    skill_id BIGINT REFERENCES skills(id) ON DELETE SET NULL,
    url VARCHAR(500),
    duration_hours INT DEFAULT 20,
    difficulty VARCHAR(50) DEFAULT 'INTERMEDIATE'
);

-- 8. LEARNING PATHS TABLE
CREATE TABLE IF NOT EXISTS learning_paths (
    id BIGSERIAL PRIMARY KEY,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    target_role_id BIGINT REFERENCES target_roles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS',
    progress_percentage INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. LEARNING PATH STEPS
CREATE TABLE IF NOT EXISTS learning_path_steps (
    id BIGSERIAL PRIMARY KEY,
    learning_path_id BIGINT NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES skills(id) ON DELETE CASCADE,
    course_id BIGINT REFERENCES courses(id) ON DELETE SET NULL,
    step_order INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

-- 10. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS companies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    description TEXT,
    website VARCHAR(255),
    location VARCHAR(255),
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. OPPORTUNITIES TABLE
CREATE TABLE IF NOT EXISTS opportunities (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- JOB, INTERNSHIP, APPRENTICESHIP, LIVE_PROJECT
    description TEXT,
    location VARCHAR(255),
    duration VARCHAR(100),
    stipend VARCHAR(100),
    min_cgpa NUMERIC(3,2) DEFAULT 6.00,
    preferred_degree VARCHAR(255),
    status VARCHAR(50) DEFAULT 'OPEN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. OPPORTUNITY SKILLS TABLE
CREATE TABLE IF NOT EXISTS opportunity_skills (
    id BIGSERIAL PRIMARY KEY,
    opportunity_id BIGINT NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    importance INT DEFAULT 80,
    minimum_score INT DEFAULT 60,
    CONSTRAINT unique_opp_skill UNIQUE (opportunity_id, skill_id)
);

-- 13. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
    id BIGSERIAL PRIMARY KEY,
    opportunity_id BIGINT NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    match_score INT DEFAULT 85,
    status VARCHAR(50) DEFAULT 'APPLIED',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_app UNIQUE (opportunity_id, student_profile_id)
);

-- 14. ACADEMICIANS TABLE
CREATE TABLE IF NOT EXISTS academicians (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    institution VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    expertise VARCHAR(500),
    publications_count INT DEFAULT 12,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. COLLABORATIONS TABLE
CREATE TABLE IF NOT EXISTS collaborations (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- RESEARCH, GUEST_LECTURE, WORKSHOP, FDP
    description TEXT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. MENTORS & MENTORSHIPS
CREATE TABLE IF NOT EXISTS mentors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    company_name VARCHAR(255),
    designation VARCHAR(255),
    expertise VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS mentor_feedback (
    id BIGSERIAL PRIMARY KEY,
    mentor_id BIGINT NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    technical_rating INT NOT NULL,
    communication_rating INT NOT NULL,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS internships (
    id BIGSERIAL PRIMARY KEY,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    company_id BIGINT REFERENCES companies(id) ON DELETE CASCADE,
    opportunity_title VARCHAR(255),
    mentor_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ONGOING',
    start_date DATE,
    end_date DATE
);

-- ====================================================================
-- SEED DATA INJECTION
-- ====================================================================

-- Seed Skills
INSERT INTO skills (id, name, category, description) VALUES
(1, 'Java', 'Programming', 'Core Java, Multithreading, Memory Management'),
(2, 'Spring Boot', 'Backend', 'REST APIs, Dependency Injection, Microservices'),
(3, 'SQL / PostgreSQL', 'Database', 'Relational Database Queries & Schema Design'),
(4, 'Cloud Architecture', 'Cloud', 'AWS/GCP Distributed Infrastructure'),
(5, 'Docker & Containers', 'DevOps', 'Containerization & Container Orchestration'),
(6, 'AI/ML', 'AI/ML', 'Machine Learning, Neural Networks, PyTorch'),
(7, 'Cybersecurity', 'Security', 'Web Security, Cryptography, OWASP'),
(8, 'Technical Communication', 'Soft Skills', 'Technical Writing & Team Presentations')
ON CONFLICT (id) DO NOTHING;

-- Seed Target Roles
INSERT INTO target_roles (id, name, category, description) VALUES
(1, 'Backend Engineer', 'Engineering', 'Build high-performance REST microservices and database engines.'),
(2, 'Cloud Solutions Architect', 'Cloud', 'Design fault-tolerant AWS multi-region infrastructure.'),
(3, 'Data & AI Engineer', 'AI/ML', 'Train and deploy deep learning vision models.')
ON CONFLICT (id) DO NOTHING;

-- Seed Companies
INSERT INTO companies (id, name, industry, description, location) VALUES
(1, 'VMware / Broadcom', 'Enterprise Cloud', 'Multi-cloud enterprise digital infrastructure.', 'Bangalore, India'),
(2, 'Google Cloud', 'AI & Cloud Infrastructure', 'Global cloud computing suite.', 'Hyderabad / Remote'),
(3, 'Razorpay', 'Fintech', 'India payment gateway infrastructure.', 'Bangalore, India')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS) policies for public access on demo tables
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE target_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access to target_roles" ON target_roles FOR SELECT USING (true);
CREATE POLICY "Allow public read access to companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Allow public read access to opportunities" ON opportunities FOR SELECT USING (true);
