import { RegisterLanguage } from '@/../core/i18n';

@RegisterLanguage("en-US", "English")
export default class LangObject {
    w_Name = "Name";
    w_Enabled = "Enabled";
    w_Value = "Value";
    w_Startdate = "Start Date";
    w_Enddate = "End Date";
    w_Account = "Account";
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
    m_VAST2Configuration = "VAST2 Configuration";
    m_SystemConfiguration = "System Configuration";

    w_No_ = "No.";
    m_LicenseKey = "License Key";
    m_MACAddress = "MAC Address";
    w_Trial = "Trial";
    w_Count = "Count";
    m_RegisterDate = "Registration Date";
    m_ExpireDate = "Expiration Date";
    w_Expired = "Expired";

    /// Toolbox
    w_View = "View";
    w_Add = "Add";
    w_Preview = "Preview";
    w_Edit = "Edit";

    /// System Configuration
    m_LiveTracking = "Live Tracking";
    m_SearchResults = "Search Results";
    w_Database = "Database";
    m_SearchSimilarityThreshold = "Search Similarity Threshold % (range: {min}-{max}%)";
    m_SearchPeriodMinutes = "Quick Search Period (unit: minute. range {min}-{max})";
    m_MergeFaceScore = "Face Merge Similarity Score % (range: {min}-{max}%)";
    m_PreAndPostVideoDuration = "Pre and Post Capture Playback Video Clips (unit: second. range {min}-{max})";
    m_DataRetensionDays = "Data Retention Days (range: {min}-{max})";

    /// VAST2 Configuration
    w_Protocol = "Protocol";
    w_HostName = "Hostname";
    m_Port = "Port (range: {min}-{max})";
    m_ConfigSuccessful = "Save Successfully!";

    /// Video Source
    w_Key = "Key";
    w_RefName = "Name";
    m_MinFaceLength = "Min Face Size";
    m_MergeFaceSeconds = "Merge Face Interval";

    /// Walkthrough
    m_Walkthrough1 = "Let's get our services <BR/>up and running!";
    m_Walkthrough2 = "Enter your Smart Face Tracker <BR/>Activation License:";
    m_Walkthrough3 = "Click to activate offline license";
    m_Walkthrough4 = "Oops! Something <BR/>went wrong...";
    m_Walkthrough5 = "There is an issue registering <BR/>your license.";
    m_Walkthrough6 = "Error Message: {message}";
    m_Walkthrough7 = "Offline Registration";
    m_Walkthrough8 = "We understand. It's not always that you have internet access.";
    m_Walkthrough9 = "Otherwise, kindly use";
    m_Walkthrough10 = "Online License Registration";
    m_Walkthrough11 = "Take Note of your MAC Address";
    m_Walkthrough12 = "download your MAC Address List";
    m_Walkthrough13 = "Submit the MAC Address List <BR/>via email to";
    m_Walkthrough14 = "Browse and attach here the provided license file";
    m_Walkthrough15 = "Let's connect to your <BR/>Video Management System";
    m_Walkthrough16 = "Enter your VAST2 Credentials:";
    m_Walkthrough17 = "Upload License File (.lic)";
    m_Walkthrough18 = "Problem with your license?";
    m_Walkthrough19 = "Send us an email";
    m_Walkthrough20 = "Incorrect Username or Password";
    m_Walkthrough21 = "Server connection failed, please retry";
    w_Register = "Register";
    m_LicenseInvalid = "Invalid License";
    m_TryAgain = "Try Again";
    m_StepNum = "Step {0}";
    w_Connect = "Connect";
}
