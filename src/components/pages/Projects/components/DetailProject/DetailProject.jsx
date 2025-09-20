import DetailProjectProvider from './DetailProjectContext';
import DetailProjectContainer from './components/DetailProjectContainer';

const DetailProject = () => {
  return (
    <DetailProjectProvider>
      <DetailProjectContainer />
    </DetailProjectProvider>
  );
};

export default DetailProject;
