"use client";
import styles from "./ProjectPage.module.css";
import Image from "next/image";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProjectPage({ projects }) {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isPhoneScreen, setIsPhoneScreen] = useState(false);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const current = useSearchParams();

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneScreen(window.innerWidth <= 1194);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPhoneScreen) {
      control.start("visible"); // Skip animation for phone screens
    } else if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView, isPhoneScreen]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = keyword.trim();
    const params = new URLSearchParams(current.toString());

    if (query) {
      params.set("query", query);
    } else params.delete("query");

    router.push(params.toString() ? `${pathname}?${params}` : pathname);
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles["project-page"]}>
      <form onSubmit={handleSearch} className={styles["search-form"]}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search projects..."
          className={styles["search-input"]}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(e);
            }
          }}
        />
        <button type="submit" className={styles["search-button"]}>
          Search
        </button>
      </form>
      <table className={styles["project-table"]}>
        <thead>
          <tr>
            <th></th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Tech Stack</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr
              key={index}
              onClick={() => toggleExpand(index)}
              className={expandedIndex === index ? styles.expanded : ""}
            >
              <td className={styles["image-column"]}>
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={project.source}
                    alt={project.name}
                    width={150}
                    height={150}
                  />
                </a>
              </td>
              <td className={styles["name-column"]}>
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name}
                </a>
              </td>
              <td className={styles["description-column"]}>
                {project.description}
              </td>
              <td className={styles["created-at-column"]}>
                {project.createdAt &&
                  new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className={styles["skills-column"]}>{project.skills}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {projects.length === 0 && (
        <div className="flex flex-row w-100 justify-center">
          <p className="text-lg text-slate-800 dark:text-white/70 mt-5 mb-5">
            No results found!
          </p>
        </div>
      )}
    </div>
  );
}
