import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParagraphsFromHistory } from '../../store/thunks/fetchParagraphsFromHistory';

const HistoryComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParagraphsFromHistory());
  }, [dispatch]);

  const paragraphsFromHistory = useSelector(
    (state) => state.history.paragraphsFromHistory,
  );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl mb-4">Paragraphs History</h1>
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
          {paragraphsFromHistory.map((item, index) => (
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
  );
};

export default HistoryComponent;
