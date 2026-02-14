import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ResearchPage from './pages/ResearchPage';
import CommunityPage from './pages/CommunityPage';
import StudyPlanPage from './pages/StudyPlanPage';
import MyPage from './pages/MyPage';
import WalletPage from './pages/WalletPage';
import AgentUsagePage from './pages/AgentUsagePage';
import ChatPage from './pages/ChatPage';
import AilakeChatPage from './pages/AilakeChatPage';
import GlobalAgentFloating from './components/GlobalAgentFloating';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/study-plan" element={<StudyPlanPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/agent-usage" element={<AgentUsagePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/ailake-chat" element={<AilakeChatPage />} />
      </Routes>
      <GlobalAgentFloating />
    </div>
  );
}

export default App;
