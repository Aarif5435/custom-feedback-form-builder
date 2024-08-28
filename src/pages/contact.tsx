import { useFormVisibility } from '@/hooks/useFormVisibility';
import { Layout } from '../components/Layout';
import { FeedbackFormComponent } from '@/components/feedbackForm';

const Contact: React.FC = () => {
  const { modalOpen, getFormToShow, handleClose } = useFormVisibility();
  const formToShow = getFormToShow();

  return (
    <>
      <Layout>
        <h1 className="text-4xl font-bold mb-5">Contact Us</h1>
        <p className="text-lg">
          Get in touch with us for any inquiries or collaborations.
        </p>
        <form className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </Layout>
      {modalOpen && formToShow && (
        <FeedbackFormComponent form={formToShow} modalOpen={modalOpen} handleClose={handleClose} />
      )}
    </>
  );
};

export default Contact;
