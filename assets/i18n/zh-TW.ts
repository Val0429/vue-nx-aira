import { RegisterLanguage, ILang } from '@/../core/i18n';

@RegisterLanguage("zh-TW", "正體中文")
export default class LangObject implements ILang {
    w_Name = "名前";
    w_Enabled = "有効";
    w_Value = "値";
    w_Startdate = "開始日";
    w_Enddate = "終了日";
    w_Password = "密碼";
    w_Selection = "選択";
    w_Multi = "複数";

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
}
