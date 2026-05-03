import "../App.css";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import "../charts/ChartSetup";

const Reports = () => {
  const [workDoneLastWeek, setWorkDoneLastWeek] = useState(0);
  const [pendingWorkDays, setPendingWorkDays] = useState(0);
  const [tasksByTeam, setTasksByTeam] = useState([]);
  const [tasksByOwner, setTasksByOwner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);

        const workDoneRes = await fetch(
          "https://major-project-3-backend.vercel.app/reports/work-done-last-week"
        );
        const pendingRes = await fetch(
          "https://major-project-3-backend.vercel.app/reports/pending-work-days"
        );
        const teamRes = await fetch(
          "https://major-project-3-backend.vercel.app/reports/tasks-closed-by-team"
        );
        const ownerRes = await fetch(
          "https://major-project-3-backend.vercel.app/reports/tasks-closed-by-owner"
        );

        const workDoneData = await workDoneRes.json();
        const pendingData = await pendingRes.json();
        const teamData = await teamRes.json();
        const ownerData = await ownerRes.json();

        setWorkDoneLastWeek(workDoneData.totalWorkDoneLastWeek);
        setPendingWorkDays(pendingData.pendingWorkDays);
        setTasksByTeam(teamData);
        setTasksByOwner(ownerData);
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const teamChartData = {
    labels: tasksByTeam.map((t) => t.teamName),
    datasets: [
      {
        label: "Tasks Closed",
        data: tasksByTeam.map((t) => t.closedTasks),
        backgroundColor: [
          "#4f46e5",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#06b6d4",
        ],
      },
    ],
  };

  const ownerChartData = {
    labels: tasksByOwner.map((o) => o.ownerName),
    datasets: [
      {
        label: "Tasks Closed",
        data: tasksByOwner.map((o) => o.closedTasks),
        backgroundColor: [
          "#6366f1",
          "#ec4899",
          "#10b981",
          "#f97316",
          "#3b82f6",
        ],
      },
    ],
  };

  const totalTeamClosed = tasksByTeam.reduce(
    (sum, t) => sum + t.closedTasks,
    0
  );

  const totalOwnerClosed = tasksByOwner.reduce(
    (sum, o) => sum + o.closedTasks,
    0
  );

  return (
    <main className="reports-bg">
      <h1 className="page-title">Workasana Reports</h1>

      <div className="container">
        <div className="flexBoxes">
          <Sidebar />
          {loading && (
            <div className="loader-container reports-page-loader">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          )}

          <div className="contentArea reports-content">
            <header className="reports-header">
              <h3>Report Overview</h3>
              <p className="reports-lede">
                Snapshot of throughput and outstanding effort across teams.
              </p>
            </header>

            <section className="reports-kpi-grid" aria-label="Summary metrics">
              <article className="reports-kpi reports-kpi--done">
                <span className="reports-kpi-label">Total work done last week</span>
                <span className="reports-kpi-value">{workDoneLastWeek}</span>
              </article>
              <article className="reports-kpi reports-kpi--pending">
                <span className="reports-kpi-label">Total days of work pending</span>
                <span className="reports-kpi-value">{pendingWorkDays}</span>
              </article>
            </section>

            <section
              className="reports-chart-section"
              aria-labelledby="reports-chart-team-title"
            >
              <div className="reports-chart-card">
                <div className="reports-chart-card-head">
                  <h4 id="reports-chart-team-title">Tasks closed by team</h4>
                  <span className="reports-chart-pill">{totalTeamClosed} closed</span>
                </div>
                <div className="reports-chart-body barChart">
                  <Bar data={teamChartData} />
                </div>
              </div>
            </section>

            <section
              className="reports-chart-section"
              aria-labelledby="reports-chart-owner-title"
            >
              <div className="reports-chart-card">
                <div className="reports-chart-card-head">
                  <h4 id="reports-chart-owner-title">Tasks closed by owner</h4>
                  <span className="reports-chart-pill reports-chart-pill--owner">
                    {totalOwnerClosed} closed
                  </span>
                </div>
                <div className="reports-chart-body pieChart">
                  <Pie data={ownerChartData} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reports;