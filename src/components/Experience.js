import styles from "./Experience.module.css";

export default function Experience({member, exp, education}) {
    return (
        <div className={styles["experience"]}>
            {exp && exp.length > 0 && (
                <>
                    <h1>Experience</h1>
                    <ul>
                        {exp.map((job, index) => (
                            <li key={index}>
                                <h2>{job.title}</h2>
                                <h3>{job.name}</h3>
                                <p>{job?.from_date ? job.from_date + " - " : ""}
                                    {job?.to_date ? job?.to_date : ""}</p>
                                <p>{job?.city ? job?.city + ', ' : ""}
                                    {job?.state ? job?.state + ', ' : ""}
                                    {job?.country ? job?.country : ""}</p>
                            </li>
                        ))}
                    </ul>
                </> 
            )}

            <h1>Education</h1>
            <ul>
                {education ? education.map((school, index) => (
                    <li key={index}>
                    <h2>{school.name}</h2>
                    <h3>{school?.degree ? school?.degree + ", " : ""}{school?.major ? school?.major : ""}</h3>
                    <p>{school?.grad_year ? (
                        `Graduation Year (Completed/Expected): ${school?.grad_year}`
                    ) : (
                        `${member[0].first_name}’s journey is just beginning—excited to see what’s next`
                    )}
                    </p>
                    <p>{school?.gpa && (`Grades: ${school?.gpa}`)}</p>
                    <p>{school?.city ? school?.city + ', ' : ""}
                        {school?.state ? school?.state + ', ': ""}
                        {school?.country ? school?.country : ""}</p>
                    </li>
                )) :
                "N/A"}
            </ul>
        </div>
    )
};