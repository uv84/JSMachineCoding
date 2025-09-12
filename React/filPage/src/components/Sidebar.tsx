interface SidebarProps {
    searchTerm: string;
    selectedCategories: string[];
    setSidebarOpen: (open: boolean) => void;
    clearAllFilters: () => void;
    getUniqueCategories: () => string[];
    handleCategoryToggle: (category: string) => void;
}

const Sidebar = ({
    searchTerm,
    selectedCategories,
    setSidebarOpen,
    clearAllFilters,
    getUniqueCategories,
    handleCategoryToggle
}: SidebarProps) => {
    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg p-6 h-fit">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Clear filters button */}
                {(searchTerm || selectedCategories.length > 0) && (
                    <button
                        onClick={clearAllFilters}
                        className="w-full mb-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                    >
                        Clear All Filters
                    </button>
                )}

                {/* Category filters */}
                <div className="space-y-3">
                    {getUniqueCategories().map((category) => (
                        <label key={category} className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryToggle(category)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700 capitalize">
                                {category}
                            </span>
                        </label>
                    ))}
                </div>

                {/* Active filters summary */}
                {selectedCategories.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Active Filters:</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((category) => (
                                <span
                                    key={category}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                    {category}
                                    <button
                                        onClick={() => handleCategoryToggle(category)}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Sidebar;