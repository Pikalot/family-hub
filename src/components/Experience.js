import styles from "./Experience.module.css";

export default function Experience({exp, education}) {
    return (
        <div className={styles["experience"]}>
            <h1>Experience</h1>
            <ul>
                {exp ? exp.map((job, index) => (
                    <li key={index}>
                        <h2>{job.title}</h2>
                        <h3>{job.name}</h3>
                        <p>{job.from_date} {job.to_date}</p>
                        <p>{job?.city + ', '} {job?.state + ', '} {job.country}</p>
                    </li>
                )) :
                "N/A"}
            </ul>
            
            <h1>Education</h1>
            <ul>
                {education ? education.map((school, index) => (
                    <li key={index}>
                    <h2>{school.name}</h2>
                    <h3>{school?.degree ? school?.degree + ", " : ""}{school?.major ? school?.major : ""}</h3>
                    <p>Graduation Year (Completed/Expected): {school?.grad_year}</p>
                    <p>Grades: {school?.gpa ? school?.gpa : "N/A"}</p>
                    <p>{school?.city + ', '}{school?.state + ', '}{school?.country}</p>
                    </li>
                )) :
                "N/A"}
            </ul>
        </div>
    )
};