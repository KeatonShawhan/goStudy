
-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    major VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- StudyGroups Table
CREATE TABLE IF NOT EXISTS StudyGroups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- GroupMembers Table
CREATE TABLE IF NOT EXISTS GroupMembers (
    user_id INT,
    group_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('member', 'admin') DEFAULT 'member',
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES StudyGroups(group_id) ON DELETE CASCADE
);

-- Messages Table
CREATE TABLE IF NOT EXISTS Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    sent_by INT,
    group_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sent_by) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES StudyGroups(group_id) ON DELETE CASCADE
);

-- Check if the index exists before trying to create it for each table
-- Users table indexes
SET @dbname = DATABASE();
SET @tablename = "Users";
SET @indexname = "idx_users_username_email";
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE `table_schema` = @dbname AND `table_name` = @tablename AND `index_name` = @indexname) > 0,
  "SELECT 1", 
  "CREATE INDEX idx_users_username_email ON Users(username, email)"
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- StudyGroups table indexes
SET @tablename = "StudyGroups";
SET @indexname = "idx_studygroups_createdby";
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE `table_schema` = @dbname AND `table_name` = @tablename AND `index_name` = @indexname) > 0,
  "SELECT 1", 
  "CREATE INDEX idx_studygroups_createdby ON StudyGroups(created_by)"
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- GroupMembers table indexes
SET @tablename = "GroupMembers";
SET @indexname = "idx_groupmembers_user_group";
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE `table_schema` = @dbname AND `table_name` = @tablename AND `index_name` = @indexname) > 0,
  "SELECT 1", 
  "CREATE INDEX idx_groupmembers_user_group ON GroupMembers(user_id, group_id)"
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Messages table indexes
SET @tablename = "Messages";
SET @indexname = "idx_messages_sentby_group_timestamp";
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE `table_schema` = @dbname AND `table_name` = @tablename AND `index_name` = @indexname) > 0,
  "SELECT 1", 
  "CREATE INDEX idx_messages_sentby_group_timestamp ON Messages(sent_by, group_id, timestamp)"
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Flush privileges.
FLUSH PRIVILEGES;
