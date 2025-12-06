import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../services/api";

const CourseContinued2 = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [output, setOutput] = useState("");

  // -------------------------------
  // COURSE DATA
  // -------------------------------
  const courseData = {
    // (same courseData you sent)
  };

  const course = courseData[courseId];
  if (!course) return <h1>Course Not Found</h1>;

  const currentLesson = course.lessons[selectedLesson];
  const runCode = () => setOutput(currentLesson.expectedOutput);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
   const match = url.match(/(?:v=|youtu\.be\/)([^"&?\/\s]{11})/);

    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  // -------------------- STATIC PDF --------------------
  const downloadStaticPDF = () => {
    let file = "";

    if (course.title === "Java Programming") file = "/pdfs/java.pdf";
    else if (course.title === "Python Programming") file = "/pdfs/python.pdf";
    else return alert("No PDF available for this course.");

    const a = document.createElement("a");
    a.href = file;
    a.download = file.split("/").pop();
    a.click();
  };

  // -------------------- Certificate --------------------
  const generateCertificate = async () => {
    try {
      const res = await ApiService.generateCertificate(course.title);
      if (res.download_url) {
        const a = document.createElement("a");
        a.href = "http://localhost:5000" + res.download_url;
        a.download = `${course.title}_Certificate.pdf`;
        a.click();
        alert("🎉 Certificate Generated!");
      }
    } catch {
      alert("❌ Failed to generate certificate");
    }
  };

  return (
    <main
      style={{
        padding: "96px 20px 32px",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(37,99,235,0.06), transparent 55%), var(--bg-main)",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,"Segoe UI",Roboto,sans-serif',
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(`/courses`)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderRadius: 999,
          border: "1px solid var(--border-color)",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          cursor: "pointer",
          boxShadow: "0 8px 22px var(--shadow-color)",
          marginBottom: 20,
        }}
      >
        ← Back to Courses
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "290px 1fr",
          gap: 20,
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            background: "var(--card-bg)",
            borderRadius: 24,
            padding: "20px 18px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 18px 40px var(--shadow-color)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: 14,
            }}
          >
            {course.title}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {course.lessons.map((lesson, index) => {
              const active = selectedLesson === index;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedLesson(index)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 14,
                    cursor: "pointer",
                    border: active
                      ? "2px solid var(--accent)"
                      : "1px solid var(--border-color)",
                    background: active
                      ? "var(--accent-soft)"
                      : "rgba(255,255,255,0.5)",
                    color: active
                      ? "var(--accent-strong)"
                      : "var(--text-primary)",
                    textAlign: "left",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition:
                      "background .15s ease,border-color .15s ease,color .15s ease",
                  }}
                  onMouseEnter={(e) =>
                    !active &&
                    (e.currentTarget.style.background =
                      "rgba(148,163,184,0.14)")
                  }
                  onMouseLeave={(e) =>
                    !active &&
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.5)")
                  }
                >
                  {lesson.title}
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN PANEL */}
        <section
          style={{
            background: "var(--card-bg)",
            borderRadius: 24,
            padding: "30px 26px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 22px 60px var(--shadow-color)",
          }}
        >
          <h1
            style={{
              fontSize: "1.9rem",
              fontWeight: 700,
              marginBottom: 20,
              background:
                "linear-gradient(135deg,var(--accent),var(--accent-strong))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {currentLesson.title}
          </h1>

          {/* VIDEO */}
          {currentLesson.videoUrl ? (
            <iframe
              width="100%"
              height="360"
              src={getYouTubeEmbedUrl(currentLesson.videoUrl)}
              allowFullScreen
              style={{
                borderRadius: 16,
                border: "1px solid var(--border-color)",
                marginBottom: 22,
              }}
            ></iframe>
          ) : (
            <div
              style={{
                height: 360,
                background: "var(--card-bg)",
                borderRadius: 16,
                border: "1px dashed var(--border-color)",
                marginBottom: 22,
              }}
            />
          )}

          {/* DESCRIPTION */}
          <section style={{ marginBottom: 26 }}>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: 10,
              }}
            >
              Lesson Overview
            </h3>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
              }}
            >
              {currentLesson.description}
            </p>
          </section>

          {/* CODE DISPLAY */}
          {(courseId === "1" ||
            courseId === "3" ||
            courseId === "5") && (
            <>
              <h3
                style={{
                  marginBottom: 10,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Code Example
              </h3>

              <pre
                style={{
                  background: "#0f172a",
                  color: "#f8fafc",
                  padding: 14,
                  borderRadius: 14,
                  fontSize: "0.85rem",
                  overflowX: "auto",
                  marginBottom: 16,
                }}
              >
                {currentLesson.code}
              </pre>

              <button
                onClick={runCode}
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "linear-gradient(135deg,#10b981,#059669)",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: 14,
                  boxShadow: "0 10px 25px rgba(16,185,129,0.35)",
                  transition: "transform .15s ease,box-shadow .15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 36px rgba(16,185,129,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(16,185,129,0.35)";
                }}
              >
                ▶ Run Code
              </button>

              {output && (
                <div style={{ marginBottom: 26 }}>
                  <h4 style={{ marginBottom: 8, color: "var(--text-primary)" }}>
                    Output
                  </h4>
                  <pre
                    style={{
                      background: "var(--bg-main)",
                      padding: 12,
                      borderRadius: 12,
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {output}
                  </pre>
                </div>
              )}
            </>
          )}

          {/* NAVIGATION */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "space-between",
              marginTop: 22,
            }}
          >
            <button
              onClick={() =>
                setSelectedLesson(Math.max(0, selectedLesson - 1))
              }
              style={navBtn}
            >
              ← Previous
            </button>

            {selectedLesson === course.lessons.length - 1 && (
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={downloadStaticPDF} style={pdfBtn}>
                  📘 Download Course PDF
                </button>

                <button onClick={generateCertificate} style={certBtn}>
                  🎖 Generate Certificate
                </button>
              </div>
            )}

            <button
              onClick={() =>
                setSelectedLesson(
                  Math.min(course.lessons.length - 1, selectedLesson + 1)
                )
              }
              style={navBtn}
            >
              Next →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

// BUTTON STYLES
const navBtn = {
  padding: "10px 20px",
  borderRadius: 999,
  border: "none",
  background:
    "linear-gradient(135deg,var(--accent),var(--accent-strong))",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(37,99,235,0.55)",
};

const pdfBtn = {
  padding: "11px 22px",
  borderRadius: 999,
  border: "none",
  background:
    "linear-gradient(135deg,#3b82f6,#2563eb)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 12px 32px rgba(59,130,246,0.45)",
};

const certBtn = {
  padding: "11px 22px",
  borderRadius: 999,
  border: "none",
  background:
    "linear-gradient(135deg,#10b981,#059669)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 12px 32px rgba(16,185,129,0.45)",
};

export default CourseContinued2;
