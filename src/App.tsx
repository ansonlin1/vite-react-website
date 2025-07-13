import React from "react";
import Layout from "./components/layout/Layout";

const App: React.FC = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Website</h1>
        <p className="text-lg text-gray-600">
          This is a sample homepage. Start building your content here.
        </p>
      </div>
    </Layout>
  );
};

export default App;
