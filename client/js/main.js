const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://fintech-dashboard-api.onrender.com';

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorEl = document.getElementById('error');

        try {
          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
          } else {
            errorEl.textContent = data.error || 'Login failed';
            errorEl.style.display = 'block';
          }
        } catch (error) {
          errorEl.textContent = 'Network error';
          errorEl.style.display = 'block';
        }
      });
    }

    // Dashboard Load
    const dashboardData = document.getElementById('dashboardData');
    if (dashboardData) {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }

      fetch(`${API_URL}/api/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) throw new Error('Failed to load dashboard');
          return response.json();
        })
        .then((data) => {
          dashboardData.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch((error) => {
          dashboardData.innerHTML = `<p style="color: red;">${error.message}</p>`;
          localStorage.removeItem('token');
          window.location.href = 'login.html';
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
      });
    }