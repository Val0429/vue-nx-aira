import { RegisterLanguage } from '@/../core/i18n';

@RegisterLanguage("en-US", "English")
export default class LangObject {
    w_Name = "Name";
    w_Enabled = "Enabled";
    w_Value = "Value";
    w_Startdate = "Start Date";
    w_Enddate = "End Date";
    w_Password = "Password";
    w_Selection = "Selection";
    w_Multi = "Multi";

    w_Home = "Home";
    w_Sources = "Sources";
    w_Settings = "Settings";
    w_License = "License";

    m_SourcesManagement = "Sources Management";
    m_VideoSource = "Video Source";

    m_SettingsManagement = "Settings Management";
    m_SystemConfiguration = "System Configuration";

    w_No_ = "No.";
    m_LicenseKey = "License Key";
    m_MACAddress = "MAC Address";
    w_Trial = "Trial";
    w_Count = "Count";
    m_RegisterDate = "Registration Date";
    m_ExpireDate = "Expiration Date";
    w_Expired = "Expired";

    /// System Configuration
    m_LiveTracking = "Live Tracking";
    m_SearchResults = "Search Results";
    w_Database = "Database";
    m_SearchSimilarityThreshold = "Search Similarity Threshold % (range: {min}-{max}%)";
    m_SearchPeriodMinutes = "Quick Search Period (unit: minute. range {min}-{max})";
    m_MergeFaceScore = "Face Merge Similarity Score % (range: {min}-{max}%)";
    m_PreAndPostVideoDuration = "Pre and Post Capture Playback Video Clips (unit: second. range {min}-{max})";
    m_DataRetensionDays = "Data Retention Days (range: {min}-{max})";

    /// Video Source
    w_Key = "Key";
    w_RefName = "Name";
    m_MinFaceLength = "Min Face Size";
    m_MergeFaceSeconds = "Merge Face Interval";
}
