import React from 'react';

export interface Student {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  year_of_study: number;
}

interface StudentTableProps {
  students: Student[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };


  const pageRange = 10; // Number of pages to show
  const halfRange = Math.floor(pageRange / 2);
  const startPage = Math.max(1, currentPage - halfRange);
  const endPage = Math.min(totalPages, startPage + pageRange - 1);
  const adjustedStartPage = Math.max(1, endPage - pageRange + 1);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Year of Study
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {student.student_id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {student.first_name} {student.last_name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {student.department}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {student.year_of_study}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentTable;
