import React from "react";
import { Icon } from "@iconify/react";

export default function SearchInput({ searchTerm, setSearchTerm, setCurrentPage, iconSearch }) {
    return (
        <div className="search-bar-new">
        <Icon
            icon={iconSearch}
            width="24"
            height="24"
            color="#610000"
        />
        <input
            type="text"
            placeholder="Search ID..."
            value={searchTerm}
            onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
            }}
        />
    </div>
  );
}
