import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Trash2, Trash, ListFilter, Activity, BarChart3, Clock } from 'lucide-react';

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
  const COLORS = ['#000000', '#4B5563', '#9CA3AF', '#D1D5DB'];

  return (
    <div className="space-y-6">
      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 border border-black/5 rounded-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <BarChart3 size={14} /> Статистик
            </h3>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#9ca3af', fontWeight: 900 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 8, fill: '#9ca3af', fontWeight: 900 }} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ fontSize: '10px', fontWeight: '900' }} />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-black text-white p-6 rounded-sm flex flex-col justify-between">
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Нийт лог</h4>
            <p className="text-4xl font-black tracking-tighter">{logs.length}</p>
          </div>
          <button 
            onClick={handleClearLogs}
            className="w-full py-2.5 border border-white/20 hover:bg-white hover:text-black transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 mt-4"
          >
            <Trash size={12} /> Устгах
          </button>
        </div>
      </div>

      {/* Logs Table Section */}
      <div className="bg-white border border-black/5 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} /> Түүх
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-sm border border-black/5">
            <ListFilter size={12} className="text-gray-400" />
            <select
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
              className="bg-transparent focus:outline-none text-[9px] font-black uppercase tracking-widest cursor-pointer"
            >
              <option value="">Бүх үйлдэл</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-black/5 text-[9px] font-black uppercase tracking-widest text-gray-400">
                <th className="py-3 px-4">Огноо</th>
                <th className="py-3 px-4">Хэрэглэгч</th>
                <th className="py-3 px-4">Үйлдэл</th>
                <th className="py-3 px-4">Тайлбар</th>
                <th className="py-3 px-4 text-right">#</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, idx) => (
                <tr key={log._id || idx} className="border-b border-black/5 hover:bg-gray-50 transition-colors group">
                  <td className="py-2.5 px-4">
                    <div className="text-[10px] font-bold text-gray-700">{new Date(log.createdAt).toLocaleDateString()}</div>
                    <div className="text-[8px] font-black text-gray-300 uppercase">{new Date(log.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="py-2.5 px-4 text-[10px] font-black uppercase">{log.username}</td>
                  <td className="py-2.5 px-4">
                    <span className={`inline-block px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-sm ${
                      log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                      log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                      log.action === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>{log.action}</span>
                  </td>
                  <td className="py-2.5 px-4 text-[10px] text-gray-600 truncate max-w-xs">{log.description}</td>
                  <td className="py-2.5 px-4 text-right">
                    <button onClick={() => handleDeleteLog(log._id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsTab;
