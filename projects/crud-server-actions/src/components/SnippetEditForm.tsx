"use client";

import type { Snippet } from "@/generated/prisma";
import type { OnChange } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";
import { redirect } from "next/navigation";

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

    const response = await actions.updateSnippet({
      id: snippet.id,
      code: code,
    });

    if (response.status === 200) {
      redirect(`/snippets/${snippet.id}`);
    } else {
      // TODO: improve error display UI
      alert(`Error: ${response.message}`);
    }
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
      <form onSubmit={handleSubmit}>
        <button type="submit" className="button pressable-white">
          Save
        </button>
      </form>
    </>
  );
}
