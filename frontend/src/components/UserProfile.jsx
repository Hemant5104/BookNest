const UserProfile = ({ user }) => {
  if (!user) return null;
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="mb-2"><span className="font-semibold">Username:</span> {user.username}</div>
      <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
    </div>
  );
};

export default UserProfile; 