import { useEffect, useState } from "react";

interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

const accordionData: AccordionItem[] = [
  {
    id: 1,
    title: "🚀 Getting Started",
    content: "Welcome to our platform! This section covers the basic steps to get you up and running. You'll learn how to create an account, set up your profile, and navigate through the main features. Our user-friendly interface makes it easy for beginners to start their journey with confidence."
  },
  {
    id: 2,
    title: "💡 Advanced Features",
    content: "Dive deeper into the powerful features that make our platform unique. Explore advanced analytics, custom integrations, automation tools, and collaboration features. These tools are designed to help you maximize productivity and achieve your goals more efficiently."
  },
  {
    id: 3,
    title: "❓ Frequently Asked Questions",
    content: "Find answers to the most commonly asked questions about our service. This includes billing information, troubleshooting tips, account management, data security policies, and best practices. If you can't find your answer here, feel free to contact our support team."
  }
];

// Style constants for better maintainability
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  accordionWrapper: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  tabHeader: {
    display: 'flex' as const,
    borderBottom: '1px solid #dee2e6'
  },
  tabButton: {
    color: '#333',
    flex: '1 1 0',
    padding: '15px 20px',
    borderBottom: '10px solig blue',
    // backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease-in-out',
    borderRight: '1px solid #dee2e6'
  },
  activeTabButton: {
    backgroundColor: '#007bff',
    color: '#fff'
  },
  content: {
    padding: '20px',
    backgroundColor: '#fff',
    lineHeight: '1.6',
    color: '#333',
    minHeight: '200px'
  }
} as const;

function Accordion() {
  // Remove unnecessary data state since accordionData is static
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const getActiveContent = () => {
    const activeItem = accordionData.find(item => item.id === activeTab);
    return activeItem?.content || '';
  };
  useEffect(() => { 
    document.title="accordian"
  },[])

  return (
    <>
      {/* Custom CSS for text selection */}
      <style>
        {`
          div::selection {
            color: red;
            background-color: yellow;
          }
        `}
      </style>
      
      <div style={styles.container}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        📋 Accordion Component
      </h1>
      
      <div style={styles.accordionWrapper}>
        {/* Tab Headers */}
        <div style={styles.tabHeader}>
          {accordionData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              style={{
                ...styles.tabButton,
                ...(activeTab === item.id ? styles.activeTabButton : {}),
                borderRight: index === accordionData.length - 1 ? 'none' : '1px solid #dee2e6'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
              aria-selected={activeTab === item.id}
              role="tab"
              aria-controls={`panel-${item.id}`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div 
          style={styles.content}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {getActiveContent()}
        </div>
      </div>

      {/* Status indicator */}
      <div style={{ marginTop: '15px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
        Active Tab: {accordionData.find(item => item.id === activeTab)?.title}
      </div>
    </div>
    </>
  );
}

export default Accordion;