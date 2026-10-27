"use client";
import { useState } from "react";

interface SearchBoxProps {
  onSearch: (text: string) => void;
  initial?: string;
}

export default function SearchBox({ onSearch, initial = "" }: SearchBoxProps) {
  const [text, setText] = useState(initial);
  return (
    <form
      className="d-flex gap-2"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(text.trim());
      }}
    >
      <input
        className="form-control form-control-sm"
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-outline-success btn-sm" type="submit">
        Buscar
      </button>
    </form>
  );
}
