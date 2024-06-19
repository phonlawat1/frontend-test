import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormState {
  dataList: FormData[];
}

const loadInitialState = (): FormState => {
  const storedData = localStorage.getItem("formData");

  if (storedData) {
    const parsedData: FormData[] = JSON.parse(storedData);
    return { dataList: parsedData };
  }

  return { dataList: [] };
};

const initialState: FormState = loadInitialState();

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<FormData>) => {
      state.dataList = [...state.dataList, action.payload];
      localStorage.setItem("formData", JSON.stringify(state.dataList));
    },
    editFormData: (state, action: PayloadAction<FormData>) => {
      const index = state.dataList.findIndex(
        (data) => data.id === action.payload.id
      );

      if (index !== -1) {
        state.dataList[index] = action.payload;
        localStorage.setItem("formData", JSON.stringify(state.dataList));
      }
    },
    deleteFormData: (state, action: PayloadAction<string>) => {
      state.dataList = state.dataList.filter(
        (data) => data.id !== parseInt(action.payload)
      );
      localStorage.setItem("formData", JSON.stringify(state.dataList));
    },
  },
});

export const { saveFormData, editFormData, deleteFormData } = formSlice.actions;
export default formSlice.reducer;
