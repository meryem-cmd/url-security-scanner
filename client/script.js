// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('scannerForm');
//   const urlInput = document.getElementById('urlInput');
//   const resultContainer = document.getElementById('result');
//   const scanStatus = document.getElementById('scanStatus');
//   const resultDetails = document.getElementById('resultDetails');
//   const themeToggle = document.getElementById('themeToggle');
//   const buttonText = document.querySelector('.button-text');
//   const spinner = document.querySelector('.spinner');
//   const body = document.body;

//   // Theme Setup
//   const themes = {
//     dark: { icon: '<i class="fas fa-sun"></i>', name: 'dark-theme' },
//     light: { icon: '<i class="fas fa-moon"></i>', name: 'light-theme' }
//   };
//   const savedTheme = localStorage.getItem('theme') || 'dark';
//   body.className = themes[savedTheme].name;
//   themeToggle.innerHTML = themes[savedTheme].icon;

//   themeToggle.addEventListener('click', () => {
//     const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
//     body.className = themes[newTheme].name;
//     themeToggle.innerHTML = themes[newTheme].icon;
//     localStorage.setItem('theme', newTheme);
//     themeToggle.classList.add('clicked');
//     setTimeout(() => themeToggle.classList.remove('clicked'), 300);
//   });

//   // Form Submission
//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const url = urlInput.value.trim();
//     if (!url) return;

//     buttonText.textContent = 'Scanning...';
//     spinner.classList.remove('hidden');
//     resultContainer.classList.add('hidden');
//     form.classList.add('scanning');

//     try {
//       const response = await fetch('http://localhost:5000/test-url', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url })
//       });

//       const data = await response.json();
//       const output = data.result || '';

//       resultContainer.classList.remove('hidden');

//       if (output.toLowerCase().includes('vulnerable')) {
//         scanStatus.textContent = '❌ Vulnerable';
//         scanStatus.className = 'status-badge vulnerable';
//       } else if (output.toLowerCase().includes('safe')) {
//         scanStatus.textContent = '✅ Safe';
//         scanStatus.className = 'status-badge safe';
//       } else {
//         scanStatus.textContent = '⚠️ Unknown';
//         scanStatus.className = 'status-badge neutral';
//       }

//       resultDetails.innerHTML = `
//         <p><strong>URL:</strong> ${url}</p>
//         <p><strong>Scan Time:</strong> ${new Date().toLocaleString()}</p>
//         <pre style="white-space: pre-wrap; text-align: left;">${output}</pre>
//       `;

//       // ✅ Add download report button if report exists
//       if (data.report) {
//         const downloadBtn = document.createElement('button');
//         downloadBtn.textContent = '📄 Download Report';
//         downloadBtn.classList.add('download-button');
//         downloadBtn.onclick = () => downloadReport(data.report);
//         resultDetails.appendChild(downloadBtn);
//       }

//     } catch (error) {
//       resultContainer.classList.remove('hidden');
//       scanStatus.textContent = '❌ Error';
//       scanStatus.className = 'status-badge vulnerable';
//       resultDetails.innerHTML = `
//         <p>An error occurred during the scan. Please try again.</p>
//         <p>Error: ${error.message}</p>
//       `;
//     } finally {
//       buttonText.textContent = 'Scan Now 🔍';
//       spinner.classList.add('hidden');
//       form.classList.remove('scanning');
//     }
//   });

//   // 💾 Report download helper
//   function downloadReport(content, filename = "scan_report.txt") {
//     const blob = new Blob([content], { type: 'text/plain' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     link.click();
//   }

//   // Input Animation + Validation
//   urlInput.addEventListener('input', () => {
//     const isValid = urlInput.value.startsWith('http://') || urlInput.value.startsWith('https://');
//     urlInput.setCustomValidity(isValid ? '' : 'URL must start with http:// or https://');

//     urlInput.classList.add('typing');
//     setTimeout(() => urlInput.classList.remove('typing'), 300);
//   });

//   // Feature Card Hover
//   document.querySelectorAll('.feature-card').forEach(card => {
//     card.addEventListener('mouseenter', () => card.classList.add('hover'));
//     card.addEventListener('mouseleave', () => card.classList.remove('hover'));
//   });
// });


// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('scannerForm');
//   const urlInput = document.getElementById('urlInput');
//   const resultContainer = document.getElementById('result');
//   const scanStatus = document.getElementById('scanStatus');
//   const resultDetails = document.getElementById('resultDetails');
//   const themeToggle = document.getElementById('themeToggle');
//   const buttonText = document.querySelector('.button-text');
//   const spinner = document.querySelector('.spinner');
//   const body = document.body;

//   // Theme Setup
//   const themes = {
//     dark: { icon: '<i class="fas fa-sun"></i>', name: 'dark-theme' },
//     light: { icon: '<i class="fas fa-moon"></i>', name: 'light-theme' }
//   };
//   const savedTheme = localStorage.getItem('theme') || 'dark';
//   body.className = themes[savedTheme].name;
//   themeToggle.innerHTML = themes[savedTheme].icon;

//   themeToggle.addEventListener('click', () => {
//     const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
//     body.className = themes[newTheme].name;
//     themeToggle.innerHTML = themes[newTheme].icon;
//     localStorage.setItem('theme', newTheme);
//     themeToggle.classList.add('clicked');
//     setTimeout(() => themeToggle.classList.remove('clicked'), 300);
//   });

//   // Form Submission
//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const url = urlInput.value.trim();
//     if (!url) return;

//     buttonText.textContent = 'Scanning...';
//     spinner.classList.remove('hidden');
//     resultContainer.classList.add('hidden');
//     form.classList.add('scanning');

//     try {
//       const response = await fetch('http://localhost:5000/test-url', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url })
//       });

//       const data = await response.json();
//       const output = data.result || '';

//       resultContainer.classList.remove('hidden');

//       if (output.toLowerCase().includes('vulnerable')) {
//         scanStatus.textContent = '❌ Vulnerable';
//         scanStatus.className = 'status-badge vulnerable';
//       } else if (output.toLowerCase().includes('safe')) {
//         scanStatus.textContent = '✅ Safe';
//         scanStatus.className = 'status-badge safe';
//       } else {
//         scanStatus.textContent = '⚠ Unknown';
//         scanStatus.className = 'status-badge neutral';
//       }

//       resultDetails.innerHTML = `
//         <p><strong>URL:</strong> ${url}</p>
//         <p><strong>Scan Time:</strong> ${new Date().toLocaleString()}</p>
//         <pre style="white-space: pre-wrap; text-align: left;">${output}</pre>
//       `;

//       // ✅ Add download report button if report exists
//       if (data.report) {
//         const downloadBtn = document.createElement('button');
//         downloadBtn.textContent = '📄 Download Report';
//         downloadBtn.classList.add('download-button');
//         downloadBtn.onclick = () => downloadReport(data.report);
//         resultDetails.appendChild(downloadBtn);
//       }

//     } catch (error) {
//       resultContainer.classList.remove('hidden');
//       scanStatus.textContent = '❌ Error';
//       scanStatus.className = 'status-badge vulnerable';
//       resultDetails.innerHTML = `
//         <p>An error occurred during the scan. Please try again.</p>
//         <p>Error: ${error.message}</p>
//       `;
//     } finally {
//       buttonText.textContent = 'Scan Now 🔍';
//       spinner.classList.add('hidden');
//       form.classList.remove('scanning');
//     }
//   });

//   // 💾 Report download helper
//   function downloadReport(content, filename = "scan_report.txt") {
//     const blob = new Blob([content], { type: 'text/plain' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     link.click();
//   }

//   // Input Animation + Validation
//   urlInput.addEventListener('input', () => {
//     const isValid = urlInput.value.startsWith('http://') || urlInput.value.startsWith('https://');
//     urlInput.setCustomValidity(isValid ? '' : 'URL must start with http:// or https://');

//     urlInput.classList.add('typing');
//     setTimeout(() => urlInput.classList.remove('typing'), 300);
//   });

//   // Feature Card Hover
//   document.querySelectorAll('.feature-card').forEach(card => {
//     card.addEventListener('mouseenter', () => card.classList.add('hover'));
//     card.addEventListener('mouseleave', () => card.classList.remove('hover'));
//   });

