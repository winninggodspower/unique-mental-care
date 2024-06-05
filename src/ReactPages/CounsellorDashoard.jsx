import { useEffect, useState } from 'react';
import { app } from '../firebase/client';
import { getFirestore, collection, onSnapshot, getDoc, doc } from 'firebase/firestore';

function CounsellorDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const unsubscribe = onSnapshot(collection(db, 'requests'), async (snapshot) => {
      const requestData = [];
      for (const Snapshotdoc of snapshot.docs) {
        const request = { id: Snapshotdoc.id, ...Snapshotdoc.data() };
        // Get the user name based on the reference
        console.log(request.user);
        if (request.user) {
          try {
            const userDoc = await getDoc(doc(db, 'users/YkIoMeXvHVY2vPPWPSl4sQTuUjl2'));
            console.log('Does this exist:', userDoc.exists());
            if (userDoc.exists()) {
              const userData = userDoc.data();
              request.userName = userData.name;
            }
          } catch (error) {
            console.error('Error fetching user document:', error);
          }
        }        
        requestData.push(request);
      }
      setRequests(requestData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <header className="flex h-14 lg:h-20 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="flex-1">
          <h1 className="font-semibold text-lg md:text-2xl">Incoming Requests</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="border shadow-sm rounded-lg">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px]">
                    Student
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                    Time
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {requests.map((request) => (
                  <tr key={request.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">{request.userName || 'Loading...'}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">{request.time}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                      <div className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-${request.statusColor}-100 text-${request.statusColor}-600 dark:bg-${request.statusColor}-900/20 dark:text-${request.statusColor}-400`}>
                        {request.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CounsellorDashboard;
