function Sidebar() {
  const sideList = [
    "Documentation",
    "Tutorials",
    "Community",
    "Blog",
    "Showcase",
    "Resources",
    "Documentation",
    "Tutorials",
    "Community",
    "Blog",
    "Showcase",
    "Resources",
    "Documentation",
    "Tutorials",
    "Community",
    "Blog",
    "Showcase",
    "Resources",
  ];
  return (
    <div className="h-[600px] overflow-y-auto pr-2">
      <ul className="space-y-4">
        {sideList.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;