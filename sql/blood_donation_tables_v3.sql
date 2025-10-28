-- =====================================================
-- BLOOD DONATION MANAGEMENT SYSTEM (Version 3)
-- Complete SQL Schema + Procedures + Triggers + Functions
-- Author: Yuv & Lasya
-- =====================================================

CREATE DATABASE blood_org_db;
USE blood_org_db;

SET GLOBAL event_scheduler = ON;

-- =====================================================
-- TABLE DEFINITIONS
-- =====================================================

CREATE TABLE hospitals (
  hospital_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  contact     VARCHAR(100) NOT NULL,
  location    VARCHAR(255) NOT NULL
);

CREATE TABLE donors (
  donor_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  contact      VARCHAR(100) NOT NULL,
  dob          DATE NOT NULL,
  blood_group  ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL
);

CREATE TABLE recipients (
  recipient_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  contact      VARCHAR(100) NOT NULL,
  hospital_id  BIGINT NOT NULL,
  blood_group  ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  CONSTRAINT fk_recipient_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);

CREATE TABLE staff (
  staff_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  hospital_id  BIGINT NOT NULL,
  role         ENUM('technician','nurse','phlebotomist','admin','manager','doctor') NOT NULL,
  certification VARCHAR(255),
  CONSTRAINT fk_staff_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);

CREATE TABLE donation_camps (
  camp_id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  date_held       DATE NOT NULL,
  organization    VARCHAR(255) NOT NULL,
  location        VARCHAR(255) NOT NULL,
  units_collected INT NOT NULL DEFAULT 0
);

CREATE TABLE blood_inventory (
  blood_unit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  blood_group   ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  quantity_ml   INT NOT NULL,
  donor_id      BIGINT NOT NULL,
  hospital_id   BIGINT NOT NULL,
  camp_id       BIGINT NULL,
  expiry_date   DATE NOT NULL,
  status        ENUM('available','reserved','issued','expired','discarded') NOT NULL DEFAULT 'available',
  CONSTRAINT fk_inventory_donor FOREIGN KEY (donor_id) REFERENCES donors(donor_id),
  CONSTRAINT fk_inventory_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id),
  CONSTRAINT fk_inventory_camp FOREIGN KEY (camp_id) REFERENCES donation_camps(camp_id)
);

CREATE TABLE blood_transactions (
  transaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  recipient_id   BIGINT NOT NULL,
  blood_unit_id  BIGINT NOT NULL,
  amount         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status         ENUM('pending','completed','cancelled','refunded') NOT NULL DEFAULT 'pending',
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_txn_recipient FOREIGN KEY (recipient_id) REFERENCES recipients(recipient_id),
  CONSTRAINT fk_txn_unit FOREIGN KEY (blood_unit_id) REFERENCES blood_inventory(blood_unit_id)
);