//   function generateReport() {
//     const resultContent = resultDetails.innerHTML;
//     const isDarkMode = document.body.classList.contains('dark-theme');
//     const report = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>URL Security Scan Report</title>
//         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
//         <style>
//           :root {
//             --primary-color: #2563eb;
//             --primary-dark: #1d4ed8;
//             --secondary-color: #7c3aed;
//             --accent-color: #3b82f6;
//             --success-color: #059669;
//             --danger-color: #dc2626;
//             --warning-color: #d97706;
//             --text-color: ${isDarkMode ? '#f8fafc' : '#1e293b'};
//             --bg-color: ${isDarkMode ? '#0f172a' : '#f8fafc'};
//             --card-bg: ${isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.95)'};
//             --border-color: ${isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(203, 213, 225, 0.5)'};
//           }

//           body {
//             font-family: 'Inter', sans-serif;
//             line-height: 1.6;
//             color: var(--text-color);
//             background: var(--bg-color);
//             margin: 0;
//             padding: 0;
//             min-height: 100vh;
//             background-image: 
//               radial-gradient(circle at 15% 50%, ${isDarkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(59, 130, 246, 0.08)'} 0%, transparent 50%),
//               radial-gradient(circle at 85% 30%, ${isDarkMode ? 'rgba(124, 58, 237, 0.1)' : 'rgba(139, 92, 246, 0.08)'} 0%, transparent 50%);
//           }

//           .report-container {
//             max-width: 1000px;
//             margin: 2rem auto;
//             padding: 2rem;
//           }

//           .report-header {
//             text-align: center;
//             margin-bottom: 3rem;
//             padding: 3rem;
//             background: linear-gradient(135deg, ${isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.95)'}, ${isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.98)'});
//             border-radius: 1.5rem;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, ${isDarkMode ? '0.3' : '0.1'});
//             backdrop-filter: blur(12px);
//             border: 1px solid var(--border-color);
//           }

//           .report-header h1 {
//             font-size: 2.5rem;
//             font-weight: 700;
//             margin: 0;
//             background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             margin-bottom: 1rem;
//           }

//           .report-header .timestamp {
//             color: ${isDarkMode ? '#94a3b8' : '#475569'};
//             font-size: 1.1rem;
//           }

//           .report-section {
//             background: linear-gradient(135deg, ${isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.95)'}, ${isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.98)'});
//             border-radius: 1.5rem;
//             padding: 2rem;
//             margin-bottom: 2rem;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, ${isDarkMode ? '0.3' : '0.1'});
//             backdrop-filter: blur(12px);
//             border: 1px solid var(--border-color);
//           }

//           .result-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//             gap: 1.5rem;
//             margin: 2rem 0;
//           }

//           .result-item {
//             background: ${isDarkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
//             padding: 1.5rem;
//             border-radius: 1rem;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, ${isDarkMode ? '0.2' : '0.05'});
//             transition: transform 0.3s ease;
//           }

//           .result-item:hover {
//             transform: translateY(-5px);
//           }

//           .result-item i {
//             font-size: 2rem;
//             margin-bottom: 1rem;
//             background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//           }

//           .result-item h4 {
//             font-size: 1.2rem;
//             margin: 1rem 0;
//             color: var(--text-color);
//           }

//           .result-item p {
//             color: ${isDarkMode ? '#94a3b8' : '#475569'};
//             font-size: 1.1rem;
//           }

//           .recommendations {
//             background: ${isDarkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
//             padding: 2rem;
//             border-radius: 1rem;
//             margin-top: 2rem;
//           }

//           .recommendations h4 {
//             font-size: 1.3rem;
//             margin-bottom: 1.5rem;
//             color: var(--text-color);
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//           }

//           .recommendations h4::before {
//             content: '💡';
//             font-size: 1.5rem;
//           }

//           .recommendations ul {
//             list-style: none;
//             padding: 0;
//           }

//           .recommendations li {
//             margin: 1rem 0;
//             padding-left: 2rem;
//             position: relative;
//             color: ${isDarkMode ? '#94a3b8' : '#475569'};
//             font-size: 1.1rem;
//           }

//           .recommendations li::before {
//             content: '→';
//             position: absolute;
//             left: 0;
//             color: var(--primary-color);
//           }

//           .status-badge {
//             display: inline-block;
//             padding: 0.8rem 1.5rem;
//             border-radius: 1rem;
//             font-weight: 600;
//             font-size: 1.1rem;
//             margin-bottom: 1.5rem;
//             background: ${isDarkMode ? 'rgba(5, 150, 105, 0.2)' : 'rgba(5, 150, 105, 0.1)'};
//             color: var(--success-color);
//           }

