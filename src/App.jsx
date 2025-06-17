import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetails from "./pages/ArticleDetails";
import UserContext from "./context/UserContext";
import TopicArticles from "./pages/TopicArticles";
import NotFound from "./components/NotFound";

function App() {
  const [user] = useState("jessjelly");

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:article_id" element={<ArticleDetails />} />
          <Route path="/topics/:topic" element={<TopicArticles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
