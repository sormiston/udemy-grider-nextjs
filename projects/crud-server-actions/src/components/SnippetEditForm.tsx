"use client";
import type { Snippet } from "@/generated/prisma";
import type { OnChange } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import { useState } from "react";

type SnippetEditFormProps = {
  snippet: Snippet;
};

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange: OnChange = (value) => {
    if (value) setCode(value);
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
      />
    </>
  );
}