//           .status-badge.error {
//             background: ${isDarkMode ? 'rgba(220, 38, 38, 0.2)' : 'rgba(220, 38, 38, 0.1)'};
//             color: var(--danger-color);
//           }

//           @media print {
//             body {
//               background: white;
//               color: black;
//             }
//             .report-container {
//               margin: 0;
//               padding: 1rem;
//             }
//             .report-header, .report-section {
//               box-shadow: none;
//               border: 1px solid #ddd;
//             }
//           }

//           @media (max-width: 768px) {
//             .report-container {
//               padding: 1rem;
//             }
//             .report-header {
//               padding: 2rem 1rem;
//             }
//             .result-grid {
//               grid-template-columns: 1fr;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="report-container">
//           <div class="report-header">
//             <h1>URL Security Scan Report</h1>
//             <p class="timestamp">Generated on: ${new Date().toLocaleString()}</p>
//           </div>
//           <div class="report-section">
//             ${resultContent}
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//     return report;
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scannerForm');
  const urlInput = document.getElementById('urlInput');
  const resultContainer = document.getElementById('result');
  const scanStatus = document.getElementById('scanStatus');
  const resultDetails = document.getElementById('resultDetails');
  const themeToggle = document.getElementById('themeToggle');
  const buttonText = document.querySelector('.button-text');
  const spinner = document.querySelector('.spinner');
  const body = document.body;

  // 🌓 Theme Setup
  const themes = {
    dark: { icon: '<i class="fas fa-sun"></i>', name: 'dark-theme' },
    light: { icon: '<i class="fas fa-moon"></i>', name: 'light-theme' }
  };
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.className = themes[savedTheme].name;
  themeToggle.innerHTML = themes[savedTheme].icon;

  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
    body.className = themes[newTheme].name;
    themeToggle.innerHTML = themes[newTheme].icon;
    localStorage.setItem('theme', newTheme);
    themeToggle.classList.add('clicked');
    setTimeout(() => themeToggle.classList.remove('clicked'), 300);
  });

  // 🚀 Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    buttonText.textContent = 'Scanning...';
    spinner.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    form.classList.add('scanning');

    try {
      const response = await fetch('http://localhost:5000/test-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      const output = data.result || '';
      const scanTime = new Date().toLocaleString();

      // 🧠 Parse output
      const summary = { 'Most Critical': [], 'Moderate': [], 'Least Critical': [] };
      const lines = output.split('\n');
      let current = null;
      lines.forEach((line, i) => {
        if (line.includes('Payloads:')) {
          current = line.replace(' Payloads:', '').trim();
        } else if (line.startsWith('  - Payload:')) {
          const payload = line.replace('  - Payload:', '').trim();
          const url = lines[i + 1]?.replace('    URL:', '').trim();
          if (current && payload && url) {
            summary[current].push({ payload, url });
          }
        }
      });

      // 🟢 Scan badge
      // ✅ Improved scan badge logic
      resultContainer.classList.remove('hidden');
      const totalPayloads =
        summary['Most Critical'].length +
        summary['Moderate'].length +
        summary['Least Critical'].length;

      if (totalPayloads > 0) {
        scanStatus.textContent = '❌ Vulnerable';
        scanStatus.className = 'status-badge vulnerable';
      } else if (output.toLowerCase().includes('safe') || totalPayloads === 0) {
        scanStatus.textContent = '✅ Safe';
        scanStatus.className = 'status-badge safe';
      } else {
        scanStatus.textContent = '⚠ Unknown';
        scanStatus.className = 'status-badge neutral';
      }




      resultDetails.innerHTML = `
  <p><strong>URL:</strong> ${url}</p>
  <p><strong>Scan Time:</strong> ${scanTime}</p>
  <p><strong>Detected Payloads:</strong></p>
  <ul>
    <li>🛑 Most Critical: ${summary['Most Critical'].length}</li>
    <li>🟠 Moderate: ${summary['Moderate'].length}</li>
    <li>🟡 Least Critical: ${summary['Least Critical'].length}</li>
  </ul>

  <div class="payload-button-row">
  <button class="toggle-btn" data-category="Most Critical"> 👾View Most Critical</button>
  <button class="toggle-btn" data-category="Moderate">👾 View Moderate</button>
  <button class="toggle-btn" data-category="Least Critical">👾 View Least Critical</button>
</div>


  ${['Most Critical', 'Moderate', 'Least Critical'].map(cat => `
    <div class="payload-list hidden" id="list-${cat.replace(/\s+/g, '')}">
      ${summary[cat].length
          ? summary[cat].map(p => `<p><code>${p.payload}</code><br><small>${p.url}</small></p>`).join('')
          : '<p>No payloads found.</p>'}
    </div>
  `).join('')}

  <div class="download-wrapper">
    <button class="download-button">📥 Download Report</button>
  </div>
`;


      // 🔘 Toggle buttons
      document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const cat = btn.dataset.category.replace(/\s/g, '');
          const list = document.getElementById(`list-${cat}`);
          list.classList.toggle('hidden');
          btn.textContent = list.classList.contains('hidden')
            ? `👾 View ${btn.dataset.category} Payloads`
            : `👾 Hide ${btn.dataset.category} Payloads`;
        });
      });

      // 💾 Download Report
      document.querySelector('.download-button')?.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        const makeList = (arr) => arr.map(p => `<li><span class="payload-payload">Payload:</span> ${p.payload}<br><span class="payload-url">URL: ${p.url}</span></li>`).join('');
        const html = `<!DOCTYPE html><html><head><title>Scan Report</title>
          <style>body{font-family:sans-serif;background:${isDark ? '#0f172a' : '#f8fafc'};color:${isDark ? '#f8fafc' : '#1e293b'};}
          .summary-box{margin:10px 0;padding:10px;border-left:5px solid var(--clr);}code{background:#222;padding:2px 4px;border-radius:4px;}</style></head>
          <body><h1>URL Security Scan Report</h1><p><strong>URL:</strong> ${url}</p><p><strong>Time:</strong> ${scanTime}</p>
          <h2>Most Critical (${summary['Most Critical'].length})</h2><ul>${makeList(summary['Most Critical'])}</ul>
          <h2>Moderate (${summary['Moderate'].length})</h2><ul>${makeList(summary['Moderate'])}</ul>
          <h2>Least Critical (${summary['Least Critical'].length})</h2><ul>${makeList(summary['Least Critical'])}</ul>
          </body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "scan_report.html";
        a.click();
      });

    } catch (err) {
      resultContainer.classList.remove('hidden');
      scanStatus.textContent = '❌ Error';
      scanStatus.className = 'status-badge vulnerable';
      resultDetails.innerHTML = `<p>Scan failed. Please try again later.</p><pre>${err.message}</pre>`;
    } finally {
      buttonText.textContent = 'Scan Now 🔍';
      spinner.classList.add('hidden');
      form.classList.remove('scanning');
    }
  });

  // ⚙️ Input + UX tweaks
  urlInput.addEventListener('input', () => {
    const isValid = urlInput.value.startsWith('http://') || urlInput.value.startsWith('https://');
    urlInput.setCustomValidity(isValid ? '' : 'URL must start with http:// or https://');
    urlInput.classList.add('typing');
    setTimeout(() => urlInput.classList.remove('typing'), 300);
  });

  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hover'));
    card.addEventListener('mouseleave', () => card.classList.remove('hover'));
  });
});


// resultDetails.innerHTML = `
//   <p><strong>URL:</strong> ${url}</p>
//   <p><strong>Scan Time:</strong> ${scanTime}</p>
//   <ul>
//     <li>🟥 Most Critical: ${summary['Most Critical'].length}</li>
//     <li>🟧 Moderate: ${summary['Moderate'].length}</li>
//     <li>🟨 Least Critical: ${summary['Least Critical'].length}</li>
//   </ul>

//   <div class="payload-button-group">
//     ${['Most Critical', 'Moderate', 'Least Critical'].map(cat => `
//       <button class="toggle-btn" data-category="${cat}">📂 View ${cat}</button>
//     `).join('')}
//   </div>

//   ${['Most Critical', 'Moderate', 'Least Critical'].map(cat => `
//     <div class="payload-list hidden" id="list-${cat.replace(/\s+/g,'')}">
//       ${summary[cat].length
//         ? summary[cat].map(p => `<p><code>${p.payload}</code><br><small>${p.url}</small></p>`).join('')
//         : '<p>No payloads found.</p>'
//       }
//     </div>
//   `).join('')}

//   <div style="margin-top: 1rem;">
//     <button class="download-button">📄 Download Report</button>
//   </div>
// `;

