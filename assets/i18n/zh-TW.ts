import { RegisterLanguage, ILang } from '@/../core/i18n';

@RegisterLanguage("zh-TW", "正體中文")
export default class LangObject implements ILang {
    w_Name = "姓名";
    w_Enabled = "開啟";
    w_Value = "値";
    w_Startdate = "開始日";
    w_Enddate = "結束日";
    w_Password = "密碼";
    w_Selection = "選擇";
    w_Multi = "複數";

    w_Home = "首頁";
    w_Sources = "來源";
    w_Settings = "設定";
    w_License = "許可證";

    m_SourcesManagement = "管理影像來源";
    m_VideoSource = "影像來源";

    m_SettingsManagement = "管理設定值";
    m_SystemConfiguration = "系統設定";

    w_No_ = "編號";
    m_LicenseKey = "許可證密鑰";
    m_MACAddress = "MAC位址";
    w_Trial = "審查";
    w_Count = "數量";
    m_RegisterDate = "註冊日期";
    m_ExpireDate = "到期日";
    w_Expired = "已過期";

    /// System Configuration
    m_LiveTracking = "即時追蹤";
    m_SearchResults = "搜尋結果";
    w_Database = "資料庫";
    m_SearchSimilarityThreshold = "搜尋分數 (範圍：{min}-{max}%)";
    m_SearchPeriodMinutes = "搜尋時間範圍 (單位：分鐘，範圍：{min}-{max})";
    m_MergeFaceScore = "人臉合併分數 (範圍：{min}-{max}%)";
    m_PreAndPostVideoDuration = "影片回放擷取時間 (單位：秒，範圍：{min}-{max})";
    m_DataRetensionDays = "資料保留天數 (範圍：{min}-{max})";

    /// Video Source
    w_Key = "索引";
    w_RefName = "名稱";
    m_MinFaceLength = "最小捕捉人臉尺寸";
    m_MergeFaceSeconds = "人臉合併秒數";
}
