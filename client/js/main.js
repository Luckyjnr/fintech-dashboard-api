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
         console.log('Attempting login to:', `${API_URL}/api/auth/login`);
         const response = await fetch(`${API_URL}/api/auth/login`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ username, password }),
         });
         const data = await response.json();
         console.log('Login response:', data);
         if (response.ok) {
           localStorage.setItem('token', data.token);
           errorEl.textContent = 'User logged in successfully';
           errorEl.style.color = 'green';
           errorEl.style.display = 'block';
           setTimeout(() => {
             window.location.href = 'dashboard.html';
           }, 1000);
         } else {
           errorEl.textContent = data.error || 'Login failed';
           errorEl.style.display = 'block';
         }
       } catch (error) {
         console.error('Login error:', error);
         errorEl.textContent = 'Network error: ' + error.message;
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
     } else {
       console.log('Fetching dashboard with token:', token);
       fetch(`${API_URL}/api/dashboard`, {
         headers: { 'Authorization': `Bearer ${token}` },
       })
         .then((response) => {
           if (!response.ok) throw new Error(`Dashboard fetch failed: ${response.status}`);
           return response.json();
         })
         .then((data) => {
           console.log('Dashboard data:', data);
           let transactionList = '<h4>Transaction History</h4><ul>';
           if (data.transactions && data.transactions.length > 0) {
             data.transactions.forEach(tx => {
               transactionList += `<li>${tx.type} of $${tx.amount} on ${new Date(tx.date).toLocaleString()}</li>`;
             });
           } else {
             transactionList += '<li>No transactions found</li>';
           }
           transactionList += '</ul>';
           dashboardData.innerHTML = `
             <h3>Dashboard Stats</h3>
             <p>Total Transactions: ${data.transactionCount || 0}</p>
             ${transactionList}
           `;
         })
         .catch((error) => {
           console.error('Dashboard error:', error);
           dashboardData.innerHTML = `<p style="color: red;">${error.message}</p>`;
           localStorage.removeItem('token');
           window.location.href = 'login.html';
         });
     }
   }

   // Logout
   const logoutBtn = document.getElementById('logout');
   if (logoutBtn) {
     logoutBtn.addEventListener('click', () => {
       console.log('Logging out, clearing token');
       localStorage.removeItem('token');
       window.location.href = 'login.html';
     });
   }