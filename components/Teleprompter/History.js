import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParagraphsFromHistory } from '../../store/thunks/fetchParagraphsFromHistory';

const HistoryComponent = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchParagraphsFromHistory());
  }, [dispatch]);

  const paragraphsFromHistory = useSelector(
    (state) => state.history.paragraphsFromHistory,
  );

  const sortedParagraphs = [...paragraphsFromHistory].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.paragraph_index - b.paragraph_index
      : b.paragraph_index - a.paragraph_index;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedParagraphs.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedParagraphs.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl mb-4">Paragraphs History</h1>
      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort by Index
      </button>
      <div className="overflow-y-auto h-[400px]">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Index
              </th>
              <th className="w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Paragraph
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="w-1/3 text-left py-3 px-4">
                  {item.paragraph_index}
                </td>
                <td className="w-2/3 text-left py-3 px-4">
                  {item.paragraph_string}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`mx-1 p-2 ${
              currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryComponent;
