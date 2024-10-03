import { db } from "@/lib/firebaseConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

export type Field = {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  options?: string[];
  category?: string[];
};

export type Condition = {
  url?: string;
  date?: string;
  time?: string;
};

export type Content = {
  question: string;
  answer: string;
};

export type FeedbackList = {
  submittedDate?: string;
  content: Content[];
};

export type Submission = {
  submitted?: Number;  
  views?: Number;
  feedbackList?: FeedbackList[];
};

export type FeedbackForm = {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
  condition?: Condition;
  isPublished?: boolean;
  submission?: Submission;
  createdDate?: string;
};

export interface FeedbackFormState {
  forms: FeedbackForm[];
  formById?: FeedbackForm;
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackFormState = {
  forms: [],
  formById: {
    id: "",
    title: "",
    fields: [],
  },
  loading: false,
  error: null,
};

export const fetchFeedbackForms = createAsyncThunk(
  "feedbackForms/fetchFeedbackForms",
  async (): Promise<FeedbackForm[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedbackForms"));

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FeedbackForm[];
    } catch (error) {
      console.error("Error fetching feedback forms:", error);
      throw new Error("Failed to fetch feedback forms");
    }
  }
);

export const fetchFeedbackFormById = createAsyncThunk(
  "feedbackForms/fetchFeedbackFormById",
  async (formId: string): Promise<FeedbackForm> => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedbackForms"));
      let id = querySnapshot.docs.find((docs) => docs.data().id === formId)?.id;
      let docRef = doc(db, "feedbackForms", formId);
      if (typeof id === "string") {
        docRef = doc(db, "feedbackForms", id);
      }

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as FeedbackForm;
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching feedback form:", error);
      throw new Error("Failed to fetch feedback form");
    }
  }
);

export const addFeedbackForm = createAsyncThunk(
  "feedbackForms/addFeedbackForm",
  async (formData: Omit<FeedbackForm, "id">): Promise<FeedbackForm> => {
    try {
      const docRef = await addDoc(collection(db, "feedbackForms"), formData);
      console.log("Form added successfully:", formData);
      return { id: docRef.id, ...formData };
    } catch (error) {
      console.error("Error adding feedback form:", error);
      throw new Error("Failed to add feedback form");
    }
  }
);

export const updateFeedbackForm = createAsyncThunk(
  "feedbackForms/updateFeedbackForm",
  async ({
    id,
    formData,
  }: {
    id: string;
    formData: Partial<FeedbackForm>;
  }): Promise<{ id: string; formData: Partial<FeedbackForm> }> => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedbackForms"));
      querySnapshot.docs.map(async (docs) => {
        if (docs.data().id === id) {
          const formRef = doc(db, "feedbackForms", docs.id);
          await updateDoc(formRef, formData);
          return docs.id;
        }
      });
      return { id, formData };
    } catch (error) {
      console.error("Error updating feedback form:", error);
      throw new Error("Failed to update feedback form");
    }
  }
);

export const deleteFeedbackForm = createAsyncThunk(
  "feedbackForms/deleteFeedbackForm",
  async (id: string): Promise<string> => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedbackForms"));
      querySnapshot.docs.map(async (docs) => {
        if (docs.data().id === id) {
          const formRef = doc(db, "feedbackForms", docs.id);
          await deleteDoc(formRef);
          return docs.id;
        }
      });
      return id;
    } catch (error) {
      console.error("Error deleting feedback form:", error);
      throw new Error("Failed to delete feedback form");
    }
  }
);

const feedbackFormsSlice = createSlice({
  name: "feedbackForms",
  initialState,
  reducers: {
    setFields: (state, action: PayloadAction<FeedbackForm>) => {
      const existingFormIndex = state.forms.findIndex(
        (form) => form.id === action.payload.id
      );
      if (existingFormIndex >= 0) {
        state.forms[existingFormIndex] = action.payload; // Update existing form
      } else {
        state.forms.push(action.payload); // Add new form
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchFeedbackForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeedbackForms.fulfilled,
        (state, action: PayloadAction<FeedbackForm[]>) => {
          state.forms = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchFeedbackForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch feedback forms";
      })
      .addCase(
        updateFeedbackForm.fulfilled,
        (
          state,
          action: PayloadAction<{ id: string; formData: Partial<FeedbackForm> }>
        ) => {
          const { id, formData } = action.payload;
          const index = state.forms.findIndex((form) => form.id === id);
          if (index !== -1) {
            state.forms[index] = { ...state.forms[index], ...formData };
          }
        }
      )

      .addCase(
        deleteFeedbackForm.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.forms = state.forms.filter(
            (form) => form.id !== action.payload
          );
        }
      )
      .addCase(fetchFeedbackFormById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeedbackFormById.fulfilled,
        (state, action: PayloadAction<FeedbackForm>) => {
          state.formById = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchFeedbackFormById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch feedback forms";
      })
      .addCase(
        addFeedbackForm.fulfilled,
        (state, action: PayloadAction<FeedbackForm>) => {
          state.forms.push(action.payload);
        }
      );
  },
});

export const { setFields } = feedbackFormsSlice.actions;
export default feedbackFormsSlice.reducer;
