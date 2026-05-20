import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
      >
        <option value="en">🇺🇸 English</option>
        <option value="hi">🇮🇳 हिंदी</option>
        <option value="gu">🇮🇳 ગુજરાતી</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;