import React, { useEffect, useState } from 'react';
import db from '../../firebase';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch history data from Firestore
    // This is a simplified example; adapt as per your database structure
    const unsubscribe = db.collection('history').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setHistory(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Activity History</h1>
      {history.map((item, index) => (
        <div key={index}>
          <p>{item.action} - {item.details}</p>
        </div>
      ))}
    </div>
  );
}

export default History;
