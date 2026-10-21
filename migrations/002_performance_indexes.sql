-- Migration 002: B-Tree and GiST Indexes for Sub-Millisecond Scans
CREATE INDEX IF NOT EXISTS idx_zoomdrive_status ON zoomdrive_entities (status);
CREATE INDEX IF NOT EXISTS idx_zoomdrive_cat_status ON zoomdrive_entities (category, status);
CREATE INDEX IF NOT EXISTS idx_zoomdrive_lease_expires ON zoomdrive_leases (entity_id, expires_at) WHERE released = FALSE;
