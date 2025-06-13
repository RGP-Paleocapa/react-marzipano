const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div
    role="alert"
    className="flex flex-col justify-center items-center h-full w-full p-6 text-center text-red-600 bg-red-50 rounded transition-opacity duration-300 ease-in-out opacity-100"
  >
    <h2 className="text-2xl font-bold mb-4">Qualcosa è andato storto:</h2>
    <pre className="mb-6 bg-red-100 p-4 rounded max-h-48 overflow-auto text-red-700 whitespace-pre-wrap break-words shadow-inner w-full max-w-lg">
      {error.message}
    </pre>
    <button
      onClick={resetErrorBoundary}
      className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 transition"
      aria-label="Try again"
    >
      Ritenta
    </button>
  </div>
);

export default ErrorFallback;
