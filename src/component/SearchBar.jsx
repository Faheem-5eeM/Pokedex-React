export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-input body3-fonts"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
