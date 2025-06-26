"use client";

import type { Snippet } from "@/generated/prisma";
import type { OnChange } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

type SnippetEditFormProps = {
  snippet: Snippet;
};

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange: OnChange = (value) => {
    if (value) setCode(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    await actions.updateSnippet({
      id: snippet.id,
      code: code,
    });
  };

  return (
    <>
      <Editor
        height="35vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
        className="mb-3"
      />
      <form onSubmit={handleSubmit}>
        <button type="submit" className="button pressable-white">
          Save
        </button>
      </form>
    </>
  );
}
