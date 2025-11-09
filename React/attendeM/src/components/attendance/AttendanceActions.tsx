import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { checkIn, checkOut, startBreak, endBreak, setTodayRecord } from '../../store/slices/attendanceSlice';
import { attendanceService } from '../../services/attendance';

export const AttendanceActions: React.FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth as any);
  const { todayRecord, loading } = useAppSelector((state) => state.attendance as any);
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckIn = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    try {
      const record = await attendanceService.checkIn(user.id, notes);
      dispatch(setTodayRecord(record));
      dispatch(checkIn({ time: record.checkIn!, notes }));
      setNotes('');
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    try {
      const record = await attendanceService.checkOut(user.id, notes);
      dispatch(setTodayRecord(record));
      dispatch(checkOut({ time: record.checkOut!, notes }));
      setNotes('');
    } catch (error) {
      console.error('Check-out failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartBreak = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    try {
      const record = await attendanceService.startBreak(user.id);
      dispatch(setTodayRecord(record));
      dispatch(startBreak(record.breakStart!));
    } catch (error) {
      console.error('Start break failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndBreak = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    try {
      const record = await attendanceService.endBreak(user.id);
      dispatch(setTodayRecord(record));
      dispatch(endBreak(record.breakEnd!));
    } catch (error) {
      console.error('End break failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const canCheckIn = !todayRecord?.checkIn;
  const canCheckOut = todayRecord?.checkIn && !todayRecord?.checkOut;
  const canStartBreak = todayRecord?.checkIn && !todayRecord?.checkOut && !todayRecord?.breakStart;
  const canEndBreak = todayRecord?.breakStart && !todayRecord?.breakEnd;

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        {intl.formatMessage({ id: 'attendance.today' })}
      </h2>

      {/* Current Time Display */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-primary-600">{getCurrentTime()}</div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString([], { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Attendance Status */}
      {todayRecord && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Check In</p>
            <p className="text-lg font-semibold text-green-600">
              {todayRecord.checkIn || '-'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Check Out</p>
            <p className="text-lg font-semibold text-red-600">
              {todayRecord.checkOut || '-'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Break Start</p>
            <p className="text-lg font-semibold text-yellow-600">
              {todayRecord.breakStart || '-'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Break End</p>
            <p className="text-lg font-semibold text-yellow-600">
              {todayRecord.breakEnd || '-'}
            </p>
          </div>
        </div>
      )}

      {/* Notes Input */}
      <div className="mb-6">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          {intl.formatMessage({ id: 'attendance.notes' })} (Optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Add any notes about your attendance..."
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={handleCheckIn}
          disabled={!canCheckIn || isProcessing || loading}
          className={`py-3 px-4 rounded-lg font-medium transition-colors ${
            canCheckIn && !isProcessing && !loading
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {intl.formatMessage({ id: 'attendance.checkIn' })}
        </button>

        <button
          onClick={handleCheckOut}
          disabled={!canCheckOut || isProcessing || loading}
          className={`py-3 px-4 rounded-lg font-medium transition-colors ${
            canCheckOut && !isProcessing && !loading
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {intl.formatMessage({ id: 'attendance.checkOut' })}
        </button>

        <button
          onClick={handleStartBreak}
          disabled={!canStartBreak || isProcessing || loading}
          className={`py-3 px-4 rounded-lg font-medium transition-colors ${
            canStartBreak && !isProcessing && !loading
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {intl.formatMessage({ id: 'attendance.breakStart' })}
        </button>

        <button
          onClick={handleEndBreak}
          disabled={!canEndBreak || isProcessing || loading}
          className={`py-3 px-4 rounded-lg font-medium transition-colors ${
            canEndBreak && !isProcessing && !loading
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {intl.formatMessage({ id: 'attendance.breakEnd' })}
        </button>
      </div>

      {/* Status Message */}
      {todayRecord && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
              todayRecord.status === 'present' ? 'bg-green-100 text-green-800' :
              todayRecord.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
              todayRecord.status === 'absent' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {intl.formatMessage({ id: `attendance.${todayRecord.status}` })}
            </span>
          </div>
          {todayRecord.totalHours && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-gray-700">Total Hours:</span>
              <span className="text-sm text-gray-900">{todayRecord.totalHours.toFixed(1)}h</span>
            </div>
          )}
          {todayRecord.notes && (
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-700">Notes:</span>
              <p className="text-sm text-gray-600 mt-1">{todayRecord.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};