import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTodayRecord, setStats } from '../store/slices/attendanceSlice';
import { attendanceService } from '../services/attendance';

export const DashboardPage: React.FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth as any);
  const { todayRecord, stats } = useAppSelector((state) => state.attendance as any);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      try {
        // Load today's attendance
        const todayAttendance = await attendanceService.getTodayAttendance(user.id);
        dispatch(setTodayRecord(todayAttendance));

        // Load attendance stats
        const attendanceStats = await attendanceService.getAttendanceStats(user.id);
        dispatch(setStats(attendanceStats));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    loadDashboardData();
  }, [user, dispatch]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {intl.formatMessage({ id: 'dashboard.welcome' }, { name: user?.firstName })}
        </h1>
        <p className="text-gray-600 mt-1">{getCurrentDate()}</p>
        <p className="text-lg font-semibold text-primary-600 mt-2">{getCurrentTime()}</p>
      </div>

      {/* Today's Attendance Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {intl.formatMessage({ id: 'attendance.today' })}
        </h2>
        
        {todayRecord ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <p className="text-sm text-gray-500">Status</p>
              <p className={`text-lg font-semibold ${
                todayRecord.status === 'present' ? 'text-green-600' :
                todayRecord.status === 'late' ? 'text-yellow-600' :
                todayRecord.status === 'absent' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {intl.formatMessage({ id: `attendance.${todayRecord.status}` })}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Hours</p>
              <p className="text-lg font-semibold text-blue-600">
                {todayRecord.totalHours ? `${todayRecord.totalHours.toFixed(1)}h` : '-'}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No attendance record for today
          </p>
        )}
      </div>

      {/* Monthly Statistics */}
      {stats && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {intl.formatMessage({ id: 'dashboard.monthlyStats' })}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats.currentMonth.present}</p>
              <p className="text-sm text-green-800">Present</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{stats.currentMonth.absent}</p>
              <p className="text-sm text-red-800">Absent</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{stats.currentMonth.late}</p>
              <p className="text-sm text-yellow-800">Late</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats.averageHours.toFixed(1)}h</p>
              <p className="text-sm text-blue-800">Avg Hours</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {intl.formatMessage({ id: 'dashboard.quickActions' })}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn-primary">
            {intl.formatMessage({ id: 'attendance.checkIn' })}
          </button>
          <button className="btn-secondary">
            {intl.formatMessage({ id: 'attendance.checkOut' })}
          </button>
          <button className="btn-secondary">
            {intl.formatMessage({ id: 'attendance.breakStart' })}
          </button>
          <button className="btn-secondary">
            {intl.formatMessage({ id: 'nav.reports' })}
          </button>
        </div>
      </div>
    </div>
  );
};