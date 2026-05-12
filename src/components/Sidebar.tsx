
import { SidebarLink } from '../types';

interface SidebarProps {
  onQuickAsk: (query: string) => void;
}

const QUICK_QUESTIONS: SidebarLink[] = [
  { label: 'Annual leave entitlement', query: 'How many days of annual leave am I entitled to?' },
  { label: 'Medical leave entitlement', query: 'How many sick days do I get per year?' },
  { label: 'Working hours', query: 'What are the working hours?' },
  { label: 'Probation period', query: 'How long is the probation period?' },
  { label: 'Resignation notice', query: 'What is the notice period if I resign?' },
  { label: 'Maternity leave', query: 'What is the maternity leave entitlement?' },
  { label: 'Dress code', query: 'What is the dress code policy?' },
  { label: 'Mileage claims', query: 'What is the mileage claim rate?' },
  { label: 'Medical claims', query: 'What is the medical claim limit?' },
  { label: 'Attendance allowance', query: 'Am I entitled to attendance allowance?' }
];

export function Sidebar({ onQuickAsk }: SidebarProps) {
  return (
    <aside className="w-full lg:w-72 flex flex-col gap-5 shrink-0 overflow-y-auto no-scrollbar pb-6 lg:pb-0">
      <div className="bg-white border border-hr-border rounded-xl p-4 shadow-sm">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-hr-muted mb-4 px-1">
          Quick Questions
        </h3>
        <div className="flex flex-col gap-2">
          {QUICK_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onQuickAsk(item.query)}
              className="w-full text-left bg-white border border-hr-border rounded-lg px-3 py-2.5 text-[13px] leading-snug text-hr-text hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 group"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-hr-border rounded-xl p-4 shadow-sm">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-hr-muted mb-4 px-1">
          Group Companies
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-100 italic">
            Solid Horizon Sdn Bhd
          </span>
          <span className="text-[11px] font-semibold bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md border border-orange-100 italic">
            Falcon Safe Marketing Sdn Bhd
          </span>
          <span className="text-[11px] font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-md border border-green-100 italic">
            Premier Channel Sdn Bhd
          </span>
        </div>
      </div>

      <div className="bg-white border border-hr-border rounded-xl p-4 shadow-sm">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-hr-muted mb-4 px-1">
          Handbook Info
        </h3>
        <div className="flex flex-col">
          {[
            { label: 'Version', value: '3.0' },
            { label: 'Effective', value: '1 July 2021' },
            { label: 'HR Contact', value: 'HR Department' }
          ].map((info, idx) => (
            <div key={idx} className={`flex justify-between items-center py-2 text-[12px] ${idx !== 2 ? 'border-b border-hr-border' : ''}`}>
              <span className="text-hr-muted">{info.label}</span>
              <span className="font-semibold text-hr-text">{info.value}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
