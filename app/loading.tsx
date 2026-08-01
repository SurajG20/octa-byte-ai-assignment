export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <header className="animate-pulse">
          <div className="h-9 w-64 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-96 rounded bg-gray-200" />
          <div className="mt-1 h-4 w-72 rounded bg-gray-200" />
        </header>

        <div className="grid grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4 shadow">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="mt-2 h-7 w-28 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="max-h-162.5 overflow-auto rounded-lg border animate-pulse">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                {[...Array(11)].map((_, i) => (
                  <th key={i} className="border-b px-4 py-3">
                    <div className="mx-auto h-3 w-16 rounded bg-gray-300" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(15)].map((_, row) => (
                <tr key={row} className="odd:bg-white even:bg-gray-50">
                  {[...Array(11)].map((_, cell) => (
                    <td key={cell} className="border-b px-4 py-3">
                      <div className="mx-auto h-3 w-14 rounded bg-gray-200" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
