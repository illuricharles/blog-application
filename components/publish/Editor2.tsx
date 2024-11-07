"use client";
import { useState } from "react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

function Editor2() {
  const [value, setValue] = useState('');

  return (
    <div className="container mx-auto p-4">
      <ReactQuill value={value} onChange={setValue} />

      {/* Display Quill output */}
      <div className="mt-4 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">Output:</h2>
        <div className="prose" dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
}

export default Editor2;
