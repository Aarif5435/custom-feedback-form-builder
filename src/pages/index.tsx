import { useFormVisibility } from '@/hooks/useFormVisibility';
import {Layout} from '../components/Layout';
import { FeedbackFormComponent } from '@/components/feedbackForm';
import { LandingPage } from '@/components/Landing';

 const Home: React.FC = () => {
  const { modalOpen, getFormToShow, handleClose } = useFormVisibility();
  const formToShow = getFormToShow();
  return (
    <>
    <LandingPage/>
    {modalOpen && formToShow && (
         <FeedbackFormComponent form={formToShow} modalOpen={modalOpen} handleClose={handleClose} />
      )}
    </>
    
  );
};

export default Home;






