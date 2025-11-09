import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTodayRecord, setRecords } from '../store/slices/attendanceSlice';
import { attendanceService } from '../services/attendance';
import { AttendanceActions } from '../components/attendance/AttendanceActions';

export const AttendancePage: React.FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth as any);
  const { records } = useAppSelector((state) => state.attendance as any);

  useEffect(() => {
    const loadAttendanceData = async () => {
      if (!user) return;

      try {
        // Load today's attendance
        const todayAttendance = await attendanceService.getTodayAttendance(user.id);
        dispatch(setTodayRecord(todayAttendance));

        // Load recent attendance records
        const userRecords = await attendanceService.getUserAttendance(user.id);
        const recentRecords = userRecords
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);
        dispatch(setRecords(recentRecords));
      } catch (error) {
        console.error('Failed to load attendance data:', error);
      }
    };

    loadAttendanceData();
  }, [user, dispatch]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {intl.formatMessage({ id: 'nav.attendance' })}
        </h1>
        <p className="text-gray-600">
          Manage your daily attendance and view your records
        </p>
      </div>

      {/* Attendance Actions */}
      <AttendanceActions />

      {/* Recent Attendance Records */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Records
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              ) : (
                records.map((record: any) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.checkIn || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.checkOut || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.totalHours ? `${record.totalHours.toFixed(1)}h` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === 'present' ? 'bg-green-100 text-green-800' :
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        record.status === 'absent' ? 'bg-red-100 text-red-800' :
                        record.status === 'holiday' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {intl.formatMessage({ id: `attendance.${record.status}` })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};