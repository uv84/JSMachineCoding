
import Carousel from './components/carousel/Carousel';
import FileExplorerContextWrapper from './components/FileExp/context/FileExplorerContext';
import FileExp from './components/FileExp/FileExp';
import Lazy from './components/Lazy/Lazy';

const App = () => {
  return (
    // <Lazy/>
    <FileExplorerContextWrapper>
      <FileExp />
    </FileExplorerContextWrapper>
 
    
  // <Carousel/>
  );
};

export default App;
