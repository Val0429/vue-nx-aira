import { RegisterLanguage, ILang } from '@/../core/i18n';

@RegisterLanguage("zh-TW", "正體中文")
export default class LangObject implements ILang {
    w_Name = "姓名";
    w_Enabled = "開啟";
    w_Disabled = "關閉";
    w_Value = "値";
    w_Startdate = "開始日";
    w_Enddate = "結束日";
    w_Account = "帳號";
    w_Password = "密碼";
    w_Selection = "選擇";
    w_Multi = "複數";
    w_Success ="成功";
    w_Failed ="失敗";

    w_Home = "首頁";
    w_Sources = "來源";
    w_Settings = "設定";
    w_License = "許可證";

    m_SourcesManagement = "管理影像來源";
    m_VideoSource = "影像來源";
    m_LogsManagement = "查看事件紀錄";

    m_SettingsManagement = "管理設定值";
    m_VAST2Configuration = "VAST2設定";
    m_SystemConfiguration = "系統設定";

    w_No_ = "編號";
    m_LicenseKey = "金鑰";
    m_MACAddress = "MAC位址";
    w_Trial = "審查";
    w_Count = "數量";
    m_RegisterDate = "註冊日期";
    m_ExpireDate = "到期日";
    w_Expired = "已過期";
    m_RegisterOnline = "在線註冊";
    m_RegisterOffline = "離線註冊";
    m_RegisterClean = "清除註冊資料";
    m_RegisterCleanTitle = "清除註冊資料";
    m_RegisterCleanBody = "確定要刪除所有註冊資料嗎？";
    m_RegisterSuccessBody = "註冊成功。";
    m_RegisterFailedBody = "註冊失敗。";

    /// Logs
    w_Logs = "事件紀錄";
    w_LogAction = "事件類型";
    w_LogEntity = "詳細內容";
    m_LogEntityNone = "沒有額外內容";
    m_EventLicenseRemoved = "刪除金鑰";

    /// Toolbox
    w_View = "檢視";
    w_Add = "新增";
    w_Preview = "預覽";
    w_Edit = "修改";

    /// System Configuration
    m_LiveTracking = "即時追蹤";
    m_SearchResults = "搜尋結果";
    w_Database = "資料庫";
    m_SearchSimilarityThreshold = "搜尋分數 (範圍：{min}-{max}%)";
    m_SearchPeriodMinutes = "搜尋時間範圍 (單位：分鐘，範圍：{min}-{max})";
    m_MergeFaceScore = "人臉合併分數 (範圍：{min}-{max}%)";
    m_PreAndPostVideoDuration = "影片回放擷取時間 (單位：秒，範圍：{min}-{max})";
    m_DataRetensionDays = "資料保留天數 (範圍：{min}-{max})";

    /// VAST2 Configuration
    w_Protocol = "協定";
    w_HostName = "主機名稱";
    m_Port = "連接埠 (範圍：{min}-{max})";
    m_ConfigSuccessful = "設定成功!";

    /// Video Source
    w_Key = "索引";
    w_RefName = "名稱";
    m_MinFaceLength = "最小捕捉人臉尺寸";
    m_MergeFaceSeconds = "人臉合併秒數";
    m_MinFaceLengthRange = "最小捕捉人臉尺寸 (範圍：{min}-{max}%)";
    m_MergeFaceSecondsRange = "人臉合併秒數 (範圍：{min}-{max}%)";
    m_NoExpire = "無期限";

    /// Walkthrough
    m_Walkthrough1 = "讓我們開始動手設定服務吧！";
    m_Walkthrough2 = "輸入您的 Smart Face Tracker <BR/>啟動金鑰：";
    m_Walkthrough3 = "點此啟動離線許可證";
    m_Walkthrough4 = "哎呀，似乎有東西出錯了...";
    m_Walkthrough5 = "我們無法成功註冊您的金鑰。";
    m_Walkthrough6 = "錯誤訊息：{message}";
    m_Walkthrough7 = "離線啟動許可證";
    m_Walkthrough8 = "我們了解，您的環境不一定有網際網路。";
    m_Walkthrough9 = "或是您可以使用";
    m_Walkthrough10 = "線上註冊許可證";
    m_Walkthrough11 = "記下您的MAC位址";
    m_Walkthrough12 = "下載可用MAC位址列表";
    m_Walkthrough13 = "將您的MAC位址寄到";
    m_Walkthrough14 = "將收到的金鑰檔案在此加入附件";
    m_Walkthrough15 = "讓我們動手設定影像管理系統";
    m_Walkthrough16 = "輸入您的 VAST2 認證：";
    m_Walkthrough17 = "上傳金鑰檔案 (.lic)";
    m_Walkthrough18 = "遇到問題嗎？";
    m_Walkthrough19 = "寄信給我們";
    m_Walkthrough20 = "錯誤的使用者名稱或密碼";
    m_Walkthrough21 = "伺服器連線失敗，請重試";
    m_Walkthrough22 = "啟用設備以進行人臉辨識：";
    m_Walkthrough23 = "刷新列表";
    m_Walkthrough24 = "啟用的影像來源 {0}/{1}";
    m_Walkthrough25 = "沒有設備可以顯示。 <BR/>請檢查您的影像設定。";
    m_Walkthrough26 = "服務啟動完成！";
    m_Walkthrough27 = "我們的系統即將自動啟動。";
    m_Walkthrough28 = "五秒鐘後將自動將您轉移至設定頁...";
    m_Walkthrough29 = "或是 <a href='{0}'>點擊前往</a> 以完成其他設定步驟。";
    w_Register = "註冊";
    m_LicenseInvalid = "無法辨識的金鑰";
    m_TryAgain = "再試一次";
    m_StepNum = "步驟 {0}";
    w_Connect = "連線";
    w_Finish = "完成";

    /// Override
    mb_Date_Not_Selected = "Input Date";
    mb_Time_Not_Selected = "Input Time";
}