-- Audit table for all operations on blood issuance
CREATE TABLE audit_log (
  log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  action_type VARCHAR(50),
  reference_id BIGINT,
  details TEXT,
  performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DUMMY DATA (10 entries)
-- =====================================================

INSERT INTO hospitals (name, contact, location) VALUES
('CityCare Hospital','080-4000-1001','Bengaluru, KA'),
('Lakeside Medical Center','0821-555-2200','Mysuru, KA'),
('Sunrise Hospital','0824-888-7711','Mangaluru, KA');

INSERT INTO donors (name, contact, dob, blood_group) VALUES
('Arjun Mehta','9876543210','1995-06-15','A+'),
('Priya Nair','9876501234','1999-11-03','O-'),
('Rohan Gupta','9812312345','1988-02-20','B+'),
('Neel Rao','9823456789','1993-07-12','AB+'),
('Sneha Iyer','9898765432','1990-01-05','A-'),
('Manoj Kumar','9812345678','1994-12-23','B-'),
('Ananya Das','9834567890','2000-04-10','O+'),
('Kabir Singh','9801234567','1991-03-03','AB-'),
('Isha Patel','9845671230','1996-09-18','A+'),
('Rahul Verma','9821345678','1998-08-22','O+');

INSERT INTO recipients (name, contact, hospital_id, blood_group) VALUES
('Neha Sharma','9900123456',1,'A+'),
('Vikram Rao','9900456789',2,'O-'),
('Kavya Iyer','9898011223',1,'AB+');

INSERT INTO donation_camps (date_held, organization, location, units_collected) VALUES
('2025-09-10','RedCross','Bengaluru',5),
('2025-10-05','YouthBlood','Mysuru',3);

INSERT INTO blood_inventory (blood_group, quantity_ml, donor_id, hospital_id, camp_id, expiry_date, status) VALUES
('A+',450,1,1,1,'2025-12-15','available'),
('O-',350,2,2,NULL,'2025-12-20','available'),
('B+',450,3,1,NULL,'2025-11-30','available'),
('AB+',400,4,1,1,'2025-12-25','available'),
('A-',450,5,1,NULL,'2025-11-25','available'),
('B-',450,6,2,2,'2025-11-28','available'),
('O+',450,7,3,1,'2025-12-10','available'),
('AB-',450,8,2,NULL,'2025-12-05','available'),
('A+',450,9,1,NULL,'2025-12-12','available'),
('O+',350,10,3,1,'2025-11-29','available');

-- =====================================================
-- FUNCTIONS
-- =====================================================

DELIMITER //
CREATE FUNCTION GetDonorAge(donorId BIGINT)
RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE age INT;
  SELECT TIMESTAMPDIFF(YEAR, dob, CURDATE()) INTO age
  FROM donors WHERE donor_id = donorId;
  RETURN age;
END //

CREATE FUNCTION GetAvailableUnits(bloodGroup ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-'))
RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE total INT DEFAULT 0;
  SELECT COUNT(*) INTO total
  FROM blood_inventory
  WHERE blood_group = bloodGroup AND status = 'available';
  RETURN total;
END //

CREATE FUNCTION GetHospitalStock(hospName VARCHAR(255))
RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE total INT DEFAULT 0;
  SELECT COUNT(*) INTO total
  FROM blood_inventory bi
  JOIN hospitals h ON h.hospital_id = bi.hospital_id
  WHERE h.name = hospName AND bi.status = 'available';
  RETURN total;
END //

CREATE FUNCTION GetTotalTransactions(recipientName VARCHAR(255))
RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE total INT;
  SELECT COUNT(*) INTO total
  FROM blood_transactions bt
  JOIN recipients r ON bt.recipient_id = r.recipient_id
  WHERE r.name = recipientName AND bt.status = 'completed';
  RETURN total;
END //
DELIMITER ;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

DELIMITER //
CREATE PROCEDURE AddBloodDonation(
    IN donorName VARCHAR(255),
    IN hospitalName VARCHAR(255),
    IN bloodGroup ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-'),
    IN quantity INT,
    IN expiry DATE
)
BEGIN
    DECLARE donorId BIGINT;
    DECLARE hospitalId BIGINT;
    SELECT donor_id INTO donorId FROM donors WHERE name = donorName;
    SELECT hospital_id INTO hospitalId FROM hospitals WHERE name = hospitalName;
    INSERT INTO blood_inventory (blood_group, quantity_ml, donor_id, hospital_id, expiry_date)
    VALUES (bloodGroup, quantity, donorId, hospitalId, expiry);
END //

CREATE PROCEDURE IssueBlood(
    IN recipientName VARCHAR(255),
    IN bloodGroup ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-'),
    IN amount DECIMAL(10,2)
)
BEGIN
    DECLARE recId BIGINT;
    DECLARE unitId BIGINT;
    SELECT recipient_id INTO recId FROM recipients WHERE name = recipientName;
    SELECT blood_unit_id INTO unitId FROM blood_inventory
    WHERE blood_group = bloodGroup AND status = 'available'
    ORDER BY expiry_date ASC LIMIT 1;
    IF unitId IS NOT NULL THEN
        UPDATE blood_inventory SET status = 'issued' WHERE blood_unit_id = unitId;
        INSERT INTO blood_transactions (recipient_id, blood_unit_id, amount, status)
        VALUES (recId, unitId, amount, 'completed');
        INSERT INTO audit_log (action_type, reference_id, details)
        VALUES ('IssueBlood', unitId, CONCAT('Issued to ', recipientName, ' for Rs ', amount));
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No available blood unit for the requested group';
    END IF;
END //

CREATE PROCEDURE RegisterRecipient(
    IN name VARCHAR(255),
    IN contact VARCHAR(100),
    IN hospitalName VARCHAR(255),
    IN bloodGroup ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-')
)
BEGIN
    DECLARE hospId BIGINT;
    SELECT hospital_id INTO hospId FROM hospitals WHERE name = hospitalName;
    INSERT INTO recipients (name, contact, hospital_id, blood_group)
    VALUES (name, contact, hospId, bloodGroup);
END //
DELIMITER ;

-- =====================================================
-- TRIGGERS
-- =====================================================

DELIMITER //
CREATE TRIGGER trg_update_camp_units
AFTER INSERT ON blood_inventory
FOR EACH ROW
BEGIN
  IF NEW.camp_id IS NOT NULL THEN
    UPDATE donation_camps SET units_collected = units_collected + 1 WHERE camp_id = NEW.camp_id;
  END IF;
END //

CREATE TRIGGER trg_prevent_issued_delete
BEFORE DELETE ON blood_inventory
FOR EACH ROW
BEGIN
  IF OLD.status = 'issued' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete issued blood record';
  END IF;
END //

CREATE TRIGGER trg_log_transaction_delete
AFTER DELETE ON blood_transactions
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (action_type, reference_id, details)
  VALUES ('DeleteTransaction', OLD.transaction_id, 'Transaction was deleted manually.');
END //
DELIMITER ;

-- =====================================================
-- EVENT (Daily Expiry Check)
-- =====================================================

CREATE EVENT evt_mark_expired
ON SCHEDULE EVERY 1 DAY
DO
  UPDATE blood_inventory
  SET status='expired'
  WHERE expiry_date < CURDATE() AND status='available';

-- =====================================================
-- VIEWS (Summary Dashboard)
-- =====================================================

CREATE OR REPLACE VIEW v_hospital_summary AS
SELECT 
  h.hospital_id,
  h.name AS hospital_name,
  COUNT(bi.blood_unit_id) AS total_units,
  SUM(bi.status = 'available') AS available_units,
  SUM(bi.status = 'issued') AS issued_units,
  SUM(bi.status = 'expired') AS expired_units
FROM hospitals h
LEFT JOIN blood_inventory bi ON h.hospital_id = bi.hospital_id
GROUP BY h.hospital_id, h.name;

-- =====================================================
-- TEST QUERIES (commented)
-- =====================================================
-- CALL AddBloodDonation('Isha Patel', 'CityCare Hospital', 'A+', 500, '2025-12-30');
-- CALL IssueBlood('Neha Sharma', 'A+', 1500.00);
-- CALL RegisterRecipient('Riya Sen', '9911122233', 'Lakeside Medical Center', 'B+');
-- SELECT * FROM v_hospital_summary;
-- SELECT * FROM audit_log;
-- SELECT * FROM blood_inventory;
-- SELECT * FROM blood_transactions;
