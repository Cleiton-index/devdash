* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f1f5f9;
  color: #0f172a;
}

a {
  text-decoration: none;
}

/* DASHBOARD */

.dashboard {
  display: flex;
  min-height: 100vh;
}

/* SIDEBAR */

.sidebar {
  width: 250px;
  min-height: 100vh;
  background: #0f172a;
  color: white;
  padding: 30px 20px;
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar h2 {
  font-size: 24px;
  margin: 0 0 40px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar a {
  color: #cbd5e1;
  padding: 14px 16px;
  border-radius: 10px;
  transition: 0.2s;
}

.sidebar a:hover {
  background: #1e293b;
  color: white;
}

/* CONTEÚDO */

.main-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  padding: 35px;
}

/* TOPO */

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}

.topbar h1 {
  margin: 0;
  font-size: 30px;
}

.topbar p {
  margin-top: 6px;
  color: #64748b;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #2563eb;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 18px;
}

/* CARDS */

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
}

.card span {
  color: #64748b;
  font-size: 14px;
}

.card strong {
  font-size: 28px;
}

.card small {
  color: #16a34a;
  font-weight: 600;
}

/* GRÁFICO */

.grafico {
  background: white;
  padding: 25px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  margin-bottom: 30px;
}

.grafico h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

/* PAINÉIS */

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.panel {
  background: white;
  padding: 25px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.panel h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.project {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;
  border-bottom: 1px solid #e2e8f0;
}

.project:last-child {
  border-bottom: none;
}

.project strong {
  color: #16a34a;
  font-size: 14px;
}

/* TABLET */

@media (max-width: 1000px) {

  .cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

}

/* CELULAR */

@media (max-width: 700px) {

  .dashboard {
    display: block;
  }

  .sidebar {
    position: static;
    width: 100%;
    min-height: auto;
  }

  .sidebar h2 {
    margin-bottom: 20px;
  }

  .sidebar nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
    padding: 20px;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }

  .cards {
    grid-template-columns: 1fr;
  }

}
.grafico-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.grafico-header h2 {
  margin: 0 0 5px;
}

.grafico-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.grafico-header strong {
  font-size: 24px;
  color: #2563eb;
}

.tooltip {
  background: white;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
}

.tooltip strong {
  display: block;
  margin-bottom: 5px;
}

.tooltip p {
  margin: 0;
  color: #2563eb;
  font-weight: bold;
}
