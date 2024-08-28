import { useFormVisibility } from '@/hooks/useFormVisibility';
import { Layout } from '../components/Layout';
import { FeedbackFormComponent } from '@/components/feedbackForm';

const Services: React.FC = () => {
  const { modalOpen, getFormToShow, handleClose } = useFormVisibility();
  const formToShow = getFormToShow();

  return (
    <>
      <Layout>
        <h1 className="text-4xl font-bold mb-5">Our Services</h1>
        <ul className="list-disc list-inside">
          <li className="text-lg">Website Design & Logo</li>
          <li className="text-lg">Business Branding</li>
          <li className="text-lg">Mobile Application Design</li>
          <li className="text-lg">UI/UX Mobile Design</li>
        </ul>
      </Layout>
      {modalOpen && formToShow && (
        <FeedbackFormComponent form={formToShow} modalOpen={modalOpen} handleClose={handleClose} />
      )}
    </>
  );
};

export default Services;
