import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "../../api/uploadService";

const initialState = {
  files: [],
  loading: false,
  error: null,
};

export const fetchStoreFiles = createAsyncThunk(
  "uploads/fetchStoreFiles",
  async (storeId, thunkAPI) => {
    try {
      return await uploadService.getStoreFiles(storeId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "uploads/uploadFile",
  async ({ storeId, formData }, thunkAPI) => {
    try {
      return await uploadService.uploadFile(storeId, formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "uploads/deleteFile",
  async (fileId, thunkAPI) => {
    try {
      await uploadService.deleteFile(fileId);
      return fileId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    clearUploads(state) {
      state.files = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchStoreFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Fetch failed";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.unshift(action.payload);
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = state.files.filter(
          (file) => file._id !== action.payload
        );
      });
  },
});

export const { clearUploads } = uploadSlice.actions;
export default uploadSlice.reducer;
