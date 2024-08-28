import { useFormVisibility } from '@/hooks/useFormVisibility';
import {Layout} from '../components/Layout';
import { FeedbackFormComponent } from '@/components/feedbackForm';

const Home: React.FC = () => {
  const { modalOpen, getFormToShow, handleClose } = useFormVisibility();
  const formToShow = getFormToShow();
  return (
    <>
    <Layout>
      <h1 className="text-4xl font-bold mb-5">Welcome to My Website</h1>
      <p className="text-lg">
        This is the home page. Explore our services and learn more about what we do.
      </p>
    </Layout>
    {modalOpen && formToShow && (
         <FeedbackFormComponent form={formToShow} modalOpen={modalOpen} handleClose={handleClose} />
      )}
    </>
    
  );
};

export default Home;
