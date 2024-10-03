export const Logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (response.ok) {
    // Redirect to the login page or homepage
    window.location.href = '/login';
  } else {
    console.error('Logout failed');
  }
};
