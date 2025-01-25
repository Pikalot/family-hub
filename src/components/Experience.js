import styles from "./Experience.module.css";

export default function Experience({exp}) {
    console.log('exp is:', exp);
    return (
        <div className={styles["experience"]}>
            <h1>Experience</h1>
            <ul>
                {exp && exp.map((job) => (
                    <li key={job.id}>
                        <h2>{job.title}</h2>
                        <h3>{job.name}</h3>
                        <p>{job.from_date} {job.to_date}</p>
                        <p>{job?.city + ', '} {job?.state + ', '} {job.country}</p>
                    </li>
                ))}
            </ul>

            
            <h1>Education</h1>
            <ul>
                
                    <h2>School Name</h2>
                    <h3>Major</h3>
                    <li>from To</li>
                    <li>GPA</li>
                    <li>address</li>
                
                <li>
                    <h2>School Name</h2>
                    <h3>Major</h3>
                    <p>from To</p>
                    <p>Grades:</p>
                    <p>address</p>
                </li>
            </ul>
        </div>
    )
};