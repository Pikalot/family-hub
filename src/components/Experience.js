import styles from "./Experience.module.css";

export default function Experience({exp, education}) {
    return (
        <div className={styles["experience"]}>
            <h1>Experience</h1>
            <ul>
                {exp && exp.map((job, index) => (
                    <li key={index}>
                        <h2>{job.title}</h2>
                        <h3>{job.name}</h3>
                        <p>{job.from_date} {job.to_date}</p>
                        <p>{job?.city + ', '} {job?.state + ', '} {job.country}</p>
                    </li>
                ))}
            </ul>
            
            <h1>Education</h1>
            <ul>
                {education && education.map((school, index) => (
                    <li key={index}>
                    <h2>{school.name}</h2>
                    <h3>{school?.degree + ", "}{school.major}</h3>
                    <p>Graduation Year (Completed/Expected): {school?.grad_year}</p>
                    <p>Grades: {school?.gpa}</p>
                    <p>{school?.city + ', '}{school?.state + ', '}{school?.country}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};