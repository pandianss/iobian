-- Centralized Style Control
CREATE TABLE system_config (
    config_key VARCHAR(50) PRIMARY KEY,
    config_value TEXT, -- Stores colors, logo URLs, etc.
    description TEXT
);

-- Organization Hierarchy (Zero-Hardcoding)
CREATE TABLE org_master (
    branch_code VARCHAR(10) PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    branch_type VARCHAR(20), -- Metro/Rural
    branch_size VARCHAR(20), -- Small/Large/VL
    specialization VARCHAR(20), -- Agri/SME/General
    region_code VARCHAR(10),
    zone_code VARCHAR(10),
    address TEXT,
    contact_number VARCHAR(15)
);

-- Users & Authentication
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20), -- 'SuperAdmin', 'CO_Planning', 'CO_HRD', 'RO', 'Branch'
    office_level VARCHAR(20), -- 'CO', 'RO', 'Branch'
    dept_id INTEGER, -- For CO Divisions (1-16)
    linked_branch_code VARCHAR(10) REFERENCES org_master(branch_code)
);

-- Service Requests (The Workflow Engine Core)
CREATE TABLE service_requests (
    request_id SERIAL PRIMARY KEY,
    request_type VARCHAR(50) NOT NULL, -- 'GL_Enabling', 'Name_Change', etc.
    status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    initiator_id INTEGER REFERENCES users(user_id),
    current_assignee_role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_payload JSONB -- Flexible storage for form data
);

-- Request History / Audit Trail
CREATE TABLE request_history (
    history_id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES service_requests(request_id),
    action_by INTEGER REFERENCES users(user_id),
    action_type VARCHAR(20), -- 'Approve', 'Reject', 'Forward'
    comments TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory / Resource Tracking
CREATE TABLE inventory (
    item_id SERIAL PRIMARY KEY,
    branch_code VARCHAR(10) REFERENCES org_master(branch_code),
    item_type VARCHAR(50), -- 'Locker', 'DebitCard_Kit', 'Voucher'
    quantity INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial System Config Seeds
INSERT INTO system_config (config_key, config_value) VALUES
('primary_color', '#0056b3'),
('secondary_color', '#17a2b8'),
('font_family', 'Inter, sans-serif'),
('logo_url', '/assets/iob_logo.png');
