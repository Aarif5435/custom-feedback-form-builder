import { useFormVisibility } from '@/hooks/useFormVisibility';
import { Layout } from '../components/Layout';
import { FeedbackFormComponent } from '@/components/feedbackForm';

const About: React.FC = () => {
  const { modalOpen, getFormToShow, handleClose } = useFormVisibility();
  const formToShow = getFormToShow();

  return (
    <>
      <Layout>
        <h1 className="text-4xl font-bold mb-5">About Us</h1>
        <p className="text-lg">
          We are a creative agency focused on delivering high-quality design solutions.
        </p>
      </Layout>
      {modalOpen && formToShow && (
        <FeedbackFormComponent form={formToShow} modalOpen={modalOpen} handleClose={handleClose} />
      )}
    </>
  );
};

export default About;
