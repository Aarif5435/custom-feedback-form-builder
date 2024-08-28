import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchFeedbackForms, deleteFeedbackForm } from '@/redux/feedbackFormsSlice';
import NewFormCard from '@/components/NewFormCard';
import FormCard from '@/components/FormCard';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';


const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.feedbackForms.forms);
  const router = useRouter();


  useEffect(() => {
    dispatch(fetchFeedbackForms());
  }, [dispatch]);

  const handleEditForm = (id: string, title: string, description: string) => {
    router.push({
      pathname: "/admin/form-builder",
      query: {
        id: id,
        title: title,
        description: description,
        isEdit: true,
      },
    });
  };

  const handleDeleteForm = (id: string) => {
    dispatch(deleteFeedbackForm(id));
  };

  const handleViewSubmissions = (id: string) => {
    router.push({
      pathname: './summary-page',
      query:{
        id:id
      }
    })
  };

  return (
    <>
    <Navbar/>
    <div className="p-8">
      <div className="flex flex-wrap">
        <NewFormCard />
        {forms.map((form,ind) => {
         return <FormCard
            key={ind}
            title={form.title}
            submissions={typeof form.submission?.submitted === 'number' ? form.submission?.submitted : 0}
            views={typeof form.submission?.views === 'number' ? form.submission?.views : 0}
            publishedDate={typeof form.createdDate === 'string' ? form.createdDate : ''}
            onEdit={() => handleEditForm(form.id, form.title, typeof form.description=== 'string' ? form.description: 'new form created')}
            onDelete={() => handleDeleteForm(form.id)}
            onViewSubmissions={() => handleViewSubmissions(form.id)}
          />
})}
      </div>
    </div>
    </>
    
  );
};

export default Dashboard;
