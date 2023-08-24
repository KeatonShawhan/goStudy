-- Check for the existence of the goStudy database
SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'goStudy';

-- Check for the existence of tables in goStudy
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'goStudy' AND TABLE_NAME IN ('Users', 'StudyGroups', 'GroupMembers', 'Messages');

-- Check for the existence of the goStudyArchived database
SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'goStudyArchived';

-- Check for the existence of the ArchivedMessages table in goStudyArchived
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'goStudyArchived' AND TABLE_NAME = 'ArchivedMessages';

-- Check for the existence of indexes in goStudy
SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = 'goStudy' AND TABLE_NAME = 'Users' AND INDEX_NAME = 'idx_users_username_email';
SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = 'goStudy' AND TABLE_NAME = 'StudyGroups' AND INDEX_NAME = 'idx_studygroups_createdby';
SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = 'goStudy' AND TABLE_NAME = 'GroupMembers' AND INDEX_NAME = 'idx_groupmembers_user_group';
SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = 'goStudy' AND TABLE_NAME = 'Messages' AND INDEX_NAME = 'idx_messages_sentby_group_timestamp';

-- Check for the existence of events in goStudy
SELECT EVENT_NAME FROM INFORMATION_SCHEMA.EVENTS WHERE EVENT_SCHEMA = 'goStudy' AND EVENT_NAME IN ('ArchiveOldMessages', 'DeleteOldArchivedMessages');
