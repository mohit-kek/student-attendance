import React, { useEffect, useState } from 'react'

function StudentAttendance() {
    const [studentsData, setStudentsData] = useState({
        name: "",
        rollNumber: "",
    });
    const [attendance, setAttendance] = useState([]);
    const [presentStudents, setPresentStudents] = useState();

    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudentsData({ ...studentsData, [name]: value })
    }

    const addStudent = (e) => {
        e.preventDefault();

        const newAttendance = { ...studentsData, checkIn: new Date().toLocaleString() }

        setAttendance([...attendance, newAttendance]);
        setStudentsData({ name: "", rollNumber: "" })
    }

    const studentCheckOut = (rollNumber) => {
        setAttendance((attendance) => (
            attendance.map((student) => {
                if (student.rollNumber === rollNumber) {
                    return { ...student, checkout: new Date().toLocaleString() }
                }
                return student;
            })
        ))
    }

    useEffect(() => {
        const currentStudents = attendance.filter(student => !student.checkout)
        setPresentStudents(currentStudents.length);
    }, [attendance]);



    // useEffect();
    return (
        <div className='main'>

            {/* Form to add a new student */}
            <h1>Student Attendance</h1>
            <form onSubmit={addStudent}>
                <label htmlFor="name">Name:</label>
                <input type="text" name='name' onChange={inputHandler} autoComplete="off" value={studentsData.name} placeholder="Name" />
                <br />

                <label htmlFor="rollNumber">Roll No:</label>
                <input type="text" name='rollNumber' onChange={inputHandler} autoComplete="off" value={studentsData.rollNumber} placeholder="Roll Number" />
                <br />

                <button type='submit' className='add__student'>Add Student</button>
            </form>

            <div className='container'>
                {/* Students Attendance Table */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((student) =>
                        (
                            <tr key={student.name}>
                                <td>{student.name}</td>
                                <td>{student.rollNumber}</td>
                                <td>{student.checkIn}</td>
                                <td>{student.checkout ? student.checkout : <button onClick={() => studentCheckOut(student.rollNumber)} className="checkout">Check Out</button>}</td>
                            </tr>
                        )
                        )}

                    </tbody>

                </table>

                <div className="present__students">
                    <h1>Number of present students</h1>
                    <span>{presentStudents}</span>
                </div>
            </div>
        </div>
    )
}

export default StudentAttendance
