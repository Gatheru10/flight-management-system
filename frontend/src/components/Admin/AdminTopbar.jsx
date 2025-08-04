const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="user-info">
        <span>Admin User</span>
        <img src="/path-to-avatar.jpg" alt="Admin" className="avatar" />
      </div>
    </div>
  );
};

export default TopNav;