import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { getStudents, uploadFile, logout } from '../services/api';
import StudentTable, { Student } from './StudentTable';

const Dashboard: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        console.log(`Fetching students for page ${currentPage}`);
        fetchStudents();
    }, [currentPage]);

    const fetchStudents = async () => {
        try {
            const data = await getStudents(currentPage);
            setStudents(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (token) {
            try {
                await logout(token); // Call the logout function
                localStorage.removeItem('token'); // Remove the authentication token
                window.location.href = '/login'; // Redirect to login page
            } catch (error) {
                console.error('Error logging out:', error);
            }
        } else {
            console.error('No token found');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            setUploadStatus('Uploading...');
            await uploadFile(file);
            setUploadStatus('File uploaded successfully. Processing...');
            // Poll server for processing status if needed
        } catch (error) {
            setUploadStatus('Upload failed');
            console.error('Error uploading file:', error);
        }
    };

    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Student Election Dashboard</h1>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Upload Student Data</h2>
                <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={!file}
                >
                    Upload File
                </button>
                {uploadStatus && <p className="mt-2">{uploadStatus}</p>}
            </div>
            <StudentTable
                students={students}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
