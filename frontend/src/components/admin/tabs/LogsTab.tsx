import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Trash2, Trash } from 'lucide-react';

interface LogsTabProps {
  chartData: any[];
  logFilter: string;
  setLogFilter: (s: string) => void;
  filteredLogs: any[];
  handleDeleteLog: (id: string) => void;
  handleClearLogs: () => void;
  logs: any[];
}

const LogsTab: React.FC<LogsTabProps> = ({
  chartData,
  logFilter,
  setLogFilter,
  filteredLogs,
  handleDeleteLog,
  handleClearLogs,
  logs
}) => {
  return (
    <div className="space-y-8">
      {/* Chart Section */}
      <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">01</span>
          <div className="flex-1 h-px bg-black/8" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Статистик</span>
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Үйлдэл (Албан тушаалаар)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} tickLine={false} axisLine={false} />
              <RechartsTooltip
                cursor={{ fill: '#F3F4F6' }}
                contentStyle={{ borderRadius: '2px', border: '1px solid #E5E7EB', boxShadow: 'none', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Bar dataKey="value" fill="#000000" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">02</span>
          <div className="flex-1 h-px bg-black/8" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Лог Жагсаалт</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em]">Бүх лог</h3>
          <select
            value={logFilter}
            onChange={(e) => setLogFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer"
          >
            <option value="">Бүх үйлдэл</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 text-[10px] font-black uppercase tracking-wider text-gray-400">
                <th className="py-3 px-4">Огноо</th>
                <th className="py-3 px-4">Хэрэглэгч</th>
                <th className="py-3 px-4">Албан тушаал</th>
                <th className="py-3 px-4">Үйлдэл</th>
                <th className="py-3 px-4">Тайлбар</th>
                <th className="py-3 px-4 text-right">Устгах</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">Лог олдсонгүй</td>
                </tr>
              ) : (
                filteredLogs.map((log, idx) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx}
                    className="border-b border-black/5 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-xs font-bold">{log.username}</td>
                    <td className="py-3 px-4 text-xs text-gray-600">{log.position}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm ${log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                          log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                            log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                        }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate" title={log.description}>
                      {log.description}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteLog(log._id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {logs.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleClearLogs}
              className="flex items-center gap-2 px-6 py-3 border border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-sm"
            >
              <Trash size={14} /> Бүх логийг устгах
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsTab;
