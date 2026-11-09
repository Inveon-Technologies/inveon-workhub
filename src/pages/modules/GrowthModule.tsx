import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Award,
  Play,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  X,
  FileCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import heroBg from "../../assets/images/hero-architecture-bg.png";
import { LMSCourse } from "../../types";

export const GrowthModule: React.FC = () => {
  const { showToast } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"courses" | "certifications">("courses");
  const [activeCourse, setActiveCourse] = useState<LMSCourse | null>(null);

  const [courses, setCourses] = useState<LMSCourse[]>([
    {
      id: "CRS-101",
      title: "Inveon Design System & Component Architecture",
      category: "Design",
      level: "Intermediate",
      duration: "4h 30m",
      lessonsCount: 12,
      progress: 75,
      completedLessons: 9,
      instructor: "Ishita Verma",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300",
      description: "Master modern atomic design patterns, tokens, and Tailwind v4 architecture for scalable web apps.",
    },
    {
      id: "CRS-102",
      title: "TypeScript Enterprise Patterns & Drizzle ORM",
      category: "Engineering",
      level: "Advanced",
      duration: "6h 15m",
      lessonsCount: 18,
      progress: 45,
      completedLessons: 8,
      instructor: "Akshay More",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300",
      description: "Deep dive into type-safe SQL queries, schema migrations, and high-performance serverless endpoints.",
    },
    {
      id: "CRS-103",
      title: "Executive Leadership & Agile Team Operations",
      category: "Leadership",
      level: "Intermediate",
      duration: "3h 45m",
      lessonsCount: 8,
      progress: 100,
      completedLessons: 8,
      instructor: "Omkar Kumbhar",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300",
      description: "Frameworks for cross-functional sprint planning, 1-on-1 coaching, and high-velocity team orchestration.",
    },
    {
      id: "CRS-104",
      title: "Enterprise Cybersecurity, SOC2 & HIPAA Compliance",
      category: "Security",
      level: "Beginner",
      duration: "2h 00m",
      lessonsCount: 6,
      progress: 100,
      completedLessons: 6,
      instructor: "Aditya Rao",
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300",
      description: "Essential compliance training covering multi-tenant data encryption, role permissions, and audit logs.",
    },
  ]);

  const categories = ["All", "Engineering", "Design", "Leadership", "Security"];

  const filtered = selectedCategory === "All"
    ? courses
    : courses.filter((c) => c.category === selectedCategory);

  const handleCompleteNextLesson = () => {
    if (!activeCourse) return;
    const currentCompleted = activeCourse.completedLessons || 0;
    if (currentCompleted < activeCourse.lessonsCount) {
      const nextCount = currentCompleted + 1;
      const nextProgress = Math.round((nextCount / activeCourse.lessonsCount) * 100);

      const updated = {
        ...activeCourse,
        completedLessons: nextCount,
        progress: nextProgress,
      };

      setActiveCourse(updated);
      setCourses(courses.map((c) => (c.id === updated.id ? updated : c)));
      showToast(`Completed Lesson ${nextCount}! Progress: ${nextProgress}%`, "success");
    } else {
      showToast("Course already 100% completed! Certificate ready.", "info");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
        {/* Background Architectural Layer */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={heroBg}
            alt="Inveon Campus Architecture"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-3/4" />
        </div>

        <div className="relative z-10">
          <div className="relative z-10 flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              GROWTH & LEARNING OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            WorkHub Academy & Growth
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Build verified domain expertise, complete course tracks, and earn company certifications.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "courses" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
            }`}
          >
            Course Catalog
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "certifications" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
            }`}
          >
            My Certifications (2)
          </button>
        </div>
      </div>

      {/* Courses View */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#315BDB] text-white shadow-xs"
                    : "bg-white text-[#858B93] hover:text-[#191C20] border border-[#E3E8EE]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                onClick={() => setActiveCourse(course)}
                className="bg-white rounded-3xl overflow-hidden border border-[#E3E8EE] hover:border-[#315BDB] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-black/60 text-white backdrop-blur-xs">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-[#191C20] shadow-xs">
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#858B93]">
                      <span>{course.level} Level</span>
                      <span>{course.lessonsCount} Lessons</span>
                    </div>

                    <h3 className="text-sm font-black text-[#191C20] group-hover:text-[#315BDB] transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#858B93] line-clamp-2">{course.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="space-y-1.5 pt-3 border-t border-[#F2F1ED]">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#858B93]">Progress</span>
                      <span className={course.progress === 100 ? "text-[#10B981]" : "text-[#315BDB]"}>
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F2F1ED] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${course.progress === 100 ? "bg-[#10B981]" : "bg-[#315BDB]"}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveCourse(course)}
                    className="mt-4 w-full py-2 rounded-xl bg-[#F2F1ED] group-hover:bg-[#315BDB] text-xs font-bold text-[#191C20] group-hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{course.progress === 100 ? "Review Course" : "Continue Learning"}</span>
                    <Play size={12} className="fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === "certifications" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Executive Leadership & Agile Team Operations",
              certId: "INV-CERT-2026-089",
              issuedDate: "15 Oct 2026",
              instructor: "Omkar Kumbhar",
              badge: "Verified Certificate",
            },
            {
              title: "Enterprise Cybersecurity, SOC2 & HIPAA Compliance",
              certId: "INV-CERT-2026-012",
              issuedDate: "02 Sep 2026",
              instructor: "Aditya Rao",
              badge: "Security Clearance",
            },
          ].map((cert, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981]">
                      {cert.badge}
                    </span>
                    <h3 className="text-base font-black text-[#191C20] leading-snug">{cert.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs space-y-1">
                <p className="text-[#858B93]">Certificate ID: <strong className="font-mono text-[#191C20]">{cert.certId}</strong></p>
                <p className="text-[#858B93]">Issued on: <strong className="text-[#191C20]">{cert.issuedDate}</strong></p>
                <p className="text-[#858B93]">Lead Instructor: <strong className="text-[#191C20]">{cert.instructor}</strong></p>
              </div>

              <button
                onClick={() => showToast(`Downloaded Certificate ${cert.certId}.`, "success")}
                className="w-full py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold transition-colors shadow-xs"
              >
                Download Verified PDF Certificate
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Course Player Modal */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#D8D9D6] max-h-[90vh] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="p-5 border-b border-[#F2F1ED] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#315BDB]">{activeCourse.category} Track</span>
                  <h3 className="text-base font-black text-[#191C20]">{activeCourse.title}</h3>
                </div>
                <button
                  onClick={() => setActiveCourse(null)}
                  className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player Placeholder */}
              <div className="relative bg-[#191C20] aspect-video flex items-center justify-center text-white">
                <img
                  src={activeCourse.thumbnail}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#315BDB] text-white flex items-center justify-center mx-auto shadow-xl hover:scale-110 transition-transform cursor-pointer">
                    <Play size={24} className="fill-current ml-1" />
                  </div>
                  <span className="text-xs font-bold block">
                    Playing Lesson {(activeCourse.completedLessons || 0) + 1} of {activeCourse.lessonsCount}
                  </span>
                </div>
              </div>

              {/* Syllabus Overview */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#191C20]">Course Progress & Lessons</span>
                  <span className="text-xs font-black text-[#315BDB]">
                    {activeCourse.completedLessons || 0} / {activeCourse.lessonsCount} Completed ({activeCourse.progress}%)
                  </span>
                </div>

                <div className="w-full h-2 bg-[#F2F1ED] rounded-full overflow-hidden">
                  <div className="h-full bg-[#315BDB] rounded-full" style={{ width: `${activeCourse.progress}%` }} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 border-t border-[#F2F1ED] flex items-center justify-between bg-[#FAFAFA]">
              <span className="text-xs text-[#858B93] font-medium">Instructor: {activeCourse.instructor}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCourse(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#D8D9D6] text-xs font-bold text-[#191C20]"
                >
                  Close Player
                </button>
                <button
                  onClick={handleCompleteNextLesson}
                  className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-xs font-bold text-white shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 size={14} />
                  <span>Mark Lesson Complete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
