import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  breakStart: string | null;
  breakEnd: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'holiday';
  notes?: string;
  totalHours?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceStats {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalHalfDay: number;
  averageHours: number;
  currentMonth: {
    present: number;
    absent: number;
    late: number;
    halfDay: number;
  };
}

interface AttendanceState {
  records: AttendanceRecord[];
  todayRecord: AttendanceRecord | null;
  stats: AttendanceStats | null;
  loading: boolean;
  error: string | null;
  selectedDate: string;
}

const initialState: AttendanceState = {
  records: [],
  todayRecord: null,
  stats: null,
  loading: false,
  error: null,
  selectedDate: new Date().toISOString().split('T')[0],
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRecords: (state, action: PayloadAction<AttendanceRecord[]>) => {
      state.records = action.payload;
    },
    addRecord: (state, action: PayloadAction<AttendanceRecord>) => {
      state.records.push(action.payload);
    },
    updateRecord: (state, action: PayloadAction<AttendanceRecord>) => {
      const index = state.records.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    setTodayRecord: (state, action: PayloadAction<AttendanceRecord | null>) => {
      state.todayRecord = action.payload;
    },
    checkIn: (state, action: PayloadAction<{ time: string; notes?: string }>) => {
      if (state.todayRecord) {
        state.todayRecord.checkIn = action.payload.time;
        state.todayRecord.status = 'present';
        if (action.payload.notes) {
          state.todayRecord.notes = action.payload.notes;
        }
      }
    },
    checkOut: (state, action: PayloadAction<{ time: string; notes?: string }>) => {
      if (state.todayRecord) {
        state.todayRecord.checkOut = action.payload.time;
        if (action.payload.notes) {
          state.todayRecord.notes = action.payload.notes;
        }
        // Calculate total hours
        if (state.todayRecord.checkIn) {
          const checkInTime = new Date(`1970-01-01T${state.todayRecord.checkIn}`);
          const checkOutTime = new Date(`1970-01-01T${action.payload.time}`);
          const diffMs = checkOutTime.getTime() - checkInTime.getTime();
          state.todayRecord.totalHours = diffMs / (1000 * 60 * 60);
        }
      }
    },
    startBreak: (state, action: PayloadAction<string>) => {
      if (state.todayRecord) {
        state.todayRecord.breakStart = action.payload;
      }
    },
    endBreak: (state, action: PayloadAction<string>) => {
      if (state.todayRecord) {
        state.todayRecord.breakEnd = action.payload;
      }
    },
    setStats: (state, action: PayloadAction<AttendanceStats>) => {
      state.stats = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setRecords,
  addRecord,
  updateRecord,
  setTodayRecord,
  checkIn,
  checkOut,
  startBreak,
  endBreak,
  setStats,
  setSelectedDate,
  clearError,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;