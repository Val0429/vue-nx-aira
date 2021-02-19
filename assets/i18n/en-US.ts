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
}
