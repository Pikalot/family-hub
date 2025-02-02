"use client";
import { useState } from "react";
import styles from "./MemberPage.module.css";

export default function MemberPage({ members }) {
    // State to track selected members
    const [selectedMembers, setSelectedMembers] = useState([]);

    // Function to handle checkbox selection
    const handleCheckboxChange = (memberId) => {
        setSelectedMembers((prev) =>
            prev.includes(memberId)
                ? prev.filter((mid) => mid !== memberId) // Remove if already selected
                : [...prev, memberId] // Add if not selected
        );
    };

    return (
        <div className={styles["member"]}>
            <h2>Member List</h2>
            <table className={styles["member-table"]}>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th className={styles["invisible-column"]}>Email</th>
                        <th className={styles["invisible-column"]}>Username</th>
                        <th className={styles["invisible-column"]}>Date of Birth</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.mid}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedMembers.includes(member.mid)}
                                    onChange={() => handleCheckboxChange(member.mid)}
                                />
                            </td>
                            <td>{member.first_name}</td>
                            <td>{member.last_name}</td>
                            <td className={styles["invisible-column"]}>{member.email}</td>
                            <td className={styles["invisible-column"]}>{member.username}</td>
                            <td className={styles["invisible-column"]}>{member.dob ? new Date(member.dob).toLocaleDateString() : ""}</td>
                            <td>{member.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Display Selected Members */}
            {selectedMembers.length > 0 && (
                <div className={styles["selected-members"]}>
                    <h3>Selected Members:</h3>
                    <ul>
                        {selectedMembers.map((mid) => {
                            const selectedMember = members.find((m) => m.mid === mid);
                            return (
                                <li key={mid}>
                                    {selectedMember.first_name} {selectedMember.last_name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
