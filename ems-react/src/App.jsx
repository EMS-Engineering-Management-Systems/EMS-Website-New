import { useEffect } from 'react';
import ClickSpark from './components/ClickSpark.jsx';
import { Website } from './website/Website.jsx';
import { initSiteEffects } from './siteEffects.js';
import './styles.css';

export default function App() {
  useEffect(() => {
    initSiteEffects();
  }, []);

  return (
    <ClickSpark>
      <Website />
    </ClickSpark>
  );
}
// for 